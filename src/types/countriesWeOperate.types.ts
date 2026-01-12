// Countries We Operate page Strapi types
// Uses common patterns from other page types

// Section heading (reused pattern across pages)
interface StrapiSectionHeading {
  heading?: string;
  subHeading?: string;
  description?: string;
}

// Image type (reused pattern)
interface StrapiImage {
  id?: number;
  url?: string;
  alternativeText?: string;
}

// Impact stat (reused pattern)
interface StrapiImpactStat {
  id?: number;
  value?: string;
  caption?: string;
}

// News card (reused pattern across pages)
interface StrapiNewsCard {
  id: number;
  readTime?: string | number;
  publishedDate?: string;
  heading?: string;
  tag1?: string;
  tag2?: string;
  image?: StrapiImage;
}

// FAQ item (reused pattern)
interface StrapiFaqItem {
  id: number;
  question?: string;
  answer?: string;
  category?: string;
}

// Social media card (reused pattern)
interface StrapiSocialMediaCard {
  id: number;
  socialMedia?: string;
  description?: string;
  likes?: number;
  replies?: number;
  image?: StrapiImage;
}

// Countries accordion item for Sec3 (MapSection)
interface CountriesAccordItem {
  id: number;
  name?: string;
  countries?: string;
}

export interface CountriesWeOperatePageData {
  id: number;

  // Hero Section (Sec1)
  Sec1?: {
    sectionHeading?: StrapiSectionHeading;
    images?: StrapiImage[];
    stats?: StrapiImpactStat[];
  };

  // Where We Work Section (Sec2 - WhereWeWork component)
  Sec2?: {
    sectionHeading?: StrapiSectionHeading;
    heading?: string;
    description?: string;
    image?: StrapiImage;
  };

  // Map Section (Sec3 - MapSection component)
  Sec3?: {
    title?: string;
    mapImg?: StrapiImage;
    countryCount?: number;
    regionCount?: number;
    contAccord?: CountriesAccordItem[];
  };

  // Call to Action Section (reused pattern)
  callToAction?: {
    sectionHeading?: StrapiSectionHeading;
    CTA?: Array<{
      id?: number;
      label?: string;
      url?: string;
    }>;
  };

  // News Section (reused pattern)
  newsSection?: {
    sectionHeading?: StrapiSectionHeading;
    newsCard?: StrapiNewsCard[];
  };

  // Social Media Section (reused pattern)
  socialMediaSection?: {
    sectionHeading?: StrapiSectionHeading;
    socialMediaCards?: StrapiSocialMediaCard[];
  };

  // FAQ Section (reused pattern)
  faqSection?: {
    sectionHeading?: StrapiSectionHeading;
    faqs?: StrapiFaqItem[];
  };
}
