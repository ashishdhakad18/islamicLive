import qs from "qs";
import { Locale, defaultLocale, strapiLocaleMap } from "@/config/i18n.config";
import { STRAPI_URL, API_TOKEN } from "@/services";
import { ZakatPageData } from "@/types/zakat.types";
import { mapZakatPageData, ZakatMappedData } from "@/lib/mappers/zakat";

const ZAKAT_AL_MAAL_POPULATE = {
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

  zakatBasicCards: {
    populate: {
      sectionHeading: {
        populate: "*",
      },
      cards: {
        populate: "*",
      },
    },
  },

  whyTrustSection: {
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

  zakatCalculaterSection: {
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
      icon: {
        populate: "*",
      },
      calculaterForm: {
        populate: {
          calculaterfield: {
            populate: "*",
          },
        },
      },
    },
  },

  destributionSection: {
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

  impactCard: {
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

export async function getZakatData(
  locale: Locale = defaultLocale
): Promise<ZakatMappedData | null> {
  try {
    const strapiLocale = strapiLocaleMap[locale];

    const queryString = qs.stringify(
      {
        populate: ZAKAT_AL_MAAL_POPULATE,
        locale: strapiLocale,
      },
      {
        encodeValuesOnly: true,
      }
    );

    const response = await fetch(
      `${STRAPI_URL}/api/zakat-al-maal-pages?${queryString}`,
      {
        headers: {
          "Content-Type": "application/json",
          ...(API_TOKEN && { Authorization: `Bearer ${API_TOKEN}` }),
        },
        next: { revalidate: 0 } 
      }
    );

    console.log(`${STRAPI_URL}/api/zakat-al-maal-pages?${queryString}`);

    if (!response.ok) {
      console.error(
        `Failed to fetch zakat-al-maal data: ${response.status} ${response.statusText}`,
        response.url
      );
      return null;
    }

    const data = await response.json();

    // Transform Strapi response
    const page = Array.isArray(data?.data) ? data.data[0] : data?.data;

    if (!page) return null;

    return mapZakatPageData(page as ZakatPageData);
  } catch (error) {
    console.error("Error fetching zakat-al-maal data:", error);
    return null;
  }
}
