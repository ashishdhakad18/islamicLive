// src/types/emergenciesListing.types.ts
// Client-side types for the emergencies listing page

import { CarouselData } from "./carousel.types";
import { ImpactStatsData } from "./impactStats";
import { ResponseCardData } from "./responseCard";
import { ResponseCardData as TimelineCardData } from "@/components/ui/ResponseTimelineCard";
import { SectionHeadingData } from "@/lib/mappers/homepage";
import { ImpactData } from "./impactData";
import { StrapiImage } from "./homepage.types";

// Hero Section
export interface EmergenciesHeroData {
  sectionHeading: SectionHeadingData;
  carouselData: CarouselData;
  statsData: ImpactStatsData;
}

// Responding Section (Sec2)
export interface EmergenciesRespondingData {
  sectionHeading: SectionHeadingData;
  cards: ResponseCardData[];
}

// How We Work Section (Sec3)
export interface EmergenciesHowWeWorkData {
  sectionHeading: SectionHeadingData;
  cards: TimelineCardData[];
  mainHeading: SectionHeadingData;
  backgroundImage: StrapiImage;
}

// Call To Action Section
export interface EmergenciesCallToActionData {
  sectionHeading: SectionHeadingData;
  buttons: {
    label: string;
    url: string;
  }[];
}

// Combined Mapped Data
export interface EmergenciesMappedData {
  hero: EmergenciesHeroData;
  responding: EmergenciesRespondingData;
  howWeWork: EmergenciesHowWeWorkData;
  callToAction: EmergenciesCallToActionData;
  impactData: ImpactData;
}
