import { JoinUsPageData, JoinUsCard } from "@/types/join-us.types";
import { mapSectionHeading } from "./homepage";
import { getMediaUrl } from "@/utils/strapiHelpers";

export const mapJoinUsPageData = (data: any): JoinUsPageData => {
  const attributes = data?.attributes || data;

  return {
    hero: {
      sectionHeading: mapSectionHeading(attributes?.heroSection?.sectionHeading, {
        heading: "Rejoignez-nous !",
        subHeading: "Carrières",
        description: "Découvrez nos offres d’emplois et nos offres de stages du moment. Pour une voie professionnel alignée avec vos valeurs.",
      }),
      image: {
        url: getMediaUrl(attributes?.heroSection?.image) || "/Images/joinus-hero-image.png",
        alt: attributes?.heroSection?.image?.data?.attributes?.alternativeText || "Join Us Hero",
      },
    },
    cards: attributes?.cardSection?.map((card: any, index: number) => ({
      id: String(card.id || index),
      category: card.category || "General",
      date: card.date || "",
      title: card.title || "",
      description: card.description || "",
      image: getMediaUrl(card.image) || "",
      link: card.link || "#",
      type: card.type || "100 %",
      missions: Array.isArray(card.missions) 
        ? card.missions.map((m: any) => typeof m === 'string' ? m : (m.text || m.value || "")) 
        : [],
      qualifications: Array.isArray(card.qualifications) 
        ? card.qualifications.map((q: any) => typeof q === 'string' ? q : (q.text || q.value || "")) 
        : [],
      contactEmail: card.contactEmail || "",
      applicationInstructions: card.applicationInstructions || "",
      cardDetails: card.cardDetails || [],
    })) || [],
    cta: {
      sectionHeading: mapSectionHeading(attributes?.callToAction?.sectionHeading, {
        heading: "heading",
        subHeading: "heading",
        description: "heading",
      }),
      cta: {
        text: attributes?.callToAction?.CTA?.text || "heading",
        link: attributes?.callToAction?.CTA?.link || "#",
      },
    },
  };
};
