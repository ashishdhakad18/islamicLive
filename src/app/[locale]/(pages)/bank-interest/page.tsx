import React from "react";
import Container from "@/components/layout/Container";
import HeroSection from "@/components/ui/HeroSection";
import SectionHeading from "@/components/ui/SectionHeading";
import FundamentalsCard from "@/components/ui/FundamentalsCard";
import { FundamentalsCardProps } from "@/data/fundamentalsCards";
import { ImpactCardData } from "@/types/responseCard";
import ImpactCard from "@/components/ui/ImpactCard";
import ImpactGridSection from "@/components/ui/ImpactGridSection";
import CardSlider from "@/components/ui/CardSlider";
import { CardData } from "@/types/slider.types";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import FaqSection from "@/components/ui/FaqSection";
import { getValidLocale } from "@/lib/utils/getValidLocale";
import { getBankInterestData } from "@/lib/pages/bank-interest/getBankIntrestData";

// Exported mock data for use by other pages
export const impactCardsBankPage: ImpactCardData[] = [
  {
    id: "donations",
    icon: "/Icons/Shield-primary.svg",
    title: "une présence internationale reconnue",
    description:
      "Une ONG de confiance, reconnue pour son professionnalisme, sa transparence et sa présence internationale.",
  },
  {
    id: "projects",
    icon: "/Icons/Impact-primary.svg",
    title: "une distribution éthique et transparente",
    description:
      "Votre Zakat parvient aux personnes qui en sont les plus dignes, conformément aux principes musulmans et au contexte local.",
  },
  {
    id: "impact",
    icon: "/Icons/Globe-primary.svg",
    title: "priorité aux plus vulnérables",
    description:
      "Nous concentrons notre aide sur ceux qui affrontent les plus grandes difficultés à travers le monde.",
  },
];

export const reliefPhasesDatav3 = [
  {
    theme: "primary",
    icon: "/Icons/Sparkle-primary.svg",
    description:
      "Nous suivons les principes musulmans d'Ihsan (excellence) et d'Amanah (confiance).",
  },
  {
    theme: "primary",
    icon: "/Icons/Sparkle-primary.svg",
    description:
      "Chaque don est géré avec rigueur et attention afin de garantir un impact maximal.",
  },
  {
    theme: "primary",
    icon: "/Icons/Sparkle-primary.svg",
    description:
      "islamic relief est Reconnu mondialement pour son utilisation vérifiée et éthique des fonds.",
  },
];

export const mockCampaignCards: CardData[] = [
  {
    id: "1",
    variant: "campaign",
    headerImage: "/Images/Urg-Appl-Home-1.webp",
    headerImageAlt: "Sudan Hunger Campaign",
    heading: `projet d'eau, d'hygiène et de 
    soutien aux moyens de 
    subsistance - mali`,
    subHeading: "Une nuit meilleure que mille mois.",
    buttons: [
      {
        label: "en savoir plus",
        buttonStyle: "link-blue-arrow",
        variant: "ghost",
        color: "primary",
      },
    ],
  },
  {
    id: "2",
    variant: "campaign",
    headerImage: "/Images/Urg-Appl-Home-2.webp",
    headerImageAlt: "Gaza Crisis",
    heading: "GAZA EMERGENCY",
    subHeading:
      "Providing critical medical aid and food supplies to families in Gaza.",
    buttons: [
      {
        label: "en savoir plus",
        buttonStyle: "link-blue-arrow",
        variant: "ghost",
        color: "primary",
      },
    ],
  },
  {
    id: "3",
    variant: "campaign",
    headerImage: "/Images/Urg-Appl-Home-3.webp",
    headerImageAlt: "Orphan Sponsorship",
    heading: "ORPHAN SPONSORSHIP",
    subHeading:
      "Give a vulnerable child hope for a brighter future through sponsorship.",
    buttons: [
      {
        label: "en savoir plus",
        buttonStyle: "link-blue-arrow",
        variant: "ghost",
        color: "primary",
      },
    ],
  },
];

// Fallback data for when API data is unavailable - labeled with (MOCK)
const fallbackFundamentalsCards = [
  {
    id: 1,
    title: "Qu'est-ce que la Aqiqa ? (MOCK)",
    description: `(MOCK) En Islam, l'intérêt ou l'usure (riba) — appliqué sur les prêts ou les dépôts — est interdit, qu'il soit perçu ou versé. Le riba inclut :
    
    Les intérêts générés par les comptes d'épargne, les placements ou investissements financiers, 
    Les intérêts perçus en prêtant de l'argent, des biens ou des marchandises
    Les intérêts payés sur les cartes de crédit, les prêts ou les hypothèques.`,
    buttonText: "je verse mes intérêts bancaires",
    buttonLink: "/donate",
    caption: {
      captionHeading:
        "Que faire des intérêts accumulés pour rester en accord avec les principes islamiques ? (MOCK)",
      captionDescription:
        "(MOCK) Puisqu'il n'est pas permis d'utiliser les intérêts à des fins personnelles, il convient de les donner à des œuvres caritatives.",
    },
  },
  {
    id: 2,
    title: "pourquoi le riba est interdit ? (MOCK)",
    description: `(MOCK) Allah (SWT) nous enseigne dans le Noble Coran de nous abstenir des transactions et investissements fondés sur l'intérêt.
    
    Des taux d'intérêt élevés peuvent entraîner l'endettement et l'insécurité financière.`,
    caption: {
      captionDescription:
        "(MOCK) Ô les croyants! Craignez Allah; et renoncez au reliquat de l'intérêt usuraire, si vous êtes croyants. (2:278)",
    },
  },
];

const fallbackImpactCards: ImpactCardData[] = [
  {
    id: "donations",
    icon: "/Icons/Shield-primary.svg",
    title: "une présence internationale reconnue (MOCK)",
    description:
      "(MOCK) Une ONG de confiance, reconnue pour son professionnalisme, sa transparence et sa présence internationale.",
  },
  {
    id: "projects",
    icon: "/Icons/Impact-primary.svg",
    title: "une distribution éthique et transparente (MOCK)",
    description:
      "(MOCK) Votre Zakat parvient aux personnes qui en sont les plus dignes, conformément aux principes musulmans.",
  },
  {
    id: "impact",
    icon: "/Icons/Globe-primary.svg",
    title: "priorité aux plus vulnérables (MOCK)",
    description:
      "(MOCK) Nous concentrons notre aide sur ceux qui affrontent les plus grandes difficultés à travers le monde.",
  },
];

const fallbackDistributionItems = [
  {
    theme: "primary" as const,
    icon: "/Icons/Sparkle-primary.svg",
    description:
      "(MOCK) Nous suivons les principes musulmans d'Ihsan (excellence) et d'Amanah (confiance).",
  },
  {
    theme: "primary" as const,
    icon: "/Icons/Sparkle-primary.svg",
    description:
      "(MOCK) Chaque don est géré avec rigueur et attention afin de garantir un impact maximal.",
  },
  {
    theme: "primary" as const,
    icon: "/Icons/Sparkle-primary.svg",
    description:
      "(MOCK) islamic relief est Reconnu mondialement pour son utilisation vérifiée et éthique des fonds.",
  },
];

const fallbackCampaignCards: CardData[] = [
  {
    id: "1",
    variant: "campaign",
    headerImage: "/Images/Urg-Appl-Home-1.webp",
    headerImageAlt: "Sudan Hunger Campaign",
    heading: `projet d'eau, d'hygiène - mali (MOCK)`,
    subHeading: "(MOCK) Une nuit meilleure que mille mois.",
    buttons: [
      {
        label: "en savoir plus",
        buttonStyle: "link-blue-arrow",
        variant: "ghost",
        color: "primary",
      },
    ],
  },
  {
    id: "2",
    variant: "campaign",
    headerImage: "/Images/Urg-Appl-Home-2.webp",
    headerImageAlt: "Gaza Crisis",
    heading: "GAZA EMERGENCY (MOCK)",
    subHeading:
      "(MOCK) Providing critical medical aid and food supplies to families in Gaza.",
    buttons: [
      {
        label: "en savoir plus",
        buttonStyle: "link-blue-arrow",
        variant: "ghost",
        color: "primary",
      },
    ],
  },
  {
    id: "3",
    variant: "campaign",
    headerImage: "/Images/Urg-Appl-Home-3.webp",
    headerImageAlt: "Orphan Sponsorship",
    heading: "ORPHAN SPONSORSHIP (MOCK)",
    subHeading:
      "(MOCK) Give a vulnerable child hope for a brighter future through sponsorship.",
    buttons: [
      {
        label: "en savoir plus",
        buttonStyle: "link-blue-arrow",
        variant: "ghost",
        color: "primary",
      },
    ],
  },
];

export default async function BankInterestPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await getValidLocale(params);
  const data = await getBankInterestData(locale);

  // Map data with fallbacks
  const heroData = data?.hero;
  const basicCardsData = data?.basicCards;
  const whyTrustData = data?.whyTrust;
  const distributionData = data?.distribution;
  const initiativesData = data?.initiatives;
  const ctaData = data?.cta;
  const faqSectionData = data?.faqSection;

  // Prepare fundamentals cards from mapped data
  const fundamentalsCards = basicCardsData?.cards?.length
    ? basicCardsData.cards.map((card) => ({
        id: card.id,
        title: card.title,
        description: card.description,
        buttonText: card.buttonText,
        buttonLink: card.buttonLink,
        caption: {
          captionHeading: card.caption.captionHeading,
          captionDescription: card.caption.captionDescription,
        },
      }))
    : fallbackFundamentalsCards;

  // Prepare impact cards from mapped data
  const impactCards: ImpactCardData[] = whyTrustData?.cards?.length
    ? whyTrustData.cards.map((card) => ({
        id: card.id,
        icon: card.icon || "/Icons/Shield-primary.svg",
        title: card.title,
        description: card.description,
      }))
    : fallbackImpactCards;

  // Prepare distribution items from mapped data
  const distributionItems = distributionData?.items?.length
    ? distributionData.items.map((item) => ({
        theme: item.theme,
        icon: item.icon || "/Icons/Sparkle-primary.svg",
        description: item.description,
      }))
    : fallbackDistributionItems;

  // Prepare distribution images
  const distributionImages = distributionData?.images?.length
    ? distributionData.images
    : [
        "/Images/Fid-Kaff-Grid-Img-1.png",
        "/Images/Fid-Kaff-Grid-Img-4.png",
        "/Images/Fid-Kaff-Grid-Img-2.png",
        "/Images/Fid-Kaff-Grid-Img-3.png",
        "/Images/Fid-Kaff-Grid-Img-5.png",
      ];

  // Prepare initiatives cards from mapped data
  const initiativesCards = initiativesData?.cards?.length
    ? initiativesData.cards
    : fallbackCampaignCards;

  return (
    <>
      <HeroSection
        backgroundColor="bg-primary"
        heading={
          heroData?.sectionHeading?.heading || "intérêts bancaires (MOCK)"
        }
        subheading={
          heroData?.sectionHeading?.subHeading ||
          "Nous répondons avec foi et compassion."
        }
        description={
          heroData?.sectionHeading?.description ||
          "L'Islam interdit l'intérêt (riba), qu'il soit perçu ou versé."
        }
        carouselData={{
          carouselItems: [
            {
              id: "1",
              url: heroData?.image?.url || "/Images/Bank-int-Hero-Img.png",
              alt: heroData?.image?.alt || "Bank Interest Hero",
              title: "Bank Interest",
              subtitle: "",
              buttonText:
                heroData?.ctaText || "je donne mes intérêts bancaires",
              buttonLink: heroData?.ctaLink || "/donate",
            },
          ],
        }}
        buttonLink={heroData?.ctaLink || "#"}
        buttonText={heroData?.ctaText || "je donne mes intérêts bancaires"}
        buttonClassName="mt-6"
      />

      <div className="py-25 md:py-12 mt-64 lg:mt-0">
        <Container>
          <SectionHeading
            subheading={
              basicCardsData?.sectionHeading?.subHeading || "Comprendre le Riba"
            }
            heading={
              basicCardsData?.sectionHeading?.heading || "comprendre les bases"
            }
            description={basicCardsData?.sectionHeading?.description}
          />

          <div className="flex flex-col lg:flex-row justify-between items-stretch gap-6">
            {fundamentalsCards.map((card: FundamentalsCardProps) => (
              <FundamentalsCard key={card.id} card={card} />
            ))}
          </div>
        </Container>
      </div>

      <div className="py-25 md:py-12 bg-primary-lighter ">
        <Container>
          <SectionHeading
            subheading={
              whyTrustData?.sectionHeading?.subHeading ||
              "Pourquoi nous choisir ?"
            }
            heading={
              whyTrustData?.sectionHeading?.heading ||
              "Pourquoi confier vos dons à islamic relief suisse ?"
            }
            description={
              whyTrustData?.sectionHeading?.description ||
              "En donnant vos intérêts bancaires à Islamic Relief Suisse, vous vous assurez que votre don parvient à ceux qui en ont le plus besoin."
            }
            className="max-w-5xl"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {impactCards.map((card) => (
              <ImpactCard key={card.id} data={card} />
            ))}
          </div>
        </Container>
      </div>

      <div className="bg-primary-surface">
        <ImpactGridSection
          heading={
            distributionData?.sectionHeading?.heading || "où va votre argent ?"
          }
          subheading={
            distributionData?.sectionHeading?.subHeading ||
            "Confiance & Responsabilité"
          }
          description={
            distributionData?.sectionHeading?.description ||
            "Votre don est distribué aux familles et aux populations vulnérables touchées par la pauvreté."
          }
          items={distributionItems}
          images={distributionImages}
        />
      </div>

      <div className="py-25 md:py-12 ">
        <Container>
          <SectionHeading
            subheading={initiativesData?.sectionHeading?.subHeading || "Impact"}
            heading={initiativesData?.sectionHeading?.heading || "INITIATIVES"}
            description={
              initiativesData?.sectionHeading?.description ||
              "Découvrez d'autres façons de soutenir ceux qui en ont besoin avec Islamic Relief Suisse."
            }
          />
          <CardSlider cards={initiativesCards} />
        </Container>
      </div>

      <div className="bg-green-surface lg:py-25 py-12 flex flex-col gap-12 ">
        <Container>
          <SectionHeading
            heading={
              ctaData?.sectionHeading?.heading ||
              "votre don n'est pas seulement une aumône, c'est une justice en action"
            }
            description={
              ctaData?.sectionHeading?.description ||
              "Rejoignez des milliers de donateurs qui ont choisi de faire une différence qui dépasse leur propre vie."
            }
            subheadingClassName="text-green-dark type-caption-1  font-normal mb-2 lg:mb-0 whitespace-normal lg:whitespace-nowrap"
            headingClassName="mb-1 type-h3 uppercase "
            descriptionClassName="lg:type-body-1 type-body-2 "
          />
          <div className="flex justify-center items-center w-full">
            <Button
              color="yellow"
              rounded
              className=" h-12 lg:h-12 justify-center items-center "
              endIcon={
                <Image
                  src="/Icons/Arrow-right-black.svg"
                  alt="Arrow"
                  width={20}
                  height={20}
                />
              }
            >
              {ctaData?.cta?.text || "je fais don de mes intérêts bancaires"}
            </Button>
          </div>
        </Container>
      </div>

      {faqSectionData?.faqs?.faqs && faqSectionData.faqs.faqs.length > 0 ? (
        <FaqSection
          faqs={faqSectionData.faqs}
          sectionHeading={faqSectionData.sectionHeading}
        />
      ) : (
        <FaqSection />
      )}
    </>
  );
}
