// src/lib/mappers/bankInterest.ts

import { BankInterestPageData } from "@/types/bankInterest.types";
import { SectionHeadingData, mapSectionHeading } from "./homepage";
import { getMediaUrl } from "@/utils/strapiHelpers";
import { FaqsData } from "@/types/faqs";
import { CardData } from "@/types/slider.types";
import { ImpactGridItem } from "@/types/impactGrid.types";

// ============================================
// Hero Section
// ============================================
export interface BankInterestHeroData {
  sectionHeading: SectionHeadingData;
  image: {
    url: string;
    alt: string;
  };
  ctaText: string;
  ctaLink: string;
}

export const mapBankInterestHero = (
  data: BankInterestPageData
): BankInterestHeroData => {
  const section = data?.heroSection;
  return {
    sectionHeading: mapSectionHeading(section?.sectionHeading, {
      heading: "",
      subHeading: "",
      description: "",
    }),
    image: {
      url: getMediaUrl(section?.image) || "",
      alt: section?.image?.alternativeText || "Bank Interest Hero",
    },
    ctaText: section?.ctaText || "je donne mes intérêts bancaires",
    ctaLink: section?.ctaLink || "/donate",
  };
};

// ============================================
// Bank Interest Basic Cards (Fundamentals)
// ============================================
export interface BankInterestBasicCardData {
  id: number;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  caption: {
    captionHeading: string;
    captionDescription: string;
  };
}

export interface BankInterestBasicCardsSectionData {
  sectionHeading: SectionHeadingData;
  cards: BankInterestBasicCardData[];
}

export const mapBankInterestBasicCards = (
  data: BankInterestPageData
): BankInterestBasicCardsSectionData => {
  const section = data?.bankIntrestBasicSection;
  return {
    sectionHeading: mapSectionHeading(section?.sectionHeading, {
      heading: "",
      subHeading: "",
      description: "",
    }),
    cards:
      section?.cards?.map((card, index) => ({
        id: card.id || index + 1,
        title: card.title || "",
        description: card.description || "",
        buttonText: card.ctaText || "",
        buttonLink: card.ctaLink || "",
        caption: {
          captionHeading: card.captionTitle || "",
          captionDescription: card.captionDescription || "",
        },
      })) || [],
  };
};

// ============================================
// Why Trust Us Section
// ============================================
export interface WhyTrustCardData {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface WhyTrustSectionData {
  sectionHeading: SectionHeadingData;
  cards: WhyTrustCardData[];
}

export const mapWhyTrustSection = (
  data: BankInterestPageData
): WhyTrustSectionData => {
  const section = data?.whyTrustUsSection;
  return {
    sectionHeading: mapSectionHeading(section?.sectionHeading, {
      heading: "",
      subHeading: "",
      description: "",
    }),
    cards:
      section?.cards?.map((card, index) => ({
        id: String(card.id || index + 1),
        icon: getMediaUrl(card.iconImage) || "",
        title: card.heading || "",
        description: card.description || "",
      })) || [],
  };
};

// ============================================
// Distribution Section
// ============================================
export interface DistributionItemData {
  id: number;
  description: string;
  icon: string;
  theme: ImpactGridItem["theme"];
}

export interface DistributionSectionData {
  sectionHeading: SectionHeadingData;
  items: DistributionItemData[];
  images: string[];
}

export const mapDistributionSection = (
  data: BankInterestPageData
): DistributionSectionData => {
  const section = data?.fundDestributionSection;
  return {
    sectionHeading: mapSectionHeading(section?.sectionHeading, {
      heading: "",
      subHeading: "",
      description: "",
    }),
    items:
      section?.destributionlist?.map((item, index) => ({
        id: item.id || index + 1,
        description: item.description || "",
        icon: getMediaUrl(item.icon) || "",
        theme: "primary" as const,
      })) || [],
    images:
      section?.images?.map((img) => getMediaUrl(img) || "").filter(Boolean) ||
      [],
  };
};

// ============================================
// Initiatives (Impact Card) Section
// ============================================
export interface InitiativesSectionData {
  sectionHeading: SectionHeadingData;
  cards: CardData[];
}

export const mapInitiativesSection = (
  data: BankInterestPageData
): InitiativesSectionData => {
  const section = data?.impactCardSection;
  return {
    sectionHeading: mapSectionHeading(section?.sectionHeading, {
      heading: "",
      subHeading: "",
      description: "",
    }),
    cards:
      section?.initiativesCard?.map((card, index) => ({
        id: String(card.id || index + 1),
        variant: "campaign" as const,
        headerImage: getMediaUrl(card.image) || "",
        headerImageAlt: card.title || "",
        heading: card.title || "",
        subHeading: card.description || "",
        buttons: [
          {
            label: card.ctaText || "En savoir plus",
            href: card.ctaLink || "#",
            color: "primary" as const,
            variant: "ghost" as const,
            buttonStyle: "link-blue-arrow",
          },
        ],
      })) || [],
  };
};

// ============================================
// Call To Action Section
// ============================================
export interface BankInterestCTAData {
  sectionHeading: SectionHeadingData;
  cta: {
    text: string;
    link: string;
  };
}

export const mapBankInterestCTA = (
  data: BankInterestPageData
): BankInterestCTAData => {
  const section = data?.callToAction;
  return {
    sectionHeading: mapSectionHeading(section?.sectionHeading, {
      heading: "",
      subHeading: "",
      description: "",
    }),
    cta: {
      text: section?.CTA?.label || "je fais don de mes intérêts bancaires",
      link: section?.CTA?.url || "/donate",
    },
  };
};

// ============================================
// FAQ Section
// ============================================
export interface FaqSectionData {
  sectionHeading: SectionHeadingData;
  faqs: FaqsData;
}

export const mapBankInterestFaqs = (
  data: BankInterestPageData
): FaqSectionData => {
  const section = data?.faqSection;
  return {
    sectionHeading: mapSectionHeading(section?.sectionHeading, {
      heading: "Questions Fréquentes",
      subHeading: "FAQ",
      description: "",
    }),
    faqs: {
      faqs:
        section?.faqs?.map((faq, index) => ({
          id: faq.id || index + 1,
          question: faq.question || "",
          answer: faq.answer || "",
        })) || [],
      cta: {
        label: "Load More",
        action: "/faq",
      },
    },
  };
};

// ============================================
// Map All Data
// ============================================
export interface BankInterestMappedData {
  hero: BankInterestHeroData;
  basicCards: BankInterestBasicCardsSectionData;
  whyTrust: WhyTrustSectionData;
  distribution: DistributionSectionData;
  initiatives: InitiativesSectionData;
  cta: BankInterestCTAData;
  faqSection: FaqSectionData;
}

export const mapBankInterestPageData = (
  data: BankInterestPageData
): BankInterestMappedData => {
  return {
    hero: mapBankInterestHero(data),
    basicCards: mapBankInterestBasicCards(data),
    whyTrust: mapWhyTrustSection(data),
    distribution: mapDistributionSection(data),
    initiatives: mapInitiativesSection(data),
    cta: mapBankInterestCTA(data),
    faqSection: mapBankInterestFaqs(data),
  };
};
