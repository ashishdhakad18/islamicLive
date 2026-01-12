
import qs from "qs";
import { Locale, defaultLocale, strapiLocaleMap } from "@/config/i18n.config";
import { STRAPI_URL, API_TOKEN } from "@/services";
import { BecomePartnerPageDataFromStrapi } from "@/types/become-partner.types";
import { mapBecomePartnerPageData, BecomePartnerMappedData } from "@/lib/mappers/become-partner";

const BECOME_PARTNER_POPULATE = {
  heroSection: {
    populate: {
      sectionHeading: { populate: "*" },
      image: { populate: "*" },
      heroMSG: { populate: "*" },
    },
  },
  fundDestribution: {
    populate: {
      sectionHeading: { populate: "*" },
      destributionlist: {
        populate: {
          icon: { populate: "*" },
        },
      },
      images: { populate: "*" },
    },
  },
  whyTrustUs: {
    populate: {
      cards: {
        populate: {
          iconImage: { populate: "*" },
        },
      },
    },
  },
  faqSection: {
    populate: {
      sectionHeading: { populate: "*" },
      faqs: { populate: "*" },
    },
  },
};

export async function getBecomePartnerData(
  locale: Locale = defaultLocale
): Promise<BecomePartnerMappedData | null> {
  try {
    const strapiLocale = strapiLocaleMap[locale];

    const queryString = qs.stringify(
      {
        populate: BECOME_PARTNER_POPULATE,
        locale: strapiLocale,
      },
      {
        encodeValuesOnly: true,
      }
    );

    const fullUrl = `${STRAPI_URL}/api/become-partners?${queryString}`;
    // console.log("Fetching become partner page data from:", fullUrl);

    const response = await fetch(fullUrl, {
      headers: {
        "Content-Type": "application/json",
        ...(API_TOKEN && { Authorization: `Bearer ${API_TOKEN}` }),
      },
      next: { revalidate: 0 }
    });

    if (!response.ok) {
      console.error("Failed to fetch become partner data:", response.status, response.statusText);
      return null;
    }

    const data = await response.json();
    const pageData: BecomePartnerPageDataFromStrapi = Array.isArray(data?.data) ? data.data[0] : data?.data;

    if (!pageData) return null;

    return mapBecomePartnerPageData(pageData);
  } catch (error) {
    console.error("Error fetching become partner data:", error);
    return null;
  }
}
