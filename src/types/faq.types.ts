
import { 
  StrapiSectionHeading, 
  StrapiImage, 
  StrapiCTA, 
  StrapiImpactDataItem, 
  StrapiNewsCard, 
  StrapiSocialMediaCard, 
  StrapiFaqItem 
} from "./kurban.types";
import { StrapiImpactStats } from "./become-volunteer.types";

export interface FaqPageDataFromStrapi {
  id: number;
  heroSection?: {
    sectionHeading?: StrapiSectionHeading;
    images?: {
      data: StrapiImage[];
    } | StrapiImage[];
    stats?: StrapiImpactStats[];
  };
  whereWeWork?: {
    sectionHeading?: StrapiSectionHeading;
    heading?: string;
    description?: string;
    image?: StrapiImage;
  };
  callToAction?: {
    sectionHeading?: StrapiSectionHeading;
    CTA?: StrapiCTA;
  };
  faqSection?: {
    sectionHeading?: StrapiSectionHeading;
    faqs?: StrapiFaqItem[];
  };
  impactData?: {
    sectionHeading?: StrapiSectionHeading;
    impactData?: StrapiImpactDataItem[];
  };
  newsSection?: {
    sectionHeading?: StrapiSectionHeading;
    newsCard?: StrapiNewsCard[];
  };
  socialMedia?: {
    sectionHeading?: StrapiSectionHeading;
    socialMediaCards?: StrapiSocialMediaCard[];
  };
}
