import qs from "qs";
import { Locale, defaultLocale, strapiLocaleMap } from "@/config/i18n.config";
import { STRAPI_URL, API_TOKEN } from "@/services";
import { BankInterestPageData } from "@/types/bankInterest.types";
import {
  mapBankInterestPageData,
  BankInterestMappedData,
} from "@/lib/mappers/bankInterest";

const BANK_INTEREST_POPULATE = {
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

  bankIntrestBasicSection: {
    populate: {
      sectionHeading: {
        populate: "*",
      },
      cards: {
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

  impactCardSection: {
    populate: {
      sectionHeading: {
        populate: "*",
      },
      initiativesCard: {
        populate: {
          image: {
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

export async function getBankInterestData(
  locale: Locale = defaultLocale
): Promise<BankInterestMappedData | null> {
  try {
    const strapiLocale = strapiLocaleMap[locale];

    const queryString = qs.stringify(
      {
        populate: BANK_INTEREST_POPULATE,
        locale: strapiLocale,
      },
      {
        encodeValuesOnly: true,
      }
    );

    const response = await fetch(
      `${STRAPI_URL}/api/bank-interests?${queryString}`,
      {
        headers: {
          "Content-Type": "application/json",
          ...(API_TOKEN && { Authorization: `Bearer ${API_TOKEN}` }),
        },
        next: { revalidate: 0 },
      }
    );

    // console.log(`${STRAPI_URL}/api/bank-interests?${queryString}`);

    if (!response.ok) {
      console.error(
        `Failed to fetch bank interest data: ${response.status} ${response.statusText}`,
        response.url
      );
      return null;
    }

    const data = await response.json();

    // Transform Strapi response
    const pageData: BankInterestPageData | null = Array.isArray(data?.data)
      ? data.data[0]
      : data?.data;

    if (!pageData) return null;

    return mapBankInterestPageData(pageData);
  } catch (error) {
    console.error("Error fetching bank interest data:", error);
    return null;
  }
}
