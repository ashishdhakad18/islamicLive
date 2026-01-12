"use server";
import qs from "qs";
import { Locale, defaultLocale, strapiLocaleMap } from "@/config/i18n.config";
import { STRAPI_URL, API_TOKEN } from "@/services";
import { mapSingleBlogData } from "../../mappers/blogs";
import { SingleBlogPageData } from "@/types/blogs.types";

const SINGLE_BLOG_POPULATE = {
  heroSection: {
    populate: {
      sectionHeading: {
        populate: "*",
      },
      image: {
        populate: "*",
      },
      heroMSG: {
        populate: "*",
      },
    },
  },

};

export async function getSingleBlogData(
  id: string,
  locale: Locale = defaultLocale
): Promise<SingleBlogPageData | null> {
  try {
    const strapiLocale = strapiLocaleMap[locale];

    const queryString = qs.stringify(
      {
        populate: SINGLE_BLOG_POPULATE,
        filters: {
          id: {
            $eq: id,
          },
        },
        locale: strapiLocale,
      },
      {
        encodeValuesOnly: true,
      }
    );

    const fullUrl = `${STRAPI_URL}/api/blog-details?${queryString}`;

    console.log("Fetching Single Blog from:", fullUrl);

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
        `Failed to fetch single blog data. Status: ${response.status} ${response.statusText}`,
        "Body:", errorText
      );
      return null;
    }

    const data = await response.json();
    
    // Get first matching result from the collection
    const page = Array.isArray(data?.data) ? data.data[0] : data?.data;

    if (!page) return null;

    return mapSingleBlogData(page);
  } catch (error: any) {
    console.error("Error fetching single blog data:", {
      message: error.message,
      code: error.code,
      cause: error.cause,
      url: `${STRAPI_URL}/api/blog-details`
    });
    return null;
  }
}
