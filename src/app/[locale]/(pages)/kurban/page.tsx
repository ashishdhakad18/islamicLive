import HeroSection from "@/components/ui/HeroSection";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import KurbanData from "@/components/ui/KurbanData";
import KurbanDestinationSection from "@/components/ui/KurbanDestinationCard";
import DonationFormPage from "@/components/ui/DonationFormPage";
import ImpactGridSection from "@/components/ui/ImpactGridSection";
import GenerositySection from "@/components/ui/GenerositySection";
import ImpactCard from "@/components/ui/ImpactCard";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import Testimonials from "@/components/ui/Testimonials";
import ImpactData from "@/components/ui/ImpactData";
import LatestNewsCard from "@/components/ui/LatestNewsCard";
import FaqSection from "@/components/ui/FaqSection";
import SocialMediaSection from "@/components/ui/SocialMediaSection";
import { Locale } from "@/config/i18n.config";
import { getKurbanData } from "@/lib/pages/kurban/getKurbanData";

export default async function KurbanPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const kurbanData = await getKurbanData(locale);

  if (!kurbanData) return null;

  return (
    <>
      <HeroSection
        backgroundColor="bg-primary"
        heading={kurbanData.hero.sectionHeading.heading}
        subheading={kurbanData.hero.sectionHeading.subHeading}
        description={kurbanData.hero.sectionHeading.description}
        headingClassName="type-h1"
        subHeadingClassName="type-h2 text-yellow"
        carouselData={{
          carouselItems: [
            {
              id: "1",
              url: kurbanData.hero.image.url,
              alt: kurbanData.hero.image.alt,
              title: kurbanData.hero.sectionHeading.heading,
              subtitle: kurbanData.hero.sectionHeading.subHeading,
              buttonText: kurbanData.cta.cta.text,
              buttonLink: kurbanData.cta.cta.link,
            },
          ],
        }}
        buttonLink={kurbanData.cta.cta.link}
        buttonText={kurbanData.cta.cta.text}
        buttonClassName="mt-6"
      />

      <section className="w-full bg-primary-lighter py-12 flex flex-col justify-center items-center">
        <h2 className="text-center tracking-wide type-h4 text-primary-main uppercase">
          {kurbanData.hero.heroMsg.message}
        </h2>
        <p className="text-center tracking-wide type-body-1 text-primary-main uppercase">
          {kurbanData.hero.heroMsg.author}
        </p>
      </section>

      <KurbanData
        currentValue={kurbanData.campaign.currentValue}
        totalValue={kurbanData.campaign.targetValue}
        label={kurbanData.campaign.label}
      />

      <div className="py-22 bg-grey-white">
        <KurbanDestinationSection
          heading={kurbanData.destination.heading}
          destinations={kurbanData.destination.destinations}
        />
      </div>

      <DonationFormPage backgroundImage={kurbanData.formBGImage} />

      <ImpactGridSection
        heading={kurbanData.approach.sectionHeading.heading}
        subheading={kurbanData.approach.sectionHeading.subHeading}
        description={kurbanData.approach.sectionHeading.description}
        items={kurbanData.approach.items}
        images={
          kurbanData.approach.images.length > 0
            ? kurbanData.approach.images
            : ["/Images/winter-hero-image.png"]
        }
      />

      <Container>
        <GenerositySection
          posterImage={kurbanData.generosity.posterImage}
          videoUrl={kurbanData.generosity.videoUrl}
          text={kurbanData.generosity.text}
          buttonText={kurbanData.generosity.buttonText}
          buttonLink={kurbanData.generosity.buttonLink}
        />
      </Container>

      <div className="py-25 md:py-12 bg-primary-lighter ">
        <Container>
          <SectionHeading
            subheading={kurbanData.whyTrust.sectionHeading.subHeading}
            heading={kurbanData.whyTrust.sectionHeading.heading}
            description={kurbanData.whyTrust.sectionHeading.description}
            className="max-w-5xl"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {kurbanData.whyTrust.cards.map((card) => (
              <ImpactCard key={card.id} data={card} />
            ))}
          </div>
        </Container>
      </div>

      <div className="bg-primary-surface lg:py-25 py-12 flex flex-col gap-12">
        <Container>
          <SectionHeading
            subheading={kurbanData.cta.sectionHeading.subHeading}
            heading={kurbanData.cta.sectionHeading.heading}
            description={kurbanData.cta.sectionHeading.description}
            subheadingClassName="text-[#A91F21] type-caption-1 font-normal mb-2 lg:mb-0 whitespace-normal lg:whitespace-nowrap"
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
              href={kurbanData.cta.cta.link}
            >
              {kurbanData.cta.cta.text}
            </Button>
          </div>
        </Container>
      </div>

      <Testimonials
        heading={kurbanData.testimonials.sectionHeading.heading}
        subheading={kurbanData.testimonials.sectionHeading.subHeading}
        description={kurbanData.testimonials.sectionHeading.description}
        thumbnails={kurbanData.testimonials.thumbnails}
      />

      <div className="py-20">
        <SectionHeading
          heading={kurbanData.impactData.sectionHeading.heading}
          subheading={kurbanData.impactData.sectionHeading.subHeading}
          description={kurbanData.impactData.sectionHeading.description}
        />
        <ImpactData
          data={{
            stats: kurbanData.impactData.items.map((item, index) => ({
              id: index + 1,
              label: item.subHeading,
              description: item.description,
              icon: item.icon || "/Icons/Sadaqah.png",
              value: item.title,
            })),
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
              heading={kurbanData.news.sectionHeading.heading}
              subheading={kurbanData.news.sectionHeading.subHeading}
              description={kurbanData.news.sectionHeading.description}
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
            {kurbanData.news.news.map((card) => (
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
            heading={kurbanData.socialMedia.sectionHeading.heading}
            subheading={kurbanData.socialMedia.sectionHeading.subHeading}
            description={kurbanData.socialMedia.sectionHeading.description}
            subheadingClassName="text-red type-caption-1 normal-case"
            headingClassName=" type-h2 text-grey-black "
            descriptionClassName="type-body-2 text-grey-grey max-w-3xl"
            theme="light"
          />
          <Container>
            <SocialMediaSection posts={kurbanData.socialMedia.posts} />
          </Container>
        </div>
      </div>

      <FaqSection
        faqs={kurbanData.faqs}
        sectionHeading={kurbanData.faqSectionHeading}
      />
    </>
  );
}
