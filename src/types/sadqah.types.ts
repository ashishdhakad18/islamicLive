
// src/types/sadqah.types.ts

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
}

interface StrapiFaqItem {
  id: number;
  question?: string;
  answer?: string;
  category?: string;
}

// ============================================
// Sec1 - Introduction / Hero
// ============================================
interface StrapiHeroMsg {
  id?: number;
  message?: string;
  author?: string;
}

// ============================================
// Sadaqah Impact Section
// ============================================
interface StrapiImpactCard {
  id?: number;
  iconImage?: StrapiImage;
  heading?: string;
  description?: string;
  number?: string;
  numberDescription?: string;
}

// ============================================
// Premier Sadaqah Section (Timeline)
// ============================================
export interface StrapiPremierListItem {
    id?: number;
    subHeading?: string;
    heading?: string;
    description?: string;
}

// ============================================
// Project Card Section
// ============================================
interface StrapiProjectCard {
  id: number;
  heading?: string;
  description?: string;
  Image?: StrapiImage;
  badge?: string;
  ctaText?: string;
  ctaLink?: string;
}

// ============================================
// Main Page Data Interface
// ============================================
export interface SadqahPageData {
  id: number;

  Sec1?: {
    sectionHeading?: StrapiSectionHeading;
    image?: StrapiImage;
    heroMSG?: StrapiHeroMsg;
  };

  sadaqahImpactSection?: {
    sectionHeading?: StrapiSectionHeading;
    cards?: StrapiImpactCard[];
  };

  premierSadaqahSection?: {
    sectionHeading?: StrapiSectionHeading;
    list?: StrapiPremierListItem[];
    image?: StrapiImage;
  };

  projectCardSection?: {
    sectionHeading?: StrapiSectionHeading;
    projectCard?: StrapiProjectCard[];
  };

  whyDonate?: {
    sectionHeading?: StrapiSectionHeading;
    cards?: StrapiImpactCard[]; // Reuse impact card as structure is similar (iconImage, heading, description)
  };

  callToAction?: {
    sectionHeading?: StrapiSectionHeading;
    CTA?: StrapiCTA[];
  };

  faqs?: {
    sectionHeading?: StrapiSectionHeading;
    faqs?: StrapiFaqItem[];
  };
}
