
import { FaqPageDataFromStrapi } from "@/types/faq.types";
import { 
  SectionHeadingData, 
  mapSectionHeading, 
  mapCarouselData, 
  mapImpactStats, 
  mapNewsCards, 
  mapSocialMediaPosts,
  mapFaqs,
  mapImpactData
} from "./homepage";
import { getMediaUrl } from "@/utils/strapiHelpers";
import { ImpactStatsData } from "@/types/impactStats";
import { CarouselData } from "@/types/carousel.types";
import { FaqsData } from "@/types/faqs";
import { ImpactData } from "@/types/impactData";
import { LatestNewsCardData } from "@/types/latestNewsCard";
import { SocialMediaPost } from "@/types/socialmedia";

export interface FaqMappedData {
  hero: {
    sectionHeading: SectionHeadingData;
    carouselData: CarouselData;
    statsData: ImpactStatsData;
  };
  whereWeWork: {
    sectionHeading: SectionHeadingData;
    heading: string;
    description: string;
    image: string;
  };
  callToAction: {
    sectionHeading: SectionHeadingData;
    cta: {
      label: string;
      url: string;
    };
  };
  faqSection: {
    sectionHeading: SectionHeadingData;
    faqs: FaqsData;
  };
  impactData: ImpactData;
  newsSection: {
    sectionHeading: SectionHeadingData;
    news: LatestNewsCardData[];
  };
  socialMedia: {
    sectionHeading: SectionHeadingData;
    posts: SocialMediaPost[];
  };
}

export const mapFaqPageData = (data: FaqPageDataFromStrapi): FaqMappedData => {
  return {
    hero: {
      sectionHeading: mapSectionHeading(data.heroSection?.sectionHeading),
      carouselData: {
        carouselItems: (Array.isArray(data.heroSection?.images) 
          ? data.heroSection?.images 
          : data.heroSection?.images?.data || []).map((img, idx) => ({
            id: String(img.id || idx),
            url: getMediaUrl(img) || "",
            alt: img.alternativeText || "Hero Image",
            title: data.heroSection?.sectionHeading?.heading || "",
            subtitle: data.heroSection?.sectionHeading?.subHeading || "",
            buttonText: "",
            buttonLink: "",
          }))
      },
      statsData: {
        impactStats: data.heroSection?.stats?.map((stat, idx) => ({
          id: stat.id || idx + 1,
          value: stat.value || "",
          label: stat.caption || "",
          type: "count",
        })) || [],
      }
    },
    whereWeWork: {
      sectionHeading: mapSectionHeading(data.whereWeWork?.sectionHeading),
      heading: data.whereWeWork?.heading || "",
      description: data.whereWeWork?.description || "",
      image: getMediaUrl(data.whereWeWork?.image) || "",
    },
    callToAction: {
      sectionHeading: mapSectionHeading(data.callToAction?.sectionHeading),
      cta: {
        label: data.callToAction?.CTA?.label || "",
        url: data.callToAction?.CTA?.url || "",
      }
    },
    faqSection: {
      sectionHeading: mapSectionHeading(data.faqSection?.sectionHeading),
      faqs: {
        faqs: data.faqSection?.faqs?.map((f, idx) => ({
          id: f.id || idx + 1,
          question: f.question || "",
          answer: f.answer || "",
          category: f.category || f.faq_category?.data?.attributes?.name || "General",
        })) || [],
        cta: {
          label: "View More",
          action: "/faq",
        }
      }
    },
    impactData: {
      stats: data.impactData?.impactData?.map((item, idx) => ({
        id: item.id || idx + 1,
        icon: getMediaUrl(item.icon) || "",
        value: item.heading || "",
        label: item.subHeading || "",
        description: item.description || "",
      })) || [],
    },
    newsSection: {
      sectionHeading: mapSectionHeading(data.newsSection?.sectionHeading),
      news: data.newsSection?.newsCard?.map((card, idx) => ({
        id: card.id || idx + 1,
        image: getMediaUrl(card.image) || "",
        title: card.heading || "",
        read: card.readTime || "",
        date: card.publishedDate || "",
        categories: [card.tag1, card.tag2].filter(Boolean) as string[],
        link: `/news/${card.id || idx}`,
      })) || [],
    },
    socialMedia: {
      sectionHeading: mapSectionHeading(data.socialMedia?.sectionHeading),
      posts: data.socialMedia?.socialMediaCards?.map((card, idx) => ({
        id: `social-${card.id || idx}`,
        organization: {
          name: "Islamic Relief",
          logo: "/Images/Logo/logo2.png",
          social: {
            platform: card.socialMedia?.toLowerCase() || "instagram",
            url: "#",
          },
        },
        media: {
          type: "image",
          src: getMediaUrl(card.image) || "",
          alt: card.description || "Social Post",
        },
        headline: card.description || "",
        content: card.description || "",
        engagement: {
          likes: card.likes || 0,
          comments: card.replies || 0,
        },
      })) || [],
    }
  };
};
