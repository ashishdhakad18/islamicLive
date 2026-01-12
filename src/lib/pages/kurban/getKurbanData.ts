import qs from "qs";
import { Locale, defaultLocale, strapiLocaleMap } from "@/config/i18n.config";
import { STRAPI_URL, API_TOKEN } from "@/services";
import { KurbanPageDataFromStrapi } from "@/types/kurban.types";
import { mapKurbanPageData, KurbanMappedData } from "@/lib/mappers/kurban";

const KURBAN_POPULATE = {
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

  formBGImage: {
    populate: "*",
  },
  campaignSection: {
    populate: {
      icon: {
        populate: "*",
      },
    },
  },
  kurbanDestination: {
    populate: {
      addressCard: {
        populate: "*",
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
  transmetSection: {
    populate: {
      videoUrl: {
        populate: "*",
      },
      posterImage: {
        populate: "*",
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
  newsSection: {
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
  socialMediaSection: {
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

export async function getKurbanData(
  locale: Locale = defaultLocale
): Promise<KurbanMappedData | null> {
  try {
    const strapiLocale = strapiLocaleMap[locale];

    const queryString = qs.stringify(
      {
        populate: KURBAN_POPULATE,
        locale: strapiLocale,
      },
      {
        encodeValuesOnly: true,
      }
    );

    const fullUrl = `${STRAPI_URL}/api/kurban-sections?${queryString}`;

    const response = await fetch(fullUrl, {
      headers: {
        "Content-Type": "application/json",
        ...(API_TOKEN && { Authorization: `Bearer ${API_TOKEN}` }),
      },
      next: { revalidate: 0 }
    });

    if (!response.ok) {
      console.error("Failed to fetch kurban data:", response.status, response.statusText);
      return null;
    }

    const data = await response.json();
    const pageData: KurbanPageDataFromStrapi = Array.isArray(data?.data) ? data.data[0] : data?.data;

    if (!pageData) return null;

    return mapKurbanPageData(pageData);
  } catch (error) {
    console.error("Error fetching kurban data:", error);
    return null;
  }
}
