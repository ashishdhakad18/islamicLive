import HeroSection from "@/components/ui/HeroSection";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import ImpactData from "@/components/ui/ImpactData";
import { impactData3 } from "@/data/impactData";
import LatestNewsCard from "@/components/ui/LatestNewsCard";
import SocialMediaSection from "@/components/ui/SocialMediaSection";
import FaqSection from "@/components/ui/FaqSection";
import TransparancyCard from "@/components/ui/TransparancyCard";
import WhyNot100 from "@/components/ui/WhyNot100";
import { impactCards } from "@/data/cardmock";
import ImpactCard from "@/components/ui/ImpactCard";
import TransparanceCard from "@/components/ui/TransparanceCard";
import { getFinancialTransparancyData } from "@/lib/pages/financial-transparancy/getFinancialTransparancyData";
import {
  mapFinancialHero,
  mapOurTransparancy,
  mapHowDonationWork,
  mapEffectiveGiving,
  mapGetInTouchSection,
  mapFinancialNewsCards,
  mapFinancialFaqs,
} from "@/lib/mappers/financialTransparancy";
import { getValidLocale } from "@/lib/utils/getValidLocale";

export default async function FinancialTransparency({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await getValidLocale(params);
  const data = await getFinancialTransparancyData(locale);

  // Map Strapi data
  const heroData = data ? mapFinancialHero(data) : null;
  const ourTransparancyData = data ? mapOurTransparancy(data) : null;
  const howDonationWorkData = data ? mapHowDonationWork(data) : null;
  const effectiveGivingData = data ? mapEffectiveGiving(data) : null;
  const getInTouchData = data ? mapGetInTouchSection(data) : null;
  const newsCardsData = data ? mapFinancialNewsCards(data) : null;
  const faqData = data ? mapFinancialFaqs(data) : null;

  // Build carousel data from hero images
  const heroCarouselData = {
    carouselItems: heroData?.images?.length
      ? heroData.images.map((img, index) => ({
          id: String(img.id || index),
          url: img.url || "/Images/Homepage-Hero-1.png",
          alt: img.alt || "Hero",
          title: heroData.sectionHeading.heading || "[DUMMY] Hero Title",
          subtitle:
            heroData.sectionHeading.subHeading || "[DUMMY] Hero Subtitle",
          buttonText: "Donate",
          buttonLink: "/donate",
        }))
      : [
          {
            id: "1",
            url: "/Images/Homepage-Hero-1.png",
            alt: "Hero",
            title: "[DUMMY] Hero Title",
            subtitle: "[DUMMY] Hero Subtitle",
            buttonText: "Donate",
            buttonLink: "/donate",
          },
        ],
  };

  // Build stats data from hero impact stats
  const heroStatsData = {
    impactStats: heroData?.impactStats?.length
      ? heroData.impactStats.map((stat) => ({
          id: stat.id,
          value: stat.value,
          label: stat.label,
          type: "count" as const,
        }))
      : [
          {
            id: 1,
            value: "[DUMMY]%",
            label: "[DUMMY] Stat 1",
            type: "count" as const,
          },
          {
            id: 2,
            value: "[DUMMY]+",
            label: "[DUMMY] Stat 2",
            type: "count" as const,
          },
          {
            id: 3,
            value: "[DUMMY]+",
            label: "[DUMMY] Stat 3",
            type: "count" as const,
          },
        ],
  };

  return (
    <div>
      <HeroSection
        backgroundColor="bg-primary"
        heading={heroData?.sectionHeading.heading || "[DUMMY] Hero Heading"}
        subheading={
          heroData?.sectionHeading.subHeading || "[DUMMY] Hero Subheading"
        }
        description={
          heroData?.sectionHeading.description || "[DUMMY] Hero Description"
        }
        carouselData={heroCarouselData}
        statsData={heroStatsData}
        statsBgColor="bg-primary-lighter"
      />
      <div className="pt-12 pb-0 lg:py-20">
        <Container>
          <SectionHeading
            subheading={
              ourTransparancyData?.sectionHeading.subHeading ||
              "[DUMMY] Our Transparency Subheading"
            }
            heading={
              ourTransparancyData?.sectionHeading.heading ||
              "[DUMMY] Our Transparency Heading"
            }
            description={
              ourTransparancyData?.sectionHeading.description ||
              "[DUMMY] Our Transparency Description"
            }
            subheadingClassName="text-red type-caption-1 normal-case"
            headingClassName="mb-1"
            descriptionClassName="max-w-3xl text-grey-grey"
            className="mb-12 lg:mb-16"
          />
        </Container>
        <div className="bg-grey-white w-full">
          <Container>
            <TransparanceCard />
          </Container>
        </div>
      </div>
      <div className=" ">
        <div className="bg-primary w-full">
          <Container>
            <WhyNot100 />
          </Container>
        </div>
      </div>
      <div className="bg-primary-lighter">
        <Container className="lg:py-25 py-12">
          <div className="w-full flex flex-col gap-4 items-center justify-center">
            <h1 className="type-h3 w-full lg:w-[70%] uppercase text-center">
              {effectiveGivingData?.sectionHeading.heading ||
                "[DUMMY] Effective Giving Heading"}
            </h1>
            <p className="type-body-2 w-full lg:w-[70%] text-center text-grey-grey">
              {effectiveGivingData?.sectionHeading.description ||
                "[DUMMY] Effective Giving Description"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {(effectiveGivingData?.cards?.length
              ? effectiveGivingData.cards
              : impactCards
            ).map((card) => (
              <ImpactCard key={card.id} data={card} />
            ))}
          </div>
          <div className="flex flex-col lg:flex-row justify-center gap-4 lg:gap-6 items-center w-full mt-12">
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
              Découvrez nos projets en cours
            </Button>
          </div>
        </Container>
      </div>
      <div className="bg-primary-divider">
        <Container className="lg:py-25 py-12">
          <div className="w-full flex flex-col gap-2 items-center justify-center">
            <h1 className="type-h3 w-full lg:w-[70%] uppercase text-center">
              {getInTouchData?.sectionHeading.heading ||
                "[DUMMY] Get In Touch Heading"}
            </h1>
            <p className="type-body-2 w-full lg:w-[70%] text-center text-grey-grey">
              {getInTouchData?.sectionHeading.description ||
                "[DUMMY] Get In Touch Description"}
            </p>
          </div>
          <div className="mt-12">
            <TransparancyCard />
          </div>
        </Container>
      </div>

      <div className="bg-green-surface lg:py-25 py-12 flex flex-col gap-12">
        <Container>
          <SectionHeading
            subheading="L'humanité est notre famille."
            heading="L'humanité est notre motivation"
            description="Le fonds des urgences est ce qui permet à notre ONG d'intervenir immédiatement lorsqu'une crise frappe."
            subheadingClassName="text-green-dark type-caption-1  font-normal mb-2 lg:mb-0 whitespace-normal lg:whitespace-nowrap"
            headingClassName="mb-1 type-h3 uppercase whitespace-normal lg:whitespace-nowrap"
            descriptionClassName="lg:type-body-1 type-body-2 "
          />
          <div className="flex flex-col lg:flex-row justify-center gap-4 lg:gap-6 items-center w-full">
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
              Donate to the Emergency Fund
            </Button>
            <Button
              rounded
              variant="ghost"
              className="text-primary-dark! border border-primary-dark! hover:bg-primary-surface! w-full lg:w-auto justify-center"
              endIcon={
                <Image
                  src="/Icons/Arrow-right-primary-dark.svg"
                  alt="Arrow"
                  width={16}
                  height={16}
                />
              }
            >
              Start Monthly Support
            </Button>
          </div>
        </Container>
      </div>
      <ImpactData
        data={impactData3}
        className="py-[98px] bg-white"
        lineColor="var(--color-green)"
        iconBoxBorderColor="var(--color-green)"
        iconBoxBackgroundColor="var(--color-green-surface)"
        iconColor="var(--color-green)"
      />

      <div className="py-26 bg-primary">
        <Container className="">
          <div className="md:flex md:items-end md:justify-between lg:mb-12">
            <SectionHeading
              heading={
                newsCardsData?.sectionHeading.heading || "[DUMMY] News Heading"
              }
              subheading={
                newsCardsData?.sectionHeading.subHeading ||
                "[DUMMY] News Subheading"
              }
              description={
                newsCardsData?.sectionHeading.description ||
                "[DUMMY] News Description"
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(newsCardsData?.cards?.length
              ? newsCardsData.cards
              : [
                  {
                    id: 1,
                    image: "/Images/mockImages/LatestNews1.png",
                    title: "[DUMMY] News 1",
                    read: "[DUMMY]",
                    date: "[DUMMY]",
                    categories: ["[DUMMY]"],
                    link: "#",
                  },
                  {
                    id: 2,
                    image: "/Images/mockImages/LatestNews2.png",
                    title: "[DUMMY] News 2",
                    read: "[DUMMY]",
                    date: "[DUMMY]",
                    categories: ["[DUMMY]"],
                    link: "#",
                  },
                  {
                    id: 3,
                    image: "/Images/mockImages/LatestNews3.png",
                    title: "[DUMMY] News 3",
                    read: "[DUMMY]",
                    date: "[DUMMY]",
                    categories: ["[DUMMY]"],
                    link: "#",
                  },
                ]
            )
              .slice(0, 3)
              .map((card) => (
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
      <FaqSection faqs={faqData || undefined} />
    </div>
  );
}
