import HeroSection from "@/components/ui/HeroSection";
import ImpactGridSection from "@/components/ui/ImpactGridSection";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import CardSlider from "@/components/ui/CardSlider";
import FaqSection from "@/components/ui/FaqSection";
import { Locale } from "@/config/i18n.config";
import { getIrChallengesData } from "@/lib/pages/ir-challenges/getIrChallengesData";

interface IrChallengesPageProps {
  params: {
    locale: Locale;
  };
}

export default async function IrChallengesPage({
  params: { locale },
}: IrChallengesPageProps) {
  const data = await getIrChallengesData(locale);

  if (!data) return null;

  return (
    <>
      <HeroSection
        backgroundColor="bg-royal"
        heading={data.hero.sectionHeading.heading}
        subheading={data.hero.sectionHeading.subHeading}
        description={data.hero.sectionHeading.description}
        headingClassName="type-h1"
        subHeadingClassName="type-h2 text-yellow"
        carouselData={{
          carouselItems: [
            {
              id: "1",
              url: data.hero.image.url,
              alt: data.hero.image.alt,
              title: data.hero.sectionHeading.heading,
              subtitle: data.hero.sectionHeading.subHeading,
              buttonText: data.hero.ctaText,
              buttonLink: data.hero.ctaLink,
            },
          ],
        }}
        buttonLink={data.hero.ctaLink}
        buttonText={data.hero.ctaText}
        buttonClassName="mt-6"
      />

      <div className="bg-grey-white">
        <ImpactGridSection
          heading={data.distribution.sectionHeading.heading}
          subheading={data.distribution.sectionHeading.subHeading}
          description={data.distribution.sectionHeading.description}
          items={data.distribution.items}
          images={
            data.distribution.images.length > 0
              ? data.distribution.images
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

      <div className="py-25 md:py-12 bg-grey-bg-dark">
        <Container>
          <SectionHeading
            subheading={data.challengeCardsHeading.subHeading}
            heading={data.challengeCardsHeading.heading}
            description={data.challengeCardsHeading.description}
            subheadingClassName="type-caption-1 normal-case text-red mb-2"
            headingClassName="type-h2 uppercase text-grey-black font-bold mb-0"
          />
          <CardSlider cards={data.challengeCards} />
        </Container>
      </div>

      <div className="bg-grey-white">
        <FaqSection faqs={data.faqs} sectionHeading={data.faqSectionHeading} />
      </div>
    </>
  );
}
