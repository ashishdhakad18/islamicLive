// src/lib/mappers/ramadan.ts

import { RamadanPageData } from "@/types/ramadan.types";
import { SectionHeadingData, mapSectionHeading } from "./homepage";
import { getMediaUrl } from "@/utils/strapiHelpers";
import { CarouselData } from "@/types/carousel.types";
import { FaqsData } from "@/types/faqs";
import { LatestNewsCardData } from "@/types/latestNewsCard";
import { SocialMediaPost } from "@/types/socialmedia";

// ============================================
// Hero Section
// ============================================
export interface RamadanHeroData {
  sectionHeading: SectionHeadingData;
  image: {
    url: string;
    alt: string;
  };
  ctaText: string;
  ctaLink: string;
  heroMSG: {
    message: string;
    author: string;
  };
  carouselData: CarouselData;
}

export const mapRamadanHero = (data: RamadanPageData): RamadanHeroData => {
  const section = data?.heroSection;
  const imageUrl = getMediaUrl(section?.image) || "";

  return {
    sectionHeading: mapSectionHeading(section?.sectionHeading, {
      heading: "",
      subHeading: "",
      description: "",
    }),
    image: {
      url: imageUrl,
      alt: section?.image?.alternativeText || "Ramadan Hero",
    },
    ctaText: section?.ctaText || "JE FAIS UN DON",
    ctaLink: section?.ctaLink || "/donate",
    heroMSG: {
      message: section?.heroMSG?.message || "",
      author: section?.heroMSG?.author || "",
    },
    carouselData: {
      carouselItems: [
        {
          id: "1",
          url: imageUrl,
          alt: section?.image?.alternativeText || "Ramadan Hero",
          title: section?.sectionHeading?.heading || "",
          subtitle: section?.sectionHeading?.subHeading || "",
          buttonText: section?.ctaText || "JE FAIS UN DON",
          buttonLink: section?.ctaLink || "/donate",
        },
      ],
    },
  };
};

// ============================================
// Transmet/Generosity Section
// ============================================
export interface RamadanTransmetData {
  description: string;
  ctaText: string;
  ctaLink: string;
  videoUrl: string;
  posterImage: string;
}

export const mapRamadanTransmet = (
  data: RamadanPageData
): RamadanTransmetData => {
  const section = data?.transmetSection;
  return {
    description: section?.description || "",
    ctaText: section?.ctaText || "",
    ctaLink: section?.ctaLink || "",
    videoUrl: getMediaUrl(section?.videoUrl) || "",
    posterImage: getMediaUrl(section?.posterImage) || "",
  };
};

// ============================================
// Esemble Card Section
// ============================================
export interface RamadanEsembleCardData {
  sectionHeading: SectionHeadingData;
  description: string;
}

export const mapRamadanEsembleCard = (
  data: RamadanPageData
): RamadanEsembleCardData => {
  const section = data?.esembleCardSection;
  return {
    sectionHeading: mapSectionHeading(section?.sectionHeading, {
      heading: "",
      subHeading: "",
      description: "",
    }),
    description: section?.description || "",
  };
};

// ============================================
// Testimonial Section
// ============================================
export interface TestimonialVideo {
  id: string;
  videoUrl: string;
  galleryImage: string;
  galleryAlt: string;
}

export interface RamadanTestimonialData {
  sectionHeading: SectionHeadingData;
  videos: TestimonialVideo[];
}

export const mapRamadanTestimonial = (
  data: RamadanPageData
): RamadanTestimonialData => {
  const section = data?.testimonialSection;
  return {
    sectionHeading: mapSectionHeading(section?.sectionHeading, {
      heading: "ISLAMIC RELIEF ON THE GROUND",
      subHeading: "Impact",
      description: "",
    }),
    videos:
      section?.videos?.map((video, index) => ({
        id: String(video.id || index + 1),
        videoUrl: getMediaUrl(video.featuredVideo) || "",
        galleryImage: getMediaUrl(video.gallery) || "",
        galleryAlt:
          video.gallery?.alternativeText || `Testimonial ${index + 1}`,
      })) || [],
  };
};

// ============================================
// Card/Project Cards Section
// ============================================
export interface ProjectCardData {
  id: string;
  image: string;
  imageAlt: string;
  badge: string;
  heading: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}

export interface RamadanCardData {
  sectionHeading: SectionHeadingData;
  projectCards: ProjectCardData[];
}

export const mapRamadanCard = (data: RamadanPageData): RamadanCardData => {
  const section = data?.card;
  return {
    sectionHeading: mapSectionHeading(section?.sectionHeading, {
      heading: "",
      subHeading: "",
      description: "",
    }),
    projectCards:
      section?.projectCard?.map((card, index) => ({
        id: String(card.id || index + 1),
        image: getMediaUrl(card.Image) || "",
        imageAlt: card.Image?.alternativeText || card.heading || "",
        badge: card.badge || "",
        heading: card.heading || "",
        description: card.description || "",
        ctaText: card.ctaText || "EN SAVOIR PLUS",
        ctaLink: card.ctaLink || "#",
      })) || [],
  };
};

// ============================================
// Impact Data Section
// ============================================
export interface ImpactDataItem {
  id: number;
  icon: string;
  heading: string;
  subHeading: string;
  description: string;
}

export interface RamadanImpactData {
  sectionHeading: SectionHeadingData;
  impactData: ImpactDataItem[];
}

export const mapRamadanImpactData = (
  data: RamadanPageData
): RamadanImpactData => {
  const section = data?.impactDataSection;
  return {
    sectionHeading: mapSectionHeading(section?.sectionHeading, {
      heading: "Pourquoi nous faire confiance ?",
      subHeading: "",
      description: "",
    }),
    impactData:
      section?.impactData?.map((item, index) => ({
        id: item.id || index + 1,
        icon: getMediaUrl(item.icon) || "",
        heading: item.heading || "",
        subHeading: item.subHeading || "",
        description: item.description || "",
      })) || [],
  };
};

// ============================================
// News Section (reusable) - matches homepage.types.ts structure
// ============================================
export interface NewsCardData {
  id: number;
  readTime: string;
  publishedDate: string;
  heading: string;
  tag1: string;
  tag2: string;
  image: string;
  imageAlt: string;
  link: string;
}

export interface RamadanNewsData {
  sectionHeading: SectionHeadingData;
  newsCards: NewsCardData[];
}

export const mapRamadanNews = (data: RamadanPageData): RamadanNewsData => {
  const section = data?.newsSection;
  return {
    sectionHeading: mapSectionHeading(section?.sectionHeading, {
      heading: "Latest News",
      subHeading: "News",
      description: "",
    }),
    newsCards:
      section?.newsCard?.map((card, index) => ({
        id: card.id || index + 1,
        readTime: String(card.readTime || "3 MIN READ"),
        publishedDate: card.publishedDate || "",
        heading: card.heading || "",
        tag1: card.tag1 || "",
        tag2: card.tag2 || "",
        image: getMediaUrl(card.image) || "",
        imageAlt: card.image?.alternativeText || card.heading || "",
        link: `/news/${card.id || index + 1}`,
      })) || [],
  };
};

// ============================================
// Social Media Section (reusable) - matches homepage.types.ts structure
// ============================================
export interface SocialMediaCardData {
  id: number;
  socialMedia: string;
  description: string;
  likes: number;
  replies: number;
  image: string;
  imageAlt: string;
}

export interface RamadanSocialMediaData {
  sectionHeading: SectionHeadingData;
  posts: SocialMediaCardData[];
}

export const mapRamadanSocialMedia = (
  data: RamadanPageData
): RamadanSocialMediaData => {
  const section = data?.socialMedia;
  return {
    sectionHeading: mapSectionHeading(section?.sectionHeading, {
      heading: "Follow Us",
      subHeading: "Social Media",
      description: "",
    }),
    posts:
      section?.socialMediaCards?.map((card, index) => ({
        id: card.id || index + 1,
        socialMedia: card.socialMedia || "instagram",
        description: card.description || "",
        likes: card.likes || 0,
        replies: card.replies || 0,
        image: getMediaUrl(card.image) || "",
        imageAlt: card.image?.alternativeText || "",
      })) || [],
  };
};

// ============================================
// FAQ Section (reusable)
// ============================================
export const mapRamadanFaqs = (data: RamadanPageData): FaqsData => {
  const section = data?.faqs;
  return {
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
  };
};

export const mapRamadanFaqSectionHeading = (
  data: RamadanPageData
): SectionHeadingData => {
  return mapSectionHeading(data?.faqs?.sectionHeading, {
    heading: "Questions Fréquentes",
    subHeading: "FAQ",
    description: "",
  });
};

// ============================================
// Map All Data
// ============================================
export interface RamadanMappedData {
  hero: RamadanHeroData;
  transmet: RamadanTransmetData;
  esembleCard: RamadanEsembleCardData;
  testimonial: RamadanTestimonialData;
  card: RamadanCardData;
  impactData: RamadanImpactData;
  news: RamadanNewsData;
  socialMedia: RamadanSocialMediaData;
  faqs: FaqsData;
  faqSectionHeading: SectionHeadingData;
}

export const mapRamadanPageData = (
  data: RamadanPageData
): RamadanMappedData => {
  return {
    hero: mapRamadanHero(data),
    transmet: mapRamadanTransmet(data),
    esembleCard: mapRamadanEsembleCard(data),
    testimonial: mapRamadanTestimonial(data),
    card: mapRamadanCard(data),
    impactData: mapRamadanImpactData(data),
    news: mapRamadanNews(data),
    socialMedia: mapRamadanSocialMedia(data),
    faqs: mapRamadanFaqs(data),
    faqSectionHeading: mapRamadanFaqSectionHeading(data),
  };
};
