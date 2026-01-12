// src/lib/mappers/singleEmergency.ts
// Mapper functions for the single emergency page (e.g., Gaza/Palestine)

import { SectionHeadingData, mapSectionHeading } from "./homepage";
import { getMediaUrl } from "@/utils/strapiHelpers";
import { CarouselData } from "@/types/carousel.types";
import { ImpactStatsData } from "@/types/impactStats";
import { ImpactData } from "@/types/impactData";

// ============================================
// Strapi Response Types for Single Emergency
// Based on actual API response
// ============================================
export interface StrapiSingleEmergencyPage {
  id: number;
  ListingPageCardData?: {
    id: number;
    title?: string;
    description?: string;
    cardImage?: any;
    LearnMoreButton?: {
      id: number;
      label?: string;
      url?: string;
    };
  };
  heroSection?: {
    id: number;
    sectionHeading?: {
      id: number;
      heading?: string;
      subHeading?: string;
      description?: string;
    };
    images?: any[];
    stats?: {
      id: number;
      value?: string;
      caption?: string;
    }[];
  };
  situationSection?: {
    id: number;
    sectionHeading?: {
      id: number;
      heading?: string;
      subHeading?: string;
      description?: string;
    };
    listData?: {
      id: number;
      icon?: any;
      heading?: string;
      description?: string;
      value?: string;
      title?: string;
      theme?: string;
    }[];
    images?: any[];
  };
  impactSection?: {
    id: number;
    sectionHeading?: {
      id: number;
      heading?: string;
      subHeading?: string;
      description?: string;
    };
    image?: any;
    impactData?: {
      id: number;
      icon?: any;
      heading?: string;
      subHeading?: string;
      description?: string;
    }[];
    CTA?: {
      id: number;
      label?: string;
      url?: string;
    };
  };
  targetSupportSection?: {
    id: number;
    sectionHeading?: {
      id: number;
      heading?: string;
      subHeading?: string;
      description?: string;
    };
    orphanSponsorshipCard?: {
      id: number;
      chip?: string;
      image?: any;
      heading?: string;
      description?: string;
      featureList?: {
        id: number;
        icon?: any;
        bulletPoint?: string;
      }[];
      ctaText?: string;
      ctaLink?: string;
    }[];
  };
  impactData?: {
    id: number;
    icon?: any;
    heading?: string;
    subHeading?: string;
    description?: string;
  }[];
  newsSection?: any;
  socialMediaSection?: any;
}

// ============================================
// Hero Section
// ============================================
export interface SingleEmergencyHeroData {
  sectionHeading: SectionHeadingData;
  carouselData: CarouselData;
  statsData: ImpactStatsData;
}

export const mapSingleEmergencyHero = (
  data: StrapiSingleEmergencyPage
): SingleEmergencyHeroData => {
  const heroSection = data?.heroSection;
  const images = Array.isArray(heroSection?.images)
    ? heroSection.images
    : heroSection?.images
    ? [heroSection.images]
    : [];
  const stats = heroSection?.stats || [];

  const carouselItems = images.map((img, index) => ({
    id: String(img.id || index + 1),
    url: getMediaUrl(img) || "/Images/Homepage-Hero-1.png",
    alt: img.alternativeText || "Emergency Relief",
    title: heroSection?.sectionHeading?.heading || "",
    subtitle: heroSection?.sectionHeading?.subHeading || "",
    buttonText: "Donate",
    buttonLink: "/donate",
  }));

  if (carouselItems.length === 0) {
    carouselItems.push({
      id: "1",
      url: "/Images/Homepage-Hero-1.png",
      alt: "Emergency Relief",
      title: heroSection?.sectionHeading?.heading || "",
      subtitle: heroSection?.sectionHeading?.subHeading || "",
      buttonText: "Donate",
      buttonLink: "/donate",
    });
  }

  return {
    sectionHeading: mapSectionHeading(heroSection?.sectionHeading, {
      heading: "WHEN DISASTER STRIKES",
      subHeading: "We respond with faith and compassion.",
      description: "",
    }),
    carouselData: { carouselItems },
    statsData: {
      impactStats: stats.map((stat, index) => ({
        id: stat.id || index + 1,
        value: stat.value || "",
        label: stat.caption?.replace(/\n/g, " ").trim() || "",
        type: "count" as const,
      })),
    },
  };
};

// ============================================
// Situation Section
// ============================================
export interface SituationListItem {
  id: number;
  icon: string;
  value: string;
  title: string;
  description: string;
  theme: "red" | "green" | "yellow" | "primary";
}

export interface SingleEmergencySituationData {
  sectionHeading: SectionHeadingData;
  images: string[];
  listData: SituationListItem[];
}

export const mapSingleEmergencySituation = (
  data: StrapiSingleEmergencyPage
): SingleEmergencySituationData => {
  const situation = data?.situationSection;
  const images = Array.isArray(situation?.images)
    ? situation.images
    : situation?.images
    ? [situation.images]
    : [];
  const listData = situation?.listData || [];

  const themeMap: Record<string, "red" | "green" | "yellow" | "primary"> = {
    red: "red",
    green: "green",
    yellow: "yellow",
    primary: "primary",
  };

  return {
    sectionHeading: mapSectionHeading(situation?.sectionHeading, {
      heading: "What's Happening",
      subHeading: "Situation Overview",
      description: "",
    }),
    images: images.map((img) => getMediaUrl(img) || ""),
    listData: listData.map((item, index) => ({
      id: item.id || index + 1,
      icon: getMediaUrl(item.icon) || "/Icons/Sadaqah-red.svg",
      value: item.value || "",
      title: item.title || item.heading || "",
      description: item.description?.replace(/\n/g, " ").trim() || "",
      theme: (themeMap[item.theme?.toLowerCase() || "red"] || "red") as
        | "red"
        | "green"
        | "yellow"
        | "primary",
    })),
  };
};

// ============================================
// Impact Section
// ============================================
export interface ImpactDataItem {
  id: number;
  icon: string;
  heading: string;
  subHeading: string;
  description: string;
}

export interface SingleEmergencyImpactSectionData {
  sectionHeading: SectionHeadingData;
  image: string;
  impactData: ImpactDataItem[];
  cta: {
    label: string;
    url: string;
  };
}

export const mapSingleEmergencyImpactSection = (
  data: StrapiSingleEmergencyPage
): SingleEmergencyImpactSectionData => {
  const impact = data?.impactSection;
  const impactData = impact?.impactData || [];

  return {
    sectionHeading: mapSectionHeading(impact?.sectionHeading, {
      heading: "What Islamic Relief Is Doing",
      subHeading: "Impact",
      description: "",
    }),
    image: getMediaUrl(impact?.image) || "",
    impactData: impactData.map((item, index) => ({
      id: item.id || index + 1,
      icon: getMediaUrl(item.icon) || "/Icons/Sadaqah.png",
      heading: item.heading || "",
      subHeading: item.subHeading || "",
      description: item.description?.replace(/\n/g, " ").trim() || "",
    })),
    cta: {
      label: impact?.CTA?.label || "Donate Now",
      url: impact?.CTA?.url || "/donate",
    },
  };
};

// ============================================
// Target Support Section (Orphan Sponsorship Cards)
// ============================================
export interface OrphanSponsorshipCard {
  id: number;
  chip: string;
  image: string;
  heading: string;
  description: string;
  featureList: string[];
  ctaText: string;
  ctaLink: string;
}

export interface SingleEmergencyTargetSupportData {
  sectionHeading: SectionHeadingData;
  cards: OrphanSponsorshipCard[];
}

export const mapSingleEmergencyTargetSupport = (
  data: StrapiSingleEmergencyPage
): SingleEmergencyTargetSupportData => {
  const targetSupport = data?.targetSupportSection;
  const cards = targetSupport?.orphanSponsorshipCard || [];

  return {
    sectionHeading: mapSectionHeading(targetSupport?.sectionHeading, {
      heading: "Our Current Priority Projects",
      subHeading: "Targeted Support",
      description:
        "Crisis situations requiring immediate support from our global community",
    }),
    cards: cards.map((card, index) => ({
      id: card.id || index + 1,
      chip: card.chip || "",
      image: getMediaUrl(card.image) || "/Images/Project-Card-Image-1.png",
      heading: card.heading || "",
      description: card.description?.replace(/\n/g, " ").trim() || "",
      featureList:
        card.featureList?.map(
          (item) => item.bulletPoint?.replace(/\n/g, " ").trim() || ""
        ) || [],
      ctaText: card.ctaText || "Learn More",
      ctaLink: card.ctaLink || "#",
    })),
  };
};

// ============================================
// Impact Data Section (Bottom section - at root level)
// ============================================
export const mapSingleEmergencyImpactData = (
  data: StrapiSingleEmergencyPage
): ImpactData => {
  const impactItems = data?.impactData || [];

  return {
    stats: impactItems.map((item, index) => ({
      id: item.id || index + 1,
      icon: getMediaUrl(item.icon) || "/Icons/Sadaqah.png",
      value: "",
      label: item.heading || "",
      description: item.description || "",
    })),
  };
};

// ============================================
// Map All Data
// ============================================
export interface SingleEmergencyMappedData {
  listingCard: {
    title: string;
    description: string;
    cardImage: string;
    learnMoreUrl: string;
  };
  hero: SingleEmergencyHeroData;
  situation: SingleEmergencySituationData;
  impactSection: SingleEmergencyImpactSectionData;
  targetSupport: SingleEmergencyTargetSupportData;
  impactData: ImpactData;
}

export const mapSingleEmergencyPageData = (
  data: StrapiSingleEmergencyPage
): SingleEmergencyMappedData => {
  const listingCard = data?.ListingPageCardData;

  return {
    listingCard: {
      title: listingCard?.title || "",
      description: listingCard?.description || "",
      cardImage: getMediaUrl(listingCard?.cardImage) || "",
      learnMoreUrl: listingCard?.LearnMoreButton?.url || "",
    },
    hero: mapSingleEmergencyHero(data),
    situation: mapSingleEmergencySituation(data),
    impactSection: mapSingleEmergencyImpactSection(data),
    targetSupport: mapSingleEmergencyTargetSupport(data),
    impactData: mapSingleEmergencyImpactData(data),
  };
};
