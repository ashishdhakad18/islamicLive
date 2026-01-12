
import { BecomeVolunteerPageDataFromStrapi } from "@/types/become-volunteer.types";
import { SectionHeadingData, mapSectionHeading } from "./homepage";
import { getMediaUrl } from "@/utils/strapiHelpers";
import { FaqsData } from "@/types/faqs";
import { ImpactGridItem } from "@/types/impactGrid.types";
import { ImpactStat, ImpactStatsData } from "@/types/impactStats";

export interface BecomeVolunteerMappedData {
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
    whyVolunteer: {
        sectionHeading: SectionHeadingData;
        items: ImpactGridItem[];
        images: string[];
    };
    whyIslamicRelief: {
        sectionHeading: SectionHeadingData;
        cards: Array<{
            id: number;
            title: string;
            description: string;
            icon: string;
        }>;
    };
    impactStats: ImpactStatsData;
    testimonials: {
        sectionHeading: SectionHeadingData;
        thumbnails: Array<{
            id: number;
            image: string;
            videoUrl?: string;
            alt: string;
        }>;
    };
    faqSection: {
        sectionHeading: SectionHeadingData;
        faqs: FaqsData;
    };
}

export const mapBecomeVolunteerPageData = (data: BecomeVolunteerPageDataFromStrapi): BecomeVolunteerMappedData => {
    const hero = data?.heroSection;
    const fund = data?.fundDestribution;
    const whyTrust = data?.whyTrustUsSection;
    const stats = data?.impactStats;
    const testimonial = data?.testimonialSection;
    const faq = data?.faqSection;

    return {
        hero: {
            sectionHeading: mapSectionHeading(hero?.sectionHeading, {
                heading: "Devenez bénévoles !",
                subHeading: "Soyez acteurs de la solidarité !",
                description: "Rejoignez l’équipe Islamic Relief et contribuez à la réussite de nos projets, nos actions et nos événements solidaires.",
            }),
            image: {
                url: getMediaUrl(hero?.image) || "",
                alt: hero?.image?.alternativeText || "Volunteer Hero",
            },
            heroMsg: {
                message: hero?.heroMSG?.message || "",
                author: hero?.heroMSG?.author || "",
            },
        },
        whyVolunteer: {
            sectionHeading: mapSectionHeading(fund?.sectionHeading, {
                heading: "Pourquoi devenir bénévole ?",
                subHeading: "S’engager autrement",
                description: "En devenant bénévole, vous ne donnez pas seulement de votre temps : vous vivez aussi de belles rencontres, des expériences, un réseau, et des liens humains précieux.",
            }),
            items: fund?.destributionlist?.map(item => ({
                title: item.title || item.heading || "",
                description: item.description || "",
                icon: getMediaUrl(item.icon) || "",
                theme: item.theme || "primary",
            })) || [],
            images: (Array.isArray(fund?.images) ? fund.images : fund?.images?.data || [])
                .map(img => getMediaUrl(img))
                .filter((url): url is string => !!url),
        },
        whyIslamicRelief: {
            sectionHeading: mapSectionHeading(whyTrust?.sectionHeading, {
                heading: "pourquoi Islamic Relief suisse?",
                subHeading: "Des moyens pour faire la différence ",
                description: "Votre contribution est bien plus qu’un simple don — c’est votre compassion mise en action.",
            }),
            cards: whyTrust?.cards?.map(card => ({
                id: card.id,
                title: card.heading || "",
                description: card.description || "",
                icon: getMediaUrl(card.iconImage) || "",
            })) || [],
        },
        impactStats: {
            impactStats: stats?.map((stat, index) => ({
                id: stat.id || index + 1,
                value: stat.value ?? "",
                label: stat.caption ?? "",
                type: "count",
            })) || [],
        },

        testimonials: {
            sectionHeading: mapSectionHeading(testimonial?.sectionHeading, {
                heading: "ISLAMIC RELIEF ON THE GROUND",
                subHeading: "Impact",
                description: "2024 Restera Gravée Dans L'histoire D'Islamic Relief Suisse Comme Une Année À La Fois Mémorable Et Poignante. Nous Avons Célébré Notre 30° Anniversaire, Mais Dans Un Contexte Global Marqué Par Des Souffrances Immenses.",
            }),
            thumbnails: testimonial?.videos?.map(v => ({
                id: v.id,
                image: getMediaUrl(v.gallery) || "",
                videoUrl: getMediaUrl(v.featuredVideo) || "",
                alt: v.gallery?.alternativeText || "Testimonial thumbnail",
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
