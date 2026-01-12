"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Container from "../layout/Container";
import { Button } from "./Button";

interface GenerositySectionProps {
  videoUrl?: string;
  posterImage?: string; // Optional poster image shown before video plays or as fallback
  text?: string;
  buttonText?: string;
  buttonLink?: string;
  backgroundColor?: string;
  className?: string;
}

const GenerositySection: React.FC<GenerositySectionProps> = ({
  videoUrl,
  posterImage = "/Images/ImageWithFallback.png",
  text,
  buttonText,
  buttonLink,
  backgroundColor = "bg-green-lighter",
  className = "",
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlayPause = async () => {
    if (!videoRef.current || videoError) return;

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
          // Ignore AbortError - this happens when pause() is called before play() finishes
          console.log("Video playback interrupted");
        } else if (error.name === "NotSupportedError") {
          // Video format not supported or not a valid video
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

  // Check if we have a valid video URL (not an image)
  const isValidVideo =
    videoUrl && !videoUrl.match(/\.(png|jpg|jpeg|gif|webp|svg)$/i);

  // Show video only if valid video URL and no error
  const showVideo = isValidVideo && !videoError;

  return (
    <div className={`w-full flex flex-col ${className}`}>
      {/* Video/Image Section */}
      <div className="relative w-full h-[300px] lg:h-[650px]">
        {showVideo ? (
          <>
            <video
              ref={videoRef}
              src={videoUrl}
              poster={posterImage}
              className="w-full h-full object-cover"
              onEnded={handleVideoEnded}
              onError={handleVideoError}
              playsInline
            />

            {/* Play/Pause Button Overlay - only show for valid video */}
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
          </>
        ) : (
          // Fallback: Show poster image when video is not available
          posterImage && (
            <Image
              src={posterImage}
              alt="Section background"
              fill
              className="object-cover"
            />
          )
        )}
      </div>

      {/* Bottom Bar */}
      {(text || buttonText) && (
        <Container>
          {/* <div className=""> */}
          <div className="flex flex-col lg:flex-row items-center gap-12 py-12 justify-center px-[50px]">
            {text && (
              <div>
                <h3 className="type-h4 lg:type-h3 uppercase text-grey-black max-w-5xl leading-tight text-center lg:text-left">
                  {text}
                </h3>
              </div>
            )}
            {buttonText && buttonLink && (
              <div>
                <Button
                  color="yellow"
                  href={buttonLink}
                  rounded
                  endIcon={
                    <Image
                      src="/Icons/Arrow-right-black.svg"
                      width={24}
                      height={24}
                      alt="arrow"
                    />
                  }
                  className="shrink-0 whitespace-nowrap w-[275px] h-[48px]"
                >
                  {buttonText}
                </Button>
              </div>
            )}
          </div>
          {/* </div> */}
        </Container>
      )}
    </div>
  );
};

export default GenerositySection;
