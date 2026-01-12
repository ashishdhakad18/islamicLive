import { FinancialTransparancyPageData } from "@/types/financialTransparancy.types";
import { SectionHeadingData, mapSectionHeading } from "./homepage";
import { getMediaUrl } from "@/utils/strapiHelpers";
import { LatestNewsCardData } from "@/types/latestNewsCard";
import { ImpactStat } from "@/types/impactStats";
import { FaqsData } from "@/types/faqs";
import { SocialMediaPost } from "@/types/socialmedia";
import { ImpactData } from "@/types/impactData";
import { ImpactCardData } from "@/types/responseCard";

// ============================================
// Our Transparency Section
// ============================================
export interface OurTransparancyData {
  heading: string;
  description: string;
  image: string;
  imageAlt: string;
  sectionHeading: SectionHeadingData;
}

export const mapOurTransparancy = (
  data: FinancialTransparancyPageData
): OurTransparancyData => {
  const section = data?.ourTransparancy;
  return {
    heading: section?.heading || "",
    description: section?.description || "",
    image: getMediaUrl(section?.image) || "",
    imageAlt: section?.image?.alternativeText || "Transparency image",
    sectionHeading: mapSectionHeading(section?.sectionHeading, {
      heading: "",
      subHeading: "",
      description: "",
    }),
  };
};

// ============================================
// How Donation Work Section
// ============================================
export interface HowDonationWorkData {
  heading: string;
  description: string;
  image: string;
  imageAlt: string;
}

export const mapHowDonationWork = (
  data: FinancialTransparancyPageData
): HowDonationWorkData => {
  const section = data?.howDonationWork;
  return {
    heading: section?.heading || "",
    description: section?.description || "",
    image: getMediaUrl(section?.image) || "",
    imageAlt: section?.image?.alternativeText || "How donation works",
  };
};

// ============================================
// Effective Giving Section
// ============================================
export interface EffectiveGivingData {
  sectionHeading: SectionHeadingData;
  cards: ImpactCardData[];
}

export const mapEffectiveGiving = (
  data: FinancialTransparancyPageData
): EffectiveGivingData => {
  const section = data?.EffectiveGiving;
  return {
    sectionHeading: mapSectionHeading(section?.sectionHeading, {
      heading: "",
      subHeading: "",
      description: "",
    }),
    cards:
      section?.cards?.map((card, index) => ({
        id: String(card.id || index + 1),
        title: card.heading || "",
        description: card.description || "",
        icon: getMediaUrl(card.iconImage) || "/icons/dollar.svg",
      })) || [],
  };
};

// ============================================
// Get in Touch Section
// ============================================
export interface GetInTouchCard {
  id: number;
  heading: string;
  description: string;
  icon: string;
}

export interface GetInTouchFormData {
  heading: string;
  organizationName: string;
  addressLine1: string;
  postalCode: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
}

export interface GetInTouchSectionData {
  sectionHeading: SectionHeadingData;
  cards: GetInTouchCard[];
  form: GetInTouchFormData;
}

export const mapGetInTouchSection = (
  data: FinancialTransparancyPageData
): GetInTouchSectionData => {
  const section = data?.getinTouchSection;
  const form = section?.form;
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
        icon: getMediaUrl(card.iconImage) || "",
      })) || [],
    form: {
      heading: form?.heading || "",
      organizationName: form?.organizationName || "",
      addressLine1: form?.addressLine1 || "",
      postalCode: form?.postalCode || "",
      city: form?.city || "",
      country: form?.country || "",
      phone: form?.phone || "",
      email: form?.email || "",
      primaryCtaText: form?.primaryCtaText || "",
      primaryCtaLink: form?.primaryCtaLink || "",
      secondaryCtaText: form?.secondaryCtaText || "",
      secondaryCtaLink: form?.secondaryCtaLink || "",
    },
  };
};

// ============================================
// Hero Section (reused pattern)
// ============================================
export interface FinancialHeroData {
  sectionHeading: SectionHeadingData;
  images: Array<{
    id: number;
    url: string;
    alt: string;
  }>;
  impactStats: ImpactStat[];
}

export const mapFinancialHero = (
  data: FinancialTransparancyPageData
): FinancialHeroData => {
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
    impactStats:
      heroSection?.impactstats?.map((stat, index) => ({
        id: stat.id || index + 1,
        value: stat.value || "",
        label: stat.caption || "",
        type: "count",
      })) || [],
  };
};

// ============================================
// Impact Data Section
// ============================================
export const mapFinancialImpactData = (
  data: FinancialTransparancyPageData
): ImpactData => {
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
export const mapFinancialNewsCards = (
  data: FinancialTransparancyPageData
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
export const mapFinancialSocialMedia = (
  data: FinancialTransparancyPageData
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
export const mapFinancialFaqs = (
  data: FinancialTransparancyPageData
): FaqsData => {
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
export const mapFinancialTransparancyPageData = (
  data: FinancialTransparancyPageData
) => {
  return {
    hero: mapFinancialHero(data),
    ourTransparancy: mapOurTransparancy(data),
    howDonationWork: mapHowDonationWork(data),
    effectiveGiving: mapEffectiveGiving(data),
    getInTouchSection: mapGetInTouchSection(data),
    impactData: mapFinancialImpactData(data),
    newsCards: mapFinancialNewsCards(data),
    socialMedia: mapFinancialSocialMedia(data),
    faqs: mapFinancialFaqs(data),
  };
};
