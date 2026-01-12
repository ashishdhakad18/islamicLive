// components/ImageCarousel.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { CarouselData } from "@/types/carousel.types";
import Container from "../layout/Container";
import router from "next/router";

interface ImageCarouselProps {
  data: CarouselData;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
}

export default function ImageCarousel({
  data,
  autoPlay = false,
  autoPlayInterval = 3000,
  className = "",
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const { carouselItems = [] } = data || {};

  /* ------------------------------------
     GUARD: no items
  ------------------------------------ */
  if (!carouselItems.length) {
    return null;
  }

  const activeItem = carouselItems[currentIndex];

  /* ------------------------------------
     SAFE DESTRUCTURING (fix)
  ------------------------------------ */
  const {
    title = "",
    subtitle = "",
    buttonText = "",
    buttonLink = "#",
  } = activeItem || {};

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % carouselItems.length);
  };

  /* ------------------------------------
     Auto-play (unchanged)
  ------------------------------------ */
  useEffect(() => {
    if (!autoPlay || carouselItems.length <= 1) return;

    const interval = setInterval(() => {
      handleNext();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [currentIndex, autoPlay, autoPlayInterval, carouselItems.length]); // eslint-disable-line

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
  };

  /* ------------------------------------
     Scroll to active thumbnail (unchanged)
  ------------------------------------ */
  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const innerWrapper = container.firstElementChild as HTMLElement;
      const activeThumb = innerWrapper?.children[currentIndex] as HTMLElement;

      if (activeThumb && innerWrapper) {
        const containerWidth = container.offsetWidth;
        const thumbLeft = activeThumb.offsetLeft;
        const thumbWidth = activeThumb.offsetWidth;

        container.scrollTo({
          left: thumbLeft - containerWidth / 2 + thumbWidth / 2,
          behavior: "smooth",
        });
      }
    }
  }, [currentIndex]);

  return (
    <div className={`relative w-full h-[88vh] overflow-hidden ${className}`}>
      {/* Main Background Image */}
      <div className="absolute inset-0">
        {carouselItems.map((item, index) => (
          <Image
            key={item.id}
            src={item.url || "/Images/Homepage-Hero-1.png"}
            alt={item.alt}
            fill
            className={`w-full h-full object-cover object-top   transition-opacity duration-700 ease-in-out ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
            priority={index === 0}
          />
        ))}
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-linear-to-t from-black to-transparent backdrop-blur-[2px]" />

      {/* Content Overlay */}
      <Container childrenClassName="relative z-10 h-full flex flex-col justify-end gap-10 md:flex-row md:items-end md:justify-between pb-8">
        <div className="w-full md:w-1/2 mt-20 md:mt-0 md:pr-8">
          <h6 className="text-white type-h6 mb-1 leading-tight">{title}</h6>
          <p className="text-white type-body-2 mb-6 leading-tight">
            {subtitle}
          </p>

          <button
            onClick={() => router.push(buttonLink)}
            className="inline-flex items-center justify-center gap-3 type-btn-3 text-primary rounded transition-colors h-8 bg-white px-4 py-2"
          >
            <span className="h-3! mt-px">{buttonText}</span>
            <Image
              src="/Icons/Arrow-right-blue.svg"
              alt="arrow-right"
              width={16}
              height={16}
            />
          </button>
        </div>

        {/* Carousel Section */}
        <div className="md:mt-12 relative w-full md:w-1/2">
          {/* Mobile Indicators */}
          <div className="flex gap-2 mb-8 md:hidden">
            {carouselItems.map((_, index) => (
              <button
                key={index}
                onClick={() => handleThumbnailClick(index)}
                className={`h-1 flex-1 transition-all duration-300 ${
                  currentIndex === index ? "bg-white" : "bg-white/30"
                }`}
              />
            ))}
          </div>

          {/* Desktop Thumbnails */}
          <div
            ref={scrollContainerRef}
            className="hidden md:flex overflow-x-auto scrollbar-hide py-6 w-full"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="flex gap-4 ml-auto">
              {carouselItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => handleThumbnailClick(index)}
                  className={`relative shrink-0 w-24 h-14 md:w-32 md:h-20 lg:w-40 lg:h-24 overflow-hidden  transition-all ${
                    currentIndex === index
                      ? "opacity-100"
                      : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={item.url || "/Images/Homepage-Hero-1.png"}
                    alt={item.alt}
                    fill
                    className="object-cover"
                  />

                  {currentIndex === index && autoPlay && (
                    <div className="absolute inset-0 bg-white/10">
                      <div
                        className="h-full bg-white/20"
                        style={{
                          animation: `progress ${autoPlayInterval}ms linear`,
                          width: "0%",
                        }}
                      />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
