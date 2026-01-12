// components/SliderCard.tsx
"use client";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Chip } from "./Chip";
import { Button } from "./Button";
import { CardData } from "@/types/slider.types";
import { cn } from "@/lib/utils";

interface SliderCardProps {
  card: CardData;
}

export default function SliderCard({ card }: SliderCardProps) {
  const {
    variant,
    headerImage,
    headerImageAlt,
    imageChip,
    heading,
    subHeading,
    contentChips,
    buttons,
    metadata,
  } = card;

  return (
    <div className="bg-white rounded-md overflow-hidden shadow-card-soft hover:shadow-xl transition-shadow h-full flex flex-col">
      {/* Header Image */}
      <div className="relative w-full h-48 md:h-56">
        <Image
          src={headerImage}
          alt={headerImageAlt}
          fill
          className="object-cover "
        />
        {imageChip && (
          <div className="absolute top-0 left-0 ">
            <span
              className={`text-white text-xs md:text-sm h-8 px-4 py-2 rounded-tl-lg font-bold ${
                imageChip.customColor
                  ? ""
                  : imageChip.color === "bloodRed"
                  ? "bg-(--color-blood-red-dark)"
                  : imageChip.color === "primary"
                  ? "bg-primary"
                  : imageChip.color === "teal"
                  ? "bg-teal"
                  : imageChip.color === "royal"
                  ? "bg-royal"
                  : imageChip.color === "green"
                  ? "bg-green"
                  : imageChip.color === "yellow"
                  ? "bg-yellow"
                  : imageChip.color === "red"
                  ? "bg-red"
                  : imageChip.color === "purple"
                  ? "bg-purple"
                  : "bg-grey"
              }`}
              style={
                imageChip.customColor
                  ? { backgroundColor: imageChip.customColor }
                  : undefined
              }
            >
              {imageChip.label}
            </span>
          </div>
        )}
        {/* {metadata?.location && variant === 'event' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white text-center">
              <p className="text-2xl md:text-3xl font-bold">{metadata.location}</p>
            </div>
          </div>
        )} */}
      </div>

      {/* Card Content */}
      <div className="p-4 md:p-6 flex-1 flex flex-col">
        {/* Content Chips */}
        {contentChips && contentChips.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
            {contentChips.map((chip, index) => (
              <Chip
                key={index}
                label={chip.label}
                color={chip.color || "grey"}
                size="sm"
                variant={chip.variant}
                labelClassName="font-bold! text-btn-4!"
              />
            ))}
          </div>
        )}

        {/* Metadata for Campaign variant */}
        {metadata &&
          (metadata.raised || metadata.goal) &&
          variant === "campaign" && (
            <div className="flex gap-4 mb-3 type-body-2 text-grey-grey">
              {metadata.raised && <span>{metadata.raised}</span>}
              {metadata.goal && <span>{metadata.goal}</span>}
            </div>
          )}

        {/* Heading */}
        <h6 className="type-h6 mb-2 md:mb-4 text-grey-black uppercase">
          {heading}
        </h6>

        {/* Sub Heading */}
        <p className="type-body-2 text-grey-grey mb-2 md:mb-4 flex-1">
          {subHeading}
        </p>

        {/* Date/Time Metadata for Event variant */}
        {metadata &&
          (metadata.date || metadata.time) &&
          variant === "event" && (
            <div className="type-body-4 text-grey-grey flex items-center gap-1 mb-4 md:mb-8">
              <span>{metadata.date}</span>
              <span>|</span>
              <span>{metadata.time}</span>
            </div>
          )}

        {/* Action Buttons */}
      {buttons && buttons.length > 0 && (
  <div className="flex flex-wrap gap-2 mt-auto">
    {buttons.map((button, index) => {
      const isLinkBlueArrow = button.buttonStyle === "link-blue-arrow";

      return (
        <Button
          key={index}
          variant={isLinkBlueArrow ? "ghost" : button.variant || "solid"}
          color={button.color || "primary"}
          onClick={button.onClick}
          href={button.href}
          className={cn(
            "font-semibold w-full type-btn-2 group", // 👈 IMPORTANT
            isLinkBlueArrow &&
              "flex items-center justify-start px-0! hover:bg-white! hover:text-primary!",
            button.className
          )}
          rounded
          size="lg"
          endIcon={
            isLinkBlueArrow ? (
              <ArrowRight
                className="
                  w-5 h-5 text-primary
                  transform -rotate-45
                  transition-transform duration-300 ease-out
                  group-hover:rotate-0
                  group-hover:translate-x-1
                "
              />
            ) : (
              <Image
                src="/Icons/Arrow-right-black.svg"
                alt="arrow right"
                width={15}
                height={15}
              />
            )
          }
        >
          {button.label}
        </Button>
      );
    })}
  </div>
)}

      </div>
    </div>
  );
}
