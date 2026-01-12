import { FidyaKaffaraPageData } from "@/types/fidyaKaffara.types";
import { SectionHeadingData, mapSectionHeading } from "./homepage";
import { getMediaUrl } from "@/utils/strapiHelpers";
import { LatestNewsCardData } from "@/types/latestNewsCard";
import { ImpactStat } from "@/types/impactStats";
import { FaqsData } from "@/types/faqs";
import { SocialMediaPost } from "@/types/socialmedia";

// ============================================
// Hero Section
// ============================================
export interface FidyaKaffaraHeroData {
  sectionHeading: SectionHeadingData;
  images: Array<{
    id: number;
    url: string;
    alt: string;
  }>;
  stats: ImpactStat[];
}

export const mapFidyaKaffaraHero = (
  data: FidyaKaffaraPageData
): FidyaKaffaraHeroData => {
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
// Sec1 - FidyaKaffaraCardSection
// ============================================
export interface FidyaKaffaraCardData {
  id: number;
  heading: string;
  description: string;
  howItsWorkHeading: string;
  points: string[];
  estimateAmount: string;
  ctaText: string;
  ctaLink: string;
}

export interface FidyaKaffaraCardSectionData {
  sectionHeading: SectionHeadingData;
  cards: FidyaKaffaraCardData[];
}

export const mapFidyaKaffaraCardSection = (
  data: FidyaKaffaraPageData
): FidyaKaffaraCardSectionData => {
  const section = data?.Sec1;
  return {
    sectionHeading: mapSectionHeading(section?.sectionHeading, {
      heading: "",
      subHeading: "",
      description: "",
    }),
    cards:
      section?.fidyaKaffaracard?.map((card, index) => ({
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
// Sec2 - CalculaterSection
// ============================================
export interface CalculaterCardData {
  id: number;
  iconImage: string;
  iconAlt: string;
  heading: string;
  description: string;
}

export interface CalculaterFormData {
  heading: string;
  tabs: string;
  placeHolder: string;
  currency: string;
  ctaText: string;
  ctaLink: string;
}

export interface CalculaterSectionData {
  sectionHeading: SectionHeadingData;
  cards: CalculaterCardData[];
  form: CalculaterFormData;
}

export const mapCalculaterSection = (
  data: FidyaKaffaraPageData
): CalculaterSectionData => {
  const section = data?.Sec2;
  const form = section?.form;
  return {
    sectionHeading: mapSectionHeading(section?.sectionHeading, {
      heading: "",
      subHeading: "",
      description: "",
    }),
    cards:
      section?.card?.map((card, index) => ({
        id: card.id || index + 1,
        iconImage: getMediaUrl(card.iconImage) || "",
        iconAlt: card.iconImage?.alternativeText || "Icon",
        heading: card.heading || "",
        description: card.description || "",
      })) || [],
    form: {
      heading: form?.heading || "",
      tabs: form?.tabs || "",
      placeHolder: form?.placeHolder || "",
      currency: form?.currency || "",
      ctaText: form?.ctaText || "",
      ctaLink: form?.ctaLink || "",
    },
  };
};

// ============================================
// Sec3 - BlessingSection
// ============================================
export interface BlessingListItem {
  id: number;
  icon: string;
  iconAlt: string;
  description: string;
}

export interface BlessingSectionData {
  sectionHeading: SectionHeadingData;
  listData: BlessingListItem[];
  images: Array<{
    id: number;
    url: string;
    alt: string;
  }>;
}

export const mapBlessingSection = (
  data: FidyaKaffaraPageData
): BlessingSectionData => {
  const section = data?.Sec3;
  return {
    sectionHeading: mapSectionHeading(section?.sectionHeading, {
      heading: "",
      subHeading: "",
      description: "",
    }),
    listData:
      section?.listData?.map((item, index) => ({
        id: item.id || index + 1,
        icon: getMediaUrl(item.icon) || "",
        iconAlt: item.icon?.alternativeText || "Icon",
        description: item.description || "",
      })) || [],
    images:
      section?.images?.map((image, index) => ({
        id: image.id || index + 1,
        url: getMediaUrl(image) || "",
        alt: image.alternativeText || "Blessing image",
      })) || [],
  };
};

// ============================================
// Sec4 - WhyIslamicRelief
// ============================================
export interface WhyIslamicReliefCardData {
  id: number;
  iconImage: string;
  iconAlt: string;
  heading: string;
  description: string;
}

export interface WhyIslamicReliefData {
  sectionHeading: SectionHeadingData;
  cards: WhyIslamicReliefCardData[];
}

export const mapWhyIslamicRelief = (
  data: FidyaKaffaraPageData
): WhyIslamicReliefData => {
  const section = data?.Sec4;
  return {
    sectionHeading: mapSectionHeading(section?.sectionHeading, {
      heading: "",
      subHeading: "",
      description: "",
    }),
    cards:
      section?.CardSection?.map((card, index) => ({
        id: card.id || index + 1,
        iconImage: getMediaUrl(card.iconImage) || "",
        iconAlt: card.iconImage?.alternativeText || "Icon",
        heading: card.heading || "",
        description: card.description || "",
      })) || [],
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
  data: FidyaKaffaraPageData
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
// News Section (reused pattern)
// ============================================
export const mapFidyaKaffaraNewsCards = (
  data: FidyaKaffaraPageData
): {
  sectionHeading: SectionHeadingData;
  cards: LatestNewsCardData[];
} => {
  const section = data?.newsSection;
  return {
    sectionHeading: mapSectionHeading(section?.sectionHeading, {
      heading: "",
      subHeading: "",
      description: "",
    }),
    cards:
      section?.newsCard?.map((card, index) => ({
        id: card.id || index + 1,
        image: getMediaUrl(card.image) || "/Images/mockImages/LatestNews1.png",
        title: card.heading || "",
        read: card.readTime ? `${card.readTime} MIN READ` : "",
        date: card.publishedDate
          ? new Date(card.publishedDate)
              .toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })
              .toUpperCase()
          : "",
        categories: [card.tag1, card.tag2].filter(Boolean) as string[],
        link: `/news/${card.id || index}`,
      })) || [],
  };
};

// ============================================
// FAQ Section (reused pattern)
// ============================================
export const mapFidyaKaffaraFaqs = (data: FidyaKaffaraPageData): FaqsData => {
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
export const mapFidyaKaffaraPageData = (data: FidyaKaffaraPageData) => {
  return {
    hero: mapFidyaKaffaraHero(data),
    fidyaKaffaraCardSection: mapFidyaKaffaraCardSection(data),
    calculaterSection: mapCalculaterSection(data),
    blessingSection: mapBlessingSection(data),
    whyIslamicRelief: mapWhyIslamicRelief(data),
    callToAction: mapCallToActionSection(data),
    newsCards: mapFidyaKaffaraNewsCards(data),
    faqs: mapFidyaKaffaraFaqs(data),
  };
};
