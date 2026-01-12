import HeroSection from "@/components/ui/HeroSection";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import FundamentalsCard from "@/components/ui/FundamentalsCard";
import React from "react";
import ImpactCard from "@/components/ui/ImpactCard";
import ImpactGridSection from "@/components/ui/ImpactGridSection";
import CardSlider from "@/components/ui/CardSlider";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import FaqSection from "@/components/ui/FaqSection";
import { getWaqfData } from "@/lib/pages/waqf/getWaqfData";
import { Locale } from "@/config/i18n.config";

export default async function WaqfPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const waqfData = await getWaqfData(locale);

  if (!waqfData) return null;

  return (
    <>
      <HeroSection
        backgroundColor="bg-primary"
        heading={waqfData.hero.sectionHeading.heading}
        subheading={waqfData.hero.sectionHeading.subHeading}
        description={waqfData.hero.sectionHeading.description}
        carouselData={{
          carouselItems: [
            {
              id: "1",
              url: waqfData.hero.image.url,
              alt: waqfData.hero.image.alt,
              title: waqfData.hero.heroMsg.title,
              subtitle: waqfData.hero.heroMsg.subtitle,
              buttonText: waqfData.cta.cta.text,
              buttonLink: waqfData.cta.cta.link,
            },
          ],
        }}
        buttonLink={waqfData.cta.cta.link}
        buttonText={waqfData.cta.cta.text}
        buttonClassName="mt-6"
      />

      <div className="py-25 md:py-12 ">
        <Container>
          <SectionHeading
            subheading={waqfData.basicCards.sectionHeading.subHeading}
            heading={waqfData.basicCards.sectionHeading.heading}
            description={waqfData.basicCards.sectionHeading.description}
          />

          <div className="flex flex-col lg:flex-row justify-between items-stretch gap-6">
            {waqfData.basicCards.cards.map((card) => (
              <FundamentalsCard key={card.id} card={card} />
            ))}
          </div>
        </Container>
      </div>

      <div className="py-25 md:py-12 bg-primary-lighter ">
        <Container>
          <SectionHeading
            subheading={waqfData.whyTrust.sectionHeading.subHeading}
            heading={waqfData.whyTrust.sectionHeading.heading}
            description={waqfData.whyTrust.sectionHeading.description}
            className="max-w-5xl"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {waqfData.whyTrust.cards.map((card) => (
              <ImpactCard key={card.id} data={card} />
            ))}
          </div>
        </Container>
      </div>

      <div className="bg-primary-surface">
        <ImpactGridSection
          heading={waqfData.distribution.sectionHeading.heading}
          subheading={waqfData.distribution.sectionHeading.subHeading}
          description={waqfData.distribution.sectionHeading.description}
          items={waqfData.distribution.items}
          images={waqfData.distribution.images}
        />
      </div>

      <div className="py-25 md:py-12 ">
        <Container>
          <SectionHeading
            subheading={waqfData.initiatives.sectionHeading.subHeading}
            heading={waqfData.initiatives.sectionHeading.heading}
            description={waqfData.initiatives.sectionHeading.description}
          />
          <CardSlider cards={waqfData.initiatives.cards} />
        </Container>
      </div>

      <div className="bg-green-surface lg:py-25 py-12 flex flex-col gap-12 ">
        <Container>
          <SectionHeading
            heading={waqfData.cta.sectionHeading.heading}
            description={waqfData.cta.sectionHeading.description}
            headingClassName="mb-1 type-h3 uppercase "
            descriptionClassName="lg:type-body-1 type-body-2 "
          />
          <div className="flex justify-center items-center w-full">
            <Button
              color="yellow"
              rounded
              className=" h-12 lg:h-12 justify-center items-center "
              endIcon={
                <Image
                  src="/Icons/Arrow-right-black.svg"
                  alt="Arrow"
                  width={20}
                  height={20}
                />
              }
              href={waqfData.cta.cta.link}
            >
              {waqfData.cta.cta.text}
            </Button>
          </div>
        </Container>
      </div>

      <FaqSection
        faqs={waqfData.faqs}
        sectionHeading={waqfData.faqSectionHeading}
      />
    </>
  );
}
