import React from "react";
import HeroSection from "@/components/ui/HeroSection";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ResponseTimelineSection from "@/components/ui/ResponseTimelineSection";
import RespondingSection from "@/components/ui/RespondingSection";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import ImpactData from "@/components/ui/ImpactData";
import Linkcard from "@/components/ui/Linkcard";
import { linkcardData } from "@/types/linkCards";
import { latestNewsCardData } from "@/types/latestNewsCard";
import LatestNewsCard from "@/components/ui/LatestNewsCard";
import SocialMediaSection from "@/components/ui/SocialMediaSection";
import FaqSection from "@/components/ui/FaqSection";
import { getEmergenciesListingData } from "@/lib/pages/emergencies-listing/getEmergenciesListingData";
import { Locale, defaultLocale } from "@/config/i18n.config";
import { ArrowRight } from "lucide-react";

interface EmergenciesPageProps {
  params: Promise<{ locale: string }>;
}

const Emergencies = async ({ params }: EmergenciesPageProps) => {
  const resolvedParams = await params;
  const locale = (resolvedParams?.locale as Locale) || defaultLocale;
  const data = await getEmergenciesListingData(locale);

  // Destructure mapped data
  const hero = data?.hero;
  const responding = data?.responding;
  const howWeWork = data?.howWeWork;
  const callToAction = data?.callToAction;
  const impactData = data?.impactData;

  return (
    <div>
      <HeroSection
        backgroundColor="bg-red-dark"
        heading={hero?.sectionHeading.heading || "WHEN DISASTER STRIKES"}
        subheading={
          hero?.sectionHeading.subHeading ||
          "We respond with faith and compassion."
        }
        description={
          hero?.sectionHeading.description ||
          "Every crisis demands more than aid it needs solidarity. Across Gaza, Sudan, and beyond, families are facing hunger, displacement, and loss. Your support brings hope when it's needed most."
        }
        carouselData={hero?.carouselData || { carouselItems: [] }}
        statsData={hero?.statsData || { impactStats: [] }}
        autoPlay
      />

      <Container className="lg:my-25 mt-12">
        <SectionHeading
          subheading={
            responding?.sectionHeading.subHeading || "Crisis Spotlight"
          }
          heading={
            responding?.sectionHeading.heading || "Where We're Responding"
          }
          description={
            responding?.sectionHeading.description ||
            "Crisis situations requiring immediate support from our global community"
          }
          subheadingClassName="mb-2"
          headingClassName="mb-0"
        />

        <RespondingSection cards={responding?.cards || []} />
      </Container>

      <div className="py-12 lg:py-25 bg-teal-divider">
        <SectionHeading
          heading={
            howWeWork?.mainHeading.heading ||
            "Together, We Make Relief Possible"
          }
          subheading={howWeWork?.mainHeading.subHeading || "How We Work"}
          description={
            howWeWork?.mainHeading.description ||
            "Every donation powers emergency response from the first day to the final rebuild. Here's how your support creates lasting change."
          }
          theme="light"
          align="center"
          headingTag="h1"
          className="max-w-4xl mb-0"
          headingClassName="mb-0 text-grey-black"
          subheadingClassName="text-teal-dark font-medium mb-0!"
          descriptionClassName="text-grey-grey type-body-1!"
        />
      </div>

      <div
        className="w-full bg-no-repeat bg-cover bg-center h-[700px] lg:h-screen relative mb-0 lg:mb-84"
        style={{
          backgroundImage: `url('${
            howWeWork?.backgroundImage?.url || "/Images/Together-we-grow.png"
          }')`,
        }}
      >
        <Container className="md:pt-0 lg:pt-20! absolute w-full lg:bottom-[-100px] md:bottom-0 left-0 right-0 md:px-0! px-0!">
          <SectionHeading
            heading={
              howWeWork?.sectionHeading.heading ||
              "Together, We Make Relief Possible"
            }
            subheading={howWeWork?.sectionHeading.subHeading || "How We Work"}
            description={
              howWeWork?.sectionHeading.description ||
              "Every donation powers emergency response from the first day to the final rebuild. Here's how your support creates lasting change."
            }
            theme="light"
            align="center"
            headingTag="h1"
            className="hidden lg:flex lg:pt-10 lg:pb-20 py-10 lg:w-full max-w-full lg:flex-col lg:pr-24 mb-0 lg:mt-28"
            headingClassName="mb-0"
            subheadingClassName="text-yellow font-medium mb-0!"
            descriptionClassName="text-grey-bg-dark type-body-1! max-w-2xl!"
          />
          <ResponseTimelineSection cards={howWeWork?.cards || []} />
        </Container>
      </div>

      <div className="bg-green-surface lg:py-25 py-12 flex flex-col gap-12">
        <Container>
          <SectionHeading
            subheading={
              callToAction?.sectionHeading.subHeading || "Over 2.4 Million"
            }
            heading={
              callToAction?.sectionHeading.heading ||
              "Lives Supported Last Year"
            }
            description={
              callToAction?.sectionHeading.description ||
              "Your contributions don't just respond to emergencies - they build resilience, restore hope, and create sustainable futures for communities worldwide."
            }
            subheadingClassName="text-green-dark type-caption-1 text-5xl lg:text-[100px]! font-normal mb-2 lg:mb-0"
            headingClassName="mb-6 text-3xl lg:text-5xl"
            descriptionClassName="lg:type-body-1 type-body-2"
          />
          <div className="flex flex-col lg:flex-row justify-center gap-4 lg:gap-6 items-center w-full">
            {callToAction?.buttons && callToAction.buttons.length > 0 ? (
              <>
                <Button
                  color="yellow"
                  rounded
                  size="lg"
                  className="w-full lg:w-auto justify-center"
                  endIcon={<ArrowRight color="black" width={22} />}
                >
                  {callToAction.buttons[0]?.label ||
                    "Donate to the Emergency Fund"}
                </Button>
                {callToAction.buttons[1] && (
                  <Button
                    rounded
                    variant="ghost"
                    size="lg"
                    className="text-primary-dark! border border-primary-dark! hover:bg-primary-surface! w-full lg:w-auto justify-center"
                    endIcon={<ArrowRight color="#172e6d" width={22} />}
                  >
                    {callToAction.buttons[1]?.label || "Start Monthly Support"}
                  </Button>
                )}
              </>
            ) : (
              <>
                <Button
                  color="yellow"
                  rounded
                  className="w-full lg:w-auto justify-center"
                  endIcon={<ArrowRight color="black" width={22} />}
                >
                  Donate to the Emergency Fund
                </Button>
                <Button
                  rounded
                  variant="ghost"
                  className="text-primary-dark! border border-primary-dark! hover:bg-primary-surface! w-full lg:w-auto justify-center"
                  endIcon={<ArrowRight color="#172e6d" width={22} />}
                >
                  Start Monthly Support
                </Button>
              </>
            )}
          </div>
        </Container>
      </div>

      {impactData && impactData.stats.length > 0 && (
        <ImpactData
          data={impactData}
          className="py-[98px] bg-white"
          lineColor="var(--color-green)"
          iconBoxBorderColor="var(--color-green)"
          iconBoxBackgroundColor="var(--color-green-lighter)"
          iconColor="var(--color-green)"
        />
      )}

      {/* <div className="py-12 lg:py-25 bg-primary-lighter lg:bg-transparent ">
        <Container>
          <SectionHeading
            subheading="Ways to Make a Difference"
            heading="CHOOSE YOUR IMPACT"
            description="Whether through financial support, volunteering, or raising awareness, there are many meaningful ways to join our mission of helping those in need."
            className="mb-16"
          />
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 items-start">
            {linkcardData.map((card) => (
              <Linkcard
                key={card.id}
                icon={card.icon}
                title={card.title}
                description={card.description}
                link={card.link}
                linkText={card.linkText}
                className="bg-white lg:bg-transparent border-none rounded-lg shadow-sm lg:shadow-none p-4! lg:p-6! items-start gap-4 h-full "
                titleClassName="leading-4"
              />
            ))}
          </div>
        </Container>
      </div> */}

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
    </div>
  );
};

export default Emergencies;
