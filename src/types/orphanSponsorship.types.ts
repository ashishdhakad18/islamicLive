import { StrapiMedia } from "@/types/strapi";
import { HeroSectionProps } from "@/components/ui/HeroSection";
import { ImpactStatsProps } from "@/components/ui/ImpactStats";
import { WhySponsorSectionProps } from "@/components/ui/WhySponsorSection";
import { EthicalProgramSectionProps } from "@/components/ui/EthicalProgramSection";
import { OrphanFundSectionProps } from "@/components/ui/OrphanFundSection";
import { SponsorshipDetailsProps } from "@/components/ui/SponsorshipDetailsSection";
import { SocialMediaPost } from "@/types/socialmedia";

export interface OrphanSponsorshipPageData {
  hero: HeroSectionProps;
  impactStats: ImpactStatsProps;
  sponsorshipDetails: SponsorshipDetailsProps;
  whySponsor: WhySponsorSectionProps;
  ethicalProgram: EthicalProgramSectionProps;
  orphanFund: OrphanFundSectionProps;
  news?: {
    heading: string;
    subheading: string;
    description: string;
    cards: {
      id: string;
      image: string | null;
      title: string;
      read: string;
      date: string;
      categories: string[];
      link: string;
    }[];
  };
  cta?: {
    heading: string;
    subheading: string;
    description: string;
    buttonText: string;
    buttonLink: string;
  };
  impactData?: any;
  socialMedia?: {
    heading: string;
    subheading: string;
    description: string;
    posts: SocialMediaPost[]; 
  };
  faq?: {
    sectionHeading: {
      heading: string;
      subHeading: string;
      description: string;
    };
    faqs: {
      id: number;
      question: string;
      answer: string;
    }[];
    cta: {
      label: string;
      action: string;
    };
  };
}

// --- Strapi Attributes Interfaces ---

export interface StrapiSectionHeading {
  heading: string;
  subHeading: string;
  description: string;
}

export interface StrapiHeroSection {
  sectionHeading: StrapiSectionHeading;
  image: { data: StrapiMedia };
  heroMSG: {
    message: string;
    author: string;
  };
}

export interface StrapiImpactStats {
  impactStats: {
    id: number;
    value: string;
    label: string;
    type: string;
  }[];
}

export interface StrapiSec3 {
  sectionHeading: StrapiSectionHeading;
  image: { data: StrapiMedia };
  introText?: string;
}

export interface StrapiSec4 {
  list: { text: string }[];
  image: { data: StrapiMedia };
}

export interface StrapiSec5 {
  list: { text: string }[];
  image: { data: StrapiMedia };
}

export interface StrapiSec6 {
  image: { data: StrapiMedia };
  list: { text: string }[];
}

export interface StrapiNewSection {
  sectionHeading: StrapiSectionHeading;
  newsCard: {
    id: number;
    title: string;
    read: string;
    date: string;
    categories: string; // Strapi might return this as string or JSON, assuming distinct fields or string
    link: string;
    image: { data: StrapiMedia };
  }[];
}

export interface StrapiSocialMediaSection {
  sectionHeading: StrapiSectionHeading;
  socialMediaCards: {
    id: number;
    image: { data: StrapiMedia };
    socialMedia: string;
    description: string;
    likes: number;
    replies: number;
    link?: string;
  }[];
}

export interface StrapiFaqSection {
  sectionHeading: StrapiSectionHeading;
  faqs: {
    id: number;
    question: string;
    answer: string;
  }[];
}

export interface StrapiCallToAction {
  sectionHeading: StrapiSectionHeading;
  CTA: {
    text: string;
    link: string;
  };
}

export interface StrapiOrphanSponsorshipAttributes {
  heroSection: StrapiHeroSection;
  impactStats: StrapiImpactStats;
  Sec3: StrapiSec3;
  Sec4: StrapiSec4;
  Sec5: StrapiSec5;
  Sec6: StrapiSec6;
  newSection: StrapiNewSection;
  socialMediaSection: StrapiSocialMediaSection;
  faqSection: StrapiFaqSection;
  callToAction: StrapiCallToAction;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}
