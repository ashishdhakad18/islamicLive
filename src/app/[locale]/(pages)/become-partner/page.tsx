import HeroSection from "@/components/ui/HeroSection";
import ImpactGridSection from "@/components/ui/ImpactGridSection";
import FaqSection from "@/components/ui/FaqSection";
import PartnershipOptionsSection from "@/components/ui/PartnershipOptionsSection";
import { Locale } from "@/config/i18n.config";
import { getBecomePartnerData } from "@/lib/pages/become-partner/getBecomePartnerData";

interface BecomePartnerPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export default async function BecomePartnerPage({
  params,
}: BecomePartnerPageProps) {
  const { locale } = await params;
  const partnerData = await getBecomePartnerData(locale);

  if (!partnerData) return null;

  return (
    <>
      <HeroSection
        backgroundColor="bg-primary"
        heading={partnerData.hero.sectionHeading.heading}
        subheading={partnerData.hero.sectionHeading.subHeading}
        description={partnerData.hero.sectionHeading.description}
        headingClassName="type-h1"
        subHeadingClassName="type-h2 text-yellow"
        carouselData={{
          carouselItems: [
            {
              id: "1",
              url: partnerData.hero.image.url,
              alt: partnerData.hero.image.alt,
              title: partnerData.hero.sectionHeading.heading,
              subtitle: partnerData.hero.sectionHeading.subHeading,
              buttonText: "Donate",
              buttonLink: "/donate",
            },
          ],
        }}
        buttonLink="#"
        buttonText="faire un don"
        buttonClassName="mt-6"
      />

      <ImpactGridSection
        heading={partnerData.approach.sectionHeading.heading}
        subheading={partnerData.approach.sectionHeading.subHeading}
        description={partnerData.approach.sectionHeading.description}
        items={partnerData.approach.items}
        images={
          partnerData.approach.images.length > 0
            ? partnerData.approach.images
            : ["/Images/winter-hero-image.png"]
        }
      />

      <PartnershipOptionsSection
        heading={partnerData.whyTrustUs.heading}
        options={partnerData.whyTrustUs.cards}
      />

      <div className="">
        <FaqSection
          faqs={partnerData.faqSection.faqs}
          sectionHeading={partnerData.faqSection.sectionHeading}
        />
      </div>
    </>
  );
}
