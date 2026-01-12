// components/CardSlider.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import SliderCard from "./SliderCard";
import { SliderProps } from "@/types/slider.types";

export default function CardSlider({
  cards,
  slidesToShow = { mobile: 1, tablet: 2, desktop: 3 },
  autoPlay = false,
  autoPlayInterval = 5000,
  gap = 24,
  className = "",
  minCardWidth = 280, // Minimum width a card should have before reducing slides
}: SliderProps & { minCardWidth?: number }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(slidesToShow.desktop);
  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate slides per view based on breakpoints
  useEffect(() => {
    const calculateSlidesPerView = () => {
      const width = window.innerWidth;

      if (width < 768) {
        setSlidesPerView(slidesToShow.mobile);
      } else if (width < 1024) {
        setSlidesPerView(slidesToShow.tablet);
      } else {
        setSlidesPerView(slidesToShow.desktop);
      }
    };

    // Initial calculation
    calculateSlidesPerView();

    // Add event listener
    window.addEventListener("resize", calculateSlidesPerView);

    return () => {
      window.removeEventListener("resize", calculateSlidesPerView);
    };
  }, [slidesToShow]);

  // Calculate max index
  const maxIndex = Math.max(0, cards.length - slidesPerView);

  // Auto-play logic
  useEffect(() => {
    if (!autoPlay || maxIndex === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [currentIndex, autoPlay, autoPlayInterval, maxIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  // Drag-to-scroll state
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  // Handle drag start
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setDragOffset(0);
  };

  // Handle drag move
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - startX;
    setDragOffset(deltaX);
  };

  // Handle drag end
  const handleMouseUp = () => {
    if (!isDragging) return;

    setIsDragging(false);

    // Determine if we should change slides based on drag distance
    const threshold = 100; // Minimum drag distance to trigger slide change

    if (dragOffset < -threshold) {
      // Dragged left = next slide
      setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
    } else if (dragOffset > threshold) {
      // Dragged right = previous slide
      setCurrentIndex((prev) => Math.max(0, prev - 1));
    }

    setDragOffset(0);
  };

  // Handle mouse leave while dragging
  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp();
    }
  };

  // Handle touch start
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setDragOffset(0);
  };

  // Handle touch move
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const deltaX = currentX - startX;
    setDragOffset(deltaX);
  };

  // Handle touch end
  const handleTouchEnd = () => {
    if (!isDragging) return;

    setIsDragging(false);

    const threshold = 50; // Lower threshold for touch

    if (dragOffset < -threshold) {
      setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
    } else if (dragOffset > threshold) {
      setCurrentIndex((prev) => Math.max(0, prev - 1));
    }

    setDragOffset(0);
  };

  // Calculate transform with drag offset
  const baseTranslateX = `calc(-${currentIndex} * (100% + ${gap}px) / ${slidesPerView})`;
  const dragTranslateX = isDragging ? ` + ${dragOffset}px` : "";
  const translateX = `calc(${baseTranslateX}${dragTranslateX})`;

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* Slider Container */}
      <div
        className="overflow-hidden mb-6"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          cursor: isDragging ? "grabbing" : "grab",
          touchAction: "pan-y",
        }}
      >
        <div
          ref={sliderRef}
          className={`flex ${
            isDragging ? "" : "transition-transform duration-500 ease-in-out"
          }`}
          style={{
            transform: `translateX(${translateX})`,
            gap: `${gap}px`,
            userSelect: "none",
          }}
        >
          {cards.map((card) => (
            <div
              key={card.id}
              style={{
                minWidth: `calc(${100 / slidesPerView}% - ${
                  (gap * (slidesPerView - 1)) / slidesPerView
                }px)`,
              }}
            >
              <SliderCard card={card} />
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Footer */}
      {cards.length > 1 && (
        <div className="flex items-center justify-between gap-8">
          {/* Progress Bar - Continuous Line Style */}
          <div className=" flex-1 h-1 bg-primary-light rounded-full overflow-hidden relative">
            <div
              className="absolute top-0 left-0 h-full bg-primary transition-all duration-300 ease-out"
              style={{
                width: `${((currentIndex + 1) / (maxIndex + 1)) * 100}%`,
              }}
            />
          </div>

          {/* Navigation Buttons */}
          <div className="hidden md:flex gap-2">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="w-10 h-10 flex items-center justify-center bg-white hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white rounded-full cursor-pointer  transition-colors focus:outline-none"
              aria-label="Previous slide"
            >
              <Image
                src="/Icons/Arrow-Left.svg"
                alt="Previous"
                width={20}
                height={20}
                className={currentIndex === 0 ? "opacity-30" : "text-primary"}
              />
            </button>

            <button
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              className="w-10 h-10 flex items-center justify-center bg-white hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-white rounded-full  cursor-pointer transition-colors focus:outline-none"
              aria-label="Next slide"
            >
              <Image
                src="/Icons/Arrow-Right.svg"
                alt="Next"
                width={20}
                height={20}
                className={currentIndex >= maxIndex ? "opacity-30" : ""}
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
