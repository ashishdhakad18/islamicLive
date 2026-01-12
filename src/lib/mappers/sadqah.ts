import { SadqahPageData, StrapiPremierListItem } from "@/types/sadqah.types";

import { SectionHeadingData, mapSectionHeading } from "../mappers/homepage";
import { getMediaUrl } from "@/utils/strapiHelpers";
import { FaqsData } from "@/types/faqs";

// ============================================
// Hero & Quote Section (Sec1)
// ============================================
export interface SadqahHeroData {
  sectionHeading: SectionHeadingData;
  image: {
    url: string;
    alt: string;
  };
  quote: {
    message: string;
    author: string;
  };
}

export const mapSadqahHero = (data: SadqahPageData): SadqahHeroData => {
  const section = data?.Sec1;
  return {
    sectionHeading: mapSectionHeading(section?.sectionHeading, {
      heading: "",
      subHeading: "",
      description: "",
    }),
    image: {
      url: getMediaUrl(section?.image) || "",
      alt: section?.image?.alternativeText || "Sadqah Hero",
    },
    quote: {
      message: section?.heroMSG?.message || "",
      author: section?.heroMSG?.author || "",
    },
  };
};

// ============================================
// Sadaqah Impact Section
// ============================================
export interface SadqahImpactCardData {
  id: string; // Changed to string to match ImpactCardData
  icon: string;
  title: string;
  description: string;
}

export interface SadqahImpactSectionData {
  sectionHeading: SectionHeadingData;
  cards: SadqahImpactCardData[];
}

export const mapSadqahImpactSection = (
  data: SadqahPageData
): SadqahImpactSectionData => {
  const section = data?.sadaqahImpactSection;
  return {
    sectionHeading: mapSectionHeading(section?.sectionHeading, {
      heading: "",
      subHeading: "",
      description: "",
    }),
    cards:
      section?.cards?.map((card, index) => ({
        id: String(card.id || index + 1), // Cast to string
        icon: getMediaUrl(card.iconImage) || "",
        title: card.heading || "",
        description: card.description || "",
      })) || [],
  };
};

// ============================================
// Sadqah Project Card Section (Sec4)
// ============================================

export interface SadqahProjectCard {
  id: string;
  variant: "campaign";
  headerImage: string;
  headerImageAlt: string;
  heading: string;
  subHeading: string;
  imageChip?: {
    label: string;
    customColor?: string;
  };
  link: {
    href: string;
    label: string;
  };
}

export interface SadqahProjectSectionData {
  sectionHeading: SectionHeadingData;
  cards: SadqahProjectCard[];
}

export const mapSadqahProjectSection = (
  data: SadqahPageData
): SadqahProjectSectionData => {
  const section = data?.projectCardSection;
  return {
    sectionHeading: mapSectionHeading(section?.sectionHeading, {
      heading: "",
      subHeading: "",
      description: "",
    }),
    cards:
      section?.projectCard?.map((card, index) => ({
        id: String(card.id || index + 1),
        variant: "campaign" as const,
        headerImage: getMediaUrl(card.Image) || "",
        headerImageAlt: card.heading || "Project",
        heading: card.heading || "",
        subHeading: card.description || "",
        imageChip: card.badge
          ? {
              label: card.badge,
              customColor: "var(--color-blood-red-dark)", // Or appropriate Logic
            }
          : undefined,
        link: {
            href: card.ctaLink || "#",
            label: card.ctaText || "Donate",
        }
      })) || [],
  };
};

// ============================================
// Premier Sadaqah Section (Timeline)
// ============================================
export interface PremierTimelineItem {
  id: number;
  period: string; // e.g. "7ème siècle"
  title: string;
  description: string;
}

export interface PremierSadaqahSectionData {
  sectionHeading: SectionHeadingData;
  list: PremierTimelineItem[];
  image: {
    url: string;
    alt: string;
  };
}

export const mapPremierSadaqahSection = (
  data: SadqahPageData
): PremierSadaqahSectionData => {
  const section = data?.premierSadaqahSection;
  return {
    sectionHeading: mapSectionHeading(section?.sectionHeading, {
      heading: "",
      subHeading: "",
      description: "",
    }),
    list:
      section?.list?.map((item: StrapiPremierListItem, index) => ({
        id: item.id || index + 1,
        period: item.subHeading || "",
        title: item.heading || "",
        description: item.description || "",
      })) || [],
    image: {
      url: getMediaUrl(section?.image) || "",
      alt: section?.image?.alternativeText || "Premier Sadaqah Image",
    },
  };
};

// ============================================
// Call To Action Section
// ============================================
export interface SadqahCTAData {
  sectionHeading: SectionHeadingData;
  cta: {
    text: string;
    link: string;
  };
  secondaryCta: {
    text: string;
    link: string;
  };
}

export const mapSadqahCTA = (data: SadqahPageData): SadqahCTAData => {
  const section = data?.callToAction;
  return {
    sectionHeading: mapSectionHeading(section?.sectionHeading, {
      heading: "",
      subHeading: "",
      description: "",
    }),
    cta: {
      text: section?.CTA?.[0]?.label || "Faites une sadaqa jariya",
      link: section?.CTA?.[0]?.url || "#",
    },
    secondaryCta: {
      text: section?.CTA?.[1]?.label || "Voir tous les projets",
      link: section?.CTA?.[1]?.url || "#",
    },
  };
};

// ============================================
// Why Donate Section (Why Choose Us)
// ============================================
export interface SadqahWhyDonateData {
  sectionHeading: SectionHeadingData;
  cards: {
    id: string;
    icon: string;
    title: string;
    description: string;
    statValue?: string;
    statLabel?: string;
  }[];
}

export const mapSadqahWhyDonate = (
  data: SadqahPageData
): SadqahWhyDonateData => {
  const section = data?.whyDonate;
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
        statValue: card.number || "",
        statLabel: card.numberDescription || "",
      })) || [],
  };
};

// ============================================
// FAQ Section
// ============================================
export const mapSadqahFaqs = (data: SadqahPageData): FaqsData => {
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

export interface SadqahMappedData {
  hero: SadqahHeroData;
  impactSection: SadqahImpactSectionData;
  premierSection: PremierSadaqahSectionData;
  ctaSection: SadqahCTAData;
  projectSection: SadqahProjectSectionData;
  whyDonateSection: SadqahWhyDonateData;
  faqs: FaqsData;
  faqSectionHeading: SectionHeadingData;
}

export const mapSadqahPageData = (data: SadqahPageData): SadqahMappedData => {
  return {
    hero: mapSadqahHero(data),
    impactSection: mapSadqahImpactSection(data),
    premierSection: mapPremierSadaqahSection(data),
    projectSection: mapSadqahProjectSection(data),
    whyDonateSection: mapSadqahWhyDonate(data),
    ctaSection: mapSadqahCTA(data),
    faqs: mapSadqahFaqs(data),
    faqSectionHeading: mapSectionHeading(data?.faqs?.sectionHeading, {
      heading: "YOUR QUESTIONS, ANSWERED",
      subHeading: "Follow Us",
      description:
        "Get quick answers to the most common questions about our platform and services.",
    }),
  };
};
