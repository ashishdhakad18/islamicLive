import HeroSection from "@/components/ui/HeroSection";
import { CarouselData } from "@/types/carousel.types";
import { ImpactStatsData } from "@/types/impactStats";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import ImpactData from "@/components/ui/ImpactData";
import { impactData1 } from "@/data/impactData";
import { latestNewsCardData } from "@/types/latestNewsCard";
import LatestNewsCard from "@/components/ui/LatestNewsCard";
import SocialMediaSection from "@/components/ui/SocialMediaSection";
import SimpleCard from "@/components/ui/SimpleCard";
import FaqPageSection from "@/components/ui/FaqPageSection";

const heroCarouselData: CarouselData = {
  carouselItems: [
    {
      id: "1",
      url: "/Images/mockImages/faqhero.png",
      alt: "Presentation Hero",
      title: "Presentation",
      subtitle: "Ensemble...",
      buttonText: "Donate",
      buttonLink: "/donate",
    },
  ],
};

const heroStatsData: ImpactStatsData = {
  impactStats: [
    { id: 1, value: "25%", label: "Directly to programs", type: "percentage" },
    { id: 2, value: "2.4M+", label: "Lives helped annually", type: "count" },
    { id: 3, value: "40+", label: "Countries worldwide", type: "count" },
  ],
};

import { getFaqData } from "@/lib/pages/faq/getFaqData";
import { Locale } from "@/config/i18n.config";

interface FaqPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export default async function FaqPage({ params }: FaqPageProps) {
  const { locale } = await params;
  const data = await getFaqData(locale);

  if (!data) return null;

  return (
    <div>
      <HeroSection
        backgroundColor="bg-primary"
        heading={data.hero.sectionHeading.heading}
        subheading={data.hero.sectionHeading.subHeading}
        description={data.hero.sectionHeading.description}
        carouselData={data.hero.carouselData}
        statsData={data.hero.statsData}
        statsBgColor="bg-primary-lighter"
      />

      <div className="pt-25 lg:pt-20">
        <SectionHeading
          subheading={data.whereWeWork.sectionHeading.subHeading}
          heading={data.whereWeWork.sectionHeading.heading}
          description={data.whereWeWork.sectionHeading.description}
          subheadingClassName="text-red type-caption-1 normal-case"
          headingClassName="mb-1"
          descriptionClassName="max-w-3xl text-grey-grey"
          className="mb-12 lg:mb-16"
        />
        <div className="w-full bg-grey-white">
          <SimpleCard
            heading={data.whereWeWork.heading}
            description={[data.whereWeWork.description]}
            imageSrc={data.whereWeWork.image}
            imageAlt="Children smiling"
            className="border-none"
          />
        </div>
      </div>

      <div className="bg-green-surface lg:py-25 py-12 flex flex-col gap-12">
        <Container>
          <SectionHeading
            subheading={data.callToAction.sectionHeading.subHeading}
            heading={data.callToAction.sectionHeading.heading}
            description={data.callToAction.sectionHeading.description}
            subheadingClassName="text-green-dark type-caption-1  font-normal mb-2 lg:mb-0 whitespace-normal lg:whitespace-nowrap"
            headingClassName="mb-1 type-h3 whitespace-normal lg:whitespace-nowrap"
            descriptionClassName="lg:type-body-1 type-body-2"
          />
          <div className="flex flex-col lg:flex-row justify-center gap-4 lg:gap-6 items-center w-full">
            <Button
              color="yellow"
              rounded
              href={data.callToAction.cta.url}
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
              {data.callToAction.cta.label || "Donate to the Emergency Fund"}
            </Button>
            <Button
              rounded
              variant="ghost"
              href="/donate"
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

      <Container>
        <FaqPageSection
          data={data.faqSection.faqs}
          title={data.faqSection.sectionHeading.heading}
        />
      </Container>

      <ImpactData
        data={data.impactData}
        className="py-[98px] bg-white"
        lineColor="var(--color-green)"
        iconBoxBorderColor="var(--color-green)"
        iconBoxBackgroundColor="var(--color-green-light)"
        iconColor="var(--color-green)"
      />

      <div className="py-26 bg-primary">
        <Container className="">
          <div className="md:flex md:items-end md:justify-between lg:mb-12">
            <SectionHeading
              heading={data.newsSection.sectionHeading.heading}
              subheading={data.newsSection.sectionHeading.subHeading}
              description={data.newsSection.sectionHeading.description}
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
              href="/blogs"
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
            {data.newsSection.news.slice(0, 3).map((card) => (
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
            heading={data.socialMedia.sectionHeading.heading}
            subheading={data.socialMedia.sectionHeading.subHeading}
            subheadingClassName="text-red type-caption-1 normal-case"
            headingClassName=" type-h2 text-grey-black "
            description={data.socialMedia.sectionHeading.description}
            descriptionClassName="type-body-2 text-grey-grey max-w-3xl"
            theme="light"
          />
          <Container>
            <SocialMediaSection posts={data.socialMedia.posts} />
          </Container>
        </div>
      </div>
    </div>
  );
}
