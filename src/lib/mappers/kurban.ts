
import { KurbanPageDataFromStrapi } from "@/types/kurban.types";
import { SectionHeadingData, mapSectionHeading } from "./homepage";
import { getMediaUrl } from "@/utils/strapiHelpers";
import { FaqsData } from "@/types/faqs";
import { SocialMediaPost } from "@/types/socialmedia";
import { ImpactGridItem } from "@/types/impactGrid.types";
import { ImpactCardData } from "@/types/responseCard";

export interface KurbanHeroData {
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

export interface KurbanCampaignData {
    currentValue: string;
    targetValue: string;
    label: string;
    year?: number;
}

export interface KurbanDestinationData {
    heading: string;
    destinations: Array<{
        id: number;
        group: string;
        chfNumber: string;
        address: string;
        ctaText: string;
        ctaLink: string;
    }>;
}

export interface KurbanMappedData {
  hero: KurbanHeroData;
  campaign: KurbanCampaignData;
  destination: KurbanDestinationData;
  approach: {
    sectionHeading: SectionHeadingData;
    items: ImpactGridItem[];
    images: string[];
  };
  whyTrust: {
    sectionHeading: SectionHeadingData;
    cards: ImpactCardData[];
  };
  cta: {
    sectionHeading: SectionHeadingData;
    cta: {
        text: string;
        link: string;
    };
  };
  impactData: {
    sectionHeading: SectionHeadingData;
    items: Array<{
      title: string;
      subHeading: string;
      description: string;
      icon: string;
    }>;
  };
  news: {
    sectionHeading: SectionHeadingData;
    news: Array<{
      id: number;
      image: string;
      title: string;
      read: string;
      date: string;
      categories: string[];
      link: string;
    }>;
  };
  socialMedia: {
    sectionHeading: SectionHeadingData;
    posts: SocialMediaPost[];
  };
  testimonials: {
    sectionHeading: SectionHeadingData;
    thumbnails: Array<{
      id: number;
      image: string;
      videoUrl?: string;
      alt: string;
    }>;
  };
  faqs: FaqsData;
  faqSectionHeading: SectionHeadingData;
  generosity: {
    videoUrl?: string;
    posterImage?: string;
    text?: string;
    buttonText?: string;
    buttonLink?: string;
  };
  formBGImage: string;
  backgroundImage: string;
}

export const mapKurbanPageData = (data: KurbanPageDataFromStrapi): KurbanMappedData => {
  const hero = data?.heroSection;
  const campaign = data?.campaignSection;
  const destination = data?.kurbanDestination;
  const approach = data?.fundDestributionSection;
  const whyTrust = data?.whyTrustUsSection;
  const cta = data?.callToAction;
  const impact = data?.impactData;
  const news = data?.newsSection;
  const social = data?.socialMediaSection;
  const faq = data?.faqSection;
  const transmet = data?.transmetSection;
  const testimonial = data?.testimonialSection;

  return {
    hero: {
      sectionHeading: mapSectionHeading(hero?.sectionHeading, {
        heading: "Offrez votre Kurban",
        subHeading: "Offrez de la joie !",
        description: "Offrir son Kurban, c’est bien plus qu’un sacrifice rituel.",
      }),
      image: {
        url: getMediaUrl(hero?.image) || "",
        alt: hero?.image?.alternativeText || "Kurban Hero",
      },
      heroMsg: {
        message: hero?.heroMSG?.message || "",
        author: hero?.heroMSG?.author || "",
      },
    },
    campaign: {
        currentValue: campaign?.currentValue?.toString() || "0",
        targetValue: campaign?.targetValue?.toString() || "0",
        label: campaign?.label || "OBJECTIF KURBAN",
        year: campaign?.year,
    },
    destination: {
        heading: destination?.heading || "OÙ SOUHAITEZ-VOUS OFFRIR VOTRE KURBAN ?",
        destinations: destination?.addressCard?.map(card => ({
            id: card.id,
            group: card.group || "",
            chfNumber: card.chfNumber || "",
            address: card.address || "",
            ctaText: card.ctaText || "Choisir",
            ctaLink: card.ctaLink || "#",
        })) || [],
    },
    approach: {
        sectionHeading: mapSectionHeading(approach?.sectionHeading, {
            heading: "POURQUOI FAIRE VOTRE KURBAN AVEC ISLAMIC RELIEF ?",
            subHeading: "Un impact décuplé !",
            description: "En choisissant Islamic Relief pour votre Kurban, vous contribuez à un impact réel et durable grâce à une approche responsable, éthique et centrée sur les besoins des familles vulnérables.",
        }),
        items: approach?.destributionlist?.map(item => ({
            title: item.heading || "",
            description: item.description || "",
            icon: getMediaUrl(item.icon) || "",
            theme: (item as any).theme || "primary",
        })) || [],
        images: Array.isArray(approach?.images) 
            ? approach.images.map(img => getMediaUrl(img) || "")
            : approach?.images?.data 
                ? approach.images.data.map(img => getMediaUrl(img) || "")
                : [],
    },
    whyTrust: {
        sectionHeading: mapSectionHeading(whyTrust?.sectionHeading, {
            heading: "Pourquoi confier vos dons à islamic relief suisse ?",
            subHeading: "Pourquoi nous choisir ?",
            description: "En donnant vos intérêts bancaires...",
        }),
        cards: whyTrust?.cards?.map(card => ({
            id: card.id.toString(),
            title: card.heading || "",
            description: card.description || "",
            icon: getMediaUrl(card.iconImage) || "",
        })) || [],
    },
    cta: {
        sectionHeading: mapSectionHeading(cta?.sectionHeading, {
            heading: "L’humanité est notre motivation",
            subHeading: "L’humanité est notre famille.",
            description: "Le fonds des urgences est ce qui permet à notre ONG d’intervenir immédiatement lorsqu’une crise frappe.",
        }),
        cta: {
            text: cta?.CTA?.label || "Donate",
            link: cta?.CTA?.url || "#",
        },
    },
    impactData: {
        sectionHeading: mapSectionHeading(impact?.sectionHeading, {
            heading: "Pourquoi nous faire confiance",
            subHeading: "",
            description: "",
        }),
        items: impact?.impactData?.map(item => ({
            title: item.heading || "",
            subHeading: item.subHeading || "",
            description: item.description || "",
            icon: getMediaUrl(item.icon) || "",
        })) || [],
    },
    news: {
        sectionHeading: mapSectionHeading(news?.sectionHeading, {
            heading: "Latest News",
            subHeading: "Stories",
            description: "Built on faith, powered by experience, trusted by millions worldwide",
        }),
        news: news?.newsCard?.map(card => ({
            id: card.id,
            image: getMediaUrl(card.image) || "",
            title: card.heading || "",
            read: card.readTime || "",
            date: card.publishedDate 
                ? new Date(card.publishedDate).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric"
                  }).toUpperCase() 
                : "",
            categories: [card.tag1, card.tag2].filter((t): t is string => !!t),
            link: `/stories/${card.id}`,
        })) || [],
    },
    socialMedia: {
        sectionHeading: mapSectionHeading(social?.sectionHeading, {
            heading: "FOLLOW US FOR THE LATEST NEWS",
            subHeading: "Follow Us",
            description: "On our social media...",
        }),
        posts: social?.socialMediaCards?.map(card => ({
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
            headline: card.description || "",
            content: card.description || "",
            engagement: {
                likes: card.likes || 0,
                comments: card.replies || 0,
            },
        })) || [],
    },
    faqs: {
        faqs: faq?.faqs?.map((f, index) => ({
            id: f.id || index + 1,
            question: f.question || "",
            answer: f.answer || "",
        })) || [],
        cta: {
            label: "Load More",
            action: "/faq",
        },
    },
    faqSectionHeading: mapSectionHeading(faq?.sectionHeading, {
        heading: "Questions Fréquentes",
        subHeading: "FAQ",
        description: "",
    }),
    testimonials: {
        sectionHeading: mapSectionHeading(testimonial?.sectionHeading, {
            heading: "ISLAMIC RELIEF ON THE GROUND",
            subHeading: "Impact",
            description: "2024 Restera Gravée Dans L'histoire D'Islamic Relief Suisse Comme Une Année À La Fois Mémorable Et Poignante.",
        }),
        thumbnails: testimonial?.videos?.map(v => ({
            id: v.id,
            image: getMediaUrl(v.gallery) || "/Images/Thumbnail.png",
            videoUrl: getMediaUrl(v.featuredVideo) || "",
            alt: v.gallery?.alternativeText || "Testimonial thumbnail",
        })) || [],
    },
    generosity: {
        videoUrl: getMediaUrl(transmet?.videoUrl) || "",
        posterImage: getMediaUrl(transmet?.posterImage) || "",
        text: transmet?.description,
        buttonText: transmet?.ctaText,
        buttonLink: transmet?.ctaLink,
    },
    formBGImage: getMediaUrl(data?.formBGImage) || "",
    backgroundImage: getMediaUrl(data?.image) || "",
  };
};
