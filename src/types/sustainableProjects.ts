import { CarouselData } from "@/types/carousel.types";
import { ImpactGridItem } from "@/types/impactGrid.types";
import { CardData } from "@/types/slider.types";
import { ImpactStatsData } from "./impactStats";

export interface SustainableProject {
  slug: string;
  primaryColour: string;
  secondaryColour: string;
  thirdColor: string;
  title: string;
  hero: {
    heading: string;
    subheading?: string;
    description?: string;
    carouselData: CarouselData;
    statsData?: ImpactStatsData;
    buttonLink?: string;
    buttonText?: string;
    buttonClassName?: string;
  };
  impactGrid: {
    heading: string;
    subheading: string;
    description: string;
    items: ImpactGridItem[];
    images: string[];
  };
  mission?: {
    sectionHeading?: {
      heading: string;
      subHeading?: string;
      description?: string;
    };
    cards: {
      id: number;
      icon: string;
      title: string;
      description: string;
      number?: string;
      numberDescription?: string;
    }[];
  };
  recentProjectSection?: {
    sectionHeading?: {
      heading: string;
      subHeading?: string;
      description?: string;
    };
    cards: CardData[];
  };
  accountabilitySection?: {
    sectionHeading?: {
      heading: string;
      subHeading?: string;
      description: string;
    };
    heading: string;
    subHeading?: string;
    description: string;
    items: {
      id: number;
      icon: string;
      title: string;
      description: string;
    }[];
    buttonText?: string;
    buttonLink?: string;
  };
  ctaSection?: {
    sectionHeading?: {
      heading: string;
      subHeading?: string;
      description: string;
    };
    buttonText: string;
    buttonLink: string;
  };
  urgentAppeals?: {
    heading: string;
    subHeading: string;
    description: string;
    cards: CardData[];
  };
  impactStatsSection?: {
    data: ImpactStatsData;
  };
  faqs?: {
    faqs: {
      id: number;
      question: string;
      answer: string;
    }[];
    sectionHeading?: {
      heading: string;
      subHeading: string;
      description: string;
    };
  };
}
