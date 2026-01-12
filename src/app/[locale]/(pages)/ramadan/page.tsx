import Container from "@/components/layout/Container";
import HeroSection from "@/components/ui/HeroSection";
import GenerositySection from "@/components/ui/GenerositySection";
import Image from "next/image";
import FaqSection from "@/components/ui/FaqSection";
import ImpactData from "@/components/ui/ImpactData";
import SocialMediaSection from "@/components/ui/SocialMediaSection";
import SectionHeading from "@/components/ui/SectionHeading";
import LatestNewsCard from "@/components/ui/LatestNewsCard";
import { impactData3 } from "@/data/tempImpact";
import { latestNewsCardData } from "@/types/latestNewsCard";
import { Button } from "@/components/ui/Button";
import RespondingSection from "@/components/ui/RespondingSection";
import { respondingData } from "@/data/responseCardData";
import Testimonials from "@/components/ui/Testimonials";
import CardWithTerbtn from "@/components/ui/CardWithTerbtn";
import { mockEventCards2 } from "@/data/mockSliderData";
import { CardDataSq } from "@/types/slider.types";
import { getRamadanData } from "@/lib/pages/ramadan/getRamadanData";
import { getValidLocale } from "@/lib/utils/getValidLocale";

const Ramadan = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const locale = await getValidLocale(params);
  const data = await getRamadanData(locale);

  // Map hero data with fallbacks
  const heroData = data?.hero;
  const heroMSG = heroData?.heroMSG;

  // Map transmet/generosity data with fallbacks
  const transmetData = data?.transmet;

  // Map esembleCard (Where We're Responding) data
  const esembleCardData = data?.esembleCard;

  // Map testimonial data
  const testimonialData = data?.testimonial;

  // Map card (project cards) data
  const cardData = data?.card;

  // Map impact data
  const impactDataSection = data?.impactData;

  // Map FAQ data
  const faqsData = data?.faqs;
  const faqSectionHeading = data?.faqSectionHeading;

  return (
    <div>
      <HeroSection
        backgroundColor="bg-green-dark"
        heading={heroData?.sectionHeading?.heading || "Ramadan Mubarak (MOCK)"}
        subheading={
          heroData?.sectionHeading?.subHeading ||
          "Agissons ensemble ce Ramadan (MOCK)"
        }
        description={
          heroData?.sectionHeading?.description ||
          "(MOCK) Le Ramadan est le mois de la générosité et de la solidarité."
        }
        carouselData={
          heroData?.carouselData || {
            carouselItems: [
              {
                id: "1",
                url: "/Images/ramadan-hero.png",
                alt: "Ramadan Hero",
                title: "",
                subtitle: "",
                buttonText: "Je fais un don",
                buttonLink: "/donate",
              },
            ],
          }
        }
        // autoPlay
        buttonLink={heroData?.ctaLink || "#"}
        buttonText={heroData?.ctaText || "Je fais un don"}
        buttonClassName="mt-6"
      />

      <div className="bg-green-lighter">
        <Container className="py-12 text-center">
          <h4 className="type-h4">
            {heroMSG?.message ||
              '(MOCK) "Celui qui offre à un jeûneur de quoi rompre son jeûne aura la même récompense que lui, sans que cela ne diminue en rien la récompense du jeûneur."'}
          </h4>
          <p className="type-body-1">
            {heroMSG?.author ||
              "(MOCK) Prophet Muhammad ﷺ Sunan at-Tirmidhi, n°807"}
          </p>
        </Container>
      </div>

      <div className="bg-green-surface">
        <GenerositySection
          videoUrl={transmetData?.videoUrl || ""}
          posterImage={
            transmetData?.posterImage || "/Images/ImageWithFallback.png"
          }
          text={
            transmetData?.description ||
            "(MOCK) ISLAMIC RELIEF TRANSMET VOTRE GÉNÉROSITÉ À CEUX QUI EN ONT LE PLUS BESOIN."
          }
          buttonText={transmetData?.ctaText || "AFFICHER LE RAPPORT"}
          buttonLink={transmetData?.ctaLink || "#"}
        />
      </div>

      <Container className="lg:py-25 py-12">
        <SectionHeading
          subheading={
            esembleCardData?.sectionHeading?.subHeading ||
            "Crisis Spotlight (MOCK)"
          }
          heading={
            esembleCardData?.sectionHeading?.heading ||
            "Where We're Responding (MOCK)"
          }
          description={
            esembleCardData?.sectionHeading?.description ||
            "(MOCK) Crisis situations requiring immediate support from our global community"
          }
          subheadingClassName="mb-2"
          headingClassName="mb-0"
        />

        <RespondingSection cards={respondingData} />
      </Container>

      <Testimonials
        heading={
          testimonialData?.sectionHeading?.heading ||
          "ISLAMIC RELIEF ON THE GROUND"
        }
        subheading={testimonialData?.sectionHeading?.subHeading || "Impact"}
        description={testimonialData?.sectionHeading?.description || ""}
        thumbnails={
          testimonialData?.videos?.length
            ? testimonialData.videos.map((video) => ({
                id: Number(video.id),
                image: video.galleryImage,
                videoUrl: video.videoUrl,
                alt: video.galleryAlt,
              }))
            : undefined
        }
      />

      <div className="bg-green-light">
        <Container className="lg:py-25 py-12">
          <SectionHeading
            subheading={
              cardData?.sectionHeading?.subHeading ||
              "Téléchargez gratuitement notre toolkit ! (MOCK)"
            }
            heading={
              cardData?.sectionHeading?.heading ||
              "Islamic Relief vous accompagne ce Ramadan ! (MOCK)"
            }
            description={cardData?.sectionHeading?.description || ""}
            subheadingClassName="text-red-main"
            headingClassName=""
            className="w-full max-w-[990px]"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {cardData?.projectCards?.length
              ? cardData.projectCards.map((card) => (
                  <div key={card.id}>
                    <CardWithTerbtn
                      card={{
                        id: card.id,
                        variant: "simple" as const,
                        headerImage: card.image,
                        headerImageAlt: card.imageAlt,
                        heading: card.heading,
                        subHeading: card.description,
                        link: {
                          href: card.ctaLink,
                          label: card.ctaText,
                        },
                      }}
                      hideChips
                    />
                  </div>
                ))
              : mockEventCards2.map((card: CardDataSq) => (
                  <div key={card.id}>
                    <CardWithTerbtn card={card} hideChips />
                  </div>
                ))}
          </div>
        </Container>
      </div>

      <div className="py-20">
        <SectionHeading
          heading="Pourquoi nous faire confiance ?"
          className="max-w-auto"
        />
        <ImpactData
          data={impactData3}
          className="py-[98px]"
          lineColor="var(--color-green)"
          iconBoxBorderColor="var(--color-green)"
          iconBoxBackgroundColor="var(--color-green-lighter)"
          iconColor="var(--color-green)"
        />
      </div>
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
      <FaqSection
        sectionHeading={
          faqSectionHeading
            ? {
                heading: faqSectionHeading.heading,
                subHeading: faqSectionHeading.subHeading,
                description: faqSectionHeading.description,
              }
            : undefined
        }
        faqs={faqsData}
      />
    </div>
  );
};

export default Ramadan;
