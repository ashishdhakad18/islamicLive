import { Locale, strapiLocaleMap } from "@/config/i18n.config";
import qs from "qs";
import { STRAPI_URL, API_TOKEN } from "@/services";
import { defaultLocale } from "@/config/i18n.config";
import {
  StrapiSingleEmergencyPage,
  SingleEmergencyMappedData,
  mapSingleEmergencyPageData,
} from "@/lib/mappers/singleEmergency";

// Correct populate based on actual Strapi schema
const SINGLE_EMERGENCY_PAGE_POPULATE = {
  // ListingPageCardData - used for filtering by slug (LearnMoreButton.url)
  ListingPageCardData: {
    populate: {
      cardImage: {
        populate: "*",
      },
      LearnMoreButton: "*",
    },
  },

  // Hero Section
  heroSection: {
    populate: {
      sectionHeading: "*",
      images: {
        populate: "*",
      },
      stats: "*",
    },
  },

  // Situation Section
  situationSection: {
    populate: {
      sectionHeading: "*",
      listData: {
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

  // Impact Section
  impactSection: {
    populate: {
      sectionHeading: "*",
      image: {
        populate: "*",
      },
      impactData: {
        populate: {
          icon: {
            populate: "*",
          },
        },
      },
      CTA: "*",
    },
  },

  // Target Support Section
  targetSupportSection: {
    populate: {
      sectionHeading: "*",
      orphanSponsorshipCard: {
        populate: {
          image: {
            populate: "*",
          },
          featureList: {
            populate: {
              icon: {
                populate: "*",
              },
            },
          },
        },
      },
    },
  },

  // Impact Data (repeatable at root level)
  impactData: {
    populate: {
      icon: {
        populate: "*",
      },
    },
  },

  // News Section
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

  // Social Media Section
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

  // FAQ Section
  //   faqSection: {
  //     populate: {
  //       sectionHeading: "*",
  //       faqs: "*",
  //     },
  //   },
};

export async function getSingleEmergencyPageData(
  slug: string,
  locale: Locale = defaultLocale
): Promise<SingleEmergencyMappedData | null> {
  try {
    const strapiLocale = strapiLocaleMap[locale];

    // Filter by LearnMoreButton.url which contains the slug (e.g., "/gaza")
    const queryString = qs.stringify(
      {
        populate: SINGLE_EMERGENCY_PAGE_POPULATE,
        filters: {
          ListingPageCardData: {
            LearnMoreButton: {
              url: {
                $contains: slug,
              },
            },
          },
        },
        locale: strapiLocale,
      },
      {
        encodeValuesOnly: true,
      }
    );

    const url = `${STRAPI_URL}/api/palestine-pages?${queryString}`;
    console.log("Fetching Single Emergency Page from:", url);

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...(API_TOKEN && { Authorization: `Bearer ${API_TOKEN}` }),
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        `Failed to fetch single emergency page data: ${response.status} ${response.statusText}`,
        errorText
      );
      return null;
    }

    const data = await response.json();

    // Transform Strapi response - get first matching result
    const page: StrapiSingleEmergencyPage | null = Array.isArray(data?.data)
      ? data.data[0]
      : data?.data;

    if (!page) return null;

    // Map raw data to frontend-friendly format
    return mapSingleEmergencyPageData(page);
  } catch (error) {
    console.error("Error fetching single emergency page data:", error);
    return null;
  }
}
