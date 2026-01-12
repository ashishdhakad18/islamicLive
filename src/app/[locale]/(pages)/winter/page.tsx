import HeroSection from "@/components/ui/HeroSection";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import GenerositySection from "@/components/ui/GenerositySection";
import ImpactGridSection from "@/components/ui/ImpactGridSection";
import IntervenonsSection from "@/components/ui/intervenons";
import Testimonials from "@/components/ui/Testimonials";
import ImpactData from "@/components/ui/ImpactData";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import LatestNewsCard from "@/components/ui/LatestNewsCard";
import SocialMediaSection from "@/components/ui/SocialMediaSection";
import FaqSection from "@/components/ui/FaqSection";
import { Locale } from "@/config/i18n.config";
import { getWinterData } from "@/lib/pages/winter/getWinterData";

const bannerTextStatic = "EN SUISSE L’HIVER SE VIT. AILLEURS IL SE SUBIT.";

export const impactItemsStatic = [
  {
    title: "AMÉNAGEMENTS D’ABRIS",
    description:
      "Réparation des toitures, installation de fenêtres et distribution de bâches pour améliorer les conditions de vie.",
    icon: "/Icons/Sadaqah-red.svg",
    theme: "red" as const,
  },
  {
    title: "DISTRIBUTION DE VÊTEMENTS CHAUDS",
    description:
      "Bonnets, écharpes, manteaux et chaussures pour aider les familles à rester au chaud.",
    icon: "/Icons/Sadaqah-green.svg",
    theme: "green" as const,
  },
  {
    title: "DISTRIBUTION DE COMBUSTIBLES",
    description: "Bois, charbon ou bons pour l'achat de moyens de chauffage.",
    icon: "/Icons/Sadaqah-yellow.svg",
    theme: "yellow" as const,
  },
  {
    title: "DISTRIBUTION DE NOURRITURE",
    description:
      "Riz, farine, conserves, huile et autres produits essentiels pour éviter la malnutrition.",
    icon: "/Icons/Sadaqah-royal.svg",
    theme: "primary" as const,
  },
  {
    title: "DISTRIBUTION DE KITS D'HYGIENE",
    description:
      "Articles indispensables pour prévenir les maladies dans les camps et les abris précaires.",
    icon: "/Icons/Sadaqah-yellow.svg",
    theme: "yellow" as const,
  },
];

export const regionsStatic = [
  {
    regionName: "EUROPE DE L'EST",
    cards: [
      "En Bosnie Herzégovine, le froid ravive les blessures du passé. Les orphelins et les familles vulnérables vivent dans des logements mal isolés et peinent à faire face aux dépenses d'énergie. Grâce à la distribution de bois, de nourriture et d'une aide pour les factures, ils peuvent affronter l'hiver dignement.",
      "En Tchétchénie, de nombreuses maisons restent endommagées et incapables de protéger du gel. Islamic Relief réhabilite les logements en réparant toitures, portes, fenêtres et systèmes de chauffage, offrant aux familles un refuge sûr.",
      "Au Kosovo, l'hiver pèse sur des foyers qui n'arrivent plus à couvrir leurs besoins essentiels. Avec de la nourriture, des vêtements chauds, du matériel de chauffage et un soutien pour l'électricité, les plus vulnérables ne sont plus seuls face au froid.",
      "En Macédoine du Nord , les familles pauvres, les personnes âgées et les enfants orphelins vivent dans des maisons mal isolées où chaque nuit glaciale menace leur santé. Islamic Relief fournit des colis alimentaires, du bois, des kits d'hygiène et des poêles à bois pour leur permettre de passer l'hiver en sécurité.",
    ],
  },
  {
    regionName: "MOYEN-ORIENT",
    cards: [
      "À Gaza, les familles vivent dans des tentes déchirées ou sous les décombres, sans chauffage ni eau potable, tandis que le froid s'ajoute à une situation humanitaire désastreuse. Islamic Relief y distribue des couvertures et des vêtements chauds aux plus vulnérables.",
      "Au Liban, l'effondrement économique rend l'hiver insupportable pour des familles qui n'ont plus les moyens d'acheter de la nourriture ou de se chauffer. Dans le Nord, la Bekaa ou le Mont-Liban, nous apportons des colis alimentaires et une aide financière essentielle.",
      "En Syrie, après plus d'une décennie de conflit, les familles affrontent des températures glaciales dans des camps ou des maisons détruites. Islamic Relief distribue du pirina, un combustible à base de résidus d'olives, vital pour passer l'hiver.",
      "Au Yémen enfin, la guerre prolongée laisse des millions de personnes sans ressources pour se protéger du froid. Grâce à des bons d'achat, les familles peuvent obtenir des habits chauds, offrant une protection indispensable aux enfants et aux plus fragiles.",
    ],
  },
  {
    regionName: "ASIE ET AFRIQUE DU NORD",
    cards: [
      "Dans les régions montagneuses du Maroc, l'hiver reste particulièrement difficile pour les familles vivant dans des habitations précaires, surtout celles touchées par le séisme de 2023. Islamic Relief y distribue des couvertures chaudes, des vêtements d'hiver et des colis alimentaires pour protéger les plus vulnérables du froid.",
      "En Afghanistan, le froid coupe des villages entiers du reste du pays. Les familles, déjà frappées par la pauvreté, doivent affronter des températures extrêmes sans ressources suffisantes. Grâce à une aide financière directe, Islamic Relief leur permet d'acheter nourriture, combustible et produits essentiels.",
      "Au Pakistan également, l'hiver met en danger les communautés pauvres vivant dans des zones isolées. Islamic Relief y apporte une aide vitale pour permettre aux familles de se chauffer et de couvrir leurs besoins urgents. Ensemble, nous offrons chaleur, sécurité et espoir face au froid.",
    ],
  },
];

interface WinterPageProps {
  params: {
    locale: Locale;
  };
}

export default async function WinterPage({
  params: { locale },
}: WinterPageProps) {
  const winterData = await getWinterData(locale);

  if (!winterData) return null;

  return (
    <>
      <HeroSection
        backgroundColor="bg-primary"
        heading={winterData.hero.sectionHeading.heading}
        subheading={winterData.hero.sectionHeading.subHeading}
        description={winterData.hero.sectionHeading.description}
        headingClassName="type-h1"
        subHeadingClassName="type-h2 text-yellow"
        carouselData={{
          carouselItems: [
            {
              id: "1",
              url: winterData.hero.image.url,
              alt: winterData.hero.image.alt,
              title: winterData.hero.sectionHeading.heading,
              subtitle: winterData.hero.sectionHeading.subHeading,
              buttonText: "Donate",
              buttonLink: "/donate",
            },
          ],
        }}
        buttonLink="/donate"
        buttonText="faire un don"
        buttonClassName="mt-6"
      />
      <section className="w-full bg-primary-lighter py-12 flex justify-center items-center">
        <h2 className="text-center tracking-wide type-h4 text-grey-black uppercase">
          {winterData.hero.heroMsg.message || bannerTextStatic}
        </h2>
      </section>
      <ImpactGridSection
        heading={winterData.approach.sectionHeading.heading}
        subheading={winterData.approach.sectionHeading.subHeading}
        description={winterData.approach.sectionHeading.description}
        items={
          winterData.approach.items.length > 0
            ? winterData.approach.items
            : impactItemsStatic
        }
        images={[winterData.approach.image || "/Images/winter-hero-image.png"]}
      />
      <Container>
        <GenerositySection
          posterImage={
            winterData.transmet.posterImage ||
            winterData.backgroundImage ||
            "/Images/Homepage-Hero-1.png"
          }
          videoUrl={winterData.transmet.videoUrl}
          text={winterData.transmet.description}
          buttonText={winterData.transmet.ctaText}
          buttonLink={winterData.transmet.ctaLink}
        />
      </Container>
      <IntervenonsSection
        heading={winterData.globalReach.sectionHeading.heading}
        description={winterData.globalReach.sectionHeading.description}
        regions={
          winterData.globalReach.regions.length > 0
            ? winterData.globalReach.regions
            : regionsStatic
        }
      />
      <Testimonials />

      <div className="py-20">
        <SectionHeading
          heading={winterData.impactData.sectionHeading.heading}
          subheading={winterData.impactData.sectionHeading.subHeading}
          description={winterData.impactData.sectionHeading.description}
        />
        <ImpactData
          data={{
            stats:
              winterData.impactData.items.length > 0
                ? winterData.impactData.items.map((item, index) => ({
                    id: index + 1,
                    label: item.subHeading || "",
                    description: item.description || "",
                    icon: item.icon || "/Icons/Sadaqah.png",
                    value: item.title || "",
                  }))
                : [
                    {
                      id: 1,
                      label: "People Reached",
                      description:
                        "Helping families across the globe during the hash winter months.",
                      icon: "/Icons/Sadaqah-green.svg",
                      value: "100K+",
                    },
                    {
                      id: 2,
                      label: "Countries",
                      description:
                        "Operational in multiple regions to provide vital aid.",
                      icon: "/Icons/Sadaqah-red.svg",
                      value: "15",
                    },
                    {
                      id: 3,
                      label: "Funds Raised",
                      description:
                        "Generous contributions from our donors worldwide.",
                      icon: "/Icons/Sadaqah-royal.svg",
                      value: "5M+",
                    },
                  ],
          }}
          className="py-[98px]"
          lineColor="var(--color-green)"
          iconBoxBorderColor="var(--color-green)"
          iconBoxBackgroundColor="var(--color-green-surface)"
          iconColor="var(--color-green)"
        />
      </div>
      <div className="py-26 bg-primary">
        <Container className="">
          <div className="md:flex md:items-end md:justify-between lg:mb-12">
            <SectionHeading
              heading={winterData.news.sectionHeading.heading}
              subheading={winterData.news.sectionHeading.subHeading}
              description={winterData.news.sectionHeading.description}
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
              href="/stories"
            >
              View All Stories
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(winterData.news.news.length > 0
              ? winterData.news.news
              : [
                  {
                    id: 1,
                    image: "/Images/mockImages/LatestNews1.png",
                    title:
                      "Emergency Winter Response: Helping Families Survive the Cold",
                    read: "5 MIN READ",
                    date: "DECEMBER 13, 2023",
                    categories: ["EMERGENCY", "WINTER"],
                    link: "#",
                  },
                  {
                    id: 2,
                    image: "/Images/mockImages/LatestNews2.png",
                    title:
                      "Winter Kits Distributed to Over 5,000 Families in Syria",
                    read: "3 MIN READ",
                    date: "NOVEMBER 28, 2023",
                    categories: ["DISTRIBUTION", "SYRIA"],
                    link: "#",
                  },
                  {
                    id: 3,
                    image: "/Images/mockImages/LatestNews3.png",
                    title: "How Your Zakat is Saving Lives This Winter",
                    read: "4 MIN READ",
                    date: "OCTOBER 15, 2023",
                    categories: ["ZAKAT", "IMPACT"],
                    link: "#",
                  },
                ]
            ).map((card) => (
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
      <div className="w-full bg-primary-surface py-20 ">
        <div className="container mx-auto px-4">
          <SectionHeading
            heading={
              winterData.socialMedia.sectionHeading.heading ||
              "FOLLOW US FOR THE LATEST NEWS"
            }
            subheading={
              winterData.socialMedia.sectionHeading.subHeading || "Follow Us"
            }
            subheadingClassName="text-red type-caption-1 normal-case"
            headingClassName=" type-h2 text-grey-black "
            description={
              winterData.socialMedia.sectionHeading.description ||
              "On our social media, we make our activities visible on a daily basis. Here you can take part of updates from our field offices and share content with your friends and followers!"
            }
            descriptionClassName="type-body-2 text-grey-grey max-w-3xl"
            theme="light"
          />
          <Container>
            <SocialMediaSection posts={winterData.socialMedia.posts} />
          </Container>
        </div>
      </div>
      <FaqSection
        faqs={winterData.faqs}
        sectionHeading={winterData.faqSectionHeading}
      />
    </>
  );
}
