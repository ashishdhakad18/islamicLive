
// src/types/kurban.types.ts

export interface StrapiSectionHeading {
  heading?: string;
  subHeading?: string;
  description?: string;
}

export interface StrapiImage {
  id?: number;
  url?: string;
  alternativeText?: string;
}

export interface StrapiHeroMsg {
  id?: number;
  message?: string;
  author?: string;
}

export interface StrapiCTA {
  id: number;
  label?: string;
  url?: string;
}

export interface StrapiImpactDataItem {
    id: number;
    heading: string;
    subHeading?: string;
    description: string;
    icon?: StrapiImage;
}

export interface StrapiNewsCard {
    id: number;
    heading: string;
    publishedDate: string;
    readTime: string;
    tag1?: string;
    tag2?: string;
    image?: StrapiImage;
}

export interface StrapiSocialMediaCard {
    id: number;
    socialMedia?: string;
    description?: string;
    likes?: number;
    replies?: number;
    image?: StrapiImage;
}

export interface StrapiFaqItem {
  id: number;
  question?: string;
  answer?: string;
  category?: string;
  faq_category?: {
    data?: {
      id: number;
      attributes?: {
        name: string;
      };
    };
  };
}

export interface KurbanPageDataFromStrapi {
  id: number;
  heroSection?: {
    sectionHeading?: StrapiSectionHeading;
    image?: StrapiImage;
    heroMSG?: StrapiHeroMsg;
  };
  campaignSection?: {
    id: number;
    currentValue?: number;
    targetValue?: number;
    label?: string;
    year?: number;
    icon?: StrapiImage;
  };
  kurbanDestination?: {
    heading?: string;
    addressCard?: Array<{
        id: number;
        group: string;
        chfNumber: string;
        address: string;
        ctaText: string;
        ctaLink: string;
    }>;
  };
  fundDestributionSection?: {
    sectionHeading?: StrapiSectionHeading;
    destributionlist?: Array<{
        id: number;
        heading: string;
        description: string;
        icon?: StrapiImage;
    }>;
    images?: {
        data: StrapiImage[];
    } | StrapiImage[];
  };
  image?: StrapiImage;
  whyTrustUsSection?: {
    sectionHeading?: StrapiSectionHeading;
    cards?: Array<{
        id: number;
        heading: string;
        description: string;
        iconImage?: StrapiImage;
    }>;
  };
  callToAction?: {
    sectionHeading?: StrapiSectionHeading;
    CTA?: StrapiCTA;
  };
  testimonialSection?: {
    sectionHeading?: StrapiSectionHeading;
    videos?: Array<{
        id: number;
        featuredVideo?: StrapiImage;
        gallery?: StrapiImage;
    }>;
  };
  impactData?: {
    sectionHeading?: StrapiSectionHeading;
    impactData?: StrapiImpactDataItem[];
  };
  newsSection?: {
    sectionHeading?: StrapiSectionHeading;
    newsCard?: StrapiNewsCard[];
  };
  socialMediaSection?: {
    sectionHeading?: StrapiSectionHeading;
    socialMediaCards?: StrapiSocialMediaCard[];
  };
  faqSection?: {
    sectionHeading?: StrapiSectionHeading;
    faqs?: StrapiFaqItem[];
  };
  transmetSection?: {
    videoUrl?: StrapiImage;
    posterImage?: StrapiImage;
    description?: string;
    ctaText?: string;
    ctaLink?: string;
  };
  formBGImage?: StrapiImage;
}
