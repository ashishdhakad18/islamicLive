import qs from "qs";
import { Locale, defaultLocale, strapiLocaleMap } from "@/config/i18n.config";
import { STRAPI_URL, API_TOKEN } from "@/services";
import { WaqfPageDataFromStrapi } from "@/types/waqf.types";
import { mapWaqfPageData, WaqfMappedData } from "@/lib/mappers/waqf";

const WAQF_POPULATE = {
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

  waqfBasicSection: {
    populate: {
      sectionHeading: {
        populate: "*",
      },
      cards: {
        populate: {
          lists: {
            populate: "*",
          },
        },
      },
    },
  },

  whyTrustUsSection: {
    populate: {
      sectionHeading: {
        populate: "*",
      },
      cards: {
        populate: {
          iconImage: {
            populate: "*",
          },
        },
      },
    },
  },

  fundDestributionSection: {
    populate: {
      sectionHeading: {
        populate: "*",
      },
      destributionlist: {
        populate: {
          icon: {
            populate: "*",
          },
        },
      },
      images: {
        populate: "*",
      },
    },
  },

  impactCardSection: {
    populate: {
      sectionHeading: {
        populate: "*",
      },
      initiativesCard: {
        populate: {
          image: {
            populate: "*",
          },
        },
      },
    },
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

  faqSection: {
    populate: {
      sectionHeading: {
        populate: "*",
      },
      faqs: {
        populate: "*",
      },
    },
  },
};

export async function getWaqfData(
  locale: Locale = defaultLocale
): Promise<WaqfMappedData | null> {
  try {
    const strapiLocale = strapiLocaleMap[locale];

    const queryString = qs.stringify(
      {
        populate: WAQF_POPULATE,
        locale: strapiLocale,
      },
      {
        encodeValuesOnly: true,
      }
    );

    const response = await fetch(
      `${STRAPI_URL}/api/waqf-pages?${queryString}`,
      {
        headers: {
          "Content-Type": "application/json",
          ...(API_TOKEN && { Authorization: `Bearer ${API_TOKEN}` }),
        },
        next: { revalidate: 0 } 
      }
    );

    if (!response.ok) {
      console.error(
        `Failed to fetch waqf data: ${response.status} ${response.statusText}`,
        response.url
      );
      return null;
    }

    const data = await response.json();

    // Transform Strapi response
    const pageData: WaqfPageDataFromStrapi = Array.isArray(data?.data) ? data.data[0] : data?.data;

    if (!pageData) return null;

    return mapWaqfPageData(pageData);
  } catch (error) {
    console.error("Error fetching waqf data:", error);
    return null;
  }
}
