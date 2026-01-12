import { StrapiMedia } from "./strapi";

// Reuse StrapiMedia for image fields, map to simpler format in mappers
// Using inline types for Strapi response structure to match actual API response

// Impact stat item for hero section (Strapi raw format)
interface StrapiImpactStat {
  id?: number;
  value?: string;
  caption?: string;
}

// Presentation card item for ensemble section (Strapi raw format)
interface StrapiPresentationCard {
  id: number;
  heading?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  image?: {
    id?: number;
    url?: string;
    alternativeText?: string;
  };
}

// News card item (Strapi raw format - same structure used across pages)
interface StrapiNewsCard {
  id: number;
  readTime?: string | number;
  publishedDate?: string;
  heading?: string;
  tag1?: string;
  tag2?: string;
  image?: {
    id?: number;
    url?: string;
    alternativeText?: string;
  };
}

// Section heading component type (Strapi raw format)
interface StrapiSectionHeading {
  heading?: string;
  subHeading?: string;
  description?: string;
}

// Impact data section (Strapi raw format)
interface StrapiImpactData {
  id: number;
  heading?: string;
  subHeading?: string;
  description?: string;
  icon?: {
    url?: string;
    alternativeText?: string;
  };
}

interface StrapiImpactDataSection {
  id: number;
  sectionHeading?: StrapiSectionHeading;
  impactData?: StrapiImpactData;
  lineColor?: string;
  iconBoxBorderColor?: string;
  iconBoxBackgroundColor?: string;
  iconColor?: string;
}

export interface PresentationPageData {
  id: number;
  heroSection?: {
    sectionHeading?: StrapiSectionHeading;
    images?: Array<{
      id?: number;
      url?: string;
      alternativeText?: string;
    }>;
    stats?: StrapiImpactStat[];
  };
  presentationCardSection?: {
    sectionHeading?: StrapiSectionHeading;
    presentationCard?: StrapiPresentationCard[];
  } | Array<{
    sectionHeading?: StrapiSectionHeading;
    presentationCard?: StrapiPresentationCard[];
  }>;
  callToActionSection?: {
    sectionHeading?: StrapiSectionHeading;
    CTA?: Array<{
      id?: number;
      label?: string;
      url?: string;
    }>;
  };
  impactDataSection?: StrapiImpactDataSection[];
  newsCardSection?: {
    sectionHeading?: StrapiSectionHeading;
    newsCard?: StrapiNewsCard[];
  };
  faqSection?: {
    sectionHeading?: StrapiSectionHeading;
    faqs?: Array<{
      id: number;
      question?: string;
      answer?: string;
      category?: string;
    }>;
  };
}
