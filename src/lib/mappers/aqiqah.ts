import { AqiqahPageData } from "@/types/aqiqah.types";
import { SectionHeadingData, mapSectionHeading } from "../mappers/homepage";
import { getMediaUrl } from "@/utils/strapiHelpers";
import { ImpactStat } from "@/types/impactStats";
import { FaqsData } from "@/types/faqs";

// ============================================
// Hero Section
// ============================================
export interface AqiqahHeroData {
  sectionHeading: SectionHeadingData;
  images: Array<{
    id: number;
    url: string;
    alt: string;
  }>;
  stats: ImpactStat[];
}

export const mapAqiqahHero = (data: AqiqahPageData): AqiqahHeroData => {
  const heroSection = data?.heroSection;
  return {
    sectionHeading: mapSectionHeading(heroSection?.sectionHeading, {
      heading: "",
      subHeading: "",
      description: "",
    }),
    images:
      heroSection?.images?.map((image, index) => ({
        id: image.id || index + 1,
        url: getMediaUrl(image) || "",
        alt: image.alternativeText || "Hero image",
      })) || [],
    stats:
      heroSection?.stats?.map((stat, index) => ({
        id: stat.id || index + 1,
        value: stat.value || "",
        label: stat.caption || "",
        type: "count",
      })) || [],
  };
};

// ============================================
// Sec1 - AqiqahOverviewSection
// ============================================
export interface AqiqahOverviewCardData {
  id: number;
  heading: string;
  description: string;
  howItsWorkHeading: string;
  points: string[];
  estimateAmount: string;
  ctaText: string;
  ctaLink: string;
}

export interface AqiqahOverviewSectionData {
  sectionHeading: SectionHeadingData;
  cards: AqiqahOverviewCardData[];
}

export const mapAqiqahOverviewSection = (
  data: AqiqahPageData
): AqiqahOverviewSectionData => {
  const section = data?.Sec1;
  return {
    sectionHeading: mapSectionHeading(section?.sectionHeading, {
      heading: "",
      subHeading: "",
      description: "",
    }),
    cards:
      section?.cards?.map((card, index) => ({
        id: card.id || index + 1,
        heading: card.heading || "",
        description: card.description || "",
        howItsWorkHeading: card.howItsWorkHeading || "",
        points:
          card.points
            ?.map((point) => point.BulletPoint || "")
            .filter(Boolean) || [],
        estimateAmount: card.fidyaexample?.estimateAmount || "",
        ctaText: card.ctaText || "",
        ctaLink: card.ctaLink || "",
      })) || [],
  };
};

// ============================================
// Sec2 - AqiqahProcessSection
// ============================================
export interface AqiqahProcessCardData {
  id: number;
  iconImage: string;
  iconAlt: string;
  heading: string;
  description: string;
}

export interface AqiqahProcessSectionData {
  sectionHeading: SectionHeadingData;
  cards: AqiqahProcessCardData[];
}

export const mapAqiqahProcessSection = (
  data: AqiqahPageData
): AqiqahProcessSectionData => {
  const section = data?.Sec2;
  return {
    sectionHeading: mapSectionHeading(section?.sectionHeading, {
      heading: "",
      subHeading: "",
      description: "",
    }),
    cards:
      section?.cards?.map((card, index) => ({
        id: card.id || index + 1,
        iconImage: getMediaUrl(card.iconImage) || "",
        iconAlt: card.iconImage?.alternativeText || "Icon",
        heading: card.heading || "",
        description: card.description || "",
      })) || [],
  };
};

// ============================================
// Sec3 - WhyIslamicReliefSection
// ============================================
export interface WhyIslamicReliefCardData {
  id: number;
  iconImage: string;
  iconAlt: string;
  heading: string;
  description: string;
}

export interface WhyIslamicReliefSectionData {
  sectionHeading: SectionHeadingData;
  cards: WhyIslamicReliefCardData[];
  number: number;
  description: string;
}

export const mapWhyIslamicReliefSection = (
  data: AqiqahPageData
): WhyIslamicReliefSectionData => {
  const section = data?.Sec3;
  return {
    sectionHeading: mapSectionHeading(section?.sectionHeading, {
      heading: "",
      subHeading: "",
      description: "",
    }),
    cards:
      section?.cards?.map((card, index) => ({
        id: card.id || index + 1,
        iconImage: getMediaUrl(card.iconImage) || "",
        iconAlt: card.iconImage?.alternativeText || "Icon",
        heading: card.heading || "",
        description: card.description || "",
      })) || [],
    number: section?.number || 0,
    description: section?.description || "",
  };
};

// ============================================
// CallToAction Section
// ============================================
export interface CallToActionCTA {
  id: number;
  label: string;
  url: string;
}

export interface CallToActionSectionData {
  sectionHeading: SectionHeadingData;
  ctas: CallToActionCTA[];
}

export const mapCallToActionSection = (
  data: AqiqahPageData
): CallToActionSectionData => {
  const section = data?.callToAction;
  return {
    sectionHeading: mapSectionHeading(section?.sectionHeading, {
      heading: "",
      subHeading: "",
      description: "",
    }),
    ctas:
      section?.CTA?.map((cta, index) => ({
        id: cta.id || index + 1,
        label: cta.label || "",
        url: cta.url || "",
      })) || [],
  };
};

// ============================================
// FAQ Section
// ============================================
export const mapAqiqahFaqs = (data: AqiqahPageData): FaqsData => {
  const faqItems = data?.faqs?.faqs;

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
export const mapAqiqahPageData = (data: AqiqahPageData) => {
  return {
    hero: mapAqiqahHero(data),
    overviewSection: mapAqiqahOverviewSection(data),
    processSection: mapAqiqahProcessSection(data),
    whyIslamicReliefSection: mapWhyIslamicReliefSection(data),
    callToAction: mapCallToActionSection(data),
    faqs: mapAqiqahFaqs(data),
    faqSectionHeading: mapSectionHeading(data?.faqs?.sectionHeading, {
      heading: "YOUR QUESTIONS, ANSWERED",
      subHeading: "Follow Us",
      description:
        "Get quick answers to the most common questions about our platform and services.",
    }),
  };
};
