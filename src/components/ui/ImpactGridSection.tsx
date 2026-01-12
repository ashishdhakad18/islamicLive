import React from "react";
import Container from "@/components/layout/Container";
import SectionHeading from "./SectionHeading";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ImpactGridProps } from "@/types/impactGrid.types";

const ImpactGridSection: React.FC<ImpactGridProps> = ({
  heading,
  subheading,
  description,
  items,
  images,
  className,
}) => {
  return (
    <Container
      className={cn("lg:py-25 py-12", className)}
      childrenClassName="flex flex-col lg:flex-row lg:gap-20 gap-8 items-center"
    >
      <div className="flex flex-col gap-8 lg:gap-12 w-full lg:w-1/2">
        <SectionHeading
          align="left"
          subheading={subheading}
          heading={heading}
          description={description}
          subheadingClassName="mb-3 text-red! type-caption-1! normal-case font-medium italic"
          headingClassName="mb-4 type-h2! uppercase font-black tracking-tight text-grey-black"
          descriptionClassName="type-body-2 text-grey-grey mb-8 max-w-xl"
          className="mb-0!"
          theme="dark"
        />
        <div className="flex flex-col">
          {items.map((card, index) => (
            <div
              key={index}
              className={cn(
                "flex py-10 border-b border-grey-divider last:border-b-0",
                index === 0 && "pt-0",
                "flex-row items-start gap-8"
              )}
            >
              <div
                className={cn(
                  "shrink-0 w-14 h-14 rounded-lg flex items-center justify-center",
                  card.theme === "red" && "bg-red-lighter border border-red/10",
                  card.theme === "green" &&
                    "bg-green-lighter border border-green/10",
                  card.theme === "yellow" &&
                    "bg-yellow-lighter border border-yellow/10",
                  card.theme === "primary" &&
                    "bg-primary-lighter border border-primary/10"
                )}
              >
                {card.icon && (
                  <Image
                    src={card.icon}
                    alt={card.title || "Icon"}
                    width={28}
                    height={28}
                    className="w-7 h-7 object-contain"
                  />
                )}
              </div>
              <div className="flex flex-col gap-2">
                {card.title && (
                  <h4 className="type-h6 uppercase font-bold text-grey-black tracking-wide">
                    {card.title}
                  </h4>
                )}
                <p className="text-grey-grey type-body-2 leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Right Image Grid */}
      <div
        className={cn(
          "w-full lg:w-1/2",
          images.length === 1 ? "flex" : "grid grid-cols-2 gap-4 h-fit"
        )}
      >
        {images.length === 1 ? (
          <div className="relative w-full h-[500px] lg:h-full rounded-2xl overflow-hidden">
            <Image
              src={images[0]}
              alt="Section Image"
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <>
            {images[0] && (
              <div className="relative w-full aspect-square rounded-xl overflow-hidden shadow-sm">
                <Image
                  src={images[0]}
                  alt="Situation 1"
                  fill
                  className="object-cover"
                />
              </div>
            )}
            {images[1] && (
              <div className="relative w-full row-span-2 rounded-xl overflow-hidden shadow-sm aspect-3/4 lg:aspect-auto">
                <Image
                  src={images[1]}
                  alt="Situation 2"
                  fill
                  className="object-cover"
                />
              </div>
            )}
            {images[2] && (
              <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-sm">
                <Image
                  src={images[2]}
                  alt="Situation 3"
                  fill
                  className="object-cover"
                />
              </div>
            )}
            {images[3] && (
              <div className="relative w-full aspect-square rounded-xl overflow-hidden shadow-sm">
                <Image
                  src={images[3]}
                  alt="Situation 4"
                  fill
                  className="object-cover"
                />
              </div>
            )}
            {images[4] && (
              <div className="relative w-full aspect-square rounded-xl overflow-hidden shadow-sm">
                <Image
                  src={images[4]}
                  alt="Situation 5"
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </>
        )}
      </div>
    </Container>
  );
};

export default ImpactGridSection;
