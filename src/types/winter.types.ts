
// src/types/winter.types.ts

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

export interface StrapiFaqItem {
  id: number;
  question?: string;
  answer?: string;
}

export interface StrapiHeroMsg {
  id?: number;
  message?: string;
  author?: string;
}

export interface StrapiImpactDataItem {
    id: number;
    heading: string;
    subHeading?: string;
    description: string;
    icon?: StrapiImage;
}

export interface StrapiVideo {
    id: number;
    title?: string;
    url: string;
    thumbnail?: StrapiImage;
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

export interface StrapiWhereWeOperateRegion {
    id: number;
    region: string;
    decription: Array<{ id: number; description: string }>;
}

export interface WinterPageDataFromStrapi {
  id: number;
  image?: StrapiImage;
  heroSection?: {
    sectionHeading?: StrapiSectionHeading;
    image?: StrapiImage;
    heroMSG?: StrapiHeroMsg;
  };
  approchSection?: {
    sectionHeading?: StrapiSectionHeading;
    image?: StrapiImage;
    lists?: Array<{
        id: number;
        heading: string;
        description: string;
        icon?: StrapiImage;
    }>;
  };
  transmetSection?: {
    videoUrl?: StrapiImage;
    posterImage?: StrapiImage;
    description?: string;
    ctaText?: string;
    ctaLink?: string;
  };
  ourGlobalReach?: {
    sectionHeading?: StrapiSectionHeading;
    whereWeOperate?: StrapiWhereWeOperateRegion[];
  };
  testimonialSection?: {
    sectionHeading?: StrapiSectionHeading;
    videos?: {
        featuredVideo?: any; // Adjust based on actual structure if needed
        gallery?: any[];
    };
  };
  impactData?: {
    sectionHeading?: StrapiSectionHeading;
    impactData?: StrapiImpactDataItem[];
  };
  newSection?: {
    sectionHeading?: StrapiSectionHeading;
    newsCard?: StrapiNewsCard[];
  };
  socialMeadiaSction?: {
    sectionHeading?: StrapiSectionHeading;
    socialMediaCards?: StrapiSocialMediaCard[];
  };
  faqSection?: {
    sectionHeading?: StrapiSectionHeading;
    faqs?: StrapiFaqItem[];
  };
}
