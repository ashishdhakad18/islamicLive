import HeroSection from "@/components/ui/HeroSection";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import Image from "next/image";

import { latestNewsCardData } from "@/types/latestNewsCard";
import LatestNewsCard from "@/components/ui/LatestNewsCard";
import SocialMediaSection from "@/components/ui/SocialMediaSection";
import FaqSection from "@/components/ui/FaqSection";
import MapSection from "@/components/ui/map";
import { getValidLocale } from "@/lib/utils/getValidLocale";
import { getCountriesWeOperateData } from "@/lib/pages/countries-we-operate/getCountriespageData";
import {
  mapCountriesHero,
  mapWhereWeWork,
  mapMapSection,
  mapCountriesCallToAction,
} from "@/lib/mappers/countriesWeOperate";
import SimpleCard from "@/components/ui/SimpleCard";

export default async function CountriesWeOperatePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = await getValidLocale(params);
  const data = await getCountriesWeOperateData(locale);

  // Map Strapi data to component-friendly format with fallbacks
  const heroData = data ? mapCountriesHero(data) : null;
  const whereWeWorkData = data ? mapWhereWeWork(data) : null;
  const mapSectionData = data ? mapMapSection(data) : null;
  const ctaData = data ? mapCountriesCallToAction(data) : null;

  // Build carousel data from hero images
  const heroCarouselData = {
    carouselItems: heroData?.images?.length
      ? heroData.images.map((img, index) => ({
        id: String(img.id || index),
        url: img.url || "/Images/Homepage-Hero-1.png",
        alt: img.alt || "Countries hero image",
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
          alt: "Countries Hero",
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
          heroData?.sectionHeading.description ||
          "[DUMMY] Hero Description - This text is a fallback"
        }
        carouselData={heroCarouselData}
        statsData={heroStatsData}
        statsBgColor="bg-primary-lighter"
      />

      <div className="py-25 lg:py-12">
        <SectionHeading
          subheading={
            whereWeWorkData?.sectionHeading.subHeading ||
            "[DUMMY] Section Subheading"
          }
          heading={
            whereWeWorkData?.sectionHeading.heading || "[DUMMY] Section Heading"
          }
          description={
            whereWeWorkData?.sectionHeading.description ||
            "[DUMMY] Section Description"
          }
          subheadingClassName="text-red type-caption-1 normal-case"
          headingClassName="mb-1"
          descriptionClassName="max-w-3xl text-grey-grey"
          className="mb-12 lg:mb-16 lg:px-0 px-6!"
        />
        <SimpleCard
          heading={whereWeWorkData?.heading || "[DUMMY] Card Heading"}
          description={
            whereWeWorkData?.description || "[DUMMY] Card Description"
          }
          imageSrc={
            whereWeWorkData?.image.url || "/Images/mockImages/blackboys.png"
          }
          imageAlt={whereWeWorkData?.image.alt || "Children smiling"}
          className="border-none"
        />
      </div>

      <MapSection
        title={mapSectionData?.title}
        mapImage={mapSectionData?.mapImage}
        countryCount={mapSectionData?.countryCount}
        regionCount={mapSectionData?.regionCount}
        regions={mapSectionData?.regions}
      />

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
            subheadingClassName="text-green-dark type-caption-1 font-normal mb-2 lg:mb-0 whitespace-normal lg:whitespace-nowrap"
            headingClassName="mb-6 text-3xl lg:text-5xl whitespace-normal lg:whitespace-nowrap"
            descriptionClassName="lg:type-body-1 type-body-2"
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

      {/* News Section - Static for now */}
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

      {/* Social Media Section - Static for now */}
      <div className="w-full bg-primary-surface py-20">
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

      {/* FAQ Section - Static for now */}
      <FaqSection />
    </div>
  );
}
