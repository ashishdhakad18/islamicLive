import { WaqfPageDataFromStrapi } from "@/types/waqf.types";
import { SectionHeadingData, mapSectionHeading } from "./homepage";
import { getMediaUrl } from "@/utils/strapiHelpers";
import { FaqsData } from "@/types/faqs";
import { CardData } from "@/types/slider.types";
import { ImpactGridItem } from "@/types/impactGrid.types";

// ============================================
// Hero Section
// ============================================
export interface WaqfHeroData {
  sectionHeading: SectionHeadingData;
  image: {
    url: string;
    alt: string;
  };
  heroMsg: {
    title: string;
    subtitle: string;
    description: string;
  };
}

export const mapWaqfHero = (data: WaqfPageDataFromStrapi): WaqfHeroData => {
  const section = data?.heroSection;
  return {
    sectionHeading: mapSectionHeading(section?.sectionHeading, {
      heading: "",
      subHeading: "",
      description: "",
    }),
    image: {
      url: getMediaUrl(section?.image) || "",
      alt: section?.image?.alternativeText || "Waqf Hero",
    },
    heroMsg: {
      title: section?.heroMSG?.title || "",
      subtitle: section?.heroMSG?.subtitle || "",
      description: section?.heroMSG?.description || "",
    },
  };
};

// ============================================
// Waqf Basic Cards (Fundamentals)
// ============================================
export interface WaqfBasicCardData {
  id: number;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  caption: {
    captionHeading: string;
    captionDescription: string;
  };
  itemsLabel: string;
  items: string[];
}

export interface WaqfBasicCardsSectionData {
  sectionHeading: SectionHeadingData;
  cards: WaqfBasicCardData[];
}

export const mapWaqfBasicCards = (
  data: WaqfPageDataFromStrapi
): WaqfBasicCardsSectionData => {
  const section = data?.waqfBasicSection;
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
        itemsLabel: card.listLabel || "",
        items: card.lists?.map(item => item.description) || [],
      })) || [],
  };
};

// ============================================
// Why Trust Section
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
  data: WaqfPageDataFromStrapi
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
  title: string;
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
  data: WaqfPageDataFromStrapi
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
        title: item.heading || "",
        description: item.description || "",
        icon: getMediaUrl(item.icon) || "",
        theme: "primary",
      })) || [],
    images: section?.images?.map((img) => getMediaUrl(img) || "").filter(Boolean) || [],
  };
};

// ============================================
// Initiatives (Impact) Section
// ============================================
export interface InitiativesSectionData {
    sectionHeading: SectionHeadingData;
    cards: CardData[];
}

export const mapInitiativesSection = (data: WaqfPageDataFromStrapi): InitiativesSectionData => {
    const section = data?.impactCardSection;
    return {
        sectionHeading: mapSectionHeading(section?.sectionHeading, {
            heading: "",
            subHeading: "",
            description: "",
        }),
        cards: section?.initiativesCard?.map((card, index) => ({
            id: String(card.id || index + 1),
            variant: "campaign",
            headerImage: getMediaUrl(card.image) || "",
            headerImageAlt: card.title || "",
            heading: card.title || "",
            subHeading: card.description || "",
            buttons: [
              {
                label: card.ctaText || "En savoir plus",
                href: card.ctaLink || "#",
                color: "primary",
                variant: "ghost",
                buttonStyle: "link-blue-arrow",
              }
            ]
        })) || []
    };
}


// ============================================
// Call To Action Section
// ============================================
export interface WaqfCTAData {
  sectionHeading: SectionHeadingData;
  cta: {
    text: string;
    link: string;
  };
}

export const mapWaqfCTA = (data: WaqfPageDataFromStrapi): WaqfCTAData => {
  const section = data?.callToAction;
  const firstCTA = section?.CTA?.[0];
  return {
    sectionHeading: mapSectionHeading(section?.sectionHeading, {
      heading: "",
      subHeading: "",
      description: "",
    }),
    cta: {
      text: firstCTA?.label || "faire un don",
      link: firstCTA?.url || "/donate",
    },
  };
};

// ============================================
// FAQ Section
// ============================================
export const mapWaqfFaqs = (data: WaqfPageDataFromStrapi): FaqsData => {
  const faqItems = data?.faqSection?.faqs;

  return {
    faqs:
      faqItems?.map((faq, index) => ({
        id: faq.id || index + 1,
        question: faq.question || "",
        answer: faq.answer || "",
      })) || [],
    cta: {
      label: "Load More",
      action: "/faq",
    },
  };
};

// ============================================
// Map All Data
// ============================================
export interface WaqfMappedData {
  hero: WaqfHeroData;
  basicCards: WaqfBasicCardsSectionData;
  whyTrust: WhyTrustSectionData;
  distribution: DistributionSectionData;
  initiatives: InitiativesSectionData;
  cta: WaqfCTAData;
  faqs: FaqsData;
  faqSectionHeading: SectionHeadingData;
}

export const mapWaqfPageData = (data: WaqfPageDataFromStrapi): WaqfMappedData => {
  return {
    hero: mapWaqfHero(data),
    basicCards: mapWaqfBasicCards(data),
    whyTrust: mapWhyTrustSection(data),
    distribution: mapDistributionSection(data),
    initiatives: mapInitiativesSection(data),
    cta: mapWaqfCTA(data),
    faqs: mapWaqfFaqs(data),
    faqSectionHeading: mapSectionHeading(data?.faqSection?.sectionHeading, {
      heading: "Questions Fréquentes",
      subHeading: "FAQ",
      description: "",
    }),
  };
};
