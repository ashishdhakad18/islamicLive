"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import SectionHeading from "./SectionHeading";
import { cn } from "@/lib/utils";
import Container from "../layout/Container";

interface VideoThumbnail {
  id: number;
  image: string;
  videoUrl?: string;
  alt: string;
}

interface TestimonialsProps {
  heading?: string;
  subheading?: string;
  description?: string;
  thumbnails?: VideoThumbnail[];
  showPlayButton?: boolean;
}

const defaultThumbnails: VideoThumbnail[] = [
  { id: 1, image: "/Images/Thumbnail.png", alt: "Testimonial 1" },
  { id: 2, image: "/Images/Thumbnail.png", alt: "Testimonial 2" },
  { id: 3, image: "/Images/Thumbnail.png", alt: "Testimonial 3" },
  { id: 4, image: "/Images/Thumbnail.png", alt: "Testimonial 4" },
];

export default function Testimonials({
  heading = "ISLAMIC RELIEF ON THE GROUND",
  subheading = "Impact",
  description = "2024 Restera Gravée Dans L'histoire D'Islamic Relief Suisse Comme Une Année À La Fois Mémorable Et Poignante. Nous Avons Célébré Notre 30° Anniversaire, Mais Dans Un Contexte Global Marqué Par Des Souffrances Immenses.",
  thumbnails = defaultThumbnails,
  showPlayButton = true,
}: TestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const activeThumbnail = thumbnails[activeIndex];
  const videoUrl = activeThumbnail?.videoUrl;
  const posterImage = activeThumbnail?.image;

  // Check if we have a valid video URL (not an image)
  const isValidVideo =
    videoUrl && !videoUrl.match(/\.(png|jpg|jpeg|gif|webp|svg)$/i);

  // Show video only if valid video URL and no error
  const showVideo = isValidVideo && !videoError;

  const togglePlayPause = async () => {
    if (!videoRef.current || videoError || !showVideo) return;

    try {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        await videoRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === "AbortError") {
          console.log("Video playback interrupted");
        } else if (error.name === "NotSupportedError") {
          console.log("Video not available or format not supported");
          setVideoError(true);
        } else {
          console.error("Video playback error:", error);
        }
      }
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
  };

  const handleVideoError = () => {
    setVideoError(true);
  };

  const handleThumbnailClick = (index: number) => {
    // Pause current video when switching thumbnails
    if (videoRef.current && isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
    setVideoError(false); // Reset video error for new video
    setActiveIndex(index);
  };

  return (
    <div className="w-full bg-sun-glow lg:h-[720px]">
      <Container childrenClassName="h-full flex flex-col lg:flex-row pb-12 lg:pb-0">
        {/* Left Section - Yellow Background with Heading */}
        <div className="flex-1 py-12 lg:py-16 lg:pr-12 flex flex-col justify-between items-start gap-8 lg:gap-16">
          <SectionHeading
            heading={heading}
            subheading={subheading}
            description={description}
            align="left"
            subheadingClassName="type-caption-1 text-grey-black mb-3 normal-case"
            className="mx-0"
            headingClassName="leading-[0.90]!"
            descriptionClassName="text-grey-black mt-9 type-body-1"
          />

          {/* Desktop: Circular Video Thumbnails Row */}
          <div className="hidden lg:flex items-center gap-4">
            {thumbnails.length > 1 &&
              thumbnails.map((thumbnail, index) => (
                <button
                  key={thumbnail.id}
                  onClick={() => handleThumbnailClick(index)}
                  className={cn(
                    "relative w-20 h-20 rounded-full overflow-hidden transition-all duration-300 cursor-pointer group",
                    "border-[6px] focus:outline-none",
                    index === activeIndex
                      ? "border-white ring-2 ring-white/30 transform scale-115"
                      : "border-yellow-surface hover:border-white/60"
                  )}
                >
                  <div className="w-full h-full bg-grey-lighter overflow-hidden rounded-full">
                    <Image
                      src={thumbnail.image}
                      alt={thumbnail.alt}
                      fill
                      className={cn(
                        "object-cover transition-all duration-300",
                        index === activeIndex
                          ? "grayscale-0"
                          : "grayscale group-hover:grayscale-0"
                      )}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                      }}
                    />
                  </div>
                </button>
              ))}
          </div>
        </div>

        {/* Right Section - Video/Image Display */}
        <div className="flex-1 w-full flex flex-col gap-8 lg:block relative rounded-tr-md rounded-br-md">
          <div className="relative w-full aspect-4/3 lg:h-full lg:aspect-auto rounded-tr-md rounded-br-md">
            {showVideo ? (
              <>
                <video
                  key={activeIndex}
                  ref={videoRef}
                  src={videoUrl}
                  poster={posterImage}
                  className="w-full h-full object-cover rounded-tr-md rounded-br-md"
                  onEnded={handleVideoEnded}
                  onError={handleVideoError}
                  playsInline
                />

                {/* Play/Pause Button Overlay */}
                {showPlayButton && (
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <button
                      onClick={togglePlayPause}
                      className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
                      aria-label={isPlaying ? "Pause video" : "Play video"}
                    >
                      <Image
                        src={
                          isPlaying
                            ? "/Icons/Pause-Button.svg"
                            : "/Icons/Play-Button.svg"
                        }
                        alt={isPlaying ? "Pause" : "Play"}
                        width={64}
                        height={64}
                      />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <>
                {/* Fallback: Show poster/thumbnail image when video is not available */}
                <Image
                  src={posterImage || "/Images/Homepage-Hero-1.png"}
                  alt={activeThumbnail?.alt || "Video thumbnail"}
                  fill
                  className="object-cover"
                />

                {/* Play Button Overlay for image fallback (non-functional, just visual) */}
                {showPlayButton && videoUrl && (
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <button className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer">
                      <Image
                        src="/Icons/Play-Button.svg"
                        alt="Play"
                        width={64}
                        height={64}
                      />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Mobile: Linear Pagination */}
          <div className="flex lg:hidden justify-center gap-4 w-full mt-4">
            {thumbnails.map((_, index) => (
              <button
                key={index}
                onClick={() => handleThumbnailClick(index)}
                className={cn(
                  "h-1.5 transition-all duration-300",
                  index === activeIndex
                    ? "w-10 bg-primary"
                    : "w-10 bg-(--transparent-white-60,rgba(255,255,255,0.60))"
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
