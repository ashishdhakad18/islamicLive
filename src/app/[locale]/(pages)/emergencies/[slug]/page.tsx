import { cn } from "@/lib/utils";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import HeroSection from "@/components/ui/HeroSection";
import ImpactData from "@/components/ui/ImpactData";
import SectionHeading from "@/components/ui/SectionHeading";
import { CarouselData } from "@/types/carousel.types";
import { impactData1 } from "@/data/impactData";
import { ImpactStatsData } from "@/types/impactStats";
import Image from "next/image";
import { ArrowRightIcon } from "lucide-react";
import ProjectCard from "@/components/ui/ProjectCard";
import SocialMediaSection from "@/components/ui/SocialMediaSection";
import FaqSection from "@/components/ui/FaqSection";
import LatestNewsCard from "@/components/ui/LatestNewsCard";
import { latestNewsCardData } from "@/types/latestNewsCard";
import { getSingleEmergencyPageData } from "@/lib/pages/emergencies-listing/getSingleEmergencyPageData";
import { Locale } from "@/config/i18n.config";
import ImpactGridSection from "@/components/ui/ImpactGridSection";
import { ImpactGridItem } from "@/types/impactGrid.types";

const heroCarouselData: CarouselData = {
  carouselItems: [
    {
      id: "1",
      // Using a placeholder that looks like the screenshot (disaster zone)
      url: "/Images/Hero-section-palestine.png",
      alt: "Disaster Relief",
      title: "Disaster Relief",
      subtitle: "Providing immediate aid.",
      buttonText: "Donate",
      buttonLink: "/donate",
    },
    {
      id: "2",
      url: "/Images/Homepage-Hero-1.png",
      alt: "Food Distribution",
      title: "Food Distribution",
      subtitle: "Feeding the hungry.",
      buttonText: "Donate",
      buttonLink: "/donate",
    },
  ],
};

const heroStatsData: ImpactStatsData = {
  impactStats: [
    { id: 1, value: "94%", label: "Directly to programs", type: "percentage" },
    { id: 2, value: "2.4M+", label: "Lives helped annually", type: "count" },
    { id: 3, value: "40+", label: "Countries worldwide", type: "count" },
  ],
};

const reliefPhasesDatav2: ImpactGridItem[] = [
  {
    theme: "red",
    value: "2M+",
    icon: "/Icons/Sadaqah-red.svg",
    title: "PEOPLE DISPLACED",
    description: "Forced to flee their homes due to ongoing conflict",
  },
  {
    theme: "green",
    value: "70%",
    icon: "/Icons/Sadaqah-green.svg",
    title: "HOSPITALS CLOSED",
    description: "Critical healthcare infrastructure destroyed",
  },
  {
    theme: "yellow",
    value: "80%",
    icon: "/Icons/Sadaqah-yellow.svg", // Using placeholder, please update if yellow icon exists
    title: "PEOPLE DISPLACED",
    description: "Facing severe food insecurity and malnutrition",
  },
];

const impactData2 = {
  stats: [
    ...impactData1.stats,
    {
      id: 5,
      icon: "/Icons/Sadaqah.png",
      value: "",
      label: "Locally and Globally Certified",
      description: "Children receiving quality education",
    },
  ],
};

const projectsCard = [
  {
    id: 1,
    image: "/Images/Project-Card-Image-1.png",
    alt: "Food Distribution",
    imageChip: "Urgent",
    title: "Orphan Sponsorship",
    subtitle:
      "We can help 500 new orphans in Gaza today. With 70 CHF/month, you can",
    buttonText: "Sponsor an Orphan",
    buttonLink: "/donate",
    lists: [
      "A safe delivery (natural or cesarean)",
      "Guarantee school access",
      "Give hope to a child broken by war",
    ],
  },
  {
    id: 2,
    image: "/Images/Project-Card-Image-2.png",
    alt: "Food Distribution",
    imageChip: "Urgent",
    title: "Maternal Care for Mothers and Newborns",
    subtitle:
      "Over 50,000 pregnant women are struggling to give birth safely. Islamic Relief Switzerland, in partnership with Ajyal Association, provides essential maternal health services.",
    buttonText: "Save Two Lives with 800 CHF",
    buttonLink: "/donate",
    lists: [
      "A safe delivery (natural or cesarean)",
      "Guarantee school access",
      "Give hope to a child broken by war",
    ],
  },
];

const SingleEmergency = async ({
  params,
}: {
  params: Promise<{ slug: string; locale: Locale }>;
}) => {
  const { slug, locale } = await params;

  // Fetch page data
  const pageData = await getSingleEmergencyPageData(slug, locale);

  // Destructure sections
  const hero = pageData?.hero;
  const situation = pageData?.situation;
  const impactSection = pageData?.impactSection;
  const targetSupport = pageData?.targetSupport;
  const impactDataBottom = pageData?.impactData;

  return (
    <div>
      {/* 1. Hero Section */}
      <HeroSection
        backgroundColor="bg-red-dark"
        heading={
          hero?.sectionHeading.heading ||
          "Gaza Two Years of War Support Islamic Relief."
        }
        subheading={
          hero?.sectionHeading.subHeading ||
          "We respond with faith and compassion."
        }
        description={
          hero?.sectionHeading.description ||
          "Two years of war. Thousands of lives lost. Families trapped in fear. With Islamic Relief, you can act now and bring urgent help to Gaza."
        }
        carouselData={hero?.carouselData || heroCarouselData}
        statsData={hero?.statsData || heroStatsData}
        autoPlay
        buttonLink="/donate"
        buttonText="Donate Now"
        buttonClassName="mt-6 w-2/3 type-btn-1!"
      />

      {/* 2. Situation Section */}
      <ImpactGridSection
        heading={situation?.sectionHeading.heading || "What's Happening"}
        subheading={
          situation?.sectionHeading.subHeading || "Situation Overview"
        }
        description={
          situation?.sectionHeading.description ||
          "Ongoing violence has left families without food or shelter. Millions are displaced and depend entirely on humanitarian aid. The situation continues to deteriorate as infrastructure collapses and basic services become inaccessible."
        }
        items={
          situation?.listData && situation.listData.length > 0
            ? situation.listData
            : reliefPhasesDatav2
        }
        images={
          situation?.images && situation.images.length > 0
            ? situation.images
            : [
                "/Images/Situation-images-1.webp",
                "/Images/Situation-images-4.webp",
                "/Images/Situation-images-2.webp",
                "/Images/Situation-images-1.webp",
                "/Images/Situation-images-3.webp",
              ]
        }
        className="lg:py-25 py-12"
      />

      {/* Mobile heading for Impact Section */}
      <Container className="lg:hidden block mt-12 mb-8">
        <SectionHeading
          heading={
            impactSection?.sectionHeading.heading ||
            "What Islamic Relief Is Doing"
          }
          subheading={impactSection?.sectionHeading.subHeading || "Impact"}
          description={
            impactSection?.sectionHeading.description ||
            "Every donation powers emergency response from the first day to the final rebuild. Here's how your support creates lasting change."
          }
          theme="light"
          align="center"
          headingTag="h1"
          className=""
          headingClassName="mb-0 text-grey-black"
          subheadingClassName="text-red font-medium mb-0!"
          descriptionClassName="text-grey-grey type-body-1! max-w-2xl!"
        />
      </Container>

      {/* 3. Impact Section */}
      <div className="bg-primary lg:py-25 py-12 flex flex-col gap-12">
        <Container>
          <SectionHeading
            heading={
              impactSection?.sectionHeading.heading ||
              "What Islamic Relief Is Doing in Gaza"
            }
            subheading={impactSection?.sectionHeading.subHeading || "Impact"}
            description={
              impactSection?.sectionHeading.description ||
              "Your contributions don't just respond to emergencies - they build resilience, restore hope, and create sustainable futures for communities worldwide."
            }
            align="center"
            headingTag="h2"
            className="max-w-auto"
            headingClassName="mb-0 text-white"
            subheadingClassName="text-yellow font-medium mb-0!"
            descriptionClassName="type-body-1! max-w-2xl! text-white"
          />
        </Container>
        <Image
          src={
            impactSection?.image ||
            "/Images/Impact-Section-Single-Emergency.svg"
          }
          alt="Impact"
          width={400}
          height={300}
          className="w-full h-[700px] object-cover "
        />
        <ImpactData
          lineColor="var(--color-primary-lighter)"
          iconBoxBorderColor="var(--color-primary-surface)"
          iconBoxBackgroundColor="var(--color-primary-light)"
          iconColor="var(--color-primary)"
          data={
            impactSection?.impactData && impactSection.impactData.length > 0
              ? {
                  stats: impactSection.impactData.map((item) => ({
                    id: item.id,
                    icon: item.icon,
                    value: item.heading,
                    label: "",
                    description: item.description,
                  })),
                }
              : impactData2
          }
          textColor="text-white"
        />
        <Button
          className="w-fit mx-auto border border-royal-dark! text-royal-dark!"
          endIcon={
            <ArrowRightIcon
              className="w-6 h-6"
              color="var(--color-royal-dark)"
            />
          }
          rounded
          color="white"
          size="lg"
          href={impactSection?.cta?.url || "/donate"}
        >
          {impactSection?.cta?.label || "See Our Impact Report"}
        </Button>
      </div>

      {/* 4. Target Support Section */}
      <Container className="lg:py-25 py-12">
        <SectionHeading
          heading={
            targetSupport?.sectionHeading.heading ||
            "Our Current Priority Projects"
          }
          subheading={
            targetSupport?.sectionHeading.subHeading || "Targeted Support"
          }
          description={
            targetSupport?.sectionHeading.description ||
            "Crisis situations requiring immediate support from our global community"
          }
          theme="light"
          align="center"
          headingTag="h2"
          className="max-w-auto"
          headingClassName="mb-0 text-grey-black"
          subheadingClassName="text-red font-medium mb-0!"
          descriptionClassName="type-body-1! max-w-2xl!"
        />
        <div className="flex flex-col lg:flex-row gap-6 mt-8">
          {(targetSupport?.cards
            ? targetSupport.cards.map((card) => ({
                id: card.id,
                image: card.image,
                alt: card.heading,
                imageChip: card.chip,
                title: card.heading,
                subtitle: card.description,
                buttonText: card.ctaText,
                buttonLink: card.ctaLink,
                lists: card.featureList,
              }))
            : projectsCard
          ).map((card, index) => (
            <ProjectCard key={index} card={card} />
          ))}
        </div>
      </Container>

      {/* 5. Bottom Impact Data Section */}
      <ImpactData
        data={impactDataBottom || impactData1}
        className="py-[98px] bg-white"
        lineColor="var(--color-green)"
        iconBoxBorderColor="var(--color-green)"
        iconBoxBackgroundColor="var(--color-green-lighter)"
        iconColor="var(--color-green)"
      />

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
      <div className="w-full bg-primary-surface py-20 ">
        <div className="container mx-auto px-4">
          <SectionHeading
            heading="FOLLOW US FOR THE LATEST NEWS"
            subheading="Follow Us"
            subheadingClassName="text-red type-caption-1 normal-case"
            headingClassName=" type-h2 text-grey-black "
            description="On our social media, we make our activities visible on a daily basis. Here you can take part of updates from our field offices and share content with your friends and followers!"
            descriptionClassName="type-body-2 text-grey-grey max-w-3xl"
            theme="light"
          />
          <Container>
            <SocialMediaSection />
          </Container>
        </div>
      </div>
      <FaqSection />

      {/* <ImpactData data={impactData1} /> */}
    </div>
  );
};

export default SingleEmergency;
