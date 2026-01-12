import React from "react";
import Image from "next/image";
import Container from "@/components/layout/Container";
import { cn } from "@/lib/utils";

export interface SponsorshipDetailsProps {
  topHeading: string;
  mainHeading: string;
  introText: string;
  detailsHeading: string;
  detailsText: string[];
  imageSrc: string | null;
  imageAlt?: string;
  className?: string;
}

export default function SponsorshipDetailsSection({
  topHeading,
  mainHeading,
  introText,
  detailsHeading,
  detailsText,
  imageSrc,
  imageAlt = "Sponsorship Details",
  className,
}: SponsorshipDetailsProps) {
  return (
    <section className={cn("bg-royal py-16 text-grey-white", className)}>
      <Container>
        {/* Top Section */}
        <div className="mb-12">
          <h3 className="type-caption-1 mb-2 text-yellow-main">{topHeading}</h3>
          <h2 className="type-h2 mb-6">{mainHeading}</h2>
          <div className="">
            <p className="type-body-1">{introText}</p>
          </div>
        </div>

        {/* Two Column Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Column: Text */}
          <div className="space-y-6">
            <h3 className="type-h5">{detailsHeading}</h3>
            <div>
              {detailsText.map((text, index) => (
                <p key={index} className="type-body-2">
                  {text}
                </p>
              ))}
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl shadow-lg">
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-grey-bg-dark/20 flex items-center justify-center">
                <p className="text-white/50">No image available</p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
