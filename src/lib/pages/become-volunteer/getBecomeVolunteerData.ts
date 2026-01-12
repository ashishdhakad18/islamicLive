
import qs from "qs";
import { Locale, defaultLocale, strapiLocaleMap } from "@/config/i18n.config";
import { STRAPI_URL, API_TOKEN } from "@/services";
import { BecomeVolunteerPageDataFromStrapi } from "@/types/become-volunteer.types";
import { mapBecomeVolunteerPageData, BecomeVolunteerMappedData } from "@/lib/mappers/become-volunteer";
import { transformStrapiResponse } from "@/utils/strapiHelpers";

const BECOME_VOLUNTEER_POPULATE = {
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
  whyTrustUsSection: {
    populate: {
      sectionHeading: { populate: "*" },
      cards: {
        populate: {
          iconImage: { populate: "*" },
        },
      },
    },
  },
  impactStats: {
    populate: "*",
  },
  testimonialSection: {
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
  faqSection: {
    populate: {
      sectionHeading: { populate: "*" },
      faqs: { populate: "*" },
    },
  },
};

export async function getBecomeVolunteerData(
  locale: Locale = defaultLocale
): Promise<BecomeVolunteerMappedData | null> {
  try {
    const strapiLocale = strapiLocaleMap[locale];

    const queryString = qs.stringify(
      {
        populate: BECOME_VOLUNTEER_POPULATE,
        locale: strapiLocale,
      },
      {
        encodeValuesOnly: true,
      }
    );

    const fullUrl = `${STRAPI_URL}/api/become-volunteers?${queryString}`;
    // console.log("Fetching become volunteer page data from:", fullUrl);

    const response = await fetch(fullUrl, {
      headers: {
        "Content-Type": "application/json",
        ...(API_TOKEN && { Authorization: `Bearer ${API_TOKEN}` }),
      },
      next: { revalidate: 0 }
    });

    if (!response.ok) {
      console.error("Failed to fetch become volunteer data:", response.status, response.statusText);
      return null;
    }

    const json = await response.json();
    const data = transformStrapiResponse(json);
    const pageData = (Array.isArray(data) ? data[0] : data) as BecomeVolunteerPageDataFromStrapi | null;

    if (!pageData) return null;

    return mapBecomeVolunteerPageData(pageData);
  } catch (error) {
    console.error("Error fetching become volunteer data:", error);
    return null;
  }
}
