import qs from "qs";
import { Locale, defaultLocale, strapiLocaleMap } from "@/config/i18n.config";
import { STRAPI_URL, API_TOKEN } from "@/services";
import { StrapiEmergenciesListingPage } from "@/types/emergenciesListingStrapi.types";
import { mapEmergenciesPageData } from "@/lib/mappers/emergenciesListing";
import { EmergenciesMappedData } from "@/types/emergenciesListing.types";

const EMERGENCIES_LISTING_POPULATE = {
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
      selectedTemplates: {
        populate: {
          ListingPageCardData: {
            populate: {
              cardImage: {
                populate: "*",
              },
              LearnMoreButton: "*",
            },
          },
        },
      },
    },
  },

  Sec3: {
    populate: {
      sectionHeading: "*",
      howWeWorkCard: {
        populate: {
          featureItem: {
            populate: "*",
          },
        },
      },
      mainHeading: "*",
      backgroundImage: {
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
  impactData: {
    populate: {
      image: {
        populate: "*",
      },
    },
  },

  newsCard: {
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
  FAQ: {
    populate: "*",
  },
};

export async function getEmergenciesListingData(
  locale: Locale = defaultLocale
): Promise<EmergenciesMappedData | null> {
  try {
    const strapiLocale = strapiLocaleMap[locale];

    const queryString = qs.stringify(
      {
        populate: EMERGENCIES_LISTING_POPULATE,
        locale: strapiLocale,
      },
      {
        encodeValuesOnly: true,
      }
    );

    const response = await fetch(
      `${STRAPI_URL}/api/emergency-pages?${queryString}`,
      {
        headers: {
          "Content-Type": "application/json",
          ...(API_TOKEN && { Authorization: `Bearer ${API_TOKEN}` }),
        },
      }
    );

    console.log(
      "Fetching Emergencies Listing from:",
      `${STRAPI_URL}/api/emergency-pages?${queryString}`
    );

    if (!response.ok) {
      console.error("Failed to fetch emergencies listing data:", response);
      return null;
    }

    const data = await response.json();

    // Transform Strapi response
    const page: StrapiEmergenciesListingPage | null = Array.isArray(data?.data)
      ? data.data[0]
      : data?.data;

    if (!page) return null;

    // Map raw data to frontend-friendly format
    return mapEmergenciesPageData(page);
  } catch (error) {
    console.error("Error fetching emergencies listing data:", error);
    return null;
  }
}
