import qs from "qs";
import { Locale, defaultLocale, strapiLocaleMap } from "@/config/i18n.config";
import { STRAPI_URL, API_TOKEN } from "@/services";
import { DonationPageData } from "@/types/donate.types";
import { mapDonationFlowData } from "@/lib/mappers/donate";

const DONATE_POPULATE = {
 
fundAmountSection: {
  populate: {
    sectionHeading: {
      populate: "*",
    },
    donateFor: {
      populate: "*",
    },
    chooseAmountHeading: {
      populate: "*",
    },
    allActionPopUp: {
      populate: "*",
    },
  },
},

};

export async function getDonateData(
  locale: Locale = defaultLocale
): Promise<DonationPageData | null> {
  try {
    const strapiLocale = strapiLocaleMap[locale];

    const queryString = qs.stringify(
      {
        populate: DONATE_POPULATE,
        locale: strapiLocale,
      },
      {
        encodeValuesOnly: true,
      }
    );

    const response = await fetch(
      `${STRAPI_URL}/api/donation-flows?${queryString}`,
      {
        headers: {
          "Content-Type": "application/json",
          ...(API_TOKEN && { Authorization: `Bearer ${API_TOKEN}` }),
        },
      }
    );

    if (!response.ok) {
      console.error("Failed to fetch donation flow data:", response.status);
      return null;
    }

    const data = await response.json();

    // Transform Strapi response
    const page = Array.isArray(data?.data) ? data.data[0] : data?.data;

    return mapDonationFlowData(page);
  } catch (error) {
    console.error("Error fetching donation flow data:", error);
    return null;
  }
}
