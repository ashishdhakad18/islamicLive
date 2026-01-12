import HeroSection from "@/components/ui/HeroSection";
import React from "react";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import RespondingSection from "@/components/ui/RespondingSection";
import { respondingData } from "@/data/responseCardData";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import ImpactData from "@/components/ui/ImpactData";
import { impactData3 } from "@/data/impactData";
import LatestNewsCard from "@/components/ui/LatestNewsCard";
import SocialMediaSection from "@/components/ui/SocialMediaSection";
import FaqSection from "@/components/ui/FaqSection";
import { getPresentationData } from "@/lib/pages/presentation/getPresentationData";
import {
  mapPresentationHero,
  mapPresentationCards,
  mapCallToAction,
  mapPresentationNewsCards,
  mapPresentationFaqs,
  mapPresentationImpactData,
} from "@/lib/mappers/presentation";
import { getValidLocale } from "@/lib/utils/getValidLocale";

export default async function PresentationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await getValidLocale(params);
  const data = await getPresentationData(locale);

  // Map Strapi data to component-friendly format
  const heroData = data ? mapPresentationHero(data) : null;
  const presentationCardsData = data ? mapPresentationCards(data) : null;
  const ctaData = data ? mapCallToAction(data) : null;
  const newsCardsData = data ? mapPresentationNewsCards(data) : null;
  const faqData = data ? mapPresentationFaqs(data) : null;

  // Build carousel data from hero images
  const heroCarouselData = {
    carouselItems: heroData?.images?.length
      ? heroData.images.map((img, index) => ({
          id: String(img.id || index),
          url: img.url || "/Images/Homepage-Hero-1.png",
          alt: img.alt || "Presentation Hero",
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
            alt: "Presentation Hero",
            title: "[DUMMY] Hero Title",
            subtitle: "[DUMMY] Hero Subtitle",
            buttonText: "Donate",
            buttonLink: "/donate",
          },
        ],
  };

  // Debug logging
  console.log("🎯 Hero Data:", heroData);
  console.log("🎯 Hero Impact Stats:", heroData?.impactStats);

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

  // Determine the impact data (Strapi or default)
  const impactStatsData = data ? mapPresentationImpactData(data) : null;
  const hasImpactData = (impactStatsData?.stats?.length ?? 0) > 0;

  const finalImpactStats = hasImpactData ? impactStatsData! : impactData3;
  const finalColors = hasImpactData ? impactStatsData!.colors : {};

  return (
    <div>
      <HeroSection
        backgroundColor="bg-primary"
        heading={heroData?.sectionHeading.heading || "[DUMMY] Hero Heading"}
        subheading={
          heroData?.sectionHeading.subHeading || "[DUMMY] Hero Subheading"
        }
        description={
          heroData?.sectionHeading.description ||
          "[DUMMY] Hero Description - This text is a fallback"
        }
        carouselData={heroCarouselData}
        statsData={heroStatsData}
        statsBgColor="bg-primary-lighter"
      />

      <Container className="lg:my-25 mt-12">
        <SectionHeading
          subheading={
            presentationCardsData?.sectionHeading.subHeading ||
            "[DUMMY] Cards Subheading"
          }
          heading={
            presentationCardsData?.sectionHeading.heading ||
            "[DUMMY] Cards Heading"
          }
          description={
            presentationCardsData?.sectionHeading.description ||
            "[DUMMY] Cards Description - This is fallback text"
          }
          subheadingClassName="mb-2"
          headingClassName="mb-0 whitespace-normal lg:whitespace-nowrap "
        />

        <RespondingSection
          cards={
            presentationCardsData?.cards?.length
              ? presentationCardsData.cards
              : respondingData
          }
        />
      </Container>
      <div className="bg-green-surface lg:py-25 py-12 flex flex-col gap-12">
        <Container>
          <SectionHeading
            subheading={
              ctaData?.sectionHeading.subHeading || "[DUMMY] CTA Subheading"
            }
            heading={ctaData?.sectionHeading.heading || "[DUMMY] CTA Heading"}
            description={
              ctaData?.sectionHeading.description ||
              "[DUMMY] CTA Description - This is fallback text"
            }
            subheadingClassName="text-green-dark type-caption-1  font-normal mb-2 lg:mb-0 whitespace-normal lg:whitespace-nowrap"
            headingClassName="mb-6 text-3xl lg:text-5xl whitespace-normal lg:whitespace-nowrap"
            descriptionClassName="lg:type-body-1 type-body-2"
          />
          <div className="flex flex-col lg:flex-row justify-center gap-4 lg:gap-6 items-center w-full">
            {(ctaData?.ctas?.length
              ? ctaData.ctas
              : [
                  {
                    id: 1,
                    label: "Donate to the Emergency Fund",
                    url: "/donate",
                  },
                  {
                    id: 2,
                    label: "Start Monthly Support",
                    url: "/monthly-giving",
                  },
                ]
            ).map((cta, index) => (
              <Button
                key={cta.id || index}
                color={index === 0 ? "yellow" : undefined}
                variant={index === 0 ? "solid" : "ghost"}
                rounded
                href={cta.url}
                className={`w-full lg:w-auto justify-center ${
                  index !== 0
                    ? "text-primary-dark! border border-primary-dark! hover:bg-primary-surface!"
                    : ""
                }`}
                endIcon={
                  <Image
                    src={
                      index === 0
                        ? "/Icons/Arrow-right-black.svg"
                        : "/Icons/Arrow-right-primary-dark.svg"
                    }
                    alt="Arrow"
                    width={index === 0 ? 24 : 16}
                    height={index === 0 ? 24 : 16}
                  />
                }
              >
                {cta.label}
              </Button>
            ))}
          </div>
        </Container>
      </div>
      {/* Impact Section Heading included before the stats */}
      <Container>
        {(finalImpactStats as any).sectionHeading && (
          <SectionHeading
            heading={(finalImpactStats as any).sectionHeading.heading}
            subheading={(finalImpactStats as any).sectionHeading.subHeading}
            description={(finalImpactStats as any).sectionHeading.description}
            className="mb-12"
          />
        )}
      </Container>
      <ImpactData
        data={finalImpactStats}
        className="py-[98px] bg-white"
        lineColor={finalColors.lineColor || "var(--color-green)"}
        iconBoxBorderColor={
          finalColors.iconBoxBorderColor || "var(--color-green)"
        }
        iconBoxBackgroundColor={
          finalColors.iconBoxBackgroundColor || "var(--color-green-surface)"
        }
        iconColor={finalColors.iconColor || "var(--color-green)"}
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
                "[DUMMY] News Description - This is fallback text"
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
                    title: "[DUMMY] News Title 1",
                    read: "[DUMMY] READ",
                    date: "[DUMMY] DATE",
                    categories: ["[DUMMY]"],
                    link: "#",
                  },
                  {
                    id: 2,
                    image: "/Images/mockImages/LatestNews2.png",
                    title: "[DUMMY] News Title 2",
                    read: "[DUMMY] READ",
                    date: "[DUMMY] DATE",
                    categories: ["[DUMMY]"],
                    link: "#",
                  },
                  {
                    id: 3,
                    image: "/Images/mockImages/LatestNews3.png",
                    title: "[DUMMY] News Title 3",
                    read: "[DUMMY] READ",
                    date: "[DUMMY] DATE",
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
