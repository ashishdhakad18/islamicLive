import React from "react";
import Image from "next/image";
import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/Button"; // Assuming we have a Button component
import { cn } from "@/lib/utils";

export interface EthicalProgramSectionProps {
  heading: string;
  introText: string;
  guarantees: string[];
  closingText?: string;
  buttonText: string;
  buttonLink: string;
  imageSrc: string | null;
  imageAlt: string;
  className?: string;
}

const EthicalProgramSection: React.FC<EthicalProgramSectionProps> = ({
  heading,
  introText,
  guarantees,
  closingText,
  buttonText,
  buttonLink,
  imageSrc,
  imageAlt,
  className,
}) => {
  return (
    <div className={cn("bg-royal py-16 lg:py-24 text-white", className)}>
      <Container>
        <div className="flex flex-col gap-8 lg:gap-16 items-start">
          {/* Text Content */}

          <h2 className="type-h2 uppercase leading-tight ">{heading}</h2>
          <div className="flex flex-col lg:flex-row gap-10 items-center lg:items-start">
            <div className="w-full lg:w-1/2 flex flex-col gap-8">
              <div className="space-y-6 type-body-2 ">
                <p>{introText}</p>

                <div className="space-y-4">
                  {guarantees.map((item, index) => (
                    <div key={index} className="flex gap-2 items-start">
                      <span>–</span>
                      <p className="flex-1">{item}</p>
                    </div>
                  ))}
                </div>

                <p>{closingText}</p>
              </div>

              <Button
                color="yellow"
                rounded
                href={buttonLink}
                className="mt-4 self-start font-bold uppercase"
                endIcon={
                  <Image
                    src="/Icons/Arrow-right-black.svg"
                    alt="Arrow"
                    width={24}
                    height={24}
                  />
                }
              >
                {buttonText}
              </Button>
            </div>

            {/* Image */}
            <div className="w-full lg:w-1/2 relative h-[400px] lg:h-[600px] rounded-md overflow-hidden">
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
        </div>
      </Container>
    </div>
  );
};

export default EthicalProgramSection;
