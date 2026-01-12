import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import HeroSection from "@/components/ui/HeroSection";
import { ImpactStatsData } from "@/types/impactStats";
import { CarouselData } from "@/types/carousel.types";
import FundamentalsCard from "@/components/ui/FundamentalsCard";
import CommentGridSection from "@/components/ui/CommentGridSection";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import LatestNewsCard from "@/components/ui/LatestNewsCard";
import { latestNewsCardData } from "@/types/latestNewsCard";
import FaqSection from "@/components/ui/FaqSection";
import ImpactGridSection from "@/components/ui/ImpactGridSection";
import { getFidyaKaffaraData } from "@/lib/pages/fidya-kaffara/getFidyaKaffaraData";
import { getValidLocale } from "@/lib/utils/getValidLocale";

const heroStatsData: ImpactStatsData = {
  impactStats: [
    {
      id: 1,
      value: "174,927",
      label: "Beneficiaries fed across 31 countries",
      type: "percentage",
    },
    {
      id: 2,
      value: "124,605",
      label: "Food distributed through Fidya & Kaffara",
      type: "count",
    },
    { id: 3, value: "+40", label: "Countries worldwide", type: "count" },
  ],
};
const heroData: CarouselData = {
  carouselItems: [
    {
      id: "1",
      // Using a placeholder that looks like the screenshot (disaster zone)
      url: "/Images/Fidya-hero-image.png",
      alt: "Disaster Relief",
      title: "",
      subtitle: "",
      buttonText: "",
      buttonLink: "",
    },
  ],
};

const fundamentalsCards = [
  {
    id: 1,
    title: "qu’est-ce que la Fidya?",
    description:
      "La Fidya est une compensation donnée par ceux qui ne peuvent pas jeûner pour des raisons valables (maladie chronique, vieillesse, etc.) et qui ne pourront jamais rattraper ces jours.",
    itemsLabel: "Comment fonctionne la Fidya ?",
    items: [
      "Vous versez la valeur d’un repas pour chaque jour manqué.",
      "Le montant soutient des personnes dans le besoin.",
      "Montant estimé (2025): 15 CHF par jour.",
    ],
    example: "Si vous avez manqué 5 jours de jeûne → 5 × 15 CHF = 75 CHF",
    buttonText: "donnez votre Fidya ou kaffara",
    buttonLink: "/donate",
  },
  {
    id: 2,
    title: "qu’est-ce que la Kaffara?",
    description:
      "La Kaffara est une compensation donnée par ceux qui ne peuvent pas jeûner pour des raisons valables (maladie chronique, vieillesse, etc.) et qui ne pourront jamais rattraper ces jours.",
    itemsLabel: "Comment fonctionne la Kaffara ?",
    items: [
      "Vous versez la valeur d’un repas pour chaque jour manqué.",
      "Le montant soutient des personnes dans le besoin.",
      "Montant estimé (2025): 15 CHF par jour.",
    ],
    example: "Si vous avez manqué 5 jours de jeûne → 5 × 15 CHF = 75 CHF",
    buttonText: "donnez votre Fidya ou kaffara",
    buttonLink: "/donate",
  },
];

const reliefPhasesDatav2 = [
  {
    theme: "red",
    icon: "/Icons/Heart-red.svg",
    description:
      "accomplissez votre devoir religieux avec sincérité et dévotion",
  },
  {
    theme: "green",
    icon: "/Icons/Customers-green.svg",
    description: "contribuez à nourrir les familles les plus vulnérables",
  },
  {
    theme: "yellow",
    icon: "/Icons/Sparkle-yellow.svg", // Using placeholder, please update if yellow icon exists
    description: "multipliez vos bonnes actions en ce mois béni de ramadan",
  },
];

const whyIslamicReliefData = [
  {
    id: 1,
    icon: "/Icons/Shield-primary.svg",
    title: "Transparence",
    description: "Une gestion rigoureuse et efficace de vos dons",
  },
  {
    id: 2,
    icon: "/Icons/Impact-primary.svg",
    title: "Impact Direct",
    description:
      "Chaque Fidya ou Kaffara nourrit directement des familles vulnérables",
  },
  {
    id: 3,
    icon: "/Icons/Globe-primary.svg",
    title: "confiance",
    description: "30 ans d’engagement humanitaire dans plus de 40 pays",
  },
];

const FidyaKaffara = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const locale = await getValidLocale(params);
  const data = await getFidyaKaffaraData(locale);
  return (
    <div>
      <HeroSection
        backgroundColor="bg-teal-dark"
        heading="accomplissez votre fidya & kaffara"
        subheading="Un engagement : réactivité et responsabilité"
        description="Vous avez manqué un jour de  jeûne ou l’avez rompu involontairement ? Grâce à la Fidya et à la Kaffara, vous pouvez remplir votre devoir religieux tout en nourrissant ceux qui en ont le plus besoin. Chaque repas offert répare ce qui a été manqué et multiplie vos bonnes actions."
        subHeadingClassName="text-white"
        carouselData={heroData}
        statsData={heroStatsData}
        statsBgColor="bg-teal-lighter"
        buttonText="donnez votre Fidya ou kaffara"
        buttonLink="/donate"
        buttonClassName="mt-6"
      />
      <Container className="py-12 lg:py-25">
        <SectionHeading
          subheading="Qu’est-ce que la Fidya et la Kaffara"
          heading="comprendre les bases"
          description="Découvrez la Fidya et la Kaffara, et comment votre contribution aide ceux qui en ont besoin."
          subheadingClassName=""
          headingClassName=""
          descriptionClassName=""
        />
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
          {fundamentalsCards.map((card) => (
            <FundamentalsCard key={card.id} card={card} />
          ))}
        </div>
      </Container>
      <div className="py-12 lg:py-25 bg-teal-divider">
        <Container>
          <SectionHeading
            subheading="Impact"
            heading="comment cela fonctionne ?"
            description="Un processus simple en 4 étapes pour remplir votre obligation et nourrir les plus démunis."
            subheadingClassName="text-grey-black"
            className="lg:mb-12 mb-6"
          />
          <CommentGridSection />
        </Container>
      </div>

      {/* Grid Section with Left Content and right Grid */}
      <ImpactGridSection
        heading="Fidya & Kaffara — une double bénédiction"
        subheading="Fidya & Kaffara"
        description="En accomplissant votre Fidya ou votre Kaffara avec Islamic Relief Suisse, vous :"
        items={reliefPhasesDatav2.map((item) => ({
          ...item,
          theme: item.theme as "red" | "green" | "yellow",
        }))}
        images={[
          "/Images/Fid-Kaff-Grid-Img-1.png",
          "/Images/Fid-Kaff-Grid-Img-4.png",
          "/Images/Fid-Kaff-Grid-Img-2.png",
          "/Images/Fid-Kaff-Grid-Img-3.png",
          "/Images/Fid-Kaff-Grid-Img-5.png",
        ]}
      />
      {/* Green Container */}
      <div className="bg-green-surface lg:py-25 py-12 flex flex-col gap-12">
        <Container childrenClassName="flex flex-col gap-6 items-center justify-center">
          <SectionHeading
            heading="accomplissez votre devoir, nourrissez une âme, et restaurez l’équilibre."
            description="Faites de ce Ramadan un moment encore plus porteur de sens "
            subheadingClassName="text-green-dark type-caption-1 text-5xl lg:text-[100px]! font-normal mb-2 lg:mb-0"
            headingClassName="mb-4 type-h1"
            descriptionClassName="type-body-2"
            className="mb-0"
          />
          <Button
            color="yellow"
            rounded
            className="w-full lg:w-auto justify-center"
            endIcon={
              <Image
                src="/Icons/Arrow-right-black.svg"
                alt="Arrow"
                width={24}
                height={24}
              />
            }
          >
            donnez votre fidya ou kaffara
          </Button>
        </Container>
      </div>

      {/* Why Islamic Relief Section */}

      <Container className="lg:py-25 py-12">
        <SectionHeading
          subheading="Des moyens pour faire la différence "
          heading="pourquoi Islamic Relief suisse?"
          description="Votre contribution est bien plus qu’un simple don — c’est votre compassion mise en action."
          className="max-w-auto"
        />
        <div className="flex flex-col lg:flex-row justify-center gap-6">
          {whyIslamicReliefData.map((item) => (
            <div
              key={item.id}
              className="w-full py-6 px-8 flex flex-col items-start gap-8 border border-grey-divider bg-white rounded-lg"
            >
              <Image src={item.icon} alt={item.title} width={48} height={48} />
              <div className="flex flex-col items-start gap-4">
                <h5 className="type-h5 text-grey-black uppercase tracking-tight">
                  {item.title}
                </h5>
                <p className="type-body-2 text-grey-grey">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>

      <div className="py-26 bg-primary">
        <Container className="">
          <div className="md:flex md:items-end md:justify-between lg:mb-12">
            <SectionHeading
              heading="Latest News"
              subheading="Stories"
              description="Built on faith, powered by experience, trusted by millions worldwide"
              subheadingClassName="text-yellow"
              headingClassName="text-white"
              descriptionClassName="text-grey-bg-light"
              align="left"
              className="mx-0 mb-8 lg:mb-0"
            />
            <Button
              color="yellow"
              className="px-12 hidden lg:flex"
              size="lg"
              rounded
              endIcon={
                <Image
                  src="/Icons/Arrow-right-black.svg"
                  alt="arrow-right"
                  width={24}
                  height={24}
                />
              }
            >
              View All Stories
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestNewsCardData.slice(2, 5).map((card) => (
              <LatestNewsCard
                key={card.id}
                image={card.image}
                title={card.title}
                read={card.read}
                date={card.date}
                categories={card.categories}
                link={card.link}
              />
            ))}
          </div>
        </Container>
      </div>

      <FaqSection />
    </div>
  );
};

export default FidyaKaffara;
