import { StrapiTimestamps } from "./strapi";

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

export interface StrapiHeroSection {
  sectionHeading?: StrapiSectionHeading;
  images?: StrapiImage[];
  stats?: StrapiImpactStat[];
}

export interface StrapiHeroCTA {
  label: string;
  url: string;
}

export interface StrapiListData {
  id: number;
  icon?: any;
  description: string;
  theme?: string;
  value?: string;
  title?: string;
}

export interface StrapiEducationEssential {
  sectionHeading?: StrapiSectionHeading;
  listData?: StrapiListData[];
  images?: any;
}

export interface StrapiRecentProjectCard {
  id: number;
  imageChip?: string;
  chipColor?: string;
  image?: any;
  heading: string;
  description?: string;
  CTA?: {
    label: string;
    url: string;
  };
}

export interface StrapiAccountabilityCard {
  id: number;
  iconImage?: any;
  heading: string;
  description: string;
  number?: string;
  numberDescription?: string;
}

export interface StrapiAccountabilitySection {
  sectionHeading?: StrapiSectionHeading;
  cards?: StrapiAccountabilityCard[];
  ctaText?: string;
  ctaLink?: string;
}

export interface StrapiMissionCard {
  id: number;
  iconImage?: any;
  heading: string;
  description: string;
  number?: string;
  numberDescription?: string;
}

export interface StrapiMissionSection {
  sectionHeading?: StrapiSectionHeading;
  cards?: StrapiMissionCard[];
}

export interface StrapiImpactStat {
  id: number;
  value: string;
  caption?: string; // Changed from label to caption to align with Aqiqah
}

export interface StrapiConfig {
  slug: string;
  title: string;
  primaryColor?: string;
  secondaryColor?: string;
  thirdColor?: string;
}

export interface SustainableProjectAttributes extends StrapiTimestamps {
  id: number;
  slug: string;
  primaryColor?: string;
  secondaryColor?: string;
  thirdColor?: string;
  Config?: StrapiConfig;
  heroSection?: StrapiHeroSection;
  educationessentialSection?: {
    educationEssential: StrapiEducationEssential;
  };
  HeroCTA?: StrapiHeroCTA;
  recentProjectSection?: {
    sectionHeading?: StrapiSectionHeading;
    cards?: StrapiRecentProjectCard[];
  };
  missionSection?: StrapiMissionSection;
  accountabilitySection?: StrapiAccountabilitySection;
  callToAction?: {
    sectionHeading?: StrapiSectionHeading;
    CTA?: {
      id?: number;
      label: string;
      url: string;
    }[];
  };
  impactStats?: StrapiImpactStat[];
  faqs?: {
    sectionHeading?: StrapiSectionHeading;
    faqs?: {
      id: number;
      question: string;
      answer: string;
    }[];
  };
}

// Keeping the original name but it now represents the flattened data
export type StrapiSustainableProject = SustainableProjectAttributes;
