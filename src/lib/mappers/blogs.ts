import { BlogListingPageData, BlogCardData, SingleBlogPageData } from "@/types/blogs.types";
import { STRAPI_URL } from "@/services/api/client";

// Helper to get full image URL
const getStrapiImageUrl = (url?: string): string => {
  if (!url) return "";
  return url.startsWith("http") ? url : `${STRAPI_URL}${url}`;
};

export const mapBlogsPageData = (data: any): BlogListingPageData => {
  const attributes = data?.attributes || data;
  const heroSection = attributes?.heroSection;
  const cards = attributes?.globalNewsCard || [];

  return {
    hero: {
      heading: heroSection?.sectionHeading?.heading || "Opinion",
      subHeading: heroSection?.sectionHeading?.subHeading || "Blog",
      description: heroSection?.sectionHeading?.description || "Discover insights...",
      image: {
        url: getStrapiImageUrl(heroSection?.image?.data?.attributes?.url || heroSection?.image?.url) || "/Images/joinus-hero-image.png",
        alt: heroSection?.image?.data?.attributes?.alternativeText || heroSection?.image?.alternativeText || "Blog Hero",
      },
    },
    cards: cards.map((card: any, index: number): BlogCardData => {
      // Handle both standard (data.id) and flattened (id) structures for relations
      const blogDetailId = card.blog_detail?.data?.id || card.blog_detail?.id;
      
      // Handle both standard (data.attributes.url) and flattened (url) structures for images
      const imageUrl = card.image?.data?.attributes?.url || card.image?.url;

      return {
        id: String(card.id || index),
        image: getStrapiImageUrl(imageUrl) || "/Images/mockImages/LatestNews1.png",
        category: card.category || "General",
        date: card.date || "",
        title: card.heading || "",
        description: card.description || "",
        slug: String(blogDetailId || ""),
        link: blogDetailId ? `/blogs/${blogDetailId}` : "#",
        theme: card.theme || card.attributes?.theme || (index % 2 === 0 ? "development" : "community"), // Mocking theme distribution for demo
      };
    }),
  };
};

export const mapSingleBlogData = (data: any): SingleBlogPageData => {
  const attributes = data?.attributes || data;
  const heroSection = attributes?.heroSection;

  return {
    id: String(data?.id || ""),
    hero: {
      heading: heroSection?.sectionHeading?.heading || "",
      subHeading: heroSection?.sectionHeading?.subHeading || "",
      description: heroSection?.sectionHeading?.description || "",
      image: getStrapiImageUrl(heroSection?.image?.data?.attributes?.url || heroSection?.image?.url) || "/Images/joinus-hero-image.png",
      ctaText: heroSection?.ctaText,
      ctaLink: heroSection?.ctaLink,
      message: heroSection?.heroMSG?.message,
      author: heroSection?.heroMSG?.author,
    },
    content: attributes?.blogCardDetail || [],
  };
};
