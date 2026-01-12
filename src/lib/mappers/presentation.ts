import { PresentationPageData } from "@/types/presentation.types";
import { SectionHeadingData, mapSectionHeading } from "./homepage";
import { getMediaUrl } from "@/utils/strapiHelpers";
import { LatestNewsCardData } from "@/types/latestNewsCard";
import { ImpactStat as HeroImpactStat } from "@/types/impactStats";
import { FaqsData } from "@/types/faqs";
import { ResponseCardData } from "@/types/responseCard";
import { ImpactData } from "@/types/impactData";

// Presentation Hero Section Data
export interface PresentationHeroData {
  sectionHeading: SectionHeadingData;
  images: Array<{
    id: number;
    url: string;
    alt: string;
  }>;
  impactStats: HeroImpactStat[];
}

// Presentation Card Data
export interface PresentationCardData {
  id: number;
  image: string;
  imageAlt: string;
  heading: string;
  description: string;
  ctaText: string;
}

// Map hero section data
export const mapPresentationHero = (
  presentationPage: PresentationPageData
): PresentationHeroData => {
  const heroSection = presentationPage?.heroSection;

  return {
    sectionHeading: mapSectionHeading(heroSection?.sectionHeading, {
      heading: "ISLAMIC RELIEF SUISSE",
      subHeading: "Ensemble, pour un avenir meilleur",
      description: "",
    }),
    images:
      heroSection?.images?.map((image, index) => ({
        id: image.id || index + 1,
        url: getMediaUrl(image) || "",
        alt: image.alternativeText || "Presentation hero image",
      })) || [],
    impactStats:
      heroSection?.stats?.map((stat, index) => ({
        id: stat.id || index + 1,
        value: stat.value || "",
        label: stat.caption || "",
        type: "count",
      })) || [],
  };
};

// Map ensemble/presentation cards section
export const mapPresentationCards = (
  presentationPage: PresentationPageData
): {
  sectionHeading: SectionHeadingData;
  cards: ResponseCardData[];
} => {
  /* 
    The presentationCardSection is a repeatable component in Strapi. 
    It can be either a single object (if strict mode) or an array of sections.
    We need to handle both cases and aggregate all cards.
  */
  const sectionRaw = presentationPage?.presentationCardSection;
  const sections = Array.isArray(sectionRaw) ? sectionRaw : (sectionRaw ? [sectionRaw] : []);
  
  // Use the section heading from the first section, or default fallbacks
  const firstSection = sections[0];

  // Aggregate cards from all sections
  const allCards = sections.flatMap((section) => 
    section.presentationCard?.map((card, index) => ({
      image: getMediaUrl(card.image) || "",
      alt:
        card.image?.alternativeText ||
        card.heading ||
        "Presentation card image",
      title: card.heading || "",
      description: card.description || "",
      buttons: [
        {
          label: "DONATE NOW",
          link: "/donate",
          bgColor: "yellow",
        },
        {
          label: card.ctaText || "LEARN MORE",
          link: card.ctaLink || "#",
          bgColor: "white",
        },
      ],
    })) || []
  );

  return {
    sectionHeading: mapSectionHeading(firstSection?.sectionHeading, {
      heading: "Présentation d'islamic relief suisse",
      subHeading: "Ensemble, pour un avenir meilleur",
      description:
        "Urgence humanitaire : votre solidarité peut tout changer, dès maintenant.",
    }),
    cards: allCards,
  };
};

// CallToAction Section Data Types
export interface CallToActionCTA {
  id: number;
  label: string;
  url: string;
}

export interface CallToActionSectionData {
  sectionHeading: SectionHeadingData;
  ctas: CallToActionCTA[];
}

// Map call to action section
export const mapCallToAction = (
  presentationPage: PresentationPageData
): CallToActionSectionData => {
  const section = presentationPage?.callToActionSection;

  return {
    sectionHeading: mapSectionHeading(section?.sectionHeading, {
      heading: "L'humanité est notre motivation",
      subHeading: "L'humanité est notre famille.",
      description:
        "Le fonds des urgences est ce qui permet à notre ONG d'intervenir immédiatement lorsqu'une crise frappe.",
    }),
    ctas:
      section?.CTA?.map((cta, index) => ({
        id: cta.id || index + 1,
        label: cta.label || "",
        url: cta.url || "",
      })) || [],
  };
};

// Map news cards section - returns global LatestNewsCardData type
export const mapPresentationNewsCards = (
  presentationPage: PresentationPageData
): {
  sectionHeading: SectionHeadingData;
  cards: LatestNewsCardData[];
} => {
  const section = presentationPage?.newsCardSection;

  return {
    sectionHeading: mapSectionHeading(section?.sectionHeading, {
      heading: "Latest News",
      subHeading: "Stories",
      description:
        "Built on faith, powered by experience, trusted by millions worldwide",
    }),
    cards:
      section?.newsCard?.map((card, index) => ({
        id: card.id || index + 1,
        image: getMediaUrl(card.image) || "/Images/mockImages/LatestNews1.png",
        title: card.heading || "News Article",
        read: card.readTime ? `${card.readTime} MIN READ` : "3 MIN READ",
        date: card.publishedDate
          ? new Date(card.publishedDate)
              .toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })
              .toUpperCase()
          : "DECEMBER 13, 2023",
        categories: [card.tag1 || "Article", card.tag2 || "Fundraiser"].filter(
          Boolean
        ),
        link: `/news/${card.id || index}`,
      })) || [],
  };
};

// Map FAQ section - returns global FaqsData type
export const mapPresentationFaqs = (
  presentationPage: PresentationPageData
): FaqsData => {
  const faqs = presentationPage?.faqSection?.faqs;

  return {
    faqs:
      faqs?.map((faq, index) => ({
        id: faq.id || index + 1,
        question: faq.question || "Question",
        answer: faq.answer || "",
      })) || [],
    cta: {
      label: "Load More",
      action: "/faq",
    },
  };
};

// Map Impact Data section
export const mapPresentationImpactData = (
  presentationPage: PresentationPageData
): ImpactData & {
  colors: {
    lineColor?: string;
    iconBoxBorderColor?: string;
    iconBoxBackgroundColor?: string;
    iconColor?: string;
  };
  sectionHeading?: SectionHeadingData;
} => {
  const sections = presentationPage?.impactDataSection;

  if (!sections || !Array.isArray(sections)) {
    return {
      stats: [],
      colors: {},
    };
  }

  // extract colors and heading from the first section
  const firstSection = sections[0];
  const colors = {
    lineColor: firstSection?.lineColor,
    iconBoxBorderColor: firstSection?.iconBoxBorderColor,
    iconBoxBackgroundColor: firstSection?.iconBoxBackgroundColor,
    iconColor: firstSection?.iconColor,
  };
  
  const sectionHeading = firstSection?.sectionHeading 
    ? mapSectionHeading(firstSection.sectionHeading, {
        heading: "", subHeading: "", description: ""
      }) 
    : undefined;

  const stats = sections.map((section, index) => {
    const data = section.impactData;
    return {
      id: data?.id || index + 1,
      icon: getMediaUrl(data?.icon) || "/Icons/Sadaqah.png",
      value: data?.heading || "",
      label: data?.subHeading || "",
      description: data?.description || "",
    };
  });

  return { stats, colors, sectionHeading };
};

// Get all presentation page data mapped
export const mapPresentationPageData = (
  presentationPage: PresentationPageData
) => {
  return {
    hero: mapPresentationHero(presentationPage),
    presentationCards: mapPresentationCards(presentationPage),
    callToAction: mapCallToAction(presentationPage),
    impactData: mapPresentationImpactData(presentationPage),
    newsCards: mapPresentationNewsCards(presentationPage),
    faqs: mapPresentationFaqs(presentationPage),
  };
};
