import { ZakatPageData, StrapiZakatBasicCard } from "@/types/zakat.types";
import { SectionHeadingData, mapSectionHeading } from "./homepage";
import { getMediaUrl } from "@/utils/strapiHelpers";
import { FaqsData } from "@/types/faqs";
import { CardData } from "@/types/slider.types";
import { ImpactGridItem } from "@/types/impactGrid.types";

// ============================================
// Hero Section
// ============================================
export interface ZakatHeroData {
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

export const mapZakatHero = (data: ZakatPageData): ZakatHeroData => {
  const section = data?.heroSection;
  return {
    sectionHeading: mapSectionHeading(section?.sectionHeading, {
      heading: "",
      subHeading: "",
      description: "",
    }),
    image: {
      url: getMediaUrl(section?.image) || "",
      alt: section?.image?.alternativeText || "Zakat Hero",
    },
    heroMsg: {
      title: section?.heroMSG?.title || "",
      subtitle: section?.heroMSG?.subtitle || "",
      description: section?.heroMSG?.description || "",
    },
  };
};

// ============================================
// Zakat Basic Cards (Fundamentals)
// ============================================
// ============================================
// Zakat Basic Cards (Fundamentals)
// ============================================
export interface ZakatBasicCardData {
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
  example?: string;
}

export interface ZakatBasicCardsSectionData {
  sectionHeading: SectionHeadingData;
  cards: ZakatBasicCardData[];
}

export const mapZakatBasicCards = (
  data: ZakatPageData
): ZakatBasicCardsSectionData => {
  const section = data?.zakatBasicCards;
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
          captionHeading: card.captionTitle || "Bénéficiaires",
          captionDescription: card.captionDescription || "",
        },
        itemsLabel: card.listLabel || "Comment ça marche ?",
        items: card.lists?.map(item => item.description) || [],
        example: "", // This field doesn't exist in current Strapi schema
      })) || [],
  };
};

// ============================================
// Why Trust Section
// ============================================
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
  data: ZakatPageData
): WhyTrustSectionData => {
  const section = data?.whyTrustSection;
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
// Zakat Calculator Section
// ============================================
// ============================================
// Zakat Calculator Section
// ============================================

export interface CalculatorFieldData {
  id: string;
  label: string;
  placeholder: string;
}

export interface CalculatorFormData {
  heading: string;
  nisabTypeLabel: string;
  fields: CalculatorFieldData[];
  totalLabel: string;
  infoMessage: string;
  calculateCtaText: string;
  payCtaText: string;
  note: string;
}

export interface CalculatorStepData {
  id: number;
  number: number;
  title: string;
  description: string;
}

export interface ZakatCalculatorSectionData {
  sectionHeading: SectionHeadingData;
  steps: CalculatorStepData[];
  form: CalculatorFormData;
  manualInput: {
    title: string;
    placeholder: string;
    ctaText: string;
  };
}

export const mapZakatCalculatorSection = (
  data: ZakatPageData
): ZakatCalculatorSectionData => {
  const section = data?.zakatCalculaterSection;
  const form = section?.calculaterForm;

  return {
    sectionHeading: mapSectionHeading(section?.sectionHeading, {
      heading: "",
      subHeading: "",
      description: "",
    }),
    steps:
      section?.cards?.map((card, index) => ({
        id: card.id || index + 1,
        number: parseInt(card.number || String(index + 1), 10),
        title: card.heading || "",
        description: card.description || "",
      })) || [],
    form: {
      heading: form?.heading || "Calculatrice",
      nisabTypeLabel: form?.nisabTypeLable || "Type de Nisab",
      fields:
        form?.calculaterfield?.map((field) => ({
          id: field.key || `field-${field.id}`,
          label: field.lable || "",
          placeholder: field.placeHolder || "0",
        })) || [],
      totalLabel: form?.totalLable || "Total:",
      infoMessage: form?.infoMessage || "",
      calculateCtaText: form?.calculateCtaText || "Calculer ma Zakat",
      payCtaText: form?.payCtaText || "Payer ma Zakat",
      note: form?.note || "",
    },
    manualInput: {
      title: section?.title || "Vous connaissez déjà le montant de votre Zakat ?",
      placeholder: section?.placholderText || "Montant de votre zakat",
      ctaText: section?.ctaText || "Payer ma Zakat",
    },
  };
};

// ============================================
// Distribution Section
// ============================================
export interface DistributionItemData {
  id: number;
  title: string;
  description: string;
  icon: string; // Assuming icon is needed
  theme: ImpactGridItem["theme"]; // Use the correct theme type
}

export interface DistributionSectionData {
  sectionHeading: SectionHeadingData;
  items: DistributionItemData[];
  images: string[];
}

export const mapDistributionSection = (
  data: ZakatPageData
): DistributionSectionData => {
  const section = data?.destributionSection;
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

export const mapInitiativesSection = (data: ZakatPageData): InitiativesSectionData => {
    const section = data?.impactCard;
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
export interface ZakatCTAData {
  sectionHeading: SectionHeadingData;
  cta: {
    text: string;
    link: string;
  };
}

export const mapZakatCTA = (data: ZakatPageData): ZakatCTAData => {
  const section = data?.callToAction;
  const firstCTA = section?.CTA?.[0];
  return {
    sectionHeading: mapSectionHeading(section?.sectionHeading, {
      heading: "",
      subHeading: "",
      description: "",
    }),
    cta: {
      text: firstCTA?.label || "je verse ma zakat al maal",
      link: firstCTA?.url || "/donate",
    },
  };
};

// ============================================
// FAQ Section
// ============================================
export const mapZakatFaqs = (data: ZakatPageData): FaqsData => {
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
export interface ZakatMappedData {
  hero: ZakatHeroData;
  basicCards: ZakatBasicCardsSectionData;
  whyTrust: WhyTrustSectionData;
  calculator: ZakatCalculatorSectionData;
  distribution: DistributionSectionData;
  initiatives: InitiativesSectionData;
  cta: ZakatCTAData;
  faqs: FaqsData;
  faqSectionHeading: SectionHeadingData;
}

export const mapZakatPageData = (data: ZakatPageData): ZakatMappedData => {
  return {
    hero: mapZakatHero(data),
    basicCards: mapZakatBasicCards(data),
    whyTrust: mapWhyTrustSection(data),
    calculator: mapZakatCalculatorSection(data),
    distribution: mapDistributionSection(data),
    initiatives: mapInitiativesSection(data),
    cta: mapZakatCTA(data),
    faqs: mapZakatFaqs(data),
    faqSectionHeading: mapSectionHeading(data?.faqSection?.sectionHeading, {
      heading: "Questions Fréquentes",
      subHeading: "FAQ",
      description: "",
    }),
  };
};
