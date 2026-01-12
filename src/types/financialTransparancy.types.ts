// Financial Transparency page Strapi types
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

// Card with icon, heading, description
interface StrapiIconCard {
  id: number;
  heading?: string;
  description?: string;
  iconImage?: StrapiImage;
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

// Impact stat
interface StrapiImpactStat {
  id?: number;
  value?: string;
  caption?: string;
}

export interface FinancialTransparancyPageData {
  id: number;

  // Hero Section (reused pattern)
  heroSection?: {
    sectionHeading?: StrapiSectionHeading;
    images?: StrapiImage[];
    impactstats?: StrapiImpactStat[];
  };

  // Our Transparency Section
  ourTransparancy?: {
    heading?: string;
    description?: string;
    image?: StrapiImage;
    sectionHeading?: StrapiSectionHeading;
  };

  // How Donation Work Section
  howDonationWork?: {
    heading?: string;
    description?: string;
    image?: StrapiImage;
  };

  // Effective Giving Section
  EffectiveGiving?: {
    sectionHeading?: StrapiSectionHeading;
    cards?: StrapiIconCard[];
  };

  // Get in Touch Section
  getinTouchSection?: {
    sectionHeading?: StrapiSectionHeading;
    cards?: StrapiIconCard[];
    form?: {
      heading?: string;
      organizationName?: string;
      addressLine1?: string;
      postalCode?: string;
      city?: string;
      country?: string;
      phone?: string;
      email?: string;
      primaryCtaText?: string;
      primaryCtaLink?: string;
      secondaryCtaText?: string;
      secondaryCtaLink?: string;
    };
  };

  // Call to Action Section
  callToAction?: {
    sectionHeading?: StrapiSectionHeading;
    CTA?: Array<{
      id?: number;
      label?: string;
      url?: string;
    }>;
  };

  // Impact Data Section
  impactData?: Array<{
    id: number;
    heading?: string;
    subHeading?: string;
    description?: string;
    icon?: StrapiImage;
  }>;

  // News Section
  newsSection?: {
    sectionHeading?: StrapiSectionHeading;
    newsCard?: StrapiNewsCard[];
  };

  // Social Media Section (reused)
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

  // FAQ Section
  faqs?: {
    sectionHeading?: StrapiSectionHeading;
    faqs?: StrapiFaqItem[];
  };
}
