// src/lib/mappers/emergenciesListing.ts
// Mapper functions for the emergencies listing page

import { StrapiEmergenciesListingPage } from "@/types/emergenciesListingStrapi.types";
import {
  EmergenciesHeroData,
  EmergenciesRespondingData,
  EmergenciesHowWeWorkData,
  EmergenciesCallToActionData,
  EmergenciesMappedData,
} from "@/types/emergenciesListing.types";
import { mapSectionHeading } from "./homepage";
import { getMediaUrl } from "@/utils/strapiHelpers";
import { ImpactData } from "@/types/impactData";

// ============================================
// Hero Section (Sec1)
// ============================================
export const mapEmergenciesHero = (
  data: StrapiEmergenciesListingPage
): EmergenciesHeroData => {
  const sec1 = data?.Sec1;
  const images = sec1?.images || [];
  const stats = sec1?.stats || [];

  // Create carousel from images
  const carouselItems = images.map((img, index) => ({
    id: String(img.id || index + 1),
    url: getMediaUrl(img) || "/Images/Homepage-Hero-1.png",
    alt: img.alternativeText || "Emergency Relief",
    title: sec1?.sectionHeading?.heading || "WHEN DISASTER STRIKES",
    subtitle: sec1?.sectionHeading?.subHeading || "",
    buttonText: "Donate",
    buttonLink: "/donate",
  }));

  // If no images, add a default
  if (carouselItems.length === 0) {
    carouselItems.push({
      id: "1",
      url: "/Images/Homepage-Hero-1.png",
      alt: "Emergency Relief",
      title: sec1?.sectionHeading?.heading || "WHEN DISASTER STRIKES",
      subtitle: sec1?.sectionHeading?.subHeading || "",
      buttonText: "Donate",
      buttonLink: "/donate",
    });
  }

  return {
    sectionHeading: mapSectionHeading(sec1?.sectionHeading, {
      heading: "WHEN DISASTER STRIKES",
      subHeading: "We respond with faith and compassion.",
      description: "",
    }),
    carouselData: {
      carouselItems,
    },
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
// Responding Section (Sec2)
// ============================================
export const mapEmergenciesResponding = (
  data: StrapiEmergenciesListingPage
): EmergenciesRespondingData => {
  const sec2 = data?.Sec2;
  const templates = sec2?.selectedTemplates || [];

  const cards = templates.map((template) => {
    const cardData = template.ListingPageCardData;
    return {
      image: getMediaUrl(cardData?.cardImage) || "/Images/ResponseCard-1.png",
      alt:
        cardData?.cardImage?.alternativeText || cardData?.title || "Emergency",
      title: cardData?.title || "",
      description: cardData?.description?.replace(/\n/g, " ").trim() || "",
      buttons: [
        {
          label: "DONATE NOW",
          link: "/donate",
          bgColor: "yellow",
        },
        {
          label:
            cardData?.LearnMoreButton?.label?.toUpperCase() || "LEARN MORE",
          link: cardData?.LearnMoreButton?.url || "#",
          bgColor: "white",
        },
      ],
    };
  });

  return {
    sectionHeading: mapSectionHeading(sec2?.sectionHeading, {
      heading: "Where We're Responding",
      subHeading: "Crisis Spotlight",
      description:
        "Crisis situations requiring immediate support from our global community",
    }),
    cards,
  };
};

// ============================================
// How We Work Section (Sec3)
// ============================================
export const mapEmergenciesHowWeWork = (
  data: StrapiEmergenciesListingPage
): EmergenciesHowWeWorkData => {
  const sec3 = data?.Sec3;
  const howWeWorkCards = sec3?.howWeWorkCard || [];

  // Map theme from API to component theme
  const themeMap: Record<string, "red" | "blue" | "green"> = {
    red: "red",
    green: "green",
    blue: "blue",
  };

  // Map icon based on theme
  const iconMap: Record<string, string> = {
    red: "/Icons/Sadaqah-red.svg",
    blue: "/Icons/Sadaqah-royal.svg",
    green: "/Icons/Sadaqah-green.svg",
  };

  const cards = howWeWorkCards.map((card, index) => {
    const theme = themeMap[card.theme?.toLowerCase()] || "red";
    const items =
      card.featureItem?.map(
        (item) => item.bulletPoint?.replace(/\n/g, " ").trim() || ""
      ) || [];

    return {
      id: String(card.id || index + 1),
      theme,
      icon: iconMap[theme] || "/Icons/Sadaqah-red.svg",
      label: card.subHeading || "",
      title: card.Heading?.toUpperCase() || "",
      description: card.description?.replace(/\n/g, " ").trim() || "",
      items,
    };
  });

  // Get the background image URL using getMediaUrl
  const backgroundImageUrl = sec3?.backgroundImage
    ? getMediaUrl(sec3.backgroundImage) || "/Images/Together-we-grow.png"
    : "/Images/Together-we-grow.png";

  return {
    sectionHeading: mapSectionHeading(sec3?.sectionHeading, {
      heading: "Together, We Make Relief Possible",
      subHeading: "How We Work",
      description:
        "Every donation powers emergency response from the first day to the final rebuild.",
    }),
    cards,
    mainHeading: mapSectionHeading(sec3?.mainHeading, {
      heading: "Together, We Make Relief Possible",
      subHeading: "How We Work",
      description:
        "Every donation powers emergency response from the first day to the final rebuild.",
    }),
    backgroundImage: {
      id: sec3?.backgroundImage?.id || 0,
      url: backgroundImageUrl,
      alternativeText: sec3?.backgroundImage?.alternativeText || "",
      width: sec3?.backgroundImage?.width || 0,
      height: sec3?.backgroundImage?.height || 0,
    },
  };
};

// ============================================
// Call To Action Section
// ============================================
export const mapEmergenciesCallToAction = (
  data: StrapiEmergenciesListingPage
): EmergenciesCallToActionData => {
  const cta = data?.callToAction;
  const buttons = cta?.CTA || [];

  return {
    sectionHeading: mapSectionHeading(cta?.sectionHeading, {
      heading: "Lives Supported Last Year",
      subHeading: "Over 2.4 Million",
      description:
        "Your contributions don't just respond to emergencies - they build resilience, restore hope, and create sustainable futures for communities worldwide.",
    }),
    buttons: buttons.map((btn) => ({
      label: btn.label || "",
      url: btn.url || "/donate",
    })),
  };
};

// ============================================
// Impact Data Section
// ============================================
export const mapEmergenciesImpactData = (
  data: StrapiEmergenciesListingPage
): ImpactData => {
  const impactItems = data?.impactData || [];

  return {
    stats: impactItems.map((item, index) => ({
      id: item.id || index + 1,
      icon: getMediaUrl(item.image) || "/Icons/Sadaqah.png",
      value: "",
      label: item.title || "",
      description: item.description || "",
    })),
  };
};

// ============================================
// Map All Data
// ============================================
export const mapEmergenciesPageData = (
  data: StrapiEmergenciesListingPage
): EmergenciesMappedData => {
  return {
    hero: mapEmergenciesHero(data),
    responding: mapEmergenciesResponding(data),
    howWeWork: mapEmergenciesHowWeWork(data),
    callToAction: mapEmergenciesCallToAction(data),
    impactData: mapEmergenciesImpactData(data),
  };
};
