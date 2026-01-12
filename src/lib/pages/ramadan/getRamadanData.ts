import qs from "qs";
import { Locale, defaultLocale, strapiLocaleMap } from "@/config/i18n.config";
import { STRAPI_URL, API_TOKEN } from "@/services";
import { RamadanPageData } from "@/types/ramadan.types";
import { mapRamadanPageData, RamadanMappedData } from "@/lib/mappers/ramadan";

/**
 * Ramadan Page API Population Query
 *
 * Sections based on Strapi schema:
 * - heroSection: sectionHeading, image, ctaText, ctaLink, heroMSG (message, author)
 * - transmetSection: description, ctaText, ctaLink, videoUrl, posterImage
 * - esembleCardSection: sectionHeading, description, selectedTemplates (relation)
 * - testimonialSection: sectionHeading, videos[] (featuredVideo, gallery)
 * - card: sectionHeading, projectCard[] (Image, badge, heading, description, ctaText, ctaLink)
 * - impactDataSection: sectionHeading, impactData[] (icon, heading, subHeading, description)
 * - newsSection, socialMediaSection, faqSection: reusing common patterns
 */
const RAMADAN_POPULATE = {
  // Hero Section with heroMSG (quote + author)
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

  // Transmet/Generosity Section with video
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

  // Esembe Card Section (Where We're Responding - with templates relation)
  esembleCardSection: {
    populate: {
      sectionHeading: {
        populate: "*",
      },
      //   selectedTemplates: {
      //     populate: {
      //       image: {
      //         populate: "*",
      //       },
      //     },
      //   },
    },
  },

  // Testimonial Section with videos
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

  // Card Section (Project Cards)
  card: {
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

  // Impact Data Section
  impactDataSection: {
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

  // News Section (reusable pattern)
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

  // Social Media Section (reusable pattern)
  socialMedia: {
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

  // FAQ Section (reusable pattern)
  faqs: {
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

export async function getRamadanData(
  locale: Locale = defaultLocale
): Promise<RamadanMappedData | null> {
  try {
    const strapiLocale = strapiLocaleMap[locale];

    const queryString = qs.stringify(
      {
        populate: RAMADAN_POPULATE,
        locale: strapiLocale,
      },
      {
        encodeValuesOnly: true,
      }
    );

    const fullUrl = `${STRAPI_URL}/api/ramadans?${queryString}`;
    // console.log("Fetching Ramadan page data from:", fullUrl);

    const response = await fetch(fullUrl, {
      headers: {
        "Content-Type": "application/json",
        ...(API_TOKEN && { Authorization: `Bearer ${API_TOKEN}` }),
      },
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      console.error(
        "Failed to fetch Ramadan data:",
        response.status,
        response.statusText
      );
      return null;
    }

    const data = await response.json();
    const page: RamadanPageData | null = Array.isArray(data?.data)
      ? data.data[0]
      : data?.data;

    if (!page) return null;

    // Map raw data to frontend-friendly format
    return mapRamadanPageData(page);
  } catch (error) {
    console.error("Error fetching Ramadan data:", error);
    return null;
  }
}
