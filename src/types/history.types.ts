// History page Strapi types
// Reuses common patterns: sectionHeading, images, etc.

// Section heading (same pattern used across pages)
interface StrapiSectionHeading {
  heading?: string;
  subHeading?: string;
  description?: string;
}

// Image type
interface StrapiImage {
  id?: number;
  url?: string;
  alternativeText?: string;
}

// Impact stat
interface StrapiImpactStat {
  id?: number;
  value?: string;
  caption?: string;
}

// FAQ item (same as other pages)
interface StrapiFaqItem {
  id: number;
  question?: string;
  answer?: string;
  category?: string;
}

// News card (same structure across pages)
interface StrapiNewsCard {
  id: number;
  readTime?: string | number;
  publishedDate?: string;
  heading?: string;
  tag1?: string;
  tag2?: string;
  image?: StrapiImage;
}

// ============================================
// Sec2: Impact History Section
// ============================================
export interface ImpactHistoryCard {
  id?: number;
  image?: StrapiImage;
  title?: string;
  description?: string;
  btnText?: string;
  btnUrl?: string;
}

export interface ImpactHistorySection {
  sectionHeading?: StrapiSectionHeading;
  Cards?: ImpactHistoryCard[];
}

// ============================================
// Sec3: Situation Section
// ============================================
export interface ListData {
  id?: number;
  icon?: StrapiImage;
  description?: string;
}

export interface SituationSection {
  sectionHeading?: StrapiSectionHeading;
  image?: StrapiImage;
  lists?: ListData[];
  description?: string;
}

// ============================================
// Sec4: Decades Section
// ============================================
export interface DecadesSection {
  sectionHeading?: StrapiSectionHeading;
  image?: StrapiImage;
  lists?: ListData[];
  description?: string;
}

// ============================================
// Sec5: Timeline Section
// ============================================
export interface TimelineData {
  id?: number;
  year?: string;
  description?: string;
}

export interface TimelineSection {
  sectionHeading?: StrapiSectionHeading;
  timelineData?: TimelineData[];
}

// ============================================
// Sec6: Principles Section
// ============================================
export interface PrincipleAccordion {
  id?: number;
  label?: string;
  description?: string;
}

export interface PrinciplesSection {
  sectionHeading?: StrapiSectionHeading;
  image?: StrapiImage;
  principles?: PrincipleAccordion[];
}

// ============================================
// Main History Page Data Structure
// ============================================
export interface HistoryPageData {
  id: number;

  // Sec1: Hero Section (same as other pages)
  Sec1?: {
    sectionHeading?: StrapiSectionHeading;
    images?: StrapiImage[];
    impactstats?: StrapiImpactStat[];
  };

  // Sec2: Impact History Section
  Sec2?: ImpactHistorySection;

  // Sec3: Situation Section
  Sec3?: SituationSection;

  // Sec4: Decades Section
  Sec4?: DecadesSection;

  // Sec5: Timeline Section
  Sec5?: TimelineSection;

  // Sec6: Principles Section
  Sec6?: PrinciplesSection;

  // Common Sections (reused from other pages)
  callToAction?: {
    sectionHeading?: StrapiSectionHeading;
    CTA?: Array<{
      id?: number;
      label?: string;
      url?: string;
    }>;
  };

  impactData?: Array<{
    id: number;
    heading?: string;
    subHeading?: string;
    description?: string;
    icon?: StrapiImage;
  }>;

  newsSection?: {
    sectionHeading?: StrapiSectionHeading;
    newsCard?: StrapiNewsCard[];
  };

  socialMediaSection?: {
    sectionHeading?: StrapiSectionHeading;
    socialMediaCards?: Array<{
      id: number;
      socialMedia?: string;
      description?: string;
      likes?: number;
      replies?: number;
      image?: StrapiImage;
    }>;
  };

  faqSection?: {
    sectionHeading?: StrapiSectionHeading;
    faqs?: StrapiFaqItem[];
  };
}
