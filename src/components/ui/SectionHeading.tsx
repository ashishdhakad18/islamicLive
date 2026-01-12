import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./Button";
import { ArrowRightIcon } from "lucide-react";

interface SectionHeadingProps {
  heading: string;
  subheading?: string;
  description?: string;
  headingTag?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  align?: "left" | "center" | "right";
  theme?: "dark" | "light";
  className?: string;
  headingClassName?: string;
  subheadingClassName?: string;
  descriptionClassName?: string;
  buttonLink?: string;
  buttonText?: string;
  buttonClassName?: string;
  buttonOnClick?: () => void;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({
  heading,
  subheading,
  description,
  headingTag = "h2",
  align = "center",
  theme = "dark",
  className,
  headingClassName,
  subheadingClassName,
  descriptionClassName,
  buttonLink,
  buttonText,
  buttonClassName,
  buttonOnClick,
}) => {
  const HeadingTag = headingTag;

  const alignmentClasses = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  };

  const themeClasses = {
    dark: {
      heading: "text-grey-black dark:text-white",
      description: "text-grey-grey",
      subheading: "text-red",
    },
    light: {
      heading: "text-white",
      description: "text-grey-grey",
      subheading: "text-yellow",
    },
  };

  const currentTheme = themeClasses[theme];

  return (
    <div
      className={cn(
        "flex flex-col max-w-4xl mx-auto mb-12",
        alignmentClasses[align],
        className
      )}
    >
      {/* Subheading */}
      {subheading && (
        <span
          className={cn(
            "type-caption-1  ",
            currentTheme.subheading,
            subheadingClassName
          )}
        >
          {subheading}
        </span>
      )}

      {/* Main Heading */}
      <HeadingTag
        className={cn(
          "type-h2 uppercase ",
          currentTheme.heading,
          headingClassName
        )}
      >
        {heading}
      </HeadingTag>

      {/* Description */}
      {description && (
        <p
          className={cn(
            "type-body-2 text-wrap max-w-lg md:max-w-full leading-4",
            currentTheme.description,
            descriptionClassName
          )}
        >
          {description}
        </p>
      )}
      {buttonLink && (
        <Button
          className={buttonClassName}
          href={buttonLink}
          endIcon={<ArrowRightIcon width={20} height={20} />}
          variant="solid"
          color="yellow"
          rounded
          onClick={buttonOnClick}
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
};

export default SectionHeading;
