// components/CardWithTerbtn.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { Chip } from "./Chip";
import { CardDataSq } from "@/types/slider.types";

interface CardWithTerbtnProps {
  card: CardDataSq;
  hideChips?: boolean;
}

export default function CardWithTerbtn({
  card,
  hideChips = false,
}: CardWithTerbtnProps) {
  const {
    variant,
    headerImage,
    headerImageAlt,
    imageChip,
    heading,
    subHeading,
    contentChips,
    link,
  } = card;

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow h-full flex flex-col border border-gray-200">
      {/* Header Image */}
      <div className="relative w-full h-48 md:h-56">
        <Image
          src={headerImage}
          alt={headerImageAlt}
          fill
          className="object-cover"
        />

        {imageChip && (
          <div className="absolute top-0 left-0">
            <span
              className="text-white text-xs md:text-sm h-8 px-4 py-2 rounded-tl-lg font-bold bg-primary"
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
      </div>

      {/* Content */}
      <div className="p-4 md:p-6 flex-1 flex flex-col">
        {/* Chips */}
        {!hideChips && contentChips?.length ? (
          <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
            {contentChips.map((chip, index) => (
              <Chip
                key={index}
                label={chip.label}
                color={chip.color || "grey"}
                size="sm"
                variant={chip.variant}
                labelClassName="font-bold!"
              />
            ))}
          </div>
        ) : null}

        {/* Heading */}
        <h6 className="type-h6 mb-4 text-grey-black leading-5!">{heading}</h6>

        {/* Subheading */}
        <p className="type-body-2 text-grey-grey mb-6 flex-1">{subHeading}</p>

        {/* CTA LINK – always at bottom */}
        {link && (
          <Link
            href={link.href}
            className="type-btn-1 text-primary-main uppercase flex items-center gap-2 mt-auto py-3"
          >
            <span className="h-[18px]">{link.label}</span>

            {/* {link.icon && ( */}
            <Image
              src="/Icons/Arrow-right-blue.svg"
              alt=""
              width={16}
              height={16}
            />
            {/* )} */}
          </Link>
        )}
      </div>
    </div>
  );
}
