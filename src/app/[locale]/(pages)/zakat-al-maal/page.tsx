import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import CardSlider from "@/components/ui/CardSlider";
import FaqSection from "@/components/ui/FaqSection";
import ImpactGridSection from "@/components/ui/ImpactGridSection";
import SectionHeading from "@/components/ui/SectionHeading";
import Image from "next/image";
import React from "react";
import HeroSection from "@/components/ui/HeroSection";
import FundamentalsCard from "@/components/ui/FundamentalsCard";
import ImpactCard from "@/components/ui/ImpactCard";
import ZakatCalculatorSection from "@/components/ui/ZakatCalculatorSection";
import { getZakatData } from "@/lib/pages/zakat-al-maal/getZakatData";
import { Locale } from "@/config/i18n.config";

interface ZakatAlMaalPageProps {
  params: {
    locale: Locale;
  };
}

export default async function ZakatAlMaalPage({
  params,
}: ZakatAlMaalPageProps) {
  const { locale } = await params;
  const zakatData = await getZakatData(locale);

  if (!zakatData) return null;

  const {
    hero,
    basicCards,
    whyTrust,
    calculator,
    distribution,
    initiatives,
    cta,
    faqs,
    faqSectionHeading,
  } = zakatData;

  // Construct Carousel Data for Hero
  const heroCarouselData = {
    carouselItems: [
      {
        id: "1",
        url: hero.image.url || "/Images/Zakaat-Hero-Img.png",
        alt: hero.image.alt || "Zakat Hero",
        title: hero.heroMsg.title || "Zakat Al Maal", // Fallback if needed, though heading covers it usually
        subtitle: hero.heroMsg.subtitle || "",
        description: "",
        buttonText: "Donate", // This might need to be dynamic if part of carousel item in Strapi
        buttonLink: "/donate",
      },
    ],
  };

  return (
    <>
      <HeroSection
        backgroundColor="bg-primary"
        heading={hero.sectionHeading.heading}
        subheading={hero.sectionHeading.subHeading}
        description={hero.sectionHeading.description}
        carouselData={heroCarouselData}
        buttonLink={cta.cta.link} // Using CTA link for hero button for now or hardcode if needed
        buttonText="je verse ma zakat al maal"
        buttonClassName="mt-6"
      />

      <div className="py-25 md:py-12 ">
        <Container>
          <SectionHeading
            subheading={basicCards.sectionHeading.subHeading}
            heading={basicCards.sectionHeading.heading}
            description={basicCards.sectionHeading.description}
          />

          <div className="flex flex-col lg:flex-row justify-between items-stretch gap-6">
            {basicCards.cards.map((card) => (
              <FundamentalsCard key={card.id} card={card} />
            ))}
          </div>
        </Container>
      </div>

      <div className="py-25 md:py-12 bg-primary-lighter ">
        <Container>
          <SectionHeading
            subheading={whyTrust.sectionHeading.subHeading}
            heading={whyTrust.sectionHeading.heading}
            description={whyTrust.sectionHeading.description}
            className="max-w-5xl"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {whyTrust.cards.map((card) => (
              <ImpactCard key={card.id} data={card} />
            ))}
          </div>
        </Container>
      </div>

      <div className="py-25 md:py-12 ">
        <Container>
          <SectionHeading
            subheading={calculator.sectionHeading.subHeading}
            heading={calculator.sectionHeading.heading}
            description={calculator.sectionHeading.description}
          />
          <ZakatCalculatorSection data={calculator} />
        </Container>
      </div>

      <div className="bg-primary-surface">
        <ImpactGridSection
          heading={
            distribution.sectionHeading.heading || "où va votre argent ?"
          }
          subheading={
            distribution.sectionHeading.subHeading ||
            "Confiance & Responsabilité"
          }
          description={distribution.sectionHeading.description}
          items={distribution.items.map((item) => ({
            title: item.title,
            description: item.description,
            icon: item.icon, // ImpactGridSection items usually expect 'icon' or 'image'
            theme: item.theme,
          }))}
          images={
            distribution.images.length > 0
              ? distribution.images
              : [
                  "/Images/Fid-Kaff-Grid-Img-1.png",
                  "/Images/Fid-Kaff-Grid-Img-4.png",
                  "/Images/Fid-Kaff-Grid-Img-2.png",
                  "/Images/Fid-Kaff-Grid-Img-3.png",
                  "/Images/Fid-Kaff-Grid-Img-5.png",
                ]
          }
        />
      </div>

      <div className="py-25 md:py-12 ">
        <Container>
          <SectionHeading
            subheading={initiatives.sectionHeading.subHeading}
            heading={initiatives.sectionHeading.heading}
            description={initiatives.sectionHeading.description}
          />
          <CardSlider cards={initiatives.cards} />
        </Container>
      </div>

      <div className="bg-green-surface lg:py-25 py-12 flex flex-col gap-12 ">
        <Container>
          <SectionHeading
            heading={cta.sectionHeading.heading}
            description={cta.sectionHeading.description}
            subheadingClassName="text-green-dark type-caption-1  font-normal mb-2 lg:mb-0 whitespace-normal lg:whitespace-nowrap"
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
              href={cta.cta.link}
            >
              {cta.cta.text}
            </Button>
          </div>
        </Container>
      </div>

      <FaqSection faqs={faqs} sectionHeading={faqSectionHeading} />
    </>
  );
}
