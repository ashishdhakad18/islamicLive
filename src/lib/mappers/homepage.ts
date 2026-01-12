import { HomePageData } from "@/types/homepage.types";
import { CarouselData } from "@/types/carousel.types";
import { ImpactData } from "@/types/impactData";
import { ImpactStatsData } from "@/types/impactStats";
import { LatestNewsCardData } from "@/types/latestNewsCard";
import { SocialMediaPost } from "@/types/socialmedia";
import { FaqsData } from "@/types/faqs";
import { CardData } from "@/types/slider.types";
import { LinkCardData } from "@/types/linkCards";

// Type for mapped section headings with guaranteed string values
export interface SectionHeadingData {
  heading: string;
  subHeading: string;
  description: string;
}

// Helper to safely map section headings with defaults
export const mapSectionHeading = (
  sectionHeading?: { heading?: string; subHeading?: string; description?: string },
  fallback?: SectionHeadingData
): SectionHeadingData => ({
  heading: sectionHeading?.heading ?? fallback?.heading ?? "",
  subHeading: sectionHeading?.subHeading ?? fallback?.subHeading ?? "",
  description: sectionHeading?.description ?? fallback?.description ?? "",
});

const STRAPI_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:1337' : process.env.NEXT_PUBLIC_STRAPI_URL;

// Helper to get full image URL from Strapi
const getStrapiImageUrl = (url?: string): string => {
  if (!url) return "";
  return url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
};

export const mapCarouselData = (homePage: HomePageData): CarouselData => {
  const rawCarousel = homePage?.heroSection?.Carousel;
  // Normalize to array, handling both single object (if not repeatable) and array (if repeatable)
  const carouselItems = Array.isArray(rawCarousel)
    ? rawCarousel
    : rawCarousel
    ? [rawCarousel]
    : [];

  return {
    carouselItems:
      carouselItems.map((item, index) => ({
        id: String(item.id || index),
        url: getStrapiImageUrl(item.image?.url),
        alt: item.image?.alternativeText || item.heading || "Hero image",
        title: item.heading || "",
        subtitle: item.description || "",
        buttonText: item.CTA?.label || "Learn More",
        buttonLink: item.CTA?.url || "/donate",
      })) || [],
  };
};

export const mapImpactData = (homePage: HomePageData): ImpactData => {
  const impactSectionData = homePage?.impactSection;
  return {
    stats:
      impactSectionData?.impactData?.map((item, index) => ({
        id: item.id || index + 1,
        icon: getStrapiImageUrl(item.icon?.url) || "/Icons/Sadaqah.png",
        value: item.heading || "",
        label: item.subHeading || "",
        description: item.description || "",
      })) || [],
  };
};

export const mapImpactStats = (homePage: HomePageData): ImpactStatsData => {
  return {
    impactStats:
      homePage?.impactStatsSection?.stats?.map((stat, index) => ({
        id: stat.id || index + 1,
        value: stat.value || "",
        label: stat.caption || "",
        type: "count",
      })) || [],
  };
};

export const getImpactImage = (homePage: HomePageData): string => {
  const impactSectionData = homePage?.impactSection;
  const imageUrl = impactSectionData?.image?.url;
  return getStrapiImageUrl(imageUrl);
};

// Map API newsCard data to LatestNewsCardData format
export const mapNewsCards = (homePage: HomePageData): LatestNewsCardData[] => {
  const newsCards = homePage?.newsSection?.newsCard;
  if (!newsCards || newsCards.length === 0) return [];

  return newsCards.map((card, index) => ({
    id: card.id || index + 1,
    image: getStrapiImageUrl(card.image?.url) || "/Images/mockImages/LatestNews1.png",
    title: card.heading || "News Article",
    read: card.readTime ? `${card.readTime} MIN READ` : "3 MIN READ",
    date: card.publishedDate
      ? new Date(card.publishedDate).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }).toUpperCase()
      : "DECEMBER 13, 2023",
    categories: [card.tag1 || "Article", card.tag2 || "Fundraiser"].filter(Boolean),
    link: `/news/${card.id || index}`,
  }));
};

// Map API socialMediaCards data to SocialMediaPost format
export const mapSocialMediaPosts = (homePage: HomePageData): SocialMediaPost[] => {
  const socialCards = homePage?.socialMediaSection?.socialMediaCards;
  if (!socialCards || socialCards.length === 0) return [];

  // Map social media type to proper platform name
  const platformMap: Record<string, string> = {
    facebook: "facebook",
    instagram: "instagram",
    youtube: "youtube",
    tiktok: "tiktok",
    whatsapp: "whatsapp",
  };

  return socialCards.map((card, index) => ({
    id: `social-${card.id || index}`,
    organization: {
      name: "IRWorldwide",
      logo: "/Images/Logo/logo2.png",
      social: {
        platform: platformMap[card.socialMedia?.toLowerCase() || ""] || "instagram",
        url: `https://${card.socialMedia?.toLowerCase() || "instagram"}.com`,
      },
    },
    media: {
      type: "image",
      src: getStrapiImageUrl(card.image?.url) || "/Images/mockImages/cardimage.png",
      alt: card.description || "Social media post",
    },
    headline: card.description || "Empowering communities worldwide",
    content: card.description || "Join us in our efforts to make a difference!",
    engagement: {
      likes: card.likes || 0,
      comments: card.replies || 0,
    },
  }));
};

// Map API faqs data to FaqsData format
export const mapFaqs = (homePage: HomePageData): FaqsData => {
  const faqs = homePage?.FAQSection?.faqs;
  
  return {
    faqs: faqs?.map((faq, index) => ({
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

// Map API campaignCards data to CardData format
export const mapCampaignCards = (homePage: HomePageData): CardData[] => {
  const campaignCards = homePage?.campaignSection?.campaignCards;
  if (!campaignCards || campaignCards.length === 0) return [];

  return campaignCards.map((card, index) => ({
    id: String(card.id || index + 1),
    variant: "campaign" as const,
    headerImage: getStrapiImageUrl(card.image?.url) || "/Images/Urg-Appl-Home-1.webp",
    headerImageAlt: card.heading || "Campaign",
    imageChip: card.imageChip 
      ? { label: card.imageChip.toUpperCase(), customColor: "var(--color-blood-red-dark)" }
      : undefined,
    heading: card.heading?.toUpperCase() || "CAMPAIGN",
    subHeading: card.description || "Support our cause today.",
    buttons: card.CTA ? [
      {
        label: card.CTA.label?.toUpperCase() || "DONATE NOW",
        variant: "solid" as const,
        color: "yellow" as const,
        href: card.CTA.url || "/donate",
      },
    ] : [],
  }));
};

// Map API eventCardsWrapper data to CardData format
export const mapEventCards = (homePage: HomePageData): CardData[] => {
  const eventCards = homePage?.eventCardsSection?.eventCardsWrapper;
  if (!eventCards || eventCards.length === 0) return [];

  return eventCards.map((card, index) => {
    // Format date for chip display
    const eventDate = card.eventDate
      ? new Date(card.eventDate).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }).toUpperCase()
      : "OCT 11, 2025";

    return {
      id: String(card.id || index + 1),
      variant: "event" as const,
      headerImage: getStrapiImageUrl(card.image?.url) || "/Images/mockImages/Events1.png",
      headerImageAlt: card.heading || "Event",
      heading: card.heading?.toUpperCase() || "EVENT",
      subHeading: card.description || "Join us for this special event.",
      contentChips: [
        { label: eventDate, color: "grey" as const, variant: "soft" as const },
        { label: card.tag?.toUpperCase() || "FUNDRAISER", color: "teal" as const, variant: "soft" as const },
      ],
      buttons: (card.ctaText || card.ctaLink) ? [
        {
          label: card.ctaText?.toUpperCase() || "READ MORE",
          variant: "ghost" as const,
          color: "primary" as const,
          buttonStyle: "link-blue-arrow" as const,
          href: card.ctaLink || "#",
        },
      ] : [],
      metadata: {
        date: card.eventDate
          ? new Date(card.eventDate).toLocaleDateString("en-US", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })
          : "Wednesday, 15th October",
        time: card.eventTime || "11:00AM to 3:00PM",
      },
    };
  });
};

// Map API impactCards data to LinkCardData format (for the quick link cards below hero)
export const mapLinkCards = (homePage: HomePageData): LinkCardData[] => {
  const impactCards = homePage?.impactCards;
  if (!impactCards || impactCards.length === 0) return [];

  return impactCards.map((card, index) => ({
    id: card.id || index + 1,
    icon: getStrapiImageUrl(card.icon?.url) || "/Icons/Sadaqah.png",
    title: card.heading || "Action",
    description: card.description || "Support our cause.",
    link: card.CTA?.url || "/donate",
    linkText: card.CTA?.label?.toUpperCase() || "DONATE",
  }));
};
// Interface for Testimonial Video Thumbnails (matching component props)
export interface VideoThumbnail {
  id: number;
  image: string;
  videoUrl?: string;
  alt: string;
}

// Map API testimonial videos to VideoThumbnail format
export const mapTestimonialVideos = (homePage: HomePageData): VideoThumbnail[] => {
  const videos = homePage?.testimonials?.videos;
  if (!videos || videos.length === 0) return [];

  return videos.map((video, index) => ({
    id: video.id || index + 1,
    image: getStrapiImageUrl(video.gallery?.url) || "/Images/Thumbnail.png",
    videoUrl: getStrapiImageUrl(video.featuredVideo?.url) || "",
    alt: video.gallery?.alternativeText || "Testimonial Video",
  }));
};

export const mapFormBGImage = (homePage: HomePageData): string | undefined => {
  return getStrapiImageUrl(homePage?.formBGImage?.url) || undefined;
};
