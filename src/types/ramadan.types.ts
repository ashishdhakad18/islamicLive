// src/types/ramadan.types.ts

// Common Types (reusing patterns from other pages)
interface StrapiSectionHeading {
  id?: number;
  heading?: string;
  subHeading?: string;
  description?: string;
}

interface StrapiImage {
  id?: number;
  documentId?: string;
  name?: string;
  url?: string;
  alternativeText?: string;
  width?: number;
  height?: number;
}

interface StrapiCTA {
  id?: number;
  label?: string;
  url?: string;
}

// ============================================
// Hero Section
// ============================================
interface StrapiHeroMSG {
  id?: number;
  message?: string;
  author?: string;
}

export interface RamadanHeroSection {
  id?: number;
  sectionHeading?: StrapiSectionHeading;
  image?: StrapiImage;
  ctaText?: string;
  ctaLink?: string;
  heroMSG?: StrapiHeroMSG;
}

// ============================================
// Transmet/Generosity Section
// ============================================
export interface RamadanTransmetSection {
  id?: number;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  videoUrl?: StrapiImage; // Video file from Strapi media
  posterImage?: StrapiImage;
}

// ============================================
// Esemble Card Section (Where We're Responding)
// ============================================
export interface RamadanEsembleCardSection {
  id?: number;
  sectionHeading?: StrapiSectionHeading;
  description?: string;
  // selectedTemplates will be added later
}

// ============================================
// Testimonial Section
// ============================================
interface StrapiVideo {
  id?: number;
  featuredVideo?: StrapiImage;
  gallery?: StrapiImage;
}

export interface RamadanTestimonialSection {
  id?: number;
  sectionHeading?: StrapiSectionHeading;
  videos?: StrapiVideo[];
}

// ============================================
// Card Section (Project Cards)
// ============================================
interface StrapiProjectCard {
  id?: number;
  Image?: StrapiImage;
  badge?: string;
  heading?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
}

export interface RamadanCardSection {
  id?: number;
  sectionHeading?: StrapiSectionHeading;
  projectCard?: StrapiProjectCard[];
}

// ============================================
// Impact Data Section
// ============================================
interface StrapiImpactData {
  id?: number;
  heading?: string;
  subHeading?: string;
  description?: string;
  icon?: StrapiImage;
}

export interface RamadanImpactDataSection {
  id?: number;
  sectionHeading?: StrapiSectionHeading;
  impactData?: StrapiImpactData[];
}

// ============================================
// News Section (reusable) - matches homepage.types.ts
// ============================================
interface StrapiNewsCard {
  id?: number;
  readTime?: string | number;
  publishedDate?: string;
  heading?: string;
  tag1?: string;
  tag2?: string;
  image?: StrapiImage;
}

export interface RamadanNewsSection {
  id?: number;
  sectionHeading?: StrapiSectionHeading;
  newsCard?: StrapiNewsCard[];
}

// ============================================
// Social Media Section (reusable) - matches homepage.types.ts
// ============================================
interface StrapiSocialMediaCard {
  id?: number;
  socialMedia?: string;
  description?: string;
  likes?: number;
  replies?: number;
  image?: StrapiImage;
}

export interface RamadanSocialMediaSection {
  id?: number;
  sectionHeading?: StrapiSectionHeading;
  socialMediaCards?: StrapiSocialMediaCard[];
}

// ============================================
// FAQ Section (reusable)
// ============================================
interface StrapiFaq {
  id?: number;
  question?: string;
  answer?: string;
}

export interface RamadanFaqSection {
  id?: number;
  sectionHeading?: StrapiSectionHeading;
  faqs?: StrapiFaq[];
}

// ============================================
// Main Page Data Interface
// ============================================
export interface RamadanPageData {
  id: number;
  documentId?: string;
  heroSection?: RamadanHeroSection;
  transmetSection?: RamadanTransmetSection;
  esembleCardSection?: RamadanEsembleCardSection;
  testimonialSection?: RamadanTestimonialSection;
  card?: RamadanCardSection;
  impactDataSection?: RamadanImpactDataSection;
  newsSection?: RamadanNewsSection;
  socialMedia?: RamadanSocialMediaSection;
  faqs?: RamadanFaqSection;
}
