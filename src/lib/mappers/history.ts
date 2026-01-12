import {
  HistoryPageData,
  ImpactHistorySection,
  SituationSection,
  DecadesSection,
  TimelineSection,
  PrinciplesSection,
} from "@/types/history.types";
import { SectionHeadingData, mapSectionHeading } from "./homepage";
import { getMediaUrl } from "@/utils/strapiHelpers";
import { LatestNewsCardData } from "@/types/latestNewsCard";
import { ImpactStat } from "@/types/impactStats";
import { FaqsData } from "@/types/faqs";
import { SocialMediaPost } from "@/types/socialmedia";
import { ImpactData } from "@/types/impactData";

// ============================================
// Hero Section (reused pattern)
// ============================================
export interface HistoryHeroData {
  sectionHeading: SectionHeadingData;
  images: Array<{
    id: number;
    url: string;
    alt: string;
  }>;
  stats: ImpactStat[];
}

export const mapHistoryHero = (data: HistoryPageData): HistoryHeroData => {
  const heroSection = data?.Sec1;
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
      heroSection?.impactstats?.map((stat, index) => ({
        id: stat.id || index + 1,
        value: stat.value || "",
        label: stat.caption || "",
        type: "count",
      })) || [],
  };
};

// ============================================
// Sec2: Impact History Section
// ============================================
export interface ImpactHistoryCardData {
  id: number;
  image: string;
  imageAlt: string;
  title: string;
  description: string;
  btnText: string;
  btnUrl: string;
}

export interface ImpactHistorySectionData {
  sectionHeading: SectionHeadingData;
  cards: ImpactHistoryCardData[];
}

export const mapImpactHistorySection = (
  data: HistoryPageData
): ImpactHistorySectionData => {
  const section = data?.Sec2 as ImpactHistorySection | undefined;
  return {
    sectionHeading: mapSectionHeading(section?.sectionHeading, {
      heading: "",
      subHeading: "",
      description: "",
    }),
    cards:
      section?.Cards?.map((card, index) => ({
        id: card.id || index + 1,
        image: getMediaUrl(card.image) || "",
        imageAlt: card.image?.alternativeText || "Impact card image",
        title: card.title || "",
        description: card.description || "",
        btnText: card.btnText || "",
        btnUrl: card.btnUrl || "",
      })) || [],
  };
};

// ============================================
// Sec3: Situation Section
// ============================================
export interface ListItemData {
  id: number;
  icon: string;
  description: string;
}

export interface SituationSectionData {
  sectionHeading: SectionHeadingData;
  image: string;
  imageAlt: string;
  lists: ListItemData[];
  description: string;
}

export const mapSituationSection = (
  data: HistoryPageData
): SituationSectionData => {
  const section = data?.Sec3 as SituationSection | undefined;
  return {
    sectionHeading: mapSectionHeading(section?.sectionHeading, {
      heading: "",
      subHeading: "",
      description: "",
    }),
    image: getMediaUrl(section?.image) || "",
    imageAlt: section?.image?.alternativeText || "Situation image",
    lists:
      section?.lists?.map((item, index) => ({
        id: item.id || index + 1,
        icon: getMediaUrl(item.icon) || "",
        description: item.description || "",
      })) || [],
    description: section?.description || "",
  };
};

// ============================================
// Sec4: Decades Section
// ============================================
export interface DecadesSectionData {
  sectionHeading: SectionHeadingData;
  image: string;
  imageAlt: string;
  lists: ListItemData[];
  description: string;
}

export const mapDecadesSection = (
  data: HistoryPageData
): DecadesSectionData => {
  const section = data?.Sec4 as DecadesSection | undefined;
  return {
    sectionHeading: mapSectionHeading(section?.sectionHeading, {
      heading: "",
      subHeading: "",
      description: "",
    }),
    image: getMediaUrl(section?.image) || "",
    imageAlt: section?.image?.alternativeText || "Decades image",
    lists:
      section?.lists?.map((item, index) => ({
        id: item.id || index + 1,
        icon: getMediaUrl(item.icon) || "",
        description: item.description || "",
      })) || [],
    description: section?.description || "",
  };
};

// ============================================
// Sec5: Timeline Section
// ============================================
export interface TimelineItemData {
  id: string;
  year: string;
  title?: string;
  description: string;
  color?: "blue" | "purple" | "green" | "red" | "teal";
  position?: "top" | "bottom";
}

export interface TimelineSectionData {
  sectionHeading: SectionHeadingData;
  timelineData: TimelineItemData[];
}

export const mapTimelineSection = (
  data: HistoryPageData
): TimelineSectionData => {
  const section = data?.Sec5 as TimelineSection | undefined;
  return {
    sectionHeading: mapSectionHeading(section?.sectionHeading, {
      heading: "",
      subHeading: "",
      description: "",
    }),
    // Color and position are auto-assigned by the component based on index
    timelineData:
      section?.timelineData?.map((item, index) => ({
        id: String(item.id || index + 1),
        year: item.year || "",
        description: item.description || "",
      })) || [],
  };
};

// ============================================
// Sec6: Principles Section
// ============================================
export interface PrincipleData {
  id: number;
  label: string;
  description: string;
}

export interface PrinciplesSectionData {
  sectionHeading: SectionHeadingData;
  image: string;
  imageAlt: string;
  principles: PrincipleData[];
}

export const mapPrinciplesSection = (
  data: HistoryPageData
): PrinciplesSectionData => {
  const section = data?.Sec6 as PrinciplesSection | undefined;
  return {
    sectionHeading: mapSectionHeading(section?.sectionHeading, {
      heading: "",
      subHeading: "",
      description: "",
    }),
    image: getMediaUrl(section?.image) || "",
    imageAlt: section?.image?.alternativeText || "Principles image",
    principles:
      section?.principles?.map((item, index) => ({
        id: item.id || index + 1,
        label: item.label || "",
        description: item.description || "",
      })) || [],
  };
};

// ============================================
// Call to Action Section (reused)
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

export const mapHistoryCallToAction = (
  data: HistoryPageData
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
// Impact Data Section (reused)
// ============================================
export const mapHistoryImpactData = (data: HistoryPageData): ImpactData => {
  const items = data?.impactData;
  return {
    stats:
      items?.map((item, index) => ({
        id: item.id || index + 1,
        icon: getMediaUrl(item.icon) || "/Icons/Sadaqah.png",
        value: item.heading || "",
        label: item.subHeading || "",
        description: item.description || "",
      })) || [],
  };
};

// ============================================
// News Cards Section (reused)
// ============================================
export const mapHistoryNewsCards = (
  data: HistoryPageData
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
// Social Media Section (reused)
// ============================================
export const mapHistorySocialMedia = (
  data: HistoryPageData
): {
  sectionHeading: SectionHeadingData;
  posts: SocialMediaPost[];
} => {
  const section = data?.socialMediaSection;
  const platformMap: Record<string, string> = {
    facebook: "facebook",
    instagram: "instagram",
    youtube: "youtube",
    tiktok: "tiktok",
    whatsapp: "whatsapp",
  };

  return {
    sectionHeading: mapSectionHeading(section?.sectionHeading, {
      heading: "",
      subHeading: "",
      description: "",
    }),
    posts:
      section?.socialMediaCards?.map((card, index) => ({
        id: `social-${card.id || index}`,
        organization: {
          name: "IRWorldwide",
          logo: "/Images/Logo/logo2.png",
          social: {
            platform:
              platformMap[card.socialMedia?.toLowerCase() || ""] || "instagram",
            url: `https://${
              card.socialMedia?.toLowerCase() || "instagram"
            }.com`,
          },
        },
        media: {
          type: "image",
          src: getMediaUrl(card.image) || "/Images/mockImages/cardimage.png",
          alt: card.description || "Social media post",
        },
        headline: card.description || "",
        content: card.description || "",
        engagement: {
          likes: card.likes || 0,
          comments: card.replies || 0,
        },
      })) || [],
  };
};

// ============================================
// FAQ Section (reused)
// ============================================
export const mapHistoryFaqs = (data: HistoryPageData): FaqsData => {
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
// Main Mapper - Map All History Page Data
// ============================================
export const mapHistoryPageData = (data: HistoryPageData) => {
  return {
    hero: mapHistoryHero(data),
    impactHistorySection: mapImpactHistorySection(data),
    situationSection: mapSituationSection(data),
    decadesSection: mapDecadesSection(data),
    timelineSection: mapTimelineSection(data),
    principlesSection: mapPrinciplesSection(data),
    callToAction: mapHistoryCallToAction(data),
    impactData: mapHistoryImpactData(data),
    newsCards: mapHistoryNewsCards(data),
    socialMedia: mapHistorySocialMedia(data),
    faqs: mapHistoryFaqs(data),
  };
};
