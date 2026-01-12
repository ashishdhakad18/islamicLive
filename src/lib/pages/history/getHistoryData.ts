import qs from "qs";
import { HistoryPageData } from "@/types/history.types";
import { Locale, defaultLocale, strapiLocaleMap } from "@/config/i18n.config";
import { STRAPI_URL, API_TOKEN } from "@/services";

const HISTORY_PAGE_POPULATE = {
  // Sec1: Hero Section
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

  // Sec2: Impact History Section
  Sec2: {
    populate: {
      sectionHeading: "*",
      Cards: {
        populate: {
          image: {
            populate: "*",
          },
        },
      },
    },
  },

  // Sec3: Situation Section
  Sec3: {
    populate: {
      sectionHeading: "*",
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

  // Sec4: Decades Section
  Sec4: {
    populate: {
      sectionHeading: "*",
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

  // Sec5: Timeline Section
  Sec5: {
    populate: {
      sectionHeading: "*",
      timelineData: {
        populate: "*",
      },
    },
  },

  // Sec6: Principles Section
  Sec6: {
    populate: {
      sectionHeading: "*",
      image: {
        populate: "*",
      },
      principles: {
        populate: "*",
      },
    },
  },

  // Common Sections
  callToAction: {
    populate: {
      sectionHeading: "*",
      CTA: "*",
    },
  },

  impactData: {
    populate: {
      icon: {
        populate: "*",
      },
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

export async function getHistoryPageData(
  locale: Locale = defaultLocale
): Promise<HistoryPageData | null> {
  try {
    const strapiLocale = strapiLocaleMap[locale];

    const queryString = qs.stringify(
      {
        populate: HISTORY_PAGE_POPULATE,
        locale: strapiLocale,
      },
      {
        encodeValuesOnly: true,
      }
    );

    const response = await fetch(
      `${STRAPI_URL}/api/history-pages?${queryString}`,
      {
        headers: {
          "Content-Type": "application/json",
          ...(API_TOKEN && { Authorization: `Bearer ${API_TOKEN}` }),
        },
      }
    );

    // console.log(
    //   "Fetching History Page from:",
    //   `${STRAPI_URL}/api/history-pages?${queryString}`
    // );

    if (!response.ok) {
      console.error("Failed to fetch history page data:", response);
      return null;
    }

    const data = await response.json();

    // Transform Strapi response
    const page = Array.isArray(data?.data) ? data.data[0] : data?.data;

    return page || null;
  } catch (error) {
    console.error("Error fetching history page data:", error);
    return null;
  }
}
