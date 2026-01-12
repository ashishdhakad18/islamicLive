"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

interface HeroVisualsProps {
  images: { id: string; url: string | null; alt: string }[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string; // To allow external sizing
}

const HeroVisuals: React.FC<HeroVisualsProps> = ({
  images,
  autoPlay = false,
  autoPlayInterval = 3000,
  className = "",
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play logic
  useEffect(() => {
    if (!autoPlay || images?.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images?.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, images?.length]);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  // const currentImage = images[currentIndex];

  if (!images || images?.length === 0) return null;

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* Images */}
      {images?.map((img, index) => (
        <div
          key={img.id}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          {img.url ? (
            <Image
              src={img.url}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority={index === 0}
            />
          ) : (
            <div className="w-full h-full bg-grey-bg-dark flex items-center justify-center">
              <span className="text-white/20">No Image</span>
            </div>
          )}
        </div>
      ))}

      {/* Mobile Overlay (Gradient) - Visible primarily on mobile as requested, but good for contrast generally */}
      {autoPlay && (
        <div className="absolute inset-x-0 bottom-0 h-32 bg-black/60 z-20 pointer-events-none lg:hidden" />
      )}

      {/* Indicators */}
      {/* If autoplay or multiple images, show indicators */}
      {(images?.length > 1 || autoPlay) && (
        <div className="absolute bottom-0 left-0 w-full z-30 p-6 md:pb-0 pb-12 lg:pb-0 flex flex-col justify-end h-full pointer-events-none">
          {/* Container for the bars */}
          <div className="flex w-full sm:h-32 sm:items-end items-center  gap-2 pointer-events-auto md:items-center justify-center">
            {images?.map((_, index) => {
              const isActive = index === currentIndex;
              // Logic for "finished" vs "unfinished"
              // If user meant cumulative, we'd use index <= currentIndex.
              // Given the screenshot shows only one active, we use standard active check.

              return (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`
                        h-[8px] flex-1 md:flex-none md:w-[80px] rounded-sm transition-colors duration-300
                        ${isActive ? "bg-primary" : "bg-white/60"}
                        `}
                  aria-label={`Go to slide ${index + 1}`}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroVisuals;
