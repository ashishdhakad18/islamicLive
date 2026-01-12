import React from "react";
import Image from "next/image";
import Container from "@/components/layout/Container";
import { cn } from "@/lib/utils";
import ImpactData from "./ImpactData";
import SectionHeading from "./SectionHeading";
import { Button } from "./Button";
import SocialMediaSection from "./SocialMediaSection";
import LatestNewsCard from "./LatestNewsCard";
import FaqSection from "./FaqSection";
import { impactData3 } from "@/data/impactData";

export interface OrphanFundSectionProps {
  heading: string;
  introText: string;
  points: string[];
  closingText: string;
  imageSrc: string | null;
  imageAlt: string;
  className?: string;
}

const OrphanFundSection: React.FC<OrphanFundSectionProps> = ({
  heading,
  introText,
  points,
  closingText,
  imageSrc,
  imageAlt,
  className,
}) => {
  const newsData = [
    {
      id: 1,
      image: "/Images/mockImages/LatestNews1.png",
      title: "[DUMMY] News Title 1",
      read: "[DUMMY] READ",
      date: "[DUMMY] DATE",
      categories: ["[DUMMY]"],
      link: "#",
    },
    {
      id: 2,
      image: "/Images/mockImages/LatestNews2.png",
      title: "[DUMMY] News Title 2",
      read: "[DUMMY] READ",
      date: "[DUMMY] DATE",
      categories: ["[DUMMY]"],
      link: "#",
    },
    {
      id: 3,
      image: "/Images/mockImages/LatestNews3.png",
      title: "[DUMMY] News Title 3",
      read: "[DUMMY] READ",
      date: "[DUMMY] DATE",
      categories: ["[DUMMY]"],
      link: "#",
    },
  ];

  return (
    <div className="bg-grey-white">
      <Container className={cn("py-12 lg:py-20", className)}>
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 items-center">
          {/* Image */}
          <div className="w-full lg:w-1/2 relative h-[300px] lg:h-[431px] rounded-md overflow-hidden order-last lg:order-first">
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

          {/* Text Content */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            <h2 className="type-h3 uppercase text-grey-black leading-tight">
              {heading}
            </h2>

            <div className="type-body-1 text-grey-grey">
              <p>{introText}</p>

              <div className="">
                {points.map((point, index) => (
                  <div key={index} className="flex gap-2 items-start">
                    <span>–</span>
                    <p className="flex-1">{point}</p>
                  </div>
                ))}
              </div>

              <p>{closingText}</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default OrphanFundSection;
