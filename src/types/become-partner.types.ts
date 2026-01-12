
import { StrapiSectionHeading, StrapiImage, StrapiHeroMsg, StrapiFaqItem } from "./kurban.types";

export interface StrapiCommonCard {
    id: number;
    iconImage?: StrapiImage;
    heading?: string;
    description?: string;
    number?: string;
    numberDescription?: string;
}

export interface BecomePartnerPageDataFromStrapi {
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
            description: string;
            icon?: StrapiImage;
        }>;
        images?: {
            data: StrapiImage[];
        } | StrapiImage[];
    };
    whyTrustUs?: {
        heading?: string;
        cards?: StrapiCommonCard[];
    };
    faqSection?: {
        sectionHeading?: StrapiSectionHeading;
        faqs?: StrapiFaqItem[];
    };
}
