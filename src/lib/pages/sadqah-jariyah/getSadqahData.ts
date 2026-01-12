import qs from "qs";
import { Locale, defaultLocale, strapiLocaleMap } from "@/config/i18n.config";
import { STRAPI_URL, API_TOKEN } from "@/services";
import { mapSadqahPageData, SadqahMappedData } from "@/lib/mappers/sadqah";
import { SadqahPageData } from "@/types/sadqah.types";

const SADQAH_JARIYAH_POPULATE = {
  Sec1: {
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

  sadaqahImpactSection: {
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

  projectCardSection: {
    populate: {
      sectionHeading: {
        populate: "*",
      },
      projectCard: {
        populate: {
          Image: {
            populate: "*",
          },
        },
      },
    },
  },

  premierSadaqahSection: {
    populate: {
      sectionHeading: {
        populate: "*",
      },
      list: {
        populate: "*",
      },
      image: {
        populate: "*",
      },
    },
  },
whyDonate: {
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
  callToAction: {
    populate: {
       sectionHeading: {
        populate: "*",
      },
      CTA: {
        populate: "*",
      },
    }
  },


  faqs: {
    populate: {
       sectionHeading: {
        populate: "*",
      },
      faqs: {
        populate: "*",
      },
    }
  },
};

export async function getSadqahData(
  locale: Locale = defaultLocale
): Promise<SadqahMappedData | null> {
  try {
    const strapiLocale = strapiLocaleMap[locale];

    const queryString = qs.stringify(
      {
        populate: SADQAH_JARIYAH_POPULATE,
        locale: strapiLocale,
      },
      {
        encodeValuesOnly: true,
      }
    );

    const response = await fetch(
      `${STRAPI_URL}/api/sadaqah-jariyahs?${queryString}`,
      {
        headers: {
          "Content-Type": "application/json",
          ...(API_TOKEN && { Authorization: `Bearer ${API_TOKEN}` }),
        },
        next: { revalidate: 0 } 
      }
    );

    console.log(`${STRAPI_URL}/api/sadaqah-jariyahs?${queryString}`);

    if (!response.ok) {
      console.error(
        `Failed to fetch sadqah-jariyah data: ${response.status} ${response.statusText}`,
        response.url
      );
      return null;
    }

    const data = await response.json();

    // Transform Strapi response
    const page = Array.isArray(data?.data) ? data.data[0] : data?.data;

    if (!page) return null;

    return mapSadqahPageData(page as SadqahPageData);
  } catch (error) {
    console.error("Error fetching sadqah-jariyah data:", error);
    return null;
  }
}
