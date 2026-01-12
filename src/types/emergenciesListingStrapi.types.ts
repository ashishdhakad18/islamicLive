// src/types/emergenciesListingStrapi.types.ts
// Types matching the Strapi API response structure

import { StrapiSectionHeading } from "./aqiqah.types";
import { StrapiImage } from "./homepage.types";

// Sec1 - Hero Section
export interface StrapiEmergenciesSec1 {
  id: number;
  sectionHeading?: StrapiSectionHeading;
  images?: StrapiImage[];
  stats?: StrapiStat[];
}

export interface StrapiStat {
  id: number;
  value: string;
  caption: string;
}

// Sec2 - Responding Section
export interface StrapiEmergenciesSec2 {
  id: number;
  sectionHeading?: StrapiSectionHeading;
  selectedTemplates?: StrapiSelectedTemplate[];
}

export interface StrapiSelectedTemplate {
  id: number;
  documentId: string;
  ListingPageCardData?: StrapiListingPageCardData;
}

export interface StrapiListingPageCardData {
  id: number;
  title: string;
  description: string;
  cardImage?: StrapiImage;
  LearnMoreButton?: StrapiCTA;
}

export interface StrapiCTA {
  id: number;
  label: string;
  url: string;
}

// Sec3 - How We Work Section
export interface StrapiEmergenciesSec3 {
  id: number;
  sectionHeading?: StrapiSectionHeading;
  howWeWorkCard?: StrapiHowWeWorkCard[];
  mainHeading?: StrapiSectionHeading;
  backgroundImage?: StrapiImage;
}

export interface StrapiHowWeWorkCard {
  id: number;
  subHeading: string;
  Heading: string;
  description: string;
  theme: "red" | "green" | "blue";
  featureItem?: StrapiFeatureItem[];
}

export interface StrapiFeatureItem {
  id: number;
  bulletPoint: string;
  icon?: StrapiImage | null;
}

// Call To Action Section
export interface StrapiEmergenciesCallToAction {
  id: number;
  sectionHeading?: StrapiSectionHeading;
  CTA?: StrapiCTA[];
}

// Impact Data Item
export interface StrapiEmergenciesImpactDataItem {
  id: number;
  title: string;
  description: string;
  btnText?: string | null;
  btnUrl?: string | null;
  image?: StrapiImage;
}

// Main Page Type
export interface StrapiEmergenciesListingPage {
  id: number;
  documentId: string;
  Sec1?: StrapiEmergenciesSec1;
  Sec2?: StrapiEmergenciesSec2;
  Sec3?: StrapiEmergenciesSec3;
  callToAction?: StrapiEmergenciesCallToAction;
  impactData?: StrapiEmergenciesImpactDataItem[];
  newsCard?: unknown; // null in current response
  socialMediaSection?: unknown; // null in current response
  FAQ?: unknown; // null in current response
}
