// Fidya Kaffara page Strapi types
// Follows patterns from financialTransparancy.types.ts and countriesWeOperate.types.ts

// ============================================
// Common Types (reused patterns)
// ============================================

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

interface StrapiImpactStat {
  id?: number;
  value?: string;
  caption?: string;
}

interface StrapiNewsCard {
  id: number;
  readTime?: string | number;
  publishedDate?: string;
  heading?: string;
  tag1?: string;
  tag2?: string;
  image?: StrapiImage;
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
// Sec1 - FidyaKaffaraCardSection Types
// ============================================

interface StrapiBulletPoint {
  id?: number;
  BulletPoint?: string;
}

interface StrapiFidyaExample {
  id?: number;
  estimateAmount?: string;
}

interface StrapiFidyaKaffaraCard {
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
// Sec2 - CalculaterSection Types
// ============================================

interface StrapiCalculaterCard {
  id?: number;
  iconImage?: StrapiImage;
  heading?: string;
  description?: string;
}

interface StrapiCalculaterForm {
  id?: number;
  heading?: string;
  tabs?: string; // Enumeration
  placeHolder?: string;
  currency?: string;
  ctaText?: string;
  ctaLink?: string;
}

// ============================================
// Sec3 - BlessingSection Types
// ============================================

interface StrapiBlessingListItem {
  id?: number;
  icon?: StrapiImage;
  description?: string;
}

// ============================================
// Sec4 - WhyIslamicRelief Types
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

export interface FidyaKaffaraPageData {
  id: number;

  // Hero Section (reused pattern from other pages)
  heroSection?: {
    sectionHeading?: StrapiSectionHeading;
    images?: StrapiImage[];
    stats?: StrapiImpactStat[];
  };

  // Sec1 - FidyaKaffaraCardSection
  Sec1?: {
    sectionHeading?: StrapiSectionHeading;
    fidyaKaffaracard?: StrapiFidyaKaffaraCard[];
  };

  // Sec2 - CalculaterSection
  Sec2?: {
    sectionHeading?: StrapiSectionHeading;
    card?: StrapiCalculaterCard[];
    form?: StrapiCalculaterForm;
  };

  // Sec3 - BlessingSection
  Sec3?: {
    sectionHeading?: StrapiSectionHeading;
    listData?: StrapiBlessingListItem[];
    images?: StrapiImage[];
  };

  // Sec4 - WhyIslamicRelief
  Sec4?: {
    sectionHeading?: StrapiSectionHeading;
    CardSection?: StrapiCommonCard[];
  };

  // Call to Action Section
  callToAction?: {
    sectionHeading?: StrapiSectionHeading;
    CTA?: StrapiCTA[];
  };

  // News Section (reused)
  newsSection?: {
    sectionHeading?: StrapiSectionHeading;
    newsCard?: StrapiNewsCard[];
  };

  // FAQ Section (reused)
  faqSection?: {
    sectionHeading?: StrapiSectionHeading;
    faqs?: StrapiFaqItem[];
  };
}
