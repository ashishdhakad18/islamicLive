import { StrapiImage } from "./homepage.types";

export interface BlogListingPageData {
  hero: {
    heading: string;
    subHeading: string;
    description: string;
    image: {
      url: string;
      alt: string;
    };
  };
  cards: BlogCardData[];
}

export interface BlogCardData {
  id: string;
  image: string; // URL
  category: string;
  date: string;
  title: string;
  description: string;
  slug: string;
  link: string;
  theme?: string;
}

export interface SingleBlogPageData {
  id: string;
  hero: {
    heading: string;
    subHeading: string;
    description: string;
    image: string;
    ctaText?: string;
    ctaLink?: string;
    message?: string;
    author?: string;
  };
  content: any; // Rich text blocks
}
