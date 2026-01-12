import React from "react";
import { CarouselData } from "@/types/carousel.types";
import { ImpactStatsData } from "@/types/impactStats";
import Container from "../layout/Container";
import SectionHeading from "./SectionHeading";
import HeroVisuals from "./HeroVisuals";
import ImpactStats from "./ImpactStats";
import Breadcrumbs from "./Breadcrumbs";

export interface HeroSectionProps {
  backgroundColor?: string;
  heading: string;
  subheading?: string;
  description?: string;
  heroMsg?: {
    message: string;
    author: string;
  };
  carouselData: CarouselData;
  statsData?: ImpactStatsData;
  theme?: "dark" | "light";
  autoPlay?: boolean;
  buttonLink?: string;
  buttonText?: string;
  buttonClassName?: string;
  subHeadingClassName?: string;
  headingClassName?: string;
  statsBgColor?: string;
  buttonOnClick?: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  backgroundColor = "",
  heading,
  subheading,
  description,
  heroMsg,
  carouselData,
  statsData,
  theme = "light",
  autoPlay = false,
  buttonLink = "",
  buttonText = "",
  buttonClassName = "",
  subHeadingClassName = "",
  headingClassName = "",
  statsBgColor = "bg-red-lighter",
  buttonOnClick,
}) => {
  return (
    <div className={`w-full flex flex-col ${backgroundColor}`}>
      <Container className="w-full " childrenClassName="">
        <Breadcrumbs theme={theme} />
        {/* hero Content */}

        <div className="flex md:flex-col lg:flex-row flex-1 ">
          <div className="lg:pt-10 lg:pb-20 py-10 w-full lg:w-1/2 flex flex-col lg:pr-24 lg:mt-28">
            <SectionHeading
              heading={heading}
              subheading={subheading}
              description={description}
              theme={theme}
              align="left"
              headingTag="h1"
              className="mb-8"
              headingClassName={`mb-0 text-4xl md:text-5xl lg:text-[70px]! leading-tight lg:leading-[80px]! ${
                headingClassName ?? ""
              }`}
              subheadingClassName={`text-yellow font-medium mb-3  text-sm md:text-2xl lg:text-[40px]! ${subHeadingClassName}`}
              descriptionClassName="text-grey-bg-dark type-body-1! text-lg lg:text-[24px]! leading-relaxed lg:leading-[32px]!"
              buttonLink={buttonLink}
              buttonText={buttonText}
              buttonClassName={buttonClassName}
              buttonOnClick={buttonOnClick}
            />
          </div>

          <div className="hidden lg:block w-full lg:w-1/2 min-h-[500px] relative overflow-hidden">
            <HeroVisuals
              images={carouselData.carouselItems}
              autoPlay={autoPlay}
              className="h-full absolute inset-0"
            />
          </div>
        </div>
      </Container>

      {/* Hadith / Quote Section - Centered full width */}
      {heroMsg && (
        <div className="bg-royal-lighter py-12 ">
          <Container>
            <div className="flex flex-col gap-6 max-w-5xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl lg:text-[40px] font-black text-grey-black uppercase leading-tight tracking-tight">
                {heroMsg.message}
              </h2>
              <p className="text-grey-grey text-base md:text-lg lg:text-xl font-medium max-w-3xl mx-auto">
                {heroMsg.author}
              </p>
            </div>
          </Container>
        </div>
      )}

      {/* Mobile Full Width Image */}
      <div className="block lg:hidden w-full h-[500px] relative overflow-hidden">
        <HeroVisuals
          images={carouselData.carouselItems}
          autoPlay={autoPlay}
          className="h-full absolute inset-0"
        />
      </div>
      {statsData && statsData.impactStats.length > 0 && (
        <div className={`${statsBgColor} px-6 md:px-32`}>
          <ImpactStats data={statsData} />
        </div>
      )}
    </div>
  );
};

export default HeroSection;
