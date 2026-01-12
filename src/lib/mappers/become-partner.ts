
import { BecomePartnerPageDataFromStrapi } from "@/types/become-partner.types";
import { SectionHeadingData, mapSectionHeading } from "./homepage";
import { getMediaUrl } from "@/utils/strapiHelpers";
import { FaqsData } from "@/types/faqs";
import { ImpactGridItem } from "@/types/impactGrid.types";

export interface BecomePartnerMappedData {
    hero: {
        sectionHeading: SectionHeadingData;
        image: {
            url: string;
            alt: string;
        };
        heroMsg: {
            message: string;
            author: string;
        };
    };
    approach: {
        sectionHeading: SectionHeadingData;
        items: ImpactGridItem[];
        images: string[];
    };
    whyTrustUs: {
        heading: string;
        cards: Array<{
            id: number;
            title: string;
            description: string;
            icon: string;
        }>;
    };
    faqSection: {
        sectionHeading: SectionHeadingData;
        faqs: FaqsData;
    };
}

export const mapBecomePartnerPageData = (data: BecomePartnerPageDataFromStrapi): BecomePartnerMappedData => {
    const hero = data?.heroSection;
    const approach = data?.fundDestribution;
    const trust = data?.whyTrustUs;
    const faq = data?.faqSection;

    return {
        hero: {
            sectionHeading: mapSectionHeading(hero?.sectionHeading, {
                heading: "Devenir partenaire",
                subHeading: "Soyez acteurs de la solidarité !",
                description: "",
            }),
            image: {
                url: getMediaUrl(hero?.image) || "",
                alt: hero?.image?.alternativeText || "Partner Hero",
            },
            heroMsg: {
                message: hero?.heroMSG?.message || "",
                author: hero?.heroMSG?.author || "",
            },
        },
        approach: {
            sectionHeading: mapSectionHeading(approach?.sectionHeading, {
                heading: "COMMENT NOUS INTERVENONS ?",
                subHeading: "Une approche intégrée !",
                description: "",
            }),
            items: approach?.destributionlist?.map(item => ({
                title: item.heading || "",
                description: item.description || "",
                icon: getMediaUrl(item.icon) || "",
                theme: "primary",
            })) || [],
            images: Array.isArray(approach?.images)
                ? approach.images.map(img => getMediaUrl(img) || "")
                : approach?.images?.data
                    ? approach.images.data.map(img => getMediaUrl(img) || "")
                    : [],
        },
        whyTrustUs: {
            heading: trust?.heading || "POURQUOI DEVENIR PARTENAIRE ?",
            cards: trust?.cards?.map(card => ({
                id: card.id,
                title: card.heading || "",
                description: card.description || "",
                icon: getMediaUrl(card.iconImage) || "",
            })) || [],
        },
        faqSection: {
            sectionHeading: mapSectionHeading(faq?.sectionHeading, {
                heading: "Questions Fréquentes",
                subHeading: "FAQ",
                description: "",
            }),
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
        },
    };
};
