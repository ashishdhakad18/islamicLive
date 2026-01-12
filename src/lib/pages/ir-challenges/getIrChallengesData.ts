import qs from "qs";
import { Locale, defaultLocale, strapiLocaleMap } from "@/config/i18n.config";
import { STRAPI_URL, API_TOKEN } from "@/services";
import { IrChallengesPageDataFromStrapi } from "@/types/ir-challenges.types";
import { mapIrChallengesPageData, IrChallengesMappedData } from "@/lib/mappers/ir-challenges";
import { transformStrapiResponse } from "@/utils/strapiHelpers";

const IR_CHALLENGES_POPULATE = {
  heroSection: {
    populate: {
      sectionHeading: {
        populate: "*",
      },
      image: {
        populate: "*",
      },
    },
  },
  fundDestribution: {
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
  challengesCardSection: {
    populate: {
      sectionHeading: {
        populate: "*",
      },
      cards: {
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

export async function getIrChallengesData(
  locale: Locale = defaultLocale
): Promise<IrChallengesMappedData | null> {
  try {
    const strapiLocale = strapiLocaleMap[locale];

    const queryString = qs.stringify(
      {
        populate: IR_CHALLENGES_POPULATE,
        locale: strapiLocale,
      },
      {
        encodeValuesOnly: true,
      }
    );

    const fullUrl = `${STRAPI_URL}/api/ir-challenges-pages?${queryString}`;
    console.log("Fetching ir challenges page data from:", fullUrl);

    const response = await fetch(fullUrl, {
      headers: {
        "Content-Type": "application/json",
        ...(API_TOKEN && { Authorization: `Bearer ${API_TOKEN}` }),
      },
      next: { revalidate: 0 }
    });

    if (!response.ok) {
      console.error("Failed to fetch ir challenges data:", response.status, response.statusText);
      return null;
    }

    const json = await response.json();
    const data = transformStrapiResponse<IrChallengesPageDataFromStrapi>(json);
    const pageData = Array.isArray(data) ? data[0] : data;

    if (!pageData) return null;

    return mapIrChallengesPageData(pageData);
  } catch (error) {
    console.error("Error fetching ir challenges data:", error);
    return null;
  }
}
