import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Container from "@/components/layout/Container";

interface SimpleCardProps {
  heading: string;
  description: string | string[]; // Can be a single string or array of paragraphs
  imageSrc: string;
  imageAlt: string;
  reverse?: boolean; // Option to swap image/text order
  className?: string;
  headingClassName?: string;
  descriptionClassName?: string;
}

const SimpleCard: React.FC<SimpleCardProps> = ({
  heading,
  description,
  imageSrc,
  imageAlt,
  reverse = false,
  className,
  headingClassName,
  descriptionClassName,
}) => {
  const descriptionParagraphs = Array.isArray(description)
    ? description
    : [description];

  return (
    <Container className="h-[928px] ">
      <div
        className={cn(
          "w-full bg-white border-b-8 border-primary flex flex-col lg:flex-row",
          reverse ? "lg:flex-row-reverse" : "",
          className
        )}
      >
        {/* Text Container */}
        <div className="w-full lg:w-1/2 p-8 lg:p-20 flex flex-col justify-center">
          <h2
            className={cn(
              "type-h4 text-grey-black uppercase mb-8 max-w-xl",
              headingClassName
            )}
          >
            {heading}
          </h2>
          <div className={cn("space-y-6 max-w-xl", descriptionClassName)}>
            {descriptionParagraphs.map((paragraph, index) => (
              <p key={index} className="type-body-2 text-grey-grey">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Image Container */}
        <div className="w-full lg:w-[60%] relative min-h-[400px] lg:min-h-auto ">
          {imageSrc && (
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={720}
              height={928}
              className="object-cover w-full h-full"
            />
          )}
        </div>
      </div>
    </Container>
  );
};

export default SimpleCard;
