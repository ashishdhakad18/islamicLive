// components/ui/ResponseTimelineSection.tsx
"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import Container from "../layout/Container";
import ResponseTimelineCard, { ResponseCardData } from "./ResponseTimelineCard";

interface ResponseTimelineSectionProps {
  cards: ResponseCardData[];
}

const ResponseTimelineSection: React.FC<ResponseTimelineSectionProps> = ({ cards }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      // Calculate progress percentage
      const maxScroll = scrollWidth - clientWidth;
      // Prevent division by zero
      const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
      setScrollProgress(progress);
    }
  };

  return (
    <div className="w-full py-10 md:pb-20  relative">
      {/* Background is grey-bg-dark to make white cards pop, based on screenshot looking like it has depth */}

      <Container>
        {/* Scrollable Container on Mobile, Flex on Desktop */}
        <div className="flex flex-col lg:flex-row relative gap-8 lg:gap-0">

          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex w-full overflow-x-auto pb-8 lg:pb-0 lg:overflow-visible snap-x lg:snap-none gap-6 lg:gap-0  scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {cards.map((card, index) => (
              <React.Fragment key={card.id}>
                {/* Card Item */}
                <div className="snap-center shrink-0 w-[85vw] md:w-[60vw] lg:w-1/3 lg:shrink flex flex-col items-center relative z-10 lg:px-4 first:pl-4 first:lg:pl-0 last:pr-4 last:lg:pr-0">
                  <ResponseTimelineCard data={card} />
                </div>

                {/* Arrow - Only render if not the last item */}
                {index < cards.length - 1 && (
                  <div className="hidden lg:flex flex-col justify-center items-center shrink-0 z-20 relative w-0">
                    {/* Absolute positioning the arrow to sit between the cards */}
                    <div className="w-12 h-12 p-4 bg-white rounded-full flex items-center justify-center z-20 ">

                      <div className="absolute top-1/2 -translate-y-1/2 w-10 h-10 bg-yellow rounded-full flex items-center justify-center z-20 ">
                        <Image
                          src="/Icons/Arrow-right-black.svg"
                          alt="Next Phase"
                          width={32}
                          height={32}
                          className="text-black"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Mobile/Tablet Progress Bar */}
          <div className="w-full lg:hidden block my-2 px-4">
            <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden relative">
              {/* Track Background - mimicking the 'white' part in the screenshot if simpler */}
              <div className="absolute inset-0 bg-primary-surface opacity-30"></div>

              {/* Progress Indicator */}
              <div
                className="absolute top-0 left-0 h-full bg-primary-surface transition-all duration-100 ease-out"
                style={{ width: `${Math.max(15, scrollProgress)}%` }} // Minimum width so it's visible at start
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ResponseTimelineSection;
