import qs from "qs";
import { Locale, defaultLocale, strapiLocaleMap } from "@/config/i18n.config";
import { STRAPI_URL, API_TOKEN } from "@/services";
import { AqiqahPageData } from "@/types/aqiqah.types";

const AQIQAH_POPULATE = {
  heroSection: {
    populate: {
      sectionHeading: "*",
      images: {
        populate: "*",
      },
      stats: {
        populate: "*",
      },
    },
  },
  Sec1: {
    populate: {
      sectionHeading: "*",
      cards: {
        populate: {
          points: "*",
          fidyaexample: "*",
        },
      },
    },
  },
  Sec2: {
    populate: {
      sectionHeading: "*",
      cards: {
        populate: {
          iconImage: {
            populate: "*",
          },
        },
      },
    },
  },
  Sec3: {
    populate: {
      sectionHeading: "*",
      cards: {
        populate: {
          iconImage: {
            populate: "*",
          },
        },
      },
    },
  },
  callToAction: {
    populate: {
      sectionHeading: "*",
      CTA: "*",
    },
  },
  faqs: {
    populate: {
      sectionHeading: "*",
      faqs: {
        populate: "*",
      },
    },
  },
};

export async function getAqiqahData(
  locale: Locale = defaultLocale
): Promise<AqiqahPageData | null> {
  try {
    const strapiLocale = strapiLocaleMap[locale];

    const queryString = qs.stringify(
      {
        populate: AQIQAH_POPULATE,
        locale: strapiLocale,
      },
      {
        encodeValuesOnly: true,
      }
    );

    const response = await fetch(`${STRAPI_URL}/api/aqiqahs?${queryString}`, {
      headers: {
        "Content-Type": "application/json",
        ...(API_TOKEN && { Authorization: `Bearer ${API_TOKEN}` }),
      },
    });

    // console.log(
    //   "Fetching Aqiqah from:",
    //   `${STRAPI_URL}/api/aqiqahs?${queryString}`
    // );

    if (!response.ok) {
      console.error("Failed to fetch aqiqah data:", response);
      return null;
    }

    const data = await response.json();

    // Transform Strapi response
    const page = Array.isArray(data?.data) ? data.data[0] : data?.data;

    return page || null;
  } catch (error) {
    console.error("Error fetching aqiqah data:", error);
    return null;
  }
}
