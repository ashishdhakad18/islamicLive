// Aqiqah page Strapi types
// Based on Strapi schema for Aqiqah page

// ============================================
// Common Types (reused patterns)
// ============================================

export interface StrapiSectionHeading {
  heading?: string;
  subHeading?: string;
  description?: string;
}

interface StrapiImage {
  id?: number;
  url?: string;
  alternativeText?: string;
}

interface StrapiImpactStat {
  id?: number;
  value?: string;
  caption?: string;
}

interface StrapiFaqItem {
  id: number;
  question?: string;
  answer?: string;
  category?: string;
}

interface StrapiCTA {
  id?: number;
  label?: string;
  url?: string;
}

// ============================================
// Sec1 - AqiqahOverviewSection Types
// ============================================

interface StrapiBulletPoint {
  id?: number;
  BulletPoint?: string;
}

interface StrapiFidyaExample {
  id?: number;
  estimateAmount?: string;
}

interface StrapiAqiqahCard {
  id?: number;
  heading?: string;
  description?: string;
  howItsWorkHeading?: string;
  points?: StrapiBulletPoint[];
  fidyaexample?: StrapiFidyaExample;
  ctaText?: string;
  ctaLink?: string;
}

// ============================================
// Sec2 & Sec3 - Common Card Types
// ============================================

interface StrapiCommonCard {
  id?: number;
  iconImage?: StrapiImage;
  heading?: string;
  description?: string;
}

// ============================================
// Main Page Data Interface
// ============================================

export interface AqiqahPageData {
  id: number;

  // Hero Section
  heroSection?: {
    sectionHeading?: StrapiSectionHeading;
    images?: StrapiImage[];
    stats?: StrapiImpactStat[];
  };

  // Sec1 - AqiqahOverviewSection
  Sec1?: {
    sectionHeading?: StrapiSectionHeading;
    cards?: StrapiAqiqahCard[];
  };

  // Sec2 - AqiqahProcessSection
  Sec2?: {
    sectionHeading?: StrapiSectionHeading;
    cards?: StrapiCommonCard[];
  };

  // Sec3 - WhyIslamicReliefSection
  Sec3?: {
    sectionHeading?: StrapiSectionHeading;
    cards?: StrapiCommonCard[];
    number?: number;
    description?: string;
  };

  // Call to Action Section
  callToAction?: {
    sectionHeading?: StrapiSectionHeading;
    CTA?: StrapiCTA[];
  };

  // FAQ Section (faqs key, no newsSection or socialMedia)
  faqs?: {
    sectionHeading?: StrapiSectionHeading;
    faqs?: StrapiFaqItem[];
  };
}
