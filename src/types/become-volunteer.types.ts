
import { StrapiSectionHeading, StrapiImage, StrapiHeroMsg, StrapiFaqItem } from "./kurban.types";

export interface StrapiImpactStats {
    id: number;
    value?: string;
    caption?: string;
}

export interface BecomeVolunteerPageDataFromStrapi {
    id: number;
    heroSection?: {
        sectionHeading?: StrapiSectionHeading;
        image?: StrapiImage;
        heroMSG?: StrapiHeroMsg;
    };
    fundDestribution?: {
        sectionHeading?: StrapiSectionHeading;
        destributionlist?: Array<{
            id: number;
            heading: string;
            title?: string;
            description: string;
            icon?: StrapiImage;
            theme?: "red" | "green" | "yellow" | "primary";
        }>;
        images?: {
            data: StrapiImage[];
        } | StrapiImage[];
    };
    whyTrustUsSection?: {
        sectionHeading?: StrapiSectionHeading;
        cards?: Array<{
            id: number;
            heading?: string;
            description?: string;
            iconImage?: StrapiImage;
        }>;
    };
    impactStats?: StrapiImpactStats[];
    testimonialSection?: {
        sectionHeading?: StrapiSectionHeading;
        videos?: Array<{
            id: number;
            featuredVideo?: StrapiImage;
            gallery?: StrapiImage;
        }>;
    };
    faqSection?: {
        sectionHeading?: StrapiSectionHeading;
        faqs?: StrapiFaqItem[];
    };
}
