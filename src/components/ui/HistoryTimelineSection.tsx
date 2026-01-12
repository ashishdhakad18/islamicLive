// src/components/ui/HistoryTimelineSection.tsx
"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import Container from "../layout/Container";
import { Button } from "./Button";
import HistoryTimelineItem, { TimelineItemData } from "./HistoryTimelineItem";
import { ArrowLeft, ArrowRight } from "lucide-react";

const HISTORY_DATA: TimelineItemData[] = [
  {
    id: "1",
    year: "1984",
    description:
      "Fondation d'Islamic Relief Worldwide (IRW) à Birmingham, Royaume-Uni.",
    color: "blue",
    position: "top",
  },
  {
    id: "2",
    year: "1986-87",
    description:
      "Premiers grands programmes humanitaires en Afrique de l'Est (Soudan, Éthiopie).",
    color: "teal",
    position: "bottom",
  },
  {
    id: "3",
    year: "1992",
    description:
      "Intervention majeure en Bosnie : reconnaissance internationale importante.",
    color: "purple",
    position: "top",
  },
  {
    id: "4",
    year: "1993",
    description: "IRW obtient le statut consultatif ECOSOC (ONU).",
    color: "green",
    position: "bottom",
  },
  {
    id: "5",
    year: "1994",
    description: "Création d'Islamic Relief Suisse à Bâle.",
    color: "red",
    position: "top",
  },
  {
    id: "6",
    year: "1999",
    description:
      "IRW signe le Code de conduite Croix-Rouge / ONG humanitaires.",
    color: "blue",
    position: "bottom",
  },
];

interface HistoryTimelineSectionProps {
  timelineData?: TimelineItemData[];
}

const HistoryTimelineSection = ({
  timelineData,
}: HistoryTimelineSectionProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Use provided timelineData or fall back to internal HISTORY_DATA
  const displayData = timelineData?.length ? timelineData : HISTORY_DATA;

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const maxScroll = scrollWidth - clientWidth;
      const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
      setScrollProgress(progress);
    }
  };

  // Drag-to-scroll state
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollStart, setScrollStart] = useState(0);

  // Handle drag start
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.clientX);
    setScrollStart(scrollRef.current.scrollLeft);
  };

  // Handle drag move
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;

    const deltaX = e.clientX - startX;
    scrollRef.current.scrollLeft = scrollStart - deltaX;
  };

  // Handle drag end
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Handle mouse leave while dragging
  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      const currentScroll = scrollRef.current.scrollLeft;
      const newScroll =
        direction === "left"
          ? currentScroll - scrollAmount
          : currentScroll + scrollAmount;

      scrollRef.current.scrollTo({
        left: newScroll,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full overflow-hidden lg:overflow-y-hidden">
      {/* Added overflow-y-hidden explicitly for desktop just in case */}

      <div className="relative">
        {/* Scrollable Container */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          className="w-full overflow-x-auto hide-scrollbar pb-8 lg:pb-0"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            cursor: isDragging ? "grabbing" : "grab",
            userSelect: "none",
          }}
        >
          <div className="flex flex-row min-w-max h-[450px] lg:h-[550px] items-center">
            {/* Desktop Axis Line Container - Absolute Center? No, individual items carry segments. */}

            {displayData.map((item, index) => (
              <HistoryTimelineItem
                key={item.id}
                data={item}
                index={index}
                isLast={index === displayData.length - 1}
              />
            ))}

            {/* End Cap for Axis (Green line extension at the end of the last item?) */}
            {/* <div className="hidden lg:block w-24 h-1 bg-green self-center"></div> */}
          </div>
        </div>

        {/* Desktop Navigation & Progress - Inline Style */}
        <div className="flex px-6 md:px-24 items-center gap-6 md:gap-12 mt-8 md:mt-12 w-full">
          {/* Progress Bar Track - Takes available space */}
          <div className="flex-1 h-[4px] bg-primary-lighter relative rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-primary transition-all duration-300"
              style={{ width: `${Math.max(10, scrollProgress)}%` }}
            ></div>
          </div>

          {/* Arrows */}
          <div className="hidden md:flex items-center gap-6 shrink-0">
            <button
              onClick={() => scroll("left")}
              className="text-primary hover:text-primary-dark hover:bg-primary-lighter rounded-full p-2 transition-colors"
            >
              <Image
                src="/Icons/Arrow-left.svg"
                alt="Arrow Left"
                width={24}
                height={24}
              />
            </button>
            <button
              onClick={() => scroll("right")}
              className="text-primary hover:text-primary-dark hover:bg-primary-lighter rounded-full p-2 transition-colors"
            >
              <Image
                src="/Icons/Arrow-right.svg"
                alt="Arrow Right"
                width={24}
                height={24}
              />
            </button>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="flex justify-center mt-12">
          <Button
            endIcon={<ArrowRight className="w-5 h-5" />}
            rounded
            size="lg"
            href="/about"
            color="primary"
            className="uppercase font-bold"
          >
            EN SAVOIR PLUS
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HistoryTimelineSection;
