"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { locales } from "@/config/i18n.config";

interface GlobalNewsProps {
  image?: string;
  category?: string;
  date: string;
  title: string;
  description: string;
  link?: string;
  className?: string; // Allow custom styling
  onClick?: () => void;
}

const READ_MORE_MAP: Record<string, string> = {
  en: "READ MORE",
  fr: "EN SAVOIR PLUS",
  de: "WEITERLESEN",
};

const GlobalNews: React.FC<GlobalNewsProps> = ({
  image,
  category = "Global News",
  date,
  title,
  description,
  link = "#",
  className,
  onClick,
}) => {
  const pathname = usePathname();
  const currentLocale =
    locales.find((l) => pathname.startsWith(`/${l}`)) || "en";
  const readMoreText = READ_MORE_MAP[currentLocale] || READ_MORE_MAP.en;

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col bg-grey-white overflow-hidden rounded-md shadow-sm h-full",
        className
      )}
    >
      {/* Image Section */}
      {image && (
        <div
          className={cn(
            "relative w-full aspect-424/300",
            onClick && "cursor-pointer"
          )}
          onClick={handleClick}
        >
          <Image src={image} alt={title} fill className="object-cover" />
        </div>
      )}

      {/* Content Section */}
      <div className="flex flex-col flex-1 gap-6 p-6">
        {/* Meta Header */}
        <div className="flex items-center justify-between">
          <span className="text-red type-caption-3">{category}</span>
          <div className="flex items-center gap-2 text-grey-black">
            <Calendar className="w-5 h-5" />
            <span className="type-body-3 normal-case font-bold!">{date}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="type-h6 text-grey-black  uppercase">{title}</h3>

        {/* Description */}
        <p className="type-body-2 text-grey-grey ">{description}</p>

        {/* Read More Link */}
        <Link
          href={link}
          onClick={handleClick}
          className="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors group mt-auto cursor-pointer"
        >
          <span className="type-btn-2 text-primary">{readMoreText}</span>
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

export default GlobalNews;
