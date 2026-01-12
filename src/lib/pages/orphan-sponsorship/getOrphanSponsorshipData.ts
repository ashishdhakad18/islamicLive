import qs from "qs";
import { Locale, defaultLocale, strapiLocaleMap } from "@/config/i18n.config";
import { STRAPI_URL, API_TOKEN } from "@/services";
import { OrphanSponsorshipPageData } from "@/types/orphanSponsorship.types";
import { mapOrphanSponsorshipPageData } from "@/lib/mappers/orphanSponsorship";

const ORPHAN_SPONSORSHIP_POPULATE = {
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
  impactStats: {
    populate: "*",
  },
  Sec3: {
    populate: "*",
  },
  Sec4: {
    populate: "*",
  },
  Sec5: {
    populate: "*",
  },
  Sec6: {
    populate: "*",
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
  impactData: {
    populate: {
      icon: {
        populate: "*",
      },
    },
  },
  newSection: {
    populate: {
      sectionHeading: {
        populate: "*",
      },
      newsCard: {
        populate: {
          image: {
            populate: "*",
          },
        },
      },
    },
  },
  socialMediaSection: {
    populate: {
      sectionHeading: {
        populate: "*",
      },
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
      sectionHeading: {
        populate: "*",
      },
      faqs: {
        populate: "*",
      },
    },
  },
};

export async function getOrphanSponsorshipData(
  locale: Locale = defaultLocale
): Promise<OrphanSponsorshipPageData | null> {
  try {
    const strapiLocale = strapiLocaleMap[locale];

    const queryString = qs.stringify(
      {
        populate: ORPHAN_SPONSORSHIP_POPULATE,
        locale: strapiLocale,
      },
      {
        encodeValuesOnly: true,
      }
    );
 //console.log(`${STRAPI_URL}/api/orphan-sponsorships?${queryString}`);

    const response = await fetch(
      `${STRAPI_URL}/api/orphan-sponsorships?${queryString}`,
      {
        headers: {
          "Content-Type": "application/json",
          ...(API_TOKEN && { Authorization: `Bearer ${API_TOKEN}` }),
        },
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      console.error("Failed to fetch orphan sponsorship data:", response.status, response.statusText);
      return null;
    }

    const data = await response.json();
    const page = Array.isArray(data?.data) ? data.data[0] : data?.data;

    if (!page) return null;

    const mappedData = mapOrphanSponsorshipPageData(page);
    // console.log("Mapped Orphan Sponsorship Data:", JSON.stringify(mappedData, null, 2));
    return mappedData;
  } catch (error) {
    console.error("Error fetching orphan sponsorship data:", error);
    return null;
  }
}
