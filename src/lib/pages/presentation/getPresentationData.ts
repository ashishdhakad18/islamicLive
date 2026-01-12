import qs from "qs";
import { PresentationPageData } from "@/types/presentation.types";
import { Locale, defaultLocale, strapiLocaleMap } from "@/config/i18n.config";
import { STRAPI_URL, API_TOKEN } from "@/services";

const PRESENTATION_PAGE_POPULATE = {
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
  presentationCardSection: {
    populate: {
      sectionHeading: {
        populate: "*",
      },
      presentationCard: {
        populate: {
          image: {
            populate: "*",
          },
        },
      },
    },
  },
  impactDataSection: {
  populate: "*",
  },


  callToActionSection: {
    populate: {
      sectionHeading: "*",
      CTA: "*",
    },
  },
  newsCardSection: {
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
  faqSection: {
    populate: "*",
  },
};

import { transformStrapiResponse } from "@/utils/strapiHelpers";

// ... existing imports

export async function getPresentationData(
  locale: Locale = defaultLocale
): Promise<PresentationPageData | null> {
  try {
    const strapiLocale = strapiLocaleMap[locale];

    const queryString = qs.stringify(
      {
        populate: PRESENTATION_PAGE_POPULATE,
        locale: strapiLocale,
      },
      {
        encodeValuesOnly: true,
      }
    );

    const response = await fetch(
      `${STRAPI_URL}/api/presentaion-pages?${queryString}`,
      {
        headers: {
          "Content-Type": "application/json",
          ...(API_TOKEN && { Authorization: `Bearer ${API_TOKEN}` }),
        },
        next: { revalidate: 600 },
      }
    );

    if (!response.ok) {
      console.error("Failed to fetch presentation data:", response.status, response.statusText);
      return null;
    }

    const data = await response.json();
    const transformedData = transformStrapiResponse(data);
    
    // Handle array response (collection type)
    const presentationPage = Array.isArray(transformedData) 
      ? transformedData[0] 
      : transformedData;

    // Debug logging to check stats data
    console.log('🔍 Presentation Page Data:', JSON.stringify(presentationPage, null, 2));

    return (presentationPage as unknown as PresentationPageData) || null;
  } catch (error) {
    console.error("Error fetching presentation data:", error);
    return null;
  }
}
