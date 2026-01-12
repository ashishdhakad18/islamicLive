"use server";
import qs from "qs";
import { Locale, defaultLocale, strapiLocaleMap } from "@/config/i18n.config";
import { STRAPI_URL, API_TOKEN } from "@/services";
import { mapJoinUsPageData } from "../../mappers/join-us";
import { JoinUsPageData } from "@/types/join-us.types";

const JOIN_US_POPULATE = {
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
  cardSection: {
    populate: "*",
  },
  callToAction: {
    populate: {
      sectionHeading: {
        populate: "*",
      },
      CTA: {
        populate: "*",
      },
    },
  },
};

export async function getJoinUsData(
  locale: Locale = defaultLocale
): Promise<JoinUsPageData | null> {
  try {
    const strapiLocale = strapiLocaleMap[locale];

    const queryString = qs.stringify(
      {
        populate: JOIN_US_POPULATE,
        locale: strapiLocale,
      },
      {
        encodeValuesOnly: true,
      }
    );

    const fullUrl = `${STRAPI_URL}/api/join-us-pages?${queryString}`;
    // console.log("Fetching join us page data from:", fullUrl);

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
        `Failed to fetch join us data. Status: ${response.status} ${response.statusText}`,
        "Body:", errorText
      );
      return null;
    }

    const data = await response.json();
    const page = Array.isArray(data?.data) ? data.data[0] : data?.data;

    if (!page) return null;

    return mapJoinUsPageData(page);
  } catch (error: any) {
    console.error("Error fetching join us data:", {
      message: error.message,
      code: error.code,
      cause: error.cause,
      url: `${STRAPI_URL}/api/join-us-pages`
    });
    return null;
  }
}
