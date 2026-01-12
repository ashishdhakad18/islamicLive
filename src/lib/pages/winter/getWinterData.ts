import qs from "qs";
import { Locale, defaultLocale, strapiLocaleMap } from "@/config/i18n.config";
import { STRAPI_URL, API_TOKEN } from "@/services";
import { WinterPageDataFromStrapi } from "@/types/winter.types";
import { mapWinterPageData, WinterMappedData } from "@/lib/mappers/winter";
import { transformStrapiResponse } from "@/utils/strapiHelpers";

const WINTER_POPULATE = {
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
  approchSection: {
    populate: {
      sectionHeading: {
        populate: "*",
      },
      image: {
        populate: "*",
      },
      lists: {
        populate: {
          icon: {
            populate: "*",
          },
        },
      },
    },
  },
  transmetSection: {
    populate: "*",
  },
  ourGlobalReach: {
    populate: {
      sectionHeading: {
        populate: "*",
      },
      whereWeOperate: {
        populate: {
          decription: {
            populate: "*",
          },
        },
      },
    },
  },
  testimonialSection: {
    populate: {
      sectionHeading: {
        populate: "*",
      },
      videos: {
        populate: {
          featuredVideo: {
            populate: "*",
          },
          gallery: {
            populate: "*",
          },
        },
      },
    },
  },
  impactData: {
    populate: {
      sectionHeading: {
        populate: "*",
      },
      impactData: {
        populate: {
          icon: {
            populate: "*",
          },
        },
      },
    },
  },
  newSection: {
    populate: {
      sectionHeading: {
        populate: "*",
      },
      newsCard: {
        populate: {
          image: {
            populate: "*",
          },
        },
      },
    },
  },
  socialMeadiaSction: {
    populate: {
      sectionHeading: {
        populate: "*",
      },
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
      sectionHeading: {
        populate: "*",
      },
      faqs: {
        populate: "*",
      },
    },
  },
};

export async function getWinterData(
  locale: Locale = defaultLocale
): Promise<WinterMappedData | null> {
  try {
    const strapiLocale = strapiLocaleMap[locale];

    const queryString = qs.stringify(
      {
        populate: WINTER_POPULATE,
        locale: strapiLocale,
      },
      {
        encodeValuesOnly: true,
      }
    );

    const fullUrl = `${STRAPI_URL}/api/winter-pages?${queryString}`;
    // console.log("Fetching winter data from:", fullUrl);

    const response = await fetch(fullUrl, {
      headers: {
        "Content-Type": "application/json",
        ...(API_TOKEN && { Authorization: `Bearer ${API_TOKEN}` }),
      },
      next: { revalidate: 0 }
    });

    if (!response.ok) {
      console.error("Failed to fetch winter data:", response.status, response.statusText);
      console.error("URL:", fullUrl);
      return null;
    }

    const json = await response.json();
    const data = transformStrapiResponse<WinterPageDataFromStrapi>(json);
    
    // Because it's a collection, transformStrapiResponse might return an array
    const pageData = Array.isArray(data) ? data[0] : data;

    if (!pageData) return null;

    return mapWinterPageData(pageData);
  } catch (error) {
    console.error("Error fetching winter data:", error);
    return null;
  }
}
