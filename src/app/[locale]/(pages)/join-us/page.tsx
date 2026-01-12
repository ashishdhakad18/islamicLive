import HeroSection from "@/components/ui/HeroSection";
import { getJoinUsData } from "@/lib/pages/join-us/getJoinUsData";
import { Locale } from "@/config/i18n.config";
import JoinUsContent from "./JoinUsContent";

interface JoinUsPageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

const JoinUsPage = async ({ params }: JoinUsPageProps) => {
  const { locale } = await params;
  const data = await getJoinUsData(locale);

  if (!data) {
    return null;
  }

  return (
    <div>
      <HeroSection
        backgroundColor="bg-royal"
        heading={data.hero.sectionHeading.heading}
        subheading={data.hero.sectionHeading.subHeading}
        description={data.hero.sectionHeading.description}
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
        autoPlay
      />

      <JoinUsContent data={data} />
    </div>
  );
};

export default JoinUsPage;
