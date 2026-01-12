import Container from "@/components/layout/Container";
import CardSlider from "@/components/ui/CardSlider";
import ImageCarousel from "@/components/ui/ImageCarousel";
import ImpactData from "@/components/ui/ImpactData";
import Linkcard from "@/components/ui/Linkcard";
import SectionHeading from "@/components/ui/SectionHeading";
import Testimonials from "@/components/ui/Testimonials";
import FaqSection from "@/components/ui/FaqSection";
import { mockCampaignCards, mockEventCards } from "@/data/mockSliderData";
import { linkcardData } from "@/types/linkCards";
import Image from "next/image";
import NewsSection from "@/components/Homepage/NewsSection";
import { Button } from "@/components/ui/Button";
import ImpactStats from "@/components/ui/ImpactStats";
import DonationFormPage from "@/components/ui/DonationFormPage";
import SocialMediaSection from "@/components/ui/SocialMediaSection";
import StickyQuickDonate from "@/components/ui/StickyQuickDonate";
import { getHomePageData } from "@/lib/pages/homepage/getHomePageData";

import {
  mapCarouselData,
  mapImpactData,
  mapImpactStats,
  getImpactImage,
  mapSectionHeading,
  mapNewsCards,
  mapSocialMediaPosts,
  mapFaqs,
  mapCampaignCards,
  mapEventCards,
  mapLinkCards,
  mapTestimonialVideos,
  mapFormBGImage,
} from "@/lib/mappers/homepage";
import {
  fallbackCarouselData,
  fallbackImpactData,
  fallbackImpactStats,
  fallbackHeroHeading,
  fallbackCampaignHeading,
  fallbackImpactHeading,
  fallbackTestimonialsHeading,
  fallbackNewsHeading,
  fallbackSocialHeading,
  fallbackImpactImage,
  fallbackFaqHeading,
  fallbackEventHeading,
} from "@/data/homepageFallbacks";
import { Locale, defaultLocale } from "@/config/i18n.config";
import { getValidLocale } from "@/lib/utils/getValidLocale";

interface HomeProps {
  params: Promise<{ locale: string }>;
}

export default async function Home({ params }: HomeProps) {
  const locale = await getValidLocale(params);
  const homePage = await getHomePageData(locale);
  const viewAllStories = {
    en: "View All Stories",
    fr: "Voir toutes les histoires",
    de: "Alle Geschichten anzeigen",
  };
  const viewAll = {
    en: "View All",
    fr: "Voir tout",
    de: "Alle ansehen",
  };

  // Map data with fallbacks
  const carouselData = homePage
    ? mapCarouselData(homePage)
    : fallbackCarouselData;
  const impactDataMapped = homePage
    ? mapImpactData(homePage)
    : fallbackImpactData;
  const impactStatsMapped = homePage
    ? mapImpactStats(homePage)
    : fallbackImpactStats;
  const impactImage = homePage
    ? getImpactImage(homePage) || fallbackImpactImage
    : fallbackImpactImage;

  // Map new data sections
  const newsCardsMapped = homePage ? mapNewsCards(homePage) : [];
  const socialMediaPosts = homePage ? mapSocialMediaPosts(homePage) : [];
  const faqsMapped = homePage
    ? mapFaqs(homePage)
    : { faqs: [], cta: { label: "Load More", action: "/faq" } };
  const campaignCardsMapped = homePage ? mapCampaignCards(homePage) : [];
  const eventCardsMapped = homePage ? mapEventCards(homePage) : [];
  const linkCardsMapped = homePage ? mapLinkCards(homePage) : [];
  const testimonialVideosMapped = homePage
    ? mapTestimonialVideos(homePage)
    : [];
  const formBGImage = homePage ? mapFormBGImage(homePage) : undefined;

  // All section headings now have guaranteed string values
  const heroHeading = mapSectionHeading(
    homePage?.heroSection?.secHeading,
    fallbackHeroHeading
  );
  const campaignSectionHeading = mapSectionHeading(
    homePage?.campaignSection?.sectionHeading,
    fallbackCampaignHeading
  );
  const impactHeading = mapSectionHeading(
    homePage?.impactSection?.sectionHeading,
    fallbackImpactHeading
  );
  const testimonialsData = mapSectionHeading(
    homePage?.testimonials?.sectionHeading,
    fallbackTestimonialsHeading
  );
  const newsSectionHeading = mapSectionHeading(
    homePage?.newsSection?.sectionHeading,
    fallbackNewsHeading
  );
  const socialSectionHeading = mapSectionHeading(
    homePage?.socialMediaSection?.sectionHeading,
    fallbackSocialHeading
  );
  const faqSectionHeading = mapSectionHeading(
    homePage?.FAQSection?.sectionHeading,
    fallbackFaqHeading
  );
  const eventSectionHeading = mapSectionHeading(
    homePage?.eventCardsSection?.sectionHeading,
    fallbackEventHeading
  );

  return (
    <>
      <div
        id="hero"
        className="h-full flex flex-col items-center justify-center  bg-primary dark:bg-primary-dark text-grey-black dark:text-grey-white transition-colors duration-300 pb-[35px]"
      >
        <Container
          className="w-full"
          childrenClassName="flex md:items-center items-start justify-between flex-col sm:flex-row"
        >
          <div className=" sm:py-12 pt-8 sm:border-r border-r-0 sm:border-grey-inactive sm:pr-0 pr-12 sm:flex-1 lg:flex-2 md:w-full">
            <p className="type-caption-1 text-yellow mb-3">
              {heroHeading.subHeading}
            </p>
            <h1 className="type-h1 leading-none! text-grey-white uppercase">
              {heroHeading.heading}
            </h1>
          </div>
          <div className="sm:py-8 pb-8 sm:pl-12 md:text-start type-body-1 text-grey-white sm:flex-1 lg:flex-1">
            {heroHeading.description}
          </div>
        </Container>

        <ImageCarousel
          data={carouselData}
          autoPlayInterval={3000}
          autoPlay={carouselData.carouselItems.length > 1}
        />
      </div>

      <div className="flex justify-center bg-white md:bg-primary-lighter">
        <Container
          className="w-full"
          childrenClassName="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 py-12"
        >
          {(linkCardsMapped.length > 0 ? linkCardsMapped : linkcardData).map(
            (card) => (
              <Linkcard key={card.id} {...card} />
            )
          )}
        </Container>
      </div>

      {/* Sticky QuickDonate - appears after scrolling past hero & linkcard sections */}
      <Container className="">
      <StickyQuickDonate />
      </Container>

      {/* <div className="flex justify-center bg-white"> */}
      <Container className="flex flex-col items-stretch py-12 ">
        <SectionHeading
          heading={campaignSectionHeading.subHeading}
          subheading={campaignSectionHeading.heading}
          description={campaignSectionHeading.description}
          subheadingClassName="mb-2"
        />
        <CardSlider
          cards={
            campaignCardsMapped.length > 0
              ? campaignCardsMapped
              : mockCampaignCards
          }
          slidesToShow={{ mobile: 1, tablet: 2, desktop: 3 }}
          gap={24}
        />
      </Container>
      {/* </div > */}

      <div className="">
        <Container className="flex flex-col items-stretch pt-12 ">
          <SectionHeading
            heading={impactHeading.subHeading}
            subheading={impactHeading.heading}
            description={impactHeading.description}
          />
        </Container>

        <Image
          src={impactImage}
          alt="Impact"
          width={1800}
          height={500}
          className="w-screen h-[60vh] object-cover"
        />

        <ImpactData data={impactDataMapped} />

        <Testimonials
          heading={testimonialsData.subHeading}
          subheading={testimonialsData.heading}
          description={testimonialsData.description}
          thumbnails={
            testimonialVideosMapped.length > 0
              ? testimonialVideosMapped
              : undefined
          }
        />

        {/* <Container> */}

        <ImpactStats data={impactStatsMapped} />

        {/* </Container> */}

        <div className="py-26 bg-primary">
          <Container className="">
            <div className="md:flex md:items-end md:justify-between lg:mb-12">
              <SectionHeading
                heading={newsSectionHeading.heading}
                subheading={newsSectionHeading.subHeading}
                description={newsSectionHeading.description}
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
                {viewAllStories[locale] || viewAllStories.en}
              </Button>
            </div>
            <NewsSection
              newsCards={
                newsCardsMapped.length > 0 ? newsCardsMapped : undefined
              }
              locale={locale}
            />
          </Container>
        </div>

        <div className="md:py-26 py-16">
          <Container>
            <div className="md:flex md:items-end  md:justify-between md:mb-12 mb-8">
              <SectionHeading
                heading={eventSectionHeading.heading}
                subheading={eventSectionHeading.subHeading}
                description={eventSectionHeading.description}
                descriptionClassName="md:ml-0 ml-6"
                align="left"
                className="mx-0 mb-0 flex md:items-start items-center "
              />
              <Button
                color="yellow"
                className="px-12 w-72 hidden lg:flex"
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
                {viewAll[locale] || viewAll.en}
              </Button>
            </div>
            <CardSlider
              cards={
                eventCardsMapped.length > 0 ? eventCardsMapped : mockEventCards
              }
              slidesToShow={{ mobile: 1, tablet: 2, desktop: 3 }}
              gap={16}
            />
          </Container>
        </div>

        <DonationFormPage backgroundImage={formBGImage} />

        <div className="w-full bg-primary-surface py-20">
          <div className="container mx-auto px-4">
            <SectionHeading
              heading={socialSectionHeading.subHeading}
              subheading={socialSectionHeading.heading}
              subheadingClassName="text-red type-caption-1 normal-case"
              headingClassName=" type-h2 text-grey-black "
              description={socialSectionHeading.description}
              descriptionClassName="type-body-2 text-grey-grey max-w-3xl"
              theme="light"
            />
            <Container className="md:px-0!">
              <SocialMediaSection
                posts={
                  socialMediaPosts.length > 0 ? socialMediaPosts : undefined
                }
              />
            </Container>
          </div>
        </div>
        <FaqSection faqs={faqsMapped} sectionHeading={faqSectionHeading} />
      </div>
    </>
  );
}
