import qs from "qs";
import { HomePageData } from "@/types/homepage.types";
import { Locale, defaultLocale, strapiLocaleMap } from "@/config/i18n.config";
import { STRAPI_URL, API_TOKEN } from "@/services";
const HOME_PAGE_POPULATE = {
  heroSection: {
    populate: {
      secHeading: "*",
      Carousel: {
        populate: "*",
      },
    },
  },
  campaignSection: {
    populate: {
      sectionHeading: "*",
      campaignCards: {
        populate: "*",
      },
    },
  },
  impactCards: {
    populate: "*",
  },
  impactSection: {
    populate: {
      sectionHeading: "*",
      image: {
        fields: ["url", "alternativeText", "width", "height", "name"],
      },
      impactData: {
        populate: "*",
      },
    },
  },
  impactStatsSection: {
    populate: {
      stats: "*",
    },
  },
    formBGImage: {
    populate: "*",
  },
  newsSection: {
    populate: {
      sectionHeading: "*",
      newsCard: {
        populate: "*",
      },
    },
  },
  eventCardsSection: {
    populate: {
      sectionHeading: "*",
      eventCardsWrapper: {
        populate: "*",
      },
    },
  },
  testimonials: {
    populate: {
      sectionHeading: { populate: "*" },
      videos: {
        populate: {
          featuredVideo: { populate: "*" },
          gallery: { populate: "*" },
        },
      },
    },
  },
  FAQSection: {
    // populate: {
    //   sectionHeading: "*",
    //   faqs: {
    //     populate: ['General'],
    //   },
    // },
    populate: "*",
  },
  socialMediaSection: {
    populate: {
      sectionHeading: "*",
      socialMediaCards: {
        populate: "*",
      },
    },
  },
};
export async function getHomePageData(
  locale: Locale = defaultLocale
): Promise<HomePageData | null> {
  try {
    const strapiLocale = strapiLocaleMap[locale];
    const queryString = qs.stringify(
      {
        populate: HOME_PAGE_POPULATE,
        locale: strapiLocale,
      },
      {
        encodeValuesOnly: true,
      }
    );
    const response = await fetch(
      `${STRAPI_URL}/api/home-pages?${queryString}`,
      {
        headers: {
          "Content-Type": "application/json",
          ...(API_TOKEN && { Authorization: `Bearer ${API_TOKEN}` }),
        },
        // TODO: Add proper Revalidation here
        // next: { revalidate: 600 }, // Revalidate every 10 minutes
      }
    );
    // console.log(`${STRAPI_URL}/api/home-pages?${queryString}`);
    if (!response.ok) {
      console.error("Failed to fetch homepage data:", response);
      return null;
    }
    const data = await response.json();
    // console.log(data);
    // Transform Strapi response
    const homePage = Array.isArray(data?.data) ? data.data[0] : data?.data;
    return homePage || null;
  } catch (error) {
    console.error("Error fetching homepage data:", error);
    return null;
  }
}
