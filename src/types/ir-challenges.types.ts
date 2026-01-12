
// src/types/ir-challenges.types.ts

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

export interface StrapiListElement {
  id: number;
  heading?: string;
  title?: string;
  description?: string;
  icon?: StrapiImage;
}

export interface StrapiChallengeCard {
  id: number;
  heading: string;
  description: string;
  ctaText?: string;
  ctaLink?: string;
  image?: StrapiImage;
}

export interface IrChallengesPageDataFromStrapi {
  id: number;
  heroSection?: {
    sectionHeading?: StrapiSectionHeading;
    image?: StrapiImage;
    ctaText?: string;
    ctaLink?: string;
  };
  fundDestribution?: {
    sectionHeading?: StrapiSectionHeading;
    destributionlist?: StrapiListElement[];
    images?: StrapiImage[];
  };
  challengesCardSection?: {
    sectionHeading?: StrapiSectionHeading;
    cards?: StrapiChallengeCard[];
  };
  faqSection?: {
    sectionHeading?: StrapiSectionHeading;
    faqs?: StrapiFaqItem[];
  };
}
