import React from "react";
import Image from "next/image";
import Container from "@/components/layout/Container";
import { cn } from "@/lib/utils";

export interface WhySponsorSectionProps {
  heading: string;
  introText: string;
  benefits: string[];
  footerText: string;
  imageSrc: string | null;
  imageAlt: string;
  className?: string;
}

const WhySponsorSection: React.FC<WhySponsorSectionProps> = ({
  heading,
  introText,
  benefits,
  footerText,
  imageSrc,
  imageAlt,
  className,
}) => {
  return (
    <div className="bg-grey-white">
      <Container className={cn("py-12 lg:py-20", className)}>
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 items-center">
          {/* Text Content */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            <h2 className="type-h4 uppercase text-grey-black leading-tight">
              {heading}
            </h2>

            <p className="type-body-1 text-grey-grey">{introText}</p>

            <div className="space-y-2">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex gap-2 items-start">
                  <span className="text-grey-grey">–</span>
                  <p className="type-body-1 text-grey-grey flex-1">{benefit}</p>
                </div>
              ))}
            </div>

            <p className="type-body-1 text-grey-grey flex items-center gap-2">
              {footerText}
            </p>
          </div>

          {/* Image */}
          <div className="lg:w-1/2 relative h-[400px] lg:h-[500px] w-full rounded-2xl overflow-hidden">
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-grey-bg-dark flex items-center justify-center">
                <p className="text-grey-grey">No image available</p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default WhySponsorSection;
