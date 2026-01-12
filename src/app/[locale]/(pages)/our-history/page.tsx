import NewsSection from "@/components/Homepage/NewsSection";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import FaqSection from "@/components/ui/FaqSection";
import HeroSection from "@/components/ui/HeroSection";
import HistoryTimelineSection from "@/components/ui/HistoryTimelineSection";
import ImpactData from "@/components/ui/ImpactData";
import ImpactHistorySection from "@/components/ui/ImpactHistorySection";
import PrinciplesSection from "@/components/ui/PrinciplesSection";
import SectionHeading from "@/components/ui/SectionHeading";
import SocialMediaSection from "@/components/ui/SocialMediaSection";
import {
  mapHistoryHero,
  mapImpactHistorySection,
  mapSituationSection,
  mapDecadesSection,
  mapTimelineSection,
  mapPrinciplesSection,
  mapHistoryCallToAction,
  mapHistoryImpactData,
  mapHistoryNewsCards,
  mapHistorySocialMedia,
  mapHistoryFaqs,
} from "@/lib/mappers/history";
import { getHistoryPageData } from "@/lib/pages/history/getHistoryData";
import { cn } from "@/lib/utils";
import { getValidLocale } from "@/lib/utils/getValidLocale";
import { ImpactData as ImpactDataProps } from "@/types/impactData";
import { ImpactStatsData } from "@/types/impactStats";
import Image from "next/image";
import React from "react";

// Fallback data for when API is unavailable
const fallbackHeroStatsData: ImpactStatsData = {
  impactStats: [
    {
      id: 1,
      value: "25%",
      label: "Des dons collectés pour les urgences",
      type: "percentage",
    },
    {
      id: 2,
      value: "2.4M+",
      label: "De vies transformées",
      type: "count",
    },
    { id: 3, value: "40+", label: "Pays à travers le monde", type: "count" },
  ],
};

const fallbackGridItemsData = [
  {
    id: 1,
    title:
      "Ramadan (distribution de colis alimentaires, Zakat Al Fitr, Fidya, Kaffara…)",
    value: "",
    description: "",
    icon: "/Icons/Sadaqah-red.svg",
    theme: "red",
  },
  {
    id: 2,
    title: "Kurban",
    value: "",
    description: "",
    icon: "/Icons/Sadaqah-green.svg",
    theme: "green",
  },
  {
    id: 3,
    title: "Programme de parrainage d’orphelins ",
    value: "",
    description: "",
    icon: "/Icons/Sadaqah-yellow.svg",
    theme: "yellow",
  },
];

const fallbackValuesData = [
  {
    title: "Sincérité (Ikhlâs) :",
    description: "agir pour Dieu et pour l’humanité.",
  },
  { title: "Compassion (Rahma) :", description: "chaque vie compte." },
  {
    title: "Excellence (Ihsân) :",
    description: "toujours chercher à faire mieux.",
  },
  {
    title: "Justice sociale (‘Adl) :",
    description: "défendre les plus vulnérables.",
  },
  {
    title: "Responsabilité (Amâna) :",
    description: "protéger la confiance de nos donateurs et des bénéficiaires.",
  },
];

const fallbackImpactData: ImpactDataProps = {
  stats: [
    {
      id: 1,
      icon: "/Icons/Sadaqah.png",
      value: "",
      label: "ou va votre argent ?",
      description:
        "Votre don est en sécurité chez Islamic Relief Suisse car nous sommes transparents sur le montant que nous collectons et sur la façon dont il est dépensé. ",
    },
    {
      id: 2,
      icon: "/Icons/Sadaqah.png",
      value: "",
      label: "Pourquoi vous pouvez nous faire confiance ?",
      description:
        "Conformément à nos valeurs islamiques d’ihsan (excellence) et d’amanah (conservation), nous nous engageons à faire en sorte que vos dons soient utilisés de la manière la plus efficace possible et que nous fournissions le meilleur service possible à ceux que nous aidons. ",
    },
    {
      id: 3,
      icon: "/Icons/Sadaqah.png",
      value: "",
      label: "Transparence et responsabilité",
      description:
        "C’est pourquoi nous ne cachons pas que nous avons des frais d’administration et de collecte de fonds et qu’il s’agit de dépenses nécessaires pour une organisation caritative mondiale qui s’engage à respecter les normes humanitaires internationales les plus strictes.",
    },
    {
      id: 4,
      icon: "/Icons/Sadaqah.png",
      value: "",
      label: "Dons déductibles des impôts en Suisse",
      description:
        "Islamic Relief Suisse, organisation reconnue d’utilité publique en Suisse depuis 2005, bénéficie de l’exonération fiscale. C’est un gage de transparence et de confiance : nous sommes habilités par les autorités tout en utilisant vos dons avec rigueur pour maximiser leur impact humanitaire.",
    },
  ],
};

const OurHistoryPage = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const locale = await getValidLocale(params);
  const data = await getHistoryPageData(locale);

  // Map the data using mappers with fallbacks
  const heroData = data ? mapHistoryHero(data) : null;
  const impactHistoryData = data ? mapImpactHistorySection(data) : null;
  const situationData = data ? mapSituationSection(data) : null;
  const decadesData = data ? mapDecadesSection(data) : null;
  const timelineData = data ? mapTimelineSection(data) : null;
  const principlesData = data ? mapPrinciplesSection(data) : null;
  const callToActionData = data ? mapHistoryCallToAction(data) : null;
  const impactDataMapped = data ? mapHistoryImpactData(data) : null;
  const newsData = data ? mapHistoryNewsCards(data) : null;
  const socialMediaData = data ? mapHistorySocialMedia(data) : null;
  const faqData = data ? mapHistoryFaqs(data) : null;

  // Prepare hero stats data from API or use fallback
  const heroStatsData: ImpactStatsData = heroData?.stats?.length
    ? { impactStats: heroData.stats }
    : fallbackHeroStatsData;

  // Prepare situation lists or use fallback
  const GridItemsData =
    situationData?.lists?.length && situationData.lists.some((l) => l.icon)
      ? situationData.lists.map((item, index) => ({
          id: item.id,
          title: item.description,
          value: "",
          description: "",
          icon: item.icon || "/Icons/Sadaqah-red.svg",
          theme: index === 0 ? "red" : index === 1 ? "green" : "yellow",
        }))
      : fallbackGridItemsData;

  // Prepare principles or use fallback
  const VALUES_DATA = principlesData?.principles?.length
    ? principlesData.principles.map((p) => ({
        title: p.label,
        description: p.description,
      }))
    : fallbackValuesData;

  // Prepare impact data or use fallback
  const displayImpactData: ImpactDataProps = impactDataMapped?.stats?.length
    ? impactDataMapped
    : fallbackImpactData;

  return (
    <>
      <HeroSection
        heading={heroData?.sectionHeading?.heading || "Islamic Relief Suisse"}
        subheading={
          heroData?.sectionHeading?.subHeading ||
          "Ensemble, pour un avenir meilleur"
        }
        description={
          heroData?.sectionHeading?.description ||
          `Découvrez l’histoire d’Islamic Relief Suisse :
        30 ans d’action humanitaire, d’urgence et de développement, au service des plus vulnérables dans plus de 40 pays. Soutenez notre mission.`
        }
        carouselData={{
          carouselItems: heroData?.images?.length
            ? heroData.images.map((img, index) => ({
                url: img.url || "/Images/History-Hero-Img.png",
                title: "",
                id: String(img.id || index + 1),
                alt: img.alt || "Islamic Relief Suisse",
                subtitle: "",
                buttonText: "",
                buttonLink: "",
              }))
            : [
                {
                  url: "/Images/History-Hero-Img.png",
                  title: "",
                  id: "1",
                  alt: "Islamic Relief Suisse",
                  subtitle: "",
                  buttonText: "",
                  buttonLink: "",
                },
              ],
        }}
        backgroundColor="bg-primary"
        statsBgColor="bg-primary-lighter"
        statsData={heroStatsData}
        autoPlay={false}
      />

      <div className="py-12 lg:py-25 bg-grey-bg-dark">
        <Container className="">
          <SectionHeading
            subheading={
              impactHistoryData?.sectionHeading?.subHeading ||
              "Ensemble, pour un avenir meilleur"
            }
            heading={
              impactHistoryData?.sectionHeading?.heading || "NOTRE HISTOIRE"
            }
            description={
              impactHistoryData?.sectionHeading?.description ||
              "Islamic Relief  : des décennies d'action humanitaire et de solidarité"
            }
            align="center"
          />
          <ImpactHistorySection cards={impactHistoryData?.cards} />
        </Container>
      </div>
      <div className="bg-white">
        <Container
          className="lg:py-25 py-12"
          childrenClassName="flex flex-col lg:flex-row lg:gap-20 gap-8"
        >
          <div className="flex flex-col gap-8 lg:gap-12 w-full lg:w-1/2">
            <SectionHeading
              align="left"
              subheading={
                situationData?.sectionHeading?.subHeading || "Situation"
              }
              heading={situationData?.sectionHeading?.heading || "LES DéBUTS"}
              description={
                situationData?.sectionHeading?.description ||
                "En 1986, Islamic Relief a structuré son action en lançant trois grandes opérations :"
              }
              subheadingClassName="mb-2"
              headingClassName="mb-0"
              className="mb-0! mx-0"
            />
            <div>
              {GridItemsData.map((card, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex flex-col py-6 border-b border-grey-divider",
                    index === 0 && "pt-0",
                    index === GridItemsData.length - 1 && "border-b-0 pb-0"
                  )}
                >
                  <div className="flex items-center gap-4 h-full">
                    <div
                      className={cn(
                        "shrink-0 w-12 h-12 rounded flex items-center justify-center",
                        card.theme === "red" &&
                          "bg-red-light border border-red",
                        card.theme === "green" &&
                          "bg-green-light border border-green",
                        card.theme === "yellow" &&
                          "bg-yellow-light border border-yellow"
                      )}
                    >
                      <Image
                        src={card.icon}
                        alt="Icon"
                        width={24}
                        height={24}
                      />
                    </div>
                    <h6 className="type-h6 uppercase font-bold text-grey-black">
                      {card.title}
                    </h6>
                  </div>
                </div>
              ))}
            </div>

            {situationData?.description && (
              <p className="text-grey-grey type-body-1">
                {situationData.description}
              </p>
            )}
            {!situationData?.description && (
              <>
                <p className="text-grey-grey type-body-1">
                  En 1989, Islamic Relief a établi son premier bureau de terrain
                  à Khartoum au Soudan.
                </p>
                <p className="text-grey-grey type-body-1">
                  {"À partir de 1991, Islamic Relief amorce son internationalisation avec l'ouverture de bureaux en Europe de l'Ouest et de l'Est, en Asie ainsi qu'aux États-Unis.".replaceAll(
                    "'",
                    "&apos;"
                  )}
                </p>
              </>
            )}
          </div>
          {/* Right Image Grid */}
          <div className="w-full lg:w-1/2 ">
            <Image
              src={situationData?.image || "/Images/History-Situation-Img.png"}
              alt={situationData?.imageAlt || "History"}
              width={500}
              height={700}
              className="object-cover h-full"
            />
          </div>
        </Container>
      </div>

      <div className="bg-primary lg:py-25 py-12">
        <Container>
          <SectionHeading
            align="left"
            subheading={decadesData?.sectionHeading?.subHeading || "Impact"}
            heading={
              decadesData?.sectionHeading?.heading ||
              "Un professionnalisme reconnu à l'international"
            }
            description={
              decadesData?.sectionHeading?.description ||
              "Dans les années 1990 et 2000, l'organisation a franchi des étapes majeures :"
            }
            subheadingClassName="text-yellow"
            headingClassName="text-white"
            descriptionClassName="text-white type-body-1 text-[24px]!"
            className="max-w-auto mb-12 lg:mb-20"
          />

          <div className="flex flex-col lg:flex-row gap-10 lg:gap-20">
            {/* Left Content */}
            <div className="flex flex-col justify-between gap-8 lg:w-1/2">
              <div className="flex flex-col gap-8">
                {/* Item 1 */}
                <div className="flex gap-4 items-center">
                  <div className="w-8 h-8 shrink-0 rounded-full bg-white flex items-center justify-center">
                    {/* Simple Drop Icon shape using CSS or SVG */}
                    <Image
                      src="/Icons/Flame-primary.svg"
                      alt="Flame"
                      width={16}
                      height={16}
                      className="text-primary"
                    />
                  </div>
                  <p className="type-body-2 text-white">
                    Ouverture de 100 bureaux dans plus de 40 pays à travers le
                    monde.
                  </p>
                </div>

                {/* Item 2 */}
                <div className="flex gap-4 items-center">
                  <div className="w-8 h-8 shrink-0 rounded-full bg-white flex items-center justify-center">
                    <Image
                      src="/Icons/Flame-primary.svg"
                      alt="Flame"
                      width={16}
                      height={16}
                      className="text-primary"
                    />
                  </div>
                  <p className="type-body-2 text-white">
                    1993 : Obtention du statut ECOSOC (Conseil économique et
                    social des Nations Unies).
                  </p>
                </div>

                {/* Item 3 */}
                <div className="flex gap-4 items-center">
                  <div className="w-8 h-8 shrink-0 rounded-full bg-white flex items-center justify-center">
                    <Image
                      src="/Icons/Flame-primary.svg"
                      alt="Flame"
                      width={16}
                      height={16}
                      className="text-primary"
                    />
                  </div>
                  <p className="type-body-2 text-white">
                    Collaboration avec des agences onusiennes : HCR (UNHCR) PAM
                    (WFP)
                  </p>
                </div>

                {/* Item 4 */}
                <div className="flex gap-4 items-center">
                  <div className="w-8 h-8 shrink-0 rounded-full bg-white flex items-center justify-center">
                    <Image
                      src="/Icons/Flame-primary.svg"
                      alt="Flame"
                      width={16}
                      height={16}
                      className="text-primary"
                    />
                  </div>
                  <p className="type-body-2 text-white">
                    1999 : Signature du code de conduite du CICR
                  </p>
                </div>
              </div>

              <p className="type-body-2 text-white border-white/20 mt-8 pt-8 border-t lg:border-none lg:pt-0">
                Sa capacité d’intervention rapide et à grande échelle, associée
                à sa réactivité, permet à Islamic Relief de se mobiliser lors
                des grandes urgences humanitaires telles que la guerre en
                Bosnie, la guerre au Kosovo, la guerre en Tchétchénie.La mise en
                place de nombreux partenariats fructueux avec des agences
                onusiennes et gouvernementales a permis à Islamic Relief de
                jouir d’une crédibilité internationale.
              </p>
            </div>

            {/* Right Image */}
            <div className="lg:w-1/2 w-full relative h-[580px] lg:h-auto min-h-full rounded-sm overflow-hidden">
              <Image
                src={decadesData?.image || "/Images/History-Impact-2.png"}
                alt={decadesData?.imageAlt || "International Impact"}
                width={600}
                height={580}
                className="object-cover w-full h-[580px]"
              />
            </div>
          </div>
        </Container>
      </div>

      <div className="lg:py-25 py-12 bg-white">
        <Container>
          <SectionHeading
            subheading={
              timelineData?.sectionHeading?.subHeading ||
              "Ensemble, pour un avenir meilleur"
            }
            heading={
              timelineData?.sectionHeading?.heading ||
              "Islamic Relief WORLDWIDE et ISLAMIC RELIEF Suisse dans le temps"
            }
            description={
              timelineData?.sectionHeading?.description ||
              "En 1994 Islamic Relief Suisse est officiellement créée à Bâle. En 2002, elle déménage à Genève, capitale internationale de l'humanitaire.Notre volonté a toujours été d'agir avec la plus grande efficacité pour aider au mieux les populations les plus pauvres et les plus vulnérables. Ainsi, depuis nos débuts, nous répondons à de graves situations d'urgence telles que la guerre de Bosnie, le tsunami en Asie en 2004, le tremblement de terre au Cachemire en 2005, les inondations au Pakistan en 2010, la famine en Somalie en 2011 ou encore les guerres répétitives à Gaza.Grâce à la générosité et à la confiance de nos donateurs et de nos partenaires ainsi qu'au dévouement de nos équipes, nous soutenons des millions de familles face aux épreuves de la pauvreté, des conflits et des catastrophes naturelles."
            }
            subheadingClassName=""
            headingClassName=""
            descriptionClassName=""
            className="max-w-auto mb-12 lg:mb-20"
          />
        </Container>
        <HistoryTimelineSection timelineData={timelineData?.timelineData} />
      </div>

      {principlesData && (
        <div className="bg-primary lg:py-25 py-12">
          <Container>
            <PrinciplesSection data={principlesData} />
          </Container>
        </div>
      )}

      <div className="flex flex-col lg:flex-row ">
        {/* Left Section */}
        <div className="flex-1 flex flex-col lg:pl-80 lg:pr-20 pl-12 pr-12 items-start bg-white lg:py-25 py-12 mx-auto">
          <p className="type-caption-1 text-red text-left font-bold mb-2 uppercase">
            Impact
          </p>
          <h3 className="type-h3 text-grey-black text-left mb-8 uppercase font-bold">
            Les 5 valeurs
            <br />
            d&apos;Islamic Relief SuissE
          </h3>

          <div className="flex flex-col gap-6">
            {VALUES_DATA.map((item, index) => (
              <div key={index} className="flex gap-4 items-start">
                <div className="w-6 h-6 shrink-0 mt-1 relative">
                  <Image
                    src="/Icons/Flame-primary.svg"
                    alt="Flame"
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="type-body-2 text-grey-grey">
                  <span className="font-bold text-grey-black">
                    {item.title}
                  </span>{" "}
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 lg:py-25 py-12 bg-primary-lighter h-full lg:h-auto min-h-full flex items-center justify-center">
          <Image
            src="/Images/History-Impact-3.svg"
            alt="Values"
            width={600}
            height={800}
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      <div className="bg-green-surface lg:py-25 py-12">
        <Container>
          <SectionHeading
            subheading={
              callToActionData?.sectionHeading.subHeading ||
              "L'humanité est notre famille."
            }
            heading={
              callToActionData?.sectionHeading.heading ||
              "L'humanité est notre motivation"
            }
            description={
              callToActionData?.sectionHeading.description ||
              "ELe fonds des urgences est ce qui permet à notre ONG d'intervenir immédiatement lorsqu'une crise frappe."
            }
            subheadingClassName="text-green-dark"
            headingClassName=""
            descriptionClassName=""
            className="max-w-auto mb-0"
            buttonText="je donne Pour aider l'humanité"
            buttonLink="#"
            buttonClassName="mt-12"
          />
        </Container>
      </div>

      <div className="bg-white lg:py-25 py-12">
        <ImpactData
          lineColor="var(--color-green)"
          iconBoxBorderColor="var(--color-green)"
          iconBoxBackgroundColor="var(--color-green-lighter)"
          iconColor="var(--color-green)"
          data={displayImpactData}
          className="pb-0"
        />
      </div>

      <div className="py-26 bg-primary">
        <Container className="">
          <div className="md:flex md:items-end md:justify-between lg:mb-12">
            <SectionHeading
              heading={newsData?.sectionHeading?.heading || "Latest News"}
              subheading={newsData?.sectionHeading?.subHeading || "Stories"}
              description={
                newsData?.sectionHeading?.description ||
                "Built on faith, powered by experience, trusted by millions worldwide"
              }
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
          <NewsSection hideFirstRow newsCards={newsData?.cards} />
        </Container>
      </div>

      <div className="w-full bg-primary-surface py-20">
        <Container>
          <SectionHeading
            heading={
              socialMediaData?.sectionHeading?.heading ||
              "SUIVEZ TOUTE NOTRE ACTUALITE"
            }
            subheading={
              socialMediaData?.sectionHeading?.subHeading || "Suivez-nous"
            }
            subheadingClassName="text-red"
            headingClassName=" type-h2 text-grey-black "
            description={
              socialMediaData?.sectionHeading?.description ||
              "Rejoignez-nous sur nos réseaux sociaux et découvrez, chaque jour, l'impact concret de nos actions à travers le monde. Suivez nos actualités, nos projets locaux et partagez nos messages de solidarité avec votre entourage !"
            }
            descriptionClassName="type-body-2 text-grey-grey max-w-3xl"
            className="max-w-auto"
          />
          <SocialMediaSection posts={socialMediaData?.posts} />
        </Container>
      </div>
      <FaqSection faqs={faqData ?? undefined} />
    </>
  );
};

export default OurHistoryPage;
