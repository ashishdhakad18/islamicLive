import qs from "qs";
import { Locale, defaultLocale, strapiLocaleMap } from "@/config/i18n.config";
import { StrapiSustainableProject } from "@/types/sustainableProjectsStrapi";

import { STRAPI_URL, API_TOKEN } from "@/services";

const SUSTAINABLE_PROJECT_POPULATE = {
  heroSection: {
    populate: {
      sectionHeading: "*",
      images: { populate: "*" },
      stats: "*",
    },
  },
  HeroCTA: "*",
  missionSection: {
    populate: {
      sectionHeading: "*",
      cards: {
        populate: {
          iconImage: { populate: "*" },
        },
      },
    },
  },
  educationessentialSection: {
    populate: {
      educationEssential: {
        populate: {
          sectionHeading: "*",
          listData: {
            populate: {
              icon: { populate: "*" },
            },
          },
          images: {
            populate: "*",
          },
        },
      },
    },
  },
  recentProjectSection: {
    populate: {
      sectionHeading: "*",
      cards: {
        populate: {
          image: { populate: "*" },
          CTA: "*",
        },
      },
    },
  },
  accountabilitySection: {
    populate: {
      sectionHeading: "*",
      cards: {
        populate: {
          iconImage: { populate: "*" },
        },
      },
    },
  },
  callToAction: {
    populate: {
      sectionHeading: "*",
      CTA: "*",
    },
  },
  impactStats: "*",
  faqs: {
    populate: {
      sectionHeading: "*",
      faqs: {
        fields: ["question", "answer"],
      },
    },
  },
  Config: "*",
};

export async function getSustainableProjectData(
  slug: string,
  locale: Locale = defaultLocale
): Promise<StrapiSustainableProject | null> {
  try {
    const strapiLocale = strapiLocaleMap[locale];

    const queryString = qs.stringify(
      {
        filters: {
          $or: [
            { Config: { slug: { $eq: slug } } },
            { Config: { slug: { $eq: `/${slug}` } } },
          ],
        },
        populate: SUSTAINABLE_PROJECT_POPULATE,
        locale: strapiLocale,
      },
      {
        encodeValuesOnly: true,
      }
    );

    const url = `${STRAPI_URL}/api/educations?${queryString}`;
    console.log("Fetching Sustainable Project from:", url);

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...(API_TOKEN && { Authorization: `Bearer ${API_TOKEN}` }),
      },
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      console.error(
        `Failed to fetch project data for slug: ${slug}`,
        JSON.stringify(errorBody, null, 2)
      );
      return null;
    }

    const data = await response.json();
    const project = Array.isArray(data?.data) ? data.data[0] : data?.data;

    return project || null;
  } catch (error) {
    console.error(`Error fetching project data for slug: ${slug}`, error);
    return null;
  }
}
