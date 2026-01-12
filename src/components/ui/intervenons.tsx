import React from "react";
import Container from "../layout/Container";
import SectionHeading from "./SectionHeading";
import { cn } from "@/lib/utils";

export interface RegionData {
  regionName: string;
  cards: string[];
}

export interface IntervenonsSectionProps {
  heading: string;
  description: string;
  regions: RegionData[];
  className?: string;
}

const IntervenonsSection: React.FC<IntervenonsSectionProps> = ({
  heading,
  description,
  regions,
  className,
}) => {
  return (
    <section
      className={cn("w-full py-12 md:py-16 bg-primary-lighter", className)}
    >
      <Container>
        <SectionHeading
          heading={heading}
          description={description}
          align="center"
          theme="light"
          headingClassName="text-grey-black"
          descriptionClassName="text-grey-grey mb-8 md:mb-12"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {regions.map((region, index) => (
            <div key={index} className="flex flex-col gap-4 md:gap-6">
              {/* Region Header */}
              <div className="bg-primary-main p-6 md:px-8 md:py-6 text-start shadow-sm rounded-sm">
                <h3 className="type-h5 text-grey-white uppercase mt-1">
                  {region.regionName}
                </h3>
              </div>

              {/* Cards */}
              <div className="flex flex-col gap-4 md:gap-6">
                {region.cards.map((cardText, cardIndex) => (
                  <div
                    key={cardIndex}
                    className="bg-grey-white p-6 md:px-8 md:py-6 rounded-sm shadow-sm hover:shadow-md transition-shadow duration-300 min-h-[220px] h-auto flex flex-col justify-center"
                  >
                    <p className="type-body-2 text-grey-black leading-relaxed">
                      {cardText}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default IntervenonsSection;
