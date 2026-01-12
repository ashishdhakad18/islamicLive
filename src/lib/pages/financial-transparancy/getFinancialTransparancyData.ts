import qs from "qs";
import { FinancialTransparancyPageData } from "@/types/financialTransparancy.types";
import { Locale, defaultLocale, strapiLocaleMap } from "@/config/i18n.config";
import { STRAPI_URL, API_TOKEN } from "@/services";

const FINANCIAL_TRANSPARANCY_POPULATE = {
  heroSection: {
    populate: {
      sectionHeading: "*",
      images: {
        populate: "*",
      },
      impactstats: {
        populate: "*",
      },
    },
  },
  ourTransparancy: {
    populate: {
      sectionHeading: "*",
      image: {
        populate: "*",
      },
    },
  },
  howDonationWork: {
    populate: {
      image: {
        populate: "*",
      },
    },
  },
  EffectiveGiving: {
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
  getinTouchSection: {
    populate: {
      sectionHeading: "*",
      cards: {
        populate: {
          iconImage: {
            populate: "*",
          },
        },
      },
      form: "*",
    },
  },
  callToAction: {
    populate: {
      sectionHeading: "*",
      CTA: "*",
    },
  },
  impactData: {
    populate: "*",
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
  faqs: {
    populate: "*",
  },
};

export async function getFinancialTransparancyData(
  locale: Locale = defaultLocale
): Promise<FinancialTransparancyPageData | null> {
  try {
    const strapiLocale = strapiLocaleMap[locale];

    const queryString = qs.stringify(
      {
        populate: FINANCIAL_TRANSPARANCY_POPULATE,
        locale: strapiLocale,
      },
      {
        encodeValuesOnly: true,
      }
    );

    const response = await fetch(
      `${STRAPI_URL}/api/finacial-transparancies?${queryString}`,
      {
        headers: {
          "Content-Type": "application/json",
          ...(API_TOKEN && { Authorization: `Bearer ${API_TOKEN}` }),
        },
      }
    );

    // console.log(
    //   "Fetching Financial Transparancy from:",
    //   `${STRAPI_URL}/api/finacial-transparancies?${queryString}`
    // );

    if (!response.ok) {
      console.error("Failed to fetch financial transparancy data:", response);
      return null;
    }

    const data = await response.json();

    // Transform Strapi response
    const page = Array.isArray(data?.data) ? data.data[0] : data?.data;

    return page || null;
  } catch (error) {
    console.error("Error fetching financial transparancy data:", error);
    return null;
  }
}
