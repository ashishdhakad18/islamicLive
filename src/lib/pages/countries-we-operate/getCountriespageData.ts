import qs from "qs";
import { Locale, defaultLocale, strapiLocaleMap } from "@/config/i18n.config";
import { STRAPI_URL, API_TOKEN } from "@/services";
import { CountriesWeOperatePageData } from "@/types/countriesWeOperate.types";

const COUNTRIES_WE_OPERATE_POPULATE = {
  Sec1: {
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
  Sec2: {
    populate: {
      sectionHeading: "*",
      image: {
        populate: "*",
      },
    },
  },
  Sec3: {
    populate: {
      mapImg: {
        populate: "*",
      },
      contAccord: {
        populate: "*",
      },
    },
  },
  callToAction: {
    populate: {
      sectionHeading: "*",
      CTA: "*",
    },
  },
  newsSection: {
    populate: {
      sectionHeading: "*",
      newsCard: {
        populate: {
          image: {
            populate: "*",
          },
        },
      },
    },
  },
  socialMediaSection: {
    populate: {
      sectionHeading: "*",
      socialMediaCards: {
        populate: {
          image: {
            populate: "*",
          },
        },
      },
    },
  },
  faqSection: {
    populate: {
      sectionHeading: "*",
      faqs: {
        populate: "*",
      },
    },
  },
};

export async function getCountriesWeOperateData(
  locale: Locale = defaultLocale
): Promise<CountriesWeOperatePageData | null> {
  try {
    const strapiLocale = strapiLocaleMap[locale];

    const queryString = qs.stringify(
      {
        populate: COUNTRIES_WE_OPERATE_POPULATE,
        locale: strapiLocale,
      },
      {
        encodeValuesOnly: true,
      }
    );

    const response = await fetch(
      `${STRAPI_URL}/api/countries-we-operate-pages?${queryString}`,
      {
        headers: {
          "Content-Type": "application/json",
          ...(API_TOKEN && { Authorization: `Bearer ${API_TOKEN}` }),
        },
      }
    );

    // console.log(
    //   "Fetching Countries We Operate from:",
    //   `${STRAPI_URL}/api/countries-we-operate-pages?${queryString}`
    // );

    if (!response.ok) {
      console.error("Failed to fetch countries we operate data:", response);
      return null;
    }

    const data = await response.json();

    // Transform Strapi response
    const page = Array.isArray(data?.data) ? data.data[0] : data?.data;

    return page || null;
  } catch (error) {
    console.error("Error fetching countries we operate data:", error);
    return null;
  }
}
