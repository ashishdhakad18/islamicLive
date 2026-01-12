import React from "react";
import Image from "next/image";
import { Locale } from "@/config/i18n.config";
import { getBecomeVolunteerData } from "@/lib/pages/become-volunteer/getBecomeVolunteerData";
import HeroSection from "@/components/ui/HeroSection";
import ImpactGridSection from "@/components/ui/ImpactGridSection";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ImpactStats from "@/components/ui/ImpactStats";
import Testimonials from "@/components/ui/Testimonials";
import FaqSection from "@/components/ui/FaqSection";
import VolunteerModalTrigger from "./VolunteerModalTrigger";

interface BecomeVolunteerPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

export default async function BecomeVolunteerPage({
  params,
}: BecomeVolunteerPageProps) {
  const { locale } = await params;
  const data = await getBecomeVolunteerData(locale);

  if (!data) {
    return null;
  }

  return (
    <>
         <HeroSection
        backgroundColor="bg-primary"
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
        heading={data.whyVolunteer.sectionHeading.heading}
        subheading={data.whyVolunteer.sectionHeading.subHeading}
        description={data.whyVolunteer.sectionHeading.description}
        items={data.whyVolunteer.items}
        images={data.whyVolunteer.images}
      />

      <div className="bg-primary-lighter lg:py-25 py-12">
        <Container>
          <SectionHeading
            subheading={data.whyIslamicRelief.sectionHeading.subHeading}
            heading={data.whyIslamicRelief.sectionHeading.heading}
            description={data.whyIslamicRelief.sectionHeading.description}
            className="max-w-auto"
            align="center"
          />
          <div className="flex flex-col lg:flex-row justify-center gap-6">
            {data.whyIslamicRelief.cards.map((item) => (
              <div
                key={item.id}
                className="w-full py-6 px-8 flex flex-col items-start gap-8 border border-grey-divider bg-white rounded-lg"
              >
                <div className="w-12 h-12 relative">
                  <Image
                    src={item.icon || "/Icons/Warning.svg"}
                    alt={item.title}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col items-start gap-4">
                  <h5 className="type-h5 text-grey-black uppercase tracking-tight">
                    {item.title}
                  </h5>
                  <p className="type-body-2 text-grey-grey">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>

      <div className="bg-white">
        <ImpactStats data={data.impactStats} />
      </div>

      <Testimonials
        heading={data.testimonials.sectionHeading.heading}
        subheading={data.testimonials.sectionHeading.subHeading}
        description={data.testimonials.sectionHeading.description}
        thumbnails={data.testimonials.thumbnails}
      />

      <FaqSection
        sectionHeading={data.faqSection.sectionHeading}
        faqs={data.faqSection.faqs}
      />
    </>
  );
}
