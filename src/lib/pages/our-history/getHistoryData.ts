import qs from "qs";
import { HomePageData } from "@/types/homepage.types";
import { Locale, defaultLocale, strapiLocaleMap } from "@/config/i18n.config";

const STRAPI_URL = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:1337' : process.env.NEXT_PUBLIC_STRAPI_URL;
const API_TOKEN = process.env.NODE_ENV === 'development' ? process.env.NEXT_PUBLIC_DEV_API_TOKEN : process.env.NEXT_PUBLIC_PROD_API_TOKEN;

const HISTORY_PAGE_POPULATE = {
 Sec1: {
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
 Sec2: {
  populate: {
   sectionHeading: "*",
 Cards: {
    populate: "*",
   },
  },
 },
Sec3: {
  populate: {
   sectionHeading: "*",
   image: {
    populate: "*",
   },
   lists: {
    populate: "*",
   },
 
  },
 },

 Sec4: {
  populate: {
   sectionHeading: "*",
   image: {
    populate: "*",
   },
   lists: {
    populate: "*",
   },

  },
 },
Sec5: {
  populate: {
  sectionHeading: "*",
  timelineData: {
    populate: "*",
  },
  },
 },

 Sec6: {
  populate: {
   sectionHeading: "*",
   image: {
    populate: "*",
   },
   principles: {
    populate: "*",
   },

  },
 },
Sec7: {
  populate: {
   sectionHeading: "*",
  lists: {
    populate: "*",
  },
  image: {
    populate: "*",
  },
  },
 },
 CallToAction: {
  populate: {
   sectionHeading: "*",
  },
 },
 Sec8: {
 populate: "*",

 },
 newsSection: {
  populate: {
   sectionHeading: "*",
   newsCard: {
    populate: "*",
   },
  },
 },
  socialMedia: {
  populate: {
   sectionHeading: "*",
   socialMediaCards: {
    populate: "*",
   },
  },
 },
 FAQs: {
  // populate: {
  //   sectionHeading: "*",
  //   faqs: {
  //     populate: ['General'],
  //   },
  // },
  populate: "*",
 },

};

export async function getHistoryPageData(locale: Locale = defaultLocale): Promise<HomePageData | null> {
 try {
  const strapiLocale = strapiLocaleMap[locale];

  const queryString = qs.stringify(
   {
    populate: HISTORY_PAGE_POPULATE,
    locale: strapiLocale,
   },
   {
    encodeValuesOnly: true,
   }
  );

  const response = await fetch(
   `${STRAPI_URL}/api/history-pages?${queryString}`,
   {
    headers: {
     'Content-Type': 'application/json',
     ...(API_TOKEN && { Authorization: `Bearer ${API_TOKEN}` }),
    },
    // TODO: Add proper Revalidation here
    // next: { revalidate: 600 }, // Revalidate every 10 minutes
   }
  );

  console.log(`${STRAPI_URL}/api/history-pages?${queryString}`)


  if (!response.ok) {
   console.error('Failed to fetch homepage data:', response.statusText);
   return null;
  }

  const data = await response.json();
  // console.log(data);

  // Transform Strapi response
  const homePage = Array.isArray(data?.data) ? data.data[0] : data?.data;

  return homePage || null;
 } catch (error) {
  console.error('Error fetching homepage data:', error);
  return null;
 }
}
