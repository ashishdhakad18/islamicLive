import HeroSection from "@/components/ui/HeroSection";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import ImpactCard from "@/components/ui/ImpactCard";
import CardWithTerbtn from "@/components/ui/CardWithTerbtn";
import { mockEventCards2 } from "@/data/mockSliderData";
import FaqSection from "@/components/ui/FaqSection";
import { getSadqahData } from "@/lib/pages/sadqah-jariyah/getSadqahData";
import { ArrowRightIcon } from "lucide-react";

// Static assets (keep these if needed for fallbacks or static sections)
const CircleLine = "/Icons/circleline.svg";
const Sqleft = "/Images/sqleft.png";
const DotCircle = "/Icons/dot-circle.svg";

// Keep static data for sections not yet dynamic
export const whyIslamicReliefCards = [
  {
    id: 1,
    icon: "/Icons/Leaf-primary.svg",
    title: "durabilité",
    description:
      "Nous finançons des projets qui renforcent l’autonomie et favorisent la croissance durable des communautés.",
    statValue: "100%",
    statDescription: "Impact durable",
  },
  {
    id: 2,
    icon: "/Icons/Shield-primary.svg",
    title: "transparence",
    description:
      "Les dons sont suivis, audités et gérés de manière éthique conformément aux principes islamiques.",
    statValue: "842+",
    statDescription: "Projets réalisés",
  },
  {
    id: 3,
    icon: "/Icons/Globe-primary.svg",
    title: "Impact Global",
    description:
      "Actif dans plus de 40 pays, au service de milliers de personnes grâce à des initiatives d’éducation, de santé et d’accès à l’eau.",
    statValue: "30+",
    statDescription: "Pays",
  },
  {
    id: 4,
    icon: "/Icons/Badge-primary.svg",
    title: "un héritage de confiance",
    description:
      "Plus de 30 ans d’action humanitaire guidée par la foi et l’intégrité.",
    statValue: "30+",
    statDescription: "Années d’engagement humanitaire",
  },
];

const Sadaqah = async () => {
  const sadqahData = await getSadqahData();

  if (!sadqahData) return null;

  const {
    hero,
    impactSection,
    premierSection,
    projectSection,
    whyDonateSection,
    ctaSection,
    faqs,
    faqSectionHeading,
  } = sadqahData;

  // Construct Carousel Data for Hero from generic Image
  const heroCarouselData = {
    carouselItems: [
      {
        id: "1",
        url: hero.image.url || "/Images/Homepage-Hero-1.png",
        alt: hero.image.alt || "Sadaqah Hero",
        title: hero.sectionHeading.heading || "Sadaqa Jariya",
        subtitle:
          hero.sectionHeading.subHeading ||
          "Un engagement : réactivité et responsabilité",
        description: hero.sectionHeading.description,
        buttonText: "je fais une sadaqa jariya", // Fallback or from separate field if exists
        buttonLink: "#",
      },
    ],
  };

  return (
    <div>
      <HeroSection
        backgroundColor="bg-green-dark"
        heading={hero.sectionHeading.heading}
        subheading={hero.sectionHeading.subHeading}
        description={hero.sectionHeading.description}
        carouselData={heroCarouselData}
        autoPlay
        buttonLink="#"
        buttonText="je fais une sadaqa jariya"
        buttonClassName="mt-6"
      />

      {/* Quote Section (from Sec1.heroMSG) */}
      <div className="bg-green-lighter">
        <Container className="py-12 text-center">
          <h4 className="type-h4">
            “
            {hero.quote.message ||
              "Lorsque le fils d’Adam meurt, son œuvre s’arrête sauf en trois choses : une aumône continue, une connaissance utile, ou un enfant vertueux qui prie pour lui."}
            ”
          </h4>
          <p className="type-body-1">
            {hero.quote.author || "Prophète Muhammad ﷺ"}
          </p>
        </Container>
      </div>

      {/* Section 3 - Impact Section */}
      <div>
        <Container className="lg:py-25 py-12">
          <SectionHeading
            subheading={impactSection.sectionHeading.subHeading}
            heading={impactSection.sectionHeading.heading}
            description={impactSection.sectionHeading.description}
            subheadingClassName="text-grey-black"
            headingClassName="mb-0"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {impactSection.cards.map((card) => (
              <ImpactCard key={card.id} data={card} />
            ))}
          </div>
          <div className="flex flex-col lg:flex-row justify-center gap-4 lg:gap-6 items-center w-full mt-12">
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
              couvrez nos projets en cour
            </Button>
          </div>
        </Container>
      </div>

      {/* Section 4 - Projects */}
      <div className="bg-green-light">
        <Container className="lg:py-25 py-12">
          <SectionHeading
            subheading={projectSection.sectionHeading.subHeading}
            heading={projectSection.sectionHeading.heading}
            description={projectSection.sectionHeading.description}
            subheadingClassName="text-red-main"
            headingClassName="mb-0"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {projectSection.cards.map((card) => (
              <div key={card.id}>
                {/* 
                  Cast or ensure SadqahProjectCard matches CardDataSq. 
                  SadqahProjectCard has extra props or slightly different props.
                  CardWithTerbtn expects CardDataSq which allows specific variants.
                  SadqahProjectCard sets variant to 'campaign', CardDataSq expects 'event'.
                  We need to careful with types or cast.
                  However, looking at CardWithTerbtn it just renders what is passed.
                  Let's check SadqahProjectCard definition.
                  It has variant: "campaign". CardDataSq likely has variant: "event" | "campaign" (checked mock data).
                  mockSliderData shows CardDataSq is used for mockEventCards2 which are 'event'. 
                  But mockCampaignCards are 'campaign'. 
                  CardDataSq definition (from usage) seems to support both or shared.
                  We will cast to any to avoid strict type mismatch if minor diffs exist, or assume compatibility.
                  The mapper sets variant to 'campaign'.
                 */}
                <CardWithTerbtn card={card as any} />
              </div>
            ))}
          </div>
        </Container>
      </div>

      {/* Section 5 - Premier/Timeline Section */}
      <div className="bg-white">
        <Container className="">
          <div className="flex lg:flex-row md:flex-col flex-col">
            {/* left */}
            <div className="flex flex-col justify-center lg:py-25 py-6 w-full lg:w-1/2">
              <SectionHeading
                subheading={premierSection.sectionHeading.subHeading}
                heading={premierSection.sectionHeading.heading}
                description={premierSection.sectionHeading.description}
                subheadingClassName="text-red-main"
                headingClassName="mb-0 type-h2 !leading-[64px] mt-2"
                align="left"
              />

              {/* Timeline Items */}
              {premierSection.list.map((item, index) => {
                const isLast = index === premierSection.list.length - 1;

                return (
                  <div className="flex gap-6 relative" key={item.id}>
                    {/* Timeline Graphic Column */}
                    <div className="flex flex-col items-center">
                      {/* Outer Circle */}
                      <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 z-10 bg-red-main/10">
                        {/* Inner Dot */}
                        <div className="w-2.5 h-2.5 rounded-full bg-red-dark"></div>
                      </div>

                      {/* Vertical Line */}
                      {!isLast && (
                        <div className="w-[2px] bg-red-main/20 grow "></div>
                      )}
                    </div>

                    {/* Content Column */}
                    <div className="pb-10 flex flex-col gap-1 pt-1">
                      <p className="text-red-main type-body-3 font-semibold">
                        {item.period}
                      </p>
                      <h6 className="type-h6 uppercase leading-tight">
                        {item.title}
                      </h6>
                      <p className="type-body-3 text-grey-dark">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* right */}
            <div className="lg:w-1/2 w-full lg:min-h-full">
              <Image
                src={premierSection.image.url || Sqleft}
                alt={premierSection.image.alt || "Timeline Left"}
                width={500}
                height={300}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </Container>
      </div>

      {/* Section 6 - Why Choose Us */}
      <Container className="py-12 lg:py-25 ">
        <SectionHeading
          subheading={whyDonateSection.sectionHeading.subHeading}
          heading={whyDonateSection.sectionHeading.heading}
          description={whyDonateSection.sectionHeading.description}
          headingClassName="mb-0"
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {whyDonateSection.cards.map((card) => (
            <div
              key={card.id}
              className="border border-grey-divider rounded-lg px-8 py-6 flex flex-col gap-8 bg-white items-start"
            >
              <Image src={card.icon} alt="img" width={48} height={48} />
              <div className="flex flex-col gap-4 items-start w-full">
                <h6 className="type-h6 uppercase">{card.title}</h6>
                <p className="type-body-2 text-grey-grey">{card.description}</p>

                {/* Separator and Stats */}
                {(card.statValue || card.statLabel) && (
                  <div className="w-full pt-4 border-t border-grey-divider mt-auto">
                    {card.statValue && (
                      <h5 className="type-h5 mb-1 text-grey-black">
                        {card.statValue}
                      </h5>
                    )}
                    {card.statLabel && (
                      <p className="type-body-3 text-grey-grey">
                        {card.statLabel}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>

      {/* Section 7 - Call To Action */}
      <div className="bg-green-surface lg:py-25 py-12 flex flex-col gap-12">
        <Container>
          <SectionHeading
            heading={ctaSection.sectionHeading.heading}
            // using description from API, sometimes subheading is used for "Over 2.4 Million" etc.
            subheading={ctaSection.sectionHeading.subHeading}
            description={ctaSection.sectionHeading.description}
            subheadingClassName="text-green-dark type-caption-1 text-5xl lg:text-[100px]! font-normal mb-2 lg:mb-0"
            headingClassName="mb-6 text-3xl lg:text-5xl"
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
              href={ctaSection.cta.link}
            >
              {ctaSection.cta.text}
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
              href={ctaSection.secondaryCta.link}
            >
              {ctaSection.secondaryCta.text}
            </Button>
          </div>
        </Container>
      </div>

      {/* FAQ Section */}
      <FaqSection faqs={faqs} sectionHeading={faqSectionHeading} />
    </div>
  );
};

export default Sadaqah;
