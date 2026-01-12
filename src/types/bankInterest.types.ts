// src/types/bankInterest.types.ts

// Common Types
interface StrapiSectionHeading {
  id?: number;
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
// Bank Interest Basic Cards Section
// ============================================
export interface StrapiBankInterestBasicCard {
  id?: number;
  title?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  captionTitle?: string;
  captionDescription?: string;
  listLabel?: string;
  lists?: Array<{ id?: number; item?: string }>;
}

// ============================================
// Why Trust Us Section (Impact Cards)
// ============================================
export interface StrapiWhyTrustCard {
  id?: number;
  heading?: string;
  description?: string;
  iconImage?: StrapiImage;
  number?: string;
  numberDescription?: string;
}

// ============================================
// Fund Distribution Section
// ============================================
export interface StrapiDistributionItem {
  id?: number;
  heading?: string;
  description?: string;
  value?: string;
  title?: string;
  theme?: string;
  icon?: StrapiImage;
}

// ============================================
// Impact Card / Initiatives Section
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
// Main Page Data Interface
// ============================================
export interface BankInterestPageData {
  id: number;

  heroSection?: {
    id?: number;
    ctaText?: string;
    ctaLink?: string;
    sectionHeading?: StrapiSectionHeading;
    image?: StrapiImage;
    heroMSG?: StrapiHeroMsg;
  };

  bankIntrestBasicSection?: {
    id?: number;
    sectionHeading?: StrapiSectionHeading;
    cards?: StrapiBankInterestBasicCard[];
  };

  whyTrustUsSection?: {
    id?: number;
    sectionHeading?: StrapiSectionHeading;
    cards?: StrapiWhyTrustCard[];
  };

  fundDestributionSection?: {
    id?: number;
    sectionHeading?: StrapiSectionHeading;
    destributionlist?: StrapiDistributionItem[];
    images?: StrapiImage[];
  };

  impactCardSection?: {
    id?: number;
    sectionHeading?: StrapiSectionHeading;
    initiativesCard?: StrapiInitiativeCard[];
  };

  callToAction?: {
    id?: number;
    sectionHeading?: StrapiSectionHeading;
    CTA?: StrapiCTA;
  };

  faqSection?: {
    id?: number;
    sectionHeading?: StrapiSectionHeading;
    faqs?: StrapiFaqItem[];
  } | null;
}
