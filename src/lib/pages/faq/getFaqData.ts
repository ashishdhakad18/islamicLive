import qs from "qs";
import { FaqPageDataFromStrapi } from "@/types/faq.types";
import { Locale, defaultLocale, strapiLocaleMap } from "@/config/i18n.config";
import { STRAPI_URL, API_TOKEN } from "@/services";
import { mapFaqPageData, FaqMappedData } from "@/lib/mappers/faq";
import { transformStrapiResponse } from "@/utils/strapiHelpers";

const FAQ_POPULATE = {
  heroSection: {
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
 whereWeWork: {
    populate: {
      sectionHeading: "*",
      image: {
        populate: "*",
      },
    },
  },
 callToAction: {
    populate: {
      sectionHeading: "*",
      CTA: {
        populate: "*",
      },
    },
  },


impactData: {
    populate: {
      image: {
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
  socialMedia: {
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

export async function getFaqData(
  locale: Locale = defaultLocale
): Promise<FaqMappedData | null> {
  try {
    const strapiLocale = strapiLocaleMap[locale];

    const queryString = qs.stringify(
      {
        populate: FAQ_POPULATE,
        locale: strapiLocale,
      },
      {
        encodeValuesOnly: true,
      }
    );

    const fullUrl = `${STRAPI_URL}/api/faq-pages?${queryString}`;
    console.log("Fetching FAQ data from:", fullUrl);

    const response = await fetch(
      fullUrl,
      {
        headers: {
          "Content-Type": "application/json",
          ...(API_TOKEN && { Authorization: `Bearer ${API_TOKEN}` }),
        },
        next: { revalidate: 0 }
      }
    );

    if (!response.ok) {
      console.error("Failed to fetch FAQ data:", response.status, response.statusText);
      return null;
    }

    const json = await response.json();
    const data = transformStrapiResponse(json);
    const pageData = (Array.isArray(data) ? data[0] : data) as FaqPageDataFromStrapi | null;

    if (!pageData) return null;

    return mapFaqPageData(pageData);
  } catch (error) {
    console.error("Error fetching FAQ data:", error);
    return null;
  }
}
