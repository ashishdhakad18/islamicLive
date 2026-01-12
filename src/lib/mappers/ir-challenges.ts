
import { IrChallengesPageDataFromStrapi } from "@/types/ir-challenges.types";
import { SectionHeadingData, mapSectionHeading } from "./homepage";
import { getMediaUrl } from "@/utils/strapiHelpers";
import { FaqsData } from "@/types/faqs";
import { CardData } from "@/types/slider.types";

export interface IrChallengesHeroData {
  sectionHeading: SectionHeadingData;
  image: {
    url: string;
    alt: string;
  };
  ctaText: string;
  ctaLink: string;
}

export const mapIrChallengesHero = (data: IrChallengesPageDataFromStrapi): IrChallengesHeroData => {
  const section = data?.heroSection;
  return {
    sectionHeading: mapSectionHeading(section?.sectionHeading, {
      heading: "Devenir partenaire",
      subHeading: "Soyez acteurs de la solidarité !",
      description: "Offrir son Kurban, c’est bien plus qu’un sacrifice rituel. C’est un acte de foi, de partage et de compassion envers ceux que les crises ont laissé de côté. Pour des millions de personnes à travers le monde, la viande est un luxe inaccessible… sauf pendant Kurban.",
    }),
    image: {
      url: getMediaUrl(section?.image) || "/Images/partner-hero-image.png",
      alt: section?.image?.alternativeText || "Hero Image",
    },
    ctaText: section?.ctaText || "faire un don",
    ctaLink: section?.ctaLink || "#",
  };
};

export interface IrChallengesDistributionData {
    sectionHeading: SectionHeadingData;
    items: Array<{
        title: string;
        description: string;
        icon: string;
        theme: "primary";
    }>;
    images: string[];
}

export const mapIrChallengesDistribution = (data: IrChallengesPageDataFromStrapi): IrChallengesDistributionData => {
    const section = data?.fundDestribution;
    const items = section?.destributionlist?.map(item => ({
        title: item.title || item.heading || "",
        description: item.description || "",
        icon: getMediaUrl(item.icon) || "/Icons/Sparkle-primary.svg",
        theme: "primary" as const,
    })) || [];

    const fallbackItems = [
        {
            theme: "primary" as const,
            icon: "/Icons/Sparkle-primary.svg",
            title: "",
            description: "Nous suivons les principes musulmans d’Ihsan (excellence) et d’Amanah (confiance).",
        },
        {
            theme: "primary" as const,
            icon: "/Icons/Sparkle-primary.svg",
            title: "",
            description: "Chaque don est géré avec rigueur et attention afin de garantir un impact maximal.",
        },
        {
            theme: "primary" as const,
            icon: "/Icons/Sparkle-primary.svg",
            title: "",
            description: "islamic relief est Reconnu mondialement pour son utilisation vérifiée et éthique des fonds.",
        },
    ];

    return {
        sectionHeading: mapSectionHeading(section?.sectionHeading, {
            heading: "où va votre argent ?",
            subHeading: "Confiance & Responsabilité",
            description: "Votre don est distribué aux familles et aux populations vulnérables touchées par la pauvreté, la famine ou les conflits — dans plus de 30 pays.",
        }),
        items: items.length > 0 ? items : fallbackItems,
        images: section?.images?.map(img => getMediaUrl(img) || "").filter(Boolean) || [
            "/Images/Fid-Kaff-Grid-Img-1.png",
            "/Images/Fid-Kaff-Grid-Img-4.png",
            "/Images/Fid-Kaff-Grid-Img-2.png",
            "/Images/Fid-Kaff-Grid-Img-3.png",
            "/Images/Fid-Kaff-Grid-Img-5.png",
        ],
    };
};

export const mapIrChallengesCards = (data: IrChallengesPageDataFromStrapi): CardData[] => {
    const section = data?.challengesCardSection;
    if (!section?.cards) return [];

    return section.cards.map(card => ({
        id: String(card.id),
        variant: "campaign" as const,
        headerImage: getMediaUrl(card.image) || "",
        headerImageAlt: card.heading,
        heading: card.heading,
        subHeading: card.description,
        buttons: card.ctaText ? [
            {
                label: card.ctaText,
                buttonStyle: "link-blue-arrow" as const,
                href: card.ctaLink,
            }
        ] : [],
    }));
};

export interface IrChallengesMappedData {
  hero: IrChallengesHeroData;
  distribution: IrChallengesDistributionData;
  challengeCards: CardData[];
  challengeCardsHeading: SectionHeadingData;
  faqs: FaqsData;
  faqSectionHeading: SectionHeadingData;
}

export const mapIrChallengesPageData = (data: IrChallengesPageDataFromStrapi): IrChallengesMappedData => {
  return {
    hero: mapIrChallengesHero(data),
    distribution: mapIrChallengesDistribution(data),
    challengeCards: mapIrChallengesCards(data),
    challengeCardsHeading: mapSectionHeading(data?.challengesCardSection?.sectionHeading, {
        heading: "NOS CHALLENGES",
        subHeading: "Partout dans le monde !",
        description: "",
    }),
    faqs: {
      faqs: data?.faqSection?.faqs?.map((faq, index) => ({
        id: faq.id || index + 1,
        question: faq.question || "",
        answer: faq.answer || "",
      })) || [],
      cta: {
        label: "Voir plus",
        action: "/faq",
      },
    },
    faqSectionHeading: mapSectionHeading(data?.faqSection?.sectionHeading, {
      heading: "Questions Fréquentes",
      subHeading: "FAQ",
      description: "Retrouvez les réponses aux questions les plus courantes sur nos défis et initiatives.",
    }),
  };
};
