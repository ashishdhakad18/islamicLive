// src/services/queries/useHomePage.ts
"use client";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import qs from "qs";
import { apiClient } from "../api/client";
import { ENDPOINTS } from "../api/endpoints";
import { queryKeys } from "../../config/reactQuery";
import { transformStrapiResponse } from "../../utils/strapiHelpers";

/**
 * Homepage populate configuration
 * All sections are nested within the single Homepage content type
 * Deep population is needed for nested media relations
 */
const HOME_PAGE_POPULATE = {
  heroSection: {
  populate: {
    sectionHeading: "*",
    Carousel: {
      populate: "*"
      // populate: {
      //   CTA: "*",
      // }
    }
  }
}
,

  campaignSection: {
    populate: {
      sectionHeading: "*",
      campaignCards: {
        populate: {
          // image: "*",
          CTA: "*",
        },
      },
    },
  },

  impactCards: {
    populate: "*"
  },

  impactSection: {
    populate: {
      sectionHeading: "*",
      // image: "*",
      // impactData: "*",
    },
  },

  impactStatsSection: {
    populate: {
      stats: "*",
    },
  },

  newsSection: {
    populate: {
      sectionHeading: "*",
      newsCard: {
        // populate: {
        //   image: "*",
        // },
      },
    },
  },

  testimonials: {
    populate: {
      sectionHeading: "*",
    },
  },

  FAQSection: {
    populate: {
      sectionHeading: "*",
      // faqs: "*",
    },
  },

  socialMediaSection: {
    populate: {
      sectionHeading: "*",
      socialMediaCards: {
        // populate: {
        //   image: "*",
        // },
      },
    },
  },
};

/**
 * Fetches homepage data from Strapi
 * Returns all homepage sections in a single API call
 */
const fetchHomePage = async () => {
  const queryString = qs.stringify(
    {
      populate: HOME_PAGE_POPULATE,
    },
    {
      encodeValuesOnly: true, // ✅ required by Strapi
    }
  );

  const response = await apiClient.get(
    `${ENDPOINTS.HOME_PAGE}?${queryString}`
  );

  return transformStrapiResponse(response);
};

/**
 * React Query hook for Homepage data
 */
export const useHomePage = <TData = unknown>(
  options?: Omit<
    UseQueryOptions<unknown, Error, TData>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery({
    queryKey: queryKeys.homePage.all,
    queryFn: fetchHomePage,
    staleTime: 10 * 60 * 1000, // 10 minutes
    ...options,
  });
};
