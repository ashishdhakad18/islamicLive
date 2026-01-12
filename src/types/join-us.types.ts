import { StrapiMedia, StrapiRelation } from "./strapi";
import { SectionHeadingData } from "./sectionHeading.types";

export interface JoinUsPageData {
  hero: {
    sectionHeading: {
      heading: string;
      subHeading: string;
      description: string;
    };
    image: {
      url: string;
      alt: string;
    };
  };
  cards: JoinUsCard[];
  cta: {
    sectionHeading: {
      heading: string;
      subHeading: string;
      description: string;
    };
    cta: {
      text: string;
      link: string;
    };
  };
}

export interface JoinUsCard {
  id: string;
  category: string;
  date: string;
  title: string;
  description: string;
  image?: string;
  link: string;
  type: string;
  missions: string[];
  qualifications: string[];
  contactEmail: string;
  applicationInstructions: string;
  ctaText: string;
  cardDetails?: any[];
}

// Strapi Raw Types
export interface StrapiJoinUsPage {
  id: number;
  attributes: {
    heroSection: {
      sectionHeading: SectionHeadingData;
      image: StrapiRelation<StrapiMedia["attributes"]>;
    };
    cardSection: any[]; // Adjust based on actual Strapi data
    callToAction: {
      sectionHeading: SectionHeadingData;
      CTA: {
        text: string;
        link: string;
      };
    };
  };
}
