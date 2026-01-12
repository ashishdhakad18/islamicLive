// src/types/strapi.ts

/**
 * Base Strapi data structure
 */
export interface StrapiData<T = Record<string, unknown>> {
  id: number;
  attributes: T;
}

/**
 * Strapi API response structure
 */
export interface StrapiResponse<T = Record<string, unknown>> {
  data: StrapiData<T> | StrapiData<T>[] | null;
  meta?: StrapiMeta;
}

/**
 * Strapi pagination metadata
 */
export interface StrapiPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

/**
 * Strapi response metadata
 */
export interface StrapiMeta {
  pagination?: StrapiPagination;
}

/**
 * Strapi media object
 */
export interface StrapiMedia {
  id: number;
  attributes: {
    url: string;
    alternativeText?: string;
    caption?: string;
    width?: number;
    height?: number;
    formats?: {
      thumbnail?: StrapiMediaFormat;
      small?: StrapiMediaFormat;
      medium?: StrapiMediaFormat;
      large?: StrapiMediaFormat;
    };
    mime?: string;
    size?: number;
  };
}

/**
 * Strapi media format
 */
export interface StrapiMediaFormat {
  url: string;
  width: number;
  height: number;
  size: number;
}

/**
 * Strapi relation (single)
 */
export interface StrapiRelation<T = Record<string, unknown>> {
  data: StrapiData<T> | null;
}

/**
 * Strapi relation (multiple)
 */
export interface StrapiRelationMany<T = Record<string, unknown>> {
  data: StrapiData<T>[];
}

/**
 * Common Strapi timestamp fields
 */
export interface StrapiTimestamps {
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

/**
 * Strapi error response
 */
export interface StrapiError {
  status: number;
  name: string;
  message: string;
  details?: Record<string, unknown>;
}

// ============================================
// Homepage Content Type
// ============================================

/**
 * Hero Section - Images carousel with title
 */
export interface HeroSection {
  title?: string;
  description?: string;
  images?: StrapiRelationMany;
}

/**
 * Campaign Card - Used in campaignSection
 */
export interface CampaignCard {
  title: string;
  description?: string;
  image?: StrapiRelation;
  link?: string;
  targetAmount?: number;
  raisedAmount?: number;
}

/**
 * Impact Card
 */
export interface ImpactCard {
  title: string;
  value: string;
  description?: string;
  icon?: StrapiRelation;
}

/**
 * Testimonial
 */
export interface Testimonial {
  name: string;
  role?: string;
  content: string;
  rating?: number;
  avatar?: StrapiRelation;
}

/**
 * FAQ Item
 */
export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
  order?: number;
}

/**
 * News Item
 */
export interface NewsItem {
  title: string;
  excerpt?: string;
  content?: string;
  image?: StrapiRelation;
  publishedAt?: string;
  slug?: string;
}

/**
 * Social Media Item
 */
export interface SocialMediaItem {
  platform: string;
  url: string;
  icon?: StrapiRelation;
}

/**
 * Home Page content type attributes
 * All sections are embedded within this single content type
 */
export interface HomePageAttributes extends StrapiTimestamps {
  heroSection?: HeroSection;
  campaignSection?: CampaignCard[];
  impactCards?: ImpactCard[];
  impactSection?: Record<string, unknown>;
  impactStatsSection?: Record<string, unknown>;
  newsSection?: NewsItem[];
  testimonials?: Testimonial[];
  FAQSection?: FAQItem[];
  socialMediaSection?: SocialMediaItem[];
}

/**
 * Transformed Homepage data (after Strapi response transformation)
 */
export interface HomePage extends HomePageAttributes {
  id: number;
}
