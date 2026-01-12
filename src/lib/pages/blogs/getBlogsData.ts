"use server";
import qs from "qs";
import { Locale, defaultLocale, strapiLocaleMap } from "@/config/i18n.config";
import { STRAPI_URL, API_TOKEN } from "@/services";
import { mapBlogsPageData } from "../../mappers/blogs";
import { BlogListingPageData } from "@/types/blogs.types";

const BLOG_POPULATE = {
  heroSection: {
    populate: {
      sectionHeading: {
        populate: "*",
      },
      image: {
        populate: "*",
      },
    },
  },
  globalNewsCard: {
    populate: {
      image: {
        populate: "*",
      },
      blog_detail: {
        populate: "*",
      },
    },
  },
};

export async function getBlogsData(
  locale: Locale = defaultLocale
): Promise<BlogListingPageData | null> {
  try {
    const strapiLocale = strapiLocaleMap[locale];

    const queryString = qs.stringify(
      {
        populate: BLOG_POPULATE,
        locale: strapiLocale,
      },
      {
        encodeValuesOnly: true,
      }
    );

    const fullUrl = `${STRAPI_URL}/api/blogs?${queryString}`;

    const response = await fetch(fullUrl, {
      headers: {
        "Content-Type": "application/json",
        ...(API_TOKEN && { Authorization: `Bearer ${API_TOKEN}` }),
      },
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `Failed to fetch blogs data. Status: ${response.status} ${response.statusText}`,
        "Body:", errorText
      );
      return null;
    }

    const data = await response.json();
    const page = Array.isArray(data?.data) ? data.data[0] : data?.data;

    if (!page) return null;

    return mapBlogsPageData(page);
  } catch (error: any) {
    console.error("Error fetching blogs data:", {
      message: error.message,
      code: error.code,
      cause: error.cause,
      url: `${STRAPI_URL}/api/blogs`
    });
    return null;
  }
}
