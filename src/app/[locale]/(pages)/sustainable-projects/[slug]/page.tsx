import { notFound } from "next/navigation";
import HeroSection from "@/components/ui/HeroSection";
import ImpactGridSection from "@/components/ui/ImpactGridSection";
import SectionHeading from "@/components/ui/SectionHeading";
import Container from "@/components/layout/Container";
import Image from "next/image";
import FaqSection from "@/components/ui/FaqSection";
import CardSlider from "@/components/ui/CardSlider";
import ImpactStats from "@/components/ui/ImpactStats";
import { Button } from "@/components/ui/Button";
import { getValidLocale } from "@/lib/utils/getValidLocale";
import { getSustainableProjectData } from "@/lib/pages/sustainable-projects/getSustainableProjectData";
import { mapSustainableProjectData } from "@/lib/mappers/sustainableProjects";

const SustainableProjectsSinglePage = async ({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) => {
  const { slug } = await params;
  const locale = await getValidLocale(params);

  const rawData = await getSustainableProjectData(slug, locale);

  if (!rawData) {
    return notFound();
  }

  const project = mapSustainableProjectData(rawData);

  return (
    <>
      <HeroSection
        heading={project.hero.heading}
        description={project.hero.description}
        carouselData={project.hero.carouselData}
        statsData={project.hero.statsData}
        subheading={project.hero.subheading}
        backgroundColor={project.primaryColour}
        buttonLink={project.hero.buttonLink}
        buttonText={project.hero.buttonText}
        buttonClassName="mt-6"
      />
      <ImpactGridSection
        heading={project.impactGrid.heading}
        subheading={project.impactGrid.subheading}
        description={project.impactGrid.description}
        items={project.impactGrid.items}
        images={project.impactGrid.images}
        // className="mt-64 lg:mt-0"
      />

      {(project.mission?.cards?.length ?? 0) > 0 && (
        <div className={`lg:py-25 py-12 ${project.thirdColor}`}>
          <Container className="">
            <SectionHeading
              subheading={project.mission?.sectionHeading?.subHeading || ""}
              heading={project.mission?.sectionHeading?.heading || ""}
              description={project.mission?.sectionHeading?.description || ""}
              className="max-w-auto"
            />
            <div className="flex flex-col lg:flex-row justify-center gap-6">
              {project.mission?.cards.map((item) => (
                <div
                  key={item.id}
                  className="w-full py-6 px-8 flex flex-col items-start gap-8 border border-grey-divider bg-white rounded-lg"
                >
                  <Image
                    src={item.icon || "/Icons/Shield-primary.svg"}
                    alt={item.title}
                    width={48}
                    height={48}
                    className="w-12 h-12 object-contain"
                  />
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
      )}

      {(project.recentProjectSection?.cards?.length ?? 0) > 0 && (
        <Container className="flex flex-col items-stretch py-12 ">
          <SectionHeading
            heading={
              project.recentProjectSection?.sectionHeading?.heading || ""
            }
            subheading={
              project.recentProjectSection?.sectionHeading?.subHeading || ""
            }
            description={
              project.recentProjectSection?.sectionHeading?.description || ""
            }
            subheadingClassName="mb-2"
          />
          <CardSlider
            cards={project.recentProjectSection?.cards || []}
            slidesToShow={{ mobile: 1, tablet: 2, desktop: 3 }}
            gap={24}
          />
        </Container>
      )}

      {/* Next Sections */}

      {project.impactStatsSection && (
        <div className={`${project.thirdColor} w-full`}>
          <ImpactStats data={project.impactStatsSection.data} />

          {project.ctaSection && (
            <div
              className={`lg:py-25 py-12 flex flex-col gap-12 items-center justify-center ${project.secondaryColour}`}
            >
              <SectionHeading
                heading={project.ctaSection.sectionHeading?.heading || ""}
                description={
                  project.ctaSection.sectionHeading?.description || ""
                }
                subheading={project.ctaSection.sectionHeading?.subHeading || ""}
                subheadingClassName="text-green-dark type-caption-1 text-5xl lg:text-[100px]! font-normal mb-2 lg:mb-0"
                headingClassName="mb-4 type-h1"
                descriptionClassName="type-body-2"
                className="mb-0"
              />
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
                href={project.ctaSection.buttonLink}
              >
                {project.ctaSection.buttonText}
              </Button>
            </div>
          )}

          {project.accountabilitySection && (
            <Container className="py-12 lg:py-25 gap-10 flex flex-col">
              <SectionHeading
                subheading={
                  project.accountabilitySection.sectionHeading?.subHeading ||
                  project.accountabilitySection.subHeading
                }
                heading={
                  project.accountabilitySection.sectionHeading?.heading ||
                  project.accountabilitySection.heading
                }
                description={
                  project.accountabilitySection.sectionHeading?.description ||
                  project.accountabilitySection.description
                }
                subheadingClassName=""
                headingClassName=""
                descriptionClassName="type-body-2"
                className="mb-12 max-w-auto"
              />
              <div className="flex flex-col lg:flex-row justify-center gap-6 ">
                {project.accountabilitySection.items.map((item) => (
                  <div
                    key={item.id}
                    className="w-full py-6 px-8 flex flex-col items-start gap-8 bg-white rounded-lg"
                  >
                    <div className="w-12 h-12 p-3 rounded-full bg-primary-lighter">
                      <Image
                        src={item.icon || "/Icons/Dollar-primary.svg"}
                        alt={item.title}
                        width={32}
                        height={32}
                        className="w-6 h-6 object-contain"
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
              {project.accountabilitySection.buttonText && (
                <Button
                  color="yellow"
                  rounded
                  className="w-full lg:w-full mt-10"
                  size="lg"
                  endIcon={
                    <Image
                      src="/Icons/Arrow-right-black.svg"
                      alt="Arrow"
                      width={24}
                      height={24}
                    />
                  }
                  href={project.accountabilitySection.buttonLink}
                >
                  {project.accountabilitySection.buttonText}
                </Button>
              )}
            </Container>
          )}
        </div>
      )}

      {/* {project.faqs && ( */}
      <FaqSection
      // faqs={{
      //   faqs: project.faqs.faqs,
      //   cta: { label: "Load More", action: "/faq" },
      // }}
      // sectionHeading={project.faqs.sectionHeading}
      />
      {/* )} */}
    </>
  );
};

export default SustainableProjectsSinglePage;
