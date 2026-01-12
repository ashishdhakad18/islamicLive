
// src/types/waqf.types.ts

// Common Types
interface StrapiSectionHeading {
  heading?: string;
  subHeading?: string;
  description?: string;
}

interface StrapiImage {
  id?: number;
  url?: string;
  alternativeText?: string;
}

interface StrapiCTA {
  id?: number;
  label?: string;
  url?: string;
  variant?: string;
}

interface StrapiFaqItem {
  id: number;
  question?: string;
  answer?: string;
  category?: string;
}

// ============================================
// Hero Section
// ============================================
interface StrapiHeroMsg {
  id?: number;
  title?: string;
  subtitle?: string;
  description?: string;
}

// ============================================
// Waqf Basic Cards (Fundamentals)
// ============================================
export interface StrapiWaqfBasicCard {
  id?: number;
  title?: string;
  description?: string;
  lists?: Array<{ id: number; description: string }>;
  listLabel?: string;
  captionTitle?: string;
  captionDescription?: string;
  ctaText?: string;
  ctaLink?: string;
}

// ============================================
// Why Trust Section (Impact Cards) 
// ============================================
export interface StrapiWhyTrustCard {
    id?: number;
    heading?: string;
    description?: string;
    iconImage?: StrapiImage;
}

// ============================================
// Distribution Section
// ============================================
export interface StrapiDistributionItem {
    id?: number;
    heading?: string;
    description?: string;
    icon?: StrapiImage;
}

// ============================================
// Impact / Initiatives Section
// ============================================
export interface StrapiInitiativeCard {
    id?: number;
    title?: string;
    description?: string;
    image?: StrapiImage;
    ctaText?: string;
    ctaLink?: string;
}

// ============================================
// Main Page Data Interface from Strapi
// ============================================
export interface WaqfPageDataFromStrapi {
  id: number;

  heroSection?: {
    sectionHeading?: StrapiSectionHeading;
    image?: StrapiImage;
    heroMSG?: StrapiHeroMsg;
  };

  waqfBasicSection?: {
    sectionHeading?: StrapiSectionHeading;
    cards?: StrapiWaqfBasicCard[];
  };

  whyTrustUsSection?: {
    sectionHeading?: StrapiSectionHeading;
    cards?: StrapiWhyTrustCard[];
  };

  fundDestributionSection?: {
    sectionHeading?: StrapiSectionHeading;
    destributionlist?: StrapiDistributionItem[];
    images?: StrapiImage[];
  };

  impactCardSection?: {
    sectionHeading?: StrapiSectionHeading;
    initiativesCard?: StrapiInitiativeCard[];
  };

  callToAction?: {
    sectionHeading?: StrapiSectionHeading;
    CTA?: StrapiCTA[];
  };

  faqSection?: {
    sectionHeading?: StrapiSectionHeading;
    faqs?: StrapiFaqItem[];
  };
}
