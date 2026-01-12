import qs from "qs";
import { Locale, defaultLocale, strapiLocaleMap } from "@/config/i18n.config";
import { STRAPI_URL, API_TOKEN } from "@/services";
import { FidyaKaffaraPageData } from "@/types/fidyaKaffara.types";

const FIDYA_KAFFARA_POPULATE = {
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
  Sec1: {
    populate: {
      sectionHeading: "*",
      fidyaKaffaracard: {
        populate: {
          points: "*",
          fidyaexample: "*",
        },
      },
    },
  },
  Sec2: {
    populate: {
      sectionHeading: "*",
      card: {
        populate: {
          iconImage: {
            populate: "*",
          },
        },
      },
      form: "*",
    },
  },
  Sec3: {
    populate: {
      sectionHeading: "*",
      listData: {
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
  Sec4: {
    populate: {
      sectionHeading: "*",
      CardSection: {
        populate: {
          iconImage: {
            populate: "*",
          },
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
  faqSection: {
    populate: {
      sectionHeading: "*",
      faqs: {
        populate: "*",
      },
    },
  },
};

export async function getFidyaKaffaraData(
  locale: Locale = defaultLocale
): Promise<FidyaKaffaraPageData | null> {
  try {
    const strapiLocale = strapiLocaleMap[locale];

    const queryString = qs.stringify(
      {
        populate: FIDYA_KAFFARA_POPULATE,
        locale: strapiLocale,
      },
      {
        encodeValuesOnly: true,
      }
    );

    const response = await fetch(
      `${STRAPI_URL}/api/fidya-and-kaffaras?${queryString}`,
      {
        headers: {
          "Content-Type": "application/json",
          ...(API_TOKEN && { Authorization: `Bearer ${API_TOKEN}` }),
        },
      }
    );

    // console.log(
    //   "Fetching Fidya Kaffara from:",
    //   `${STRAPI_URL}/api/fidya-and-kaffaras?${queryString}`
    // );

    if (!response.ok) {
      console.error("Failed to fetch fidya kaffara data:", response);
      return null;
    }

    const data = await response.json();

    // Transform Strapi response
    const page = Array.isArray(data?.data) ? data.data[0] : data?.data;

    return page || null;
  } catch (error) {
    console.error("Error fetching fidya kaffara data:", error);
    return null;
  }
}
