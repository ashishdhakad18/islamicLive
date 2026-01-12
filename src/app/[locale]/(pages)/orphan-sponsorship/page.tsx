import HeroSection from "@/components/ui/HeroSection";
import Container from "@/components/layout/Container";
import ImpactStats from "@/components/ui/ImpactStats";
import SponsorshipDetailsSection from "@/components/ui/SponsorshipDetailsSection";
import WhySponsorSection from "@/components/ui/WhySponsorSection";
import EthicalProgramSection from "@/components/ui/EthicalProgramSection";
import OrphanFundSection from "@/components/ui/OrphanFundSection";
import SectionHeading from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { impactData3 } from "@/data/impactData";
import ImpactData from "@/components/ui/ImpactData";
import SocialMediaSection from "@/components/ui/SocialMediaSection";
import LatestNewsCard from "@/components/ui/LatestNewsCard";
import FaqSection from "@/components/ui/FaqSection";
import { getOrphanSponsorshipData } from "@/lib/pages/orphan-sponsorship/getOrphanSponsorshipData";
import { Locale } from "@/config/i18n.config";

// Keep static news data as fallback/placeholder for now
const newsData = [
  {
    id: 1,
    image: "/Images/mockImages/LatestNews1.png",
    title: "[DUMMY] News Title 1",
    read: "[DUMMY] READ",
    date: "[DUMMY] DATE",
    categories: ["[DUMMY]"],
    link: "#",
  },
  {
    id: 2,
    image: "/Images/mockImages/LatestNews2.png",
    title: "[DUMMY] News Title 2",
    read: "[DUMMY] READ",
    date: "[DUMMY] DATE",
    categories: ["[DUMMY]"],
    link: "#",
  },
  {
    id: 3,
    image: "/Images/mockImages/LatestNews3.png",
    title: "[DUMMY] News Title 3",
    read: "[DUMMY] READ",
    date: "[DUMMY] DATE",
    categories: ["[DUMMY]"],
    link: "#",
  },
];

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function OrphanSponsorship(props: PageProps) {
  const params = await props.params;
  const { locale } = params;
  const data = await getOrphanSponsorshipData(locale as Locale);

  if (!data) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <HeroSection
        backgroundColor="bg-royal-dark"
        {...data.hero}
        // Overrides or additional props if needed (e.g. event handlers)
        buttonClassName="mt-6 font-bold!"
      />

      {/* Quote Section - Replaced by dynamic Hero/Carousel content or kept static if desired. 
          For now, removing the hardcoded quote to rely on Hero data or separate block if mapped. 
          (Mapping didn't explicitly separate a 'Quote' block, so assuming it's part of Hero visuals) 
       */}

      <div className="bg-royal-light ">
        <ImpactStats {...data.impactStats} />
      </div>

      <SponsorshipDetailsSection {...data.sponsorshipDetails} />

      <WhySponsorSection {...data.whySponsor} />

      <EthicalProgramSection {...data.ethicalProgram} />

      <OrphanFundSection {...data.orphanFund} />

      {data.cta && (
        <div className="bg-royal-surface lg:py-25 py-12 flex flex-col gap-12">
          <Container>
            <SectionHeading
              subheading={data.cta.subheading}
              heading={data.cta.heading}
              description={data.cta.description}
              headingClassName="mb-6 text-3xl lg:text-5xl whitespace-normal lg:whitespace-nowrap"
            />
            <div className="flex flex-col lg:flex-row justify-center gap-4 lg:gap-6 items-center w-full">
              <Button
                color="yellow"
                rounded
                href={data.cta.buttonLink}
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
                {data.cta.buttonText}
              </Button>
            </div>
          </Container>
        </div>
      )}

      <ImpactData
        data={
          data.impactData?.stats?.length > 0 ? data.impactData : impactData3
        }
        className="py-[98px] bg-white"
        lineColor="var(--color-green)"
        iconBoxBorderColor="var(--color-green)"
        iconBoxBackgroundColor="var(--color-green-surface)"
        iconColor="var(--color-green)"
      />

      <div className="py-26 bg-primary">
        <Container className="">
          <div className="md:flex md:items-end md:justify-between lg:mb-12">
            <SectionHeading
              heading={data.news?.heading || "actualités"}
              subheading={data.news?.subheading || "Nos actions sur le terrain"}
              description={
                data.news?.description ||
                "Forte de son expertise et de la confiance de millions de personnes à travers le monde."
              }
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
            {(data.news?.cards?.length
              ? data.news.cards
              : newsData.slice(0, 3)
            ).map((card) => (
              <LatestNewsCard
                key={card.id}
                image={card.image || "/Images/mockImages/LatestNews1.png"}
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
            heading={
              data.socialMedia?.heading || "FOLLOW US FOR THE LATEST NEWS"
            }
            subheading={data.socialMedia?.subheading || "Follow Us"}
            subheadingClassName="text-red type-caption-1 normal-case"
            headingClassName=" type-h2 text-grey-black "
            description={
              data.socialMedia?.description ||
              "On our social media, we make our activities visible on a daily basis. Here you can take part of updates from our field offices and share content with your friends and followers!"
            }
            descriptionClassName="type-body-2 text-grey-grey max-w-3xl"
            theme="light"
          />
          <Container>
            <SocialMediaSection posts={data.socialMedia?.posts} />
          </Container>
        </div>
      </div>
      <FaqSection faqs={data.faq} sectionHeading={data.faq?.sectionHeading} />
    </div>
  );
}
