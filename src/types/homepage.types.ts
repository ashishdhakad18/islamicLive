// Reusable image type for Strapi media fields
export interface StrapiImage {
  id?: number;
  url?: string;
  alternativeText?: string;
  width?: number;
  height?: number;
}

export interface HomePageData {
  id: number;
  heroSection?: {
    Carousel?:
      | Array<{
          id: number;
          heading?: string;
          description?: string;
          image?: StrapiImage;
          CTA?: {
            label?: string;
            url?: string;
          };
        }>
      | {
          id: number;
          heading?: string;
          description?: string;
          image?: StrapiImage;
          CTA?: {
            label?: string;
            url?: string;
          };
        };
    secHeading?: {
      heading?: string;
      subHeading?: string;
      description?: string;
    };
  };
  campaignSection?: {
    sectionHeading?: {
      heading?: string;
      subHeading?: string;
      description?: string;
    };
    campaignCards?: Array<{
      id: number;
      imageChip?: string;
      heading?: string;
      description?: string;
      image?: StrapiImage;
      CTA?: {
        label?: string;
        url?: string;
      };
    }>;
  };
  impactCards?: Array<{
    id: number;
    heading?: string;
    description?: string;
    icon?: StrapiImage;
    CTA?: {
      label?: string;
      url?: string;
    };
  }>;
  impactSection?: {
    sectionHeading?: {
      heading?: string;
      subHeading?: string;
      description?: string;
    };
    image?: StrapiImage;
    impactData?: Array<{
      id: number;
      heading?: string;
      subHeading?: string;
      description?: string;
      icon?: StrapiImage;
    }>;
  };
  impactStatsSection?: {
    stats?: Array<{
      id: number;
      value?: string;
      caption?: string;
    }>;
  };
  newsSection?: {
    sectionHeading?: {
      heading?: string;
      subHeading?: string;
      description?: string;
    };
    newsCard?: Array<{
      id: number;
      readTime?: string | number;
      publishedDate?: string;
      heading?: string;
      tag1?: string;
      tag2?: string;
      image?: StrapiImage;
    }>;
  };
  eventCardsSection?: {
    sectionHeading?: {
      heading?: string;
      subHeading?: string;
      description?: string;
    };
    eventCardsWrapper?: Array<{
      id: number;
      publishedDate?: string;
      tag?: string;
      heading?: string;
      description?: string;
      eventDate?: string;
      eventTime?: string;
      ctaText?: string;
      ctaLink?: string;
      image?: StrapiImage;
    }>;
  };
  testimonials?: {
    sectionHeading?: {
      heading?: string;
      subHeading?: string;
      description?: string;
    };
    videos?: Array<{
      id: number;
      featuredVideo?: StrapiImage;
      gallery?: StrapiImage;
    }>;
  };
  FAQSection?: {
    sectionHeading?: {
      heading?: string;
      subHeading?: string;
      description?: string;
    };
    faqs?: Array<{
      id: number;
      question?: string;
      answer?: string;
      category?: string;
    }>;
  };
  socialMediaSection?: {
    sectionHeading?: {
      heading?: string;
      subHeading?: string;
      description?: string;
    };
    socialMediaCards?: Array<{
      id: number;
      socialMedia?: string;
      description?: string;
      likes?: number;
      replies?: number;
      image?: StrapiImage;
    }>;
  };
  formBGImage?: StrapiImage;
}
