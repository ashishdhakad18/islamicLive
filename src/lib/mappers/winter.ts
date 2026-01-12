import { WinterPageDataFromStrapi } from "@/types/winter.types";
import { SectionHeadingData, mapSectionHeading } from "./homepage";
import { getMediaUrl } from "@/utils/strapiHelpers";
import { FaqsData } from "@/types/faqs";
import { SocialMediaPost } from "@/types/socialmedia";
import { CardData } from "@/types/slider.types";

export interface WinterHeroData {
  sectionHeading: SectionHeadingData;
  image: {
    url: string;
    alt: string;
  };
  heroMsg: {
    message: string;
    author: string;
  };
}

export const mapWinterHero = (data: WinterPageDataFromStrapi): WinterHeroData => {
  const section = data?.heroSection;
  return {
    sectionHeading: mapSectionHeading(section?.sectionHeading, {
      heading: "Opération hiver 2026",
      subHeading: "Réchauffez les coeurs cet hiver !",
      description: "Le froid est revenu. Pour beaucoup d’entre nous, cela signifie des soirées au chaud, un toit et des repas réconfortants. Mais ailleurs, dans des régions frappées par la guerre, la pauvreté ou les catastrophes climatiques, l’hiver se transforme en menace.",
    }),
    image: {
      url: getMediaUrl(section?.image) || "",
      alt: section?.image?.alternativeText || "Winter Hero",
    },
    heroMsg: {
      message: section?.heroMSG?.message || "",
      author: section?.heroMSG?.author || "",
    },
  };
};

export interface WinterApproachData {
    sectionHeading: SectionHeadingData;
    image: string;
    items: Array<{
        title: string;
        description: string;
        icon: string;
        theme: "red" | "green" | "yellow" | "primary";
    }>;
}

export const mapWinterApproach = (data: WinterPageDataFromStrapi): WinterApproachData => {
    const section = data?.approchSection;
    return {
        sectionHeading: mapSectionHeading(section?.sectionHeading, {
            heading: "COMMENT NOUS INTERVENONS ?",
            subHeading: "Une approche intégrée !",
            description: "L'opération Hiver d'Islamic Relief Suisse est un véritable soutien pour les familles en crise. Grâce à votre générosité, nous pouvons fournir :",
        }),
        image: getMediaUrl(section?.image) || "",
        items: section?.lists?.map(item => ({
            title: item.heading,
            description: item.description,
            icon: getMediaUrl(item.icon) || "",
            theme: "primary" as const, // Default theme for dynamic items
        })) || [],
    };
};

export interface WinterRegionData {
    regionName: string;
    cards: string[];
}

export interface WinterOurGlobalReachData {
    sectionHeading: SectionHeadingData;
    regions: WinterRegionData[];
}

export const mapWinterOurGlobalReach = (data: WinterPageDataFromStrapi): WinterOurGlobalReachData => {
    const section = data?.ourGlobalReach;
    return {
        sectionHeading: mapSectionHeading(section?.sectionHeading, {
            heading: "OÙ NOUS INTERVENONS ?",
            subHeading: "",
            description: "L'hiver tue. Le froid aggrave la faim, augmente les maladies, affaiblit les enfants et aggrave la situation déjà fragile de milliers de familles.Islamic Releif intervient là où l'hiver devient une urgence humanitaire.",
        }),
        regions: section?.whereWeOperate?.map(region => ({
            regionName: region.region || "",
            cards: region.decription?.map(d => d.description) || [],
        })) || [],
    };
};

export interface WinterImpactDataItem {
    title: string;
    subHeading: string;
    description: string;
    icon: string;
}

export interface WinterImpactDataSection {
    sectionHeading: SectionHeadingData;
    items: WinterImpactDataItem[];
}

export const mapWinterImpactData = (data: WinterPageDataFromStrapi): WinterImpactDataSection => {
    const section = data?.impactData;
    return {
        sectionHeading: mapSectionHeading(section?.sectionHeading, {
            heading: "Pourquoi nous faire confiance",
            subHeading: "",
            description: "",
        }),
        items: section?.impactData?.map(item => ({
            title: item.heading || "",
            subHeading: item.subHeading || "",
            description: item.description || "",
            icon: getMediaUrl(item.icon) || "",
        })) || [],
    };
};

export interface WinterNewsCard {
    id: number;
    image: string;
    title: string;
    read: string;
    date: string;
    categories: string[];
    link: string;
}

export interface WinterNewsSection {
    sectionHeading: SectionHeadingData;
    news: WinterNewsCard[];
}

export const mapWinterNews = (data: WinterPageDataFromStrapi): WinterNewsSection => {
    const section = data?.newSection;
    return {
        sectionHeading: mapSectionHeading(section?.sectionHeading, {
            heading: "Latest News",
            subHeading: "Stories",
            description: "Built on faith, powered by experience, trusted by millions worldwide",
        }),
        news: section?.newsCard?.map(card => ({
            id: card.id,
            image: getMediaUrl(card.image) || "",
            title: card.heading || "",
            read: card.readTime || "5 MIN READ",
            date: card.publishedDate 
                ? new Date(card.publishedDate).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric"
                }).toUpperCase() 
                : "DECEMBER 13, 2023",
            categories: [card.tag1, card.tag2].filter((tag): tag is string => !!tag),
            link: `/stories/${card.id}`,
        })) || [],
    };
};

export interface WinterSocialMediaSectionData {
    sectionHeading: SectionHeadingData;
    posts: SocialMediaPost[];
}

export const mapWinterSocialMedia = (data: WinterPageDataFromStrapi): WinterSocialMediaSectionData => {
    const section = data?.socialMeadiaSction;
    return {
        sectionHeading: mapSectionHeading(section?.sectionHeading, {
            heading: "FOLLOW US FOR THE LATEST NEWS",
            subHeading: "Follow Us",
            description: "On our social media, we make our activities visible on a daily basis. Here you can take part of updates from our field offices and share content with your friends and followers!",
        }),
        posts: section?.socialMediaCards?.map(card => ({
            id: `social-${card.id}`,
            organization: {
                name: "IRWorldwide",
                logo: "/Images/Logo/logo2.png",
                social: {
                    platform: card.socialMedia || "instagram",
                    url: `https://${card.socialMedia || "instagram"}.com`,
                },
            },
            media: {
                type: "image",
                src: getMediaUrl(card.image) || "/Images/mockImages/cardimage.png",
                alt: card.description || "Social media post",
            },
            headline: card.description || "Empowering communities worldwide",
            content: card.description || "Join us in our efforts to make a difference!",
            engagement: {
                likes: card.likes || 0,
                comments: card.replies || 0,
            },
        })) || [],
    };
};

export interface WinterTransmetData {
    videoUrl: string;
    posterImage: string;
    description: string;
    ctaText: string;
    ctaLink: string;
}

export interface WinterMappedData {
  hero: WinterHeroData;
  approach: WinterApproachData;
  transmet: WinterTransmetData;
  globalReach: WinterOurGlobalReachData;
  impactData: WinterImpactDataSection;
  news: WinterNewsSection;
  socialMedia: WinterSocialMediaSectionData;
  faqs: FaqsData;
  faqSectionHeading: SectionHeadingData;
  backgroundImage: string;
}

export const mapWinterPageData = (data: WinterPageDataFromStrapi): WinterMappedData => {
  const transmetSection = data?.transmetSection;
  return {
    hero: mapWinterHero(data),
    approach: mapWinterApproach(data),
    transmet: {
        videoUrl: getMediaUrl(transmetSection?.videoUrl) || "",
        posterImage: getMediaUrl(transmetSection?.posterImage) || "",
        description: transmetSection?.description || "",
        ctaText: transmetSection?.ctaText || "",
        ctaLink: transmetSection?.ctaLink || "",
    },
    globalReach: mapWinterOurGlobalReach(data),
    impactData: mapWinterImpactData(data),
    news: mapWinterNews(data),
    socialMedia: mapWinterSocialMedia(data),
    faqs: {
      faqs: data?.faqSection?.faqs?.map((faq, index) => ({
        id: faq.id || index + 1,
        question: faq.question || "",
        answer: faq.answer || "",
      })) || [],
      cta: {
        label: "Load More",
        action: "/faq",
      },
    },
    faqSectionHeading: mapSectionHeading(data?.faqSection?.sectionHeading, {
      heading: "Questions Fréquentes",
      subHeading: "FAQ",
      description: "",
    }),
    backgroundImage: getMediaUrl(data?.image) || "",
  };
};
