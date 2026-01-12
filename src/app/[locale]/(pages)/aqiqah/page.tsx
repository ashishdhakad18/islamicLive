import FundamentalsCard from "@/components/ui/FundamentalsCard";
import HeroSection from "@/components/ui/HeroSection";
import SectionHeading from "@/components/ui/SectionHeading";
import { CarouselData } from "@/types/carousel.types";
import Container from "@/components/layout/Container";
import ImpactCard from "@/components/ui/ImpactCard";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import FaqSection from "@/components/ui/FaqSection";
import { getAqiqahData } from "@/lib/pages/aqiqah/getAqiqahData";
import {
  mapAqiqahPageData,
  AqiqahOverviewCardData,
  AqiqahProcessCardData,
  WhyIslamicReliefCardData,
  CallToActionCTA,
} from "@/lib/mappers/aqiqah";
import { getValidLocale } from "@/lib/utils/getValidLocale";
import { ImpactStatsData } from "@/types/impactStats";

// Fallback data
const fallbackHeroData: CarouselData = {
  carouselItems: [
    {
      id: "1",
      url: "/Images/Fidya-hero-image.png",
      alt: "Aqiqah",
      title: "",
      subtitle: "",
      buttonText: "",
      buttonLink: "",
    },
  ],
};

const fallbackHeroStats: ImpactStatsData = {
  impactStats: [
    { id: 1, value: "10,000+", label: "Aqiqah performed", type: "count" },
    { id: 2, value: "40+", label: "Countries reached", type: "count" },
    { id: 3, value: "1M+", label: "People fed", type: "count" },
  ],
};

const fallbackOverviewCards = [
  {
    id: 1,
    heading: "Qu'est-ce que l'Aqiqah?",
    description:
      "L'Aqiqah est un sacrifice offert à l'occasion de la naissance d'un enfant, une tradition prophétique bénie.",
    howItsWorkHeading: "Comment fonctionne l'Aqiqah ?",
    points: [
      "Sacrifice d'un ou deux moutons selon le sexe de l'enfant",
      "Distribution de la viande aux pauvres et nécessiteux",
      "Célébration de la naissance dans la gratitude",
    ],
    estimateAmount: "150 CHF",
    ctaText: "Offrez une Aqiqah",
    ctaLink: "/donate",
  },
];

const fallbackProcessCards = [
  {
    id: 1,
    iconImage: "/Icons/Heart-red.svg",
    iconAlt: "Step 1",
    heading: "Choisissez votre Aqiqah",
    description: "Sélectionnez le type d'Aqiqah que vous souhaitez offrir",
  },
  {
    id: 2,
    iconImage: "/Icons/Globe-primary.svg",
    iconAlt: "Step 2",
    heading: "Nous organisons le sacrifice",
    description:
      "Nos équipes sur le terrain organisent le sacrifice selon les rites islamiques",
  },
  {
    id: 3,
    iconImage: "/Icons/Customers-green.svg",
    iconAlt: "Step 3",
    heading: "Distribution aux nécessiteux",
    description: "La viande est distribuée aux familles les plus vulnérables",
  },
];

const fallbackWhyIslamicReliefCards = [
  {
    id: 1,
    iconImage: "/Icons/Shield-primary.svg",
    iconAlt: "Shield",
    heading: "Transparence",
    description: "Une gestion rigoureuse et efficace de vos dons",
  },
  {
    id: 2,
    iconImage: "/Icons/Impact-primary.svg",
    iconAlt: "Impact",
    heading: "Impact Direct",
    description: "Chaque Aqiqah nourrit directement des familles vulnérables",
  },
  {
    id: 3,
    iconImage: "/Icons/Globe-primary.svg",
    iconAlt: "Globe",
    heading: "Confiance",
    description: "30 ans d'engagement humanitaire dans plus de 40 pays",
  },
  {
    id: 4,
    iconImage: "/Icons/Sparkle-yellow.svg",
    iconAlt: "Sparkle",
    heading: "Expertise",
    description: "Des équipes formées pour assurer un sacrifice conforme",
  },
];

const AqiqahPage = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const locale = await getValidLocale(params);
  const data = await getAqiqahData(locale);
  const mappedData = data ? mapAqiqahPageData(data) : null;

  // Use mapped data or fallbacks
  const heroHeading = mappedData?.hero?.sectionHeading?.heading || "AQIQAH";
  const heroSubheading
    = mappedData?.hero?.sectionHeading?.subHeading
      || "Un engagement : réactivité et responsabilité";
  const heroDescription
    = mappedData?.hero?.sectionHeading?.description
      || "Offrez votre Aqiqa avec Islamic Relief Suisse : un acte de gratitude et de solidarité qui nourrit les plus démunis.";

  const heroImages = mappedData?.hero?.images?.length
    ? {
        carouselItems: mappedData.hero.images.map(
          (img: { id: number; url: string; alt: string }) => ({
            id: String(img.id),
            url: img.url,
            alt: img.alt,
            title: "",
            subtitle: "",
            buttonText: "",
            buttonLink: "",
          }),
        ),
      }
    : fallbackHeroData;

  const heroStats: ImpactStatsData = mappedData?.hero?.stats?.length
    ? { impactStats: mappedData.hero.stats }
    : fallbackHeroStats;

  // Sec1 - Overview Section
  const overviewHeading = mappedData?.overviewSection?.sectionHeading;
  const overviewCards = mappedData?.overviewSection?.cards?.length
    ? mappedData.overviewSection.cards
    : fallbackOverviewCards;

  // Sec2 - Process Section
  const processHeading = mappedData?.processSection?.sectionHeading;
  const processCards = mappedData?.processSection?.cards?.length
    ? mappedData.processSection.cards
    : fallbackProcessCards;

  // Sec3 - Why Islamic Relief Section
  const whyIRHeading = mappedData?.whyIslamicReliefSection?.sectionHeading;
  const whyIRCards = mappedData?.whyIslamicReliefSection?.cards?.length
    ? mappedData.whyIslamicReliefSection.cards
    : fallbackWhyIslamicReliefCards;
  const whyIRNumber = mappedData?.whyIslamicReliefSection?.number || 0;
  const whyIRDescription
    = mappedData?.whyIslamicReliefSection?.description || "";

  // CallToAction
  const ctaHeading = mappedData?.callToAction?.sectionHeading;
  const ctaButtons = mappedData?.callToAction?.ctas || [];

  // FAQs
  const faqsData = mappedData?.faqs;
  const faqSectionHeading = mappedData?.faqSectionHeading;

  return (
    <div>
      <HeroSection
        backgroundColor="bg-teal-dark"
        heading={heroHeading}
        subheading={heroSubheading}
        description={heroDescription}
        subHeadingClassName="text-yellow"
        carouselData={heroImages}
        statsData={heroStats}
        statsBgColor="bg-teal-lighter"
        buttonText="je donne pour célébrer une naissance"
        buttonLink="/donate"
        buttonClassName="mt-6"
      />

      {/* Sec1 - Overview Section */}
      <div className="py-25">
        <Container>
          <SectionHeading
            subheading={overviewHeading?.subHeading || "Impact"}
            heading={overviewHeading?.heading || "Qu'est-ce que la aqiqa ?"}
            description={overviewHeading?.description || ""}
            subheadingClassName=""
            headingClassName=""
            descriptionClassName=""
          />

          <div className="flex flex-col lg:flex-row justify-between items-stretch gap-6">
            {overviewCards.map((card: AqiqahOverviewCardData) => (
              <FundamentalsCard
                key={card.id}
                card={{
                  id: card.id,
                  title: card.heading,
                  description: card.description,
                  itemsLabel: card.howItsWorkHeading,
                  items: card.points,
                  example: card.estimateAmount,
                  buttonText: card.ctaText,
                  buttonLink: card.ctaLink,
                }}
              />
            ))}
          </div>
        </Container>
      </div>

      {/* Sec2 - Process Section */}
      <div className="py-25 bg-teal-lighter">
        <Container>
          <SectionHeading
            subheading={
              processHeading?.subHeading || "Comment cela fonctionne ?"
            }
            heading={processHeading?.heading || "Quand ? Comment ? Qui ?"}
            description={processHeading?.description || ""}
            subheadingClassName="text-grey-black"
            headingClassName=""
            descriptionClassName=""
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {processCards.map((card: AqiqahProcessCardData) => (
              <ImpactCard
                key={card.id}
                data={{
                  id: String(card.id),
                  icon: card.iconImage,
                  title: card.heading,
                  description: card.description,
                }}
              />
            ))}
          </div>
        </Container>
      </div>

      {/* Sec3 - Why Islamic Relief Section */}
      <div className="py-25">
        <Container>
          <SectionHeading
            subheading={whyIRHeading?.subHeading || "Pourquoi nous choisir ?"}
            heading={
              whyIRHeading?.heading || "Votre Don Avec Islamic Relief Suisse"
            }
            description={whyIRHeading?.description || ""}
            subheadingClassName=""
            headingClassName=""
            descriptionClassName=""
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {whyIRCards.map((card: WhyIslamicReliefCardData) => (
              <div
                key={card.id}
                className="border border-grey-divider rounded-lg px-8 py-6 flex flex-col gap-8 bg-white items-start"
              >
                <Image
                  src={card.iconImage}
                  alt={card.iconAlt}
                  width={48}
                  height={48}
                />
                <div className="flex flex-col gap-4 items-start">
                  <h6 className="type-h6 uppercase">{card.heading}</h6>
                  <p className="type-body-2 text-grey-grey">
                    {card.description}
                  </p>
                </div>
                {whyIRNumber > 0 && (
                  <div className="flex flex-col items-start pt-3 border-t border-grey-divider w-full">
                    <h5 className="type-h5">{whyIRNumber}</h5>
                    <p className="type-body-3 text-grey-grey">
                      {whyIRDescription}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* CallToAction Section */}
      <div className="bg-green-surface lg:py-25 py-12 flex flex-col gap-12">
        <Container>
          <SectionHeading
            subheading={ctaHeading?.subHeading || ""}
            heading={ctaHeading?.heading || "Offrez votre Aqiqa"}
            description={
              ctaHeading?.description
              || "Grâce à votre Aqiqa, vous offrez à une famille la joie de participer à la célébration d'une naissance."
            }
            subheadingClassName="text-green-dark type-caption-1 font-normal mb-2 lg:mb-0 whitespace-normal lg:whitespace-nowrap"
            headingClassName="mb-1 type-h3 uppercase whitespace-normal lg:whitespace-nowrap"
            descriptionClassName="lg:type-body-1 type-body-2"
          />
          <div className="flex justify-center items-center w-full gap-4 flex-wrap">
            {ctaButtons.length > 0
              ? (
                  ctaButtons.map((cta: CallToActionCTA) => (
                    <Button
                      key={cta.id}
                      color="yellow"
                      rounded
                      className="w-[216px] lg:w-[216px] h-12 lg:h-12 justify-center items-center"
                      endIcon={(
                        <Image
                          src="/Icons/Arrow-right-black.svg"
                          alt="Arrow"
                          width={20}
                          height={20}
                        />
                      )}
                    >
                      {cta.label}
                    </Button>
                  ))
                )
              : (
                  <Button
                    color="yellow"
                    rounded
                    className="w-[216px] lg:w-[216px] h-12 lg:h-12 justify-center items-center"
                    endIcon={(
                      <Image
                        src="/Icons/Arrow-right-black.svg"
                        alt="Arrow"
                        width={20}
                        height={20}
                      />
                    )}
                  >
                    offrez une aqiqa
                  </Button>
                )}
          </div>
        </Container>
      </div>

      {/* FAQ Section */}
      <FaqSection faqs={faqsData} sectionHeading={faqSectionHeading} />
    </div>
  );
};

export default AqiqahPage;
