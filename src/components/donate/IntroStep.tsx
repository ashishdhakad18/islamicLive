"use client";
import React from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import Image from "next/image";

const IntroStep = () => {
  const dispatch = useAppDispatch();
  const { labels } = useAppSelector((state) => state.donation.content);

  const points = [
    {
      title: labels.introStepFrequency,
      description: labels.introStepFrequencySub,
      icon: "/Icons/Frequency-primary.svg",
    },
    {
      title: labels.introStepFunds,
      description: labels.introStepFundsSub,
      icon: "/Icons/Frequency-primary.svg",
    },
    {
      title: labels.introStepDetails,
      description: labels.introStepDetailsSub,
      icon: "/Icons/Frequency-primary.svg",
    },
    {
      title: labels.introStepReview,
      description: labels.introStepReviewSub,
      icon: "/Icons/Frequency-primary.svg",
    },
  ];

  return (
    <div className="flex flex-col items-center text-center md:px-8 px-4 lg:px-12">
      <div className="w-full">
        <h4 className="type-h4 uppercase text-left font-black tracking-tight mb-4">
          {labels.introTitle}
        </h4>
        <p className="type-body-2 text-grey-grey text-left mb-12">
          {labels.introSubtitle}
        </p>
      </div>

      <div className="relative w-full mb-4">
        {/* Dotted line connecting icons */}
        <div className="lg:block hidden absolute top-2 left-[12%] right-[12%] h-px z-0">
          <Image
            src="/Images/Dashed-border.svg"
            alt="Dashed Border"
            width={600}
            height={58}
          />
        </div>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 relative">
          {points.map((point, index) => (
            <div
              key={index}
              className="flex flex-row lg:flex-col items-center lg:items-center gap-4 lg:gap-6 text-left lg:text-center flex-1"
            >
              <div className="shrink-0 w-16 h-16 rounded-full bg-primary-light flex items-center justify-center relative z-10">
                <Image
                  src={point.icon}
                  alt={point.title}
                  width={28}
                  height={28}
                />
              </div>
              <div className="flex flex-col gap-1 lg:gap-2">
                <h6 className="type-h6 font-black uppercase text-grey-black leading-tight">
                  {point.title}
                </h6>
                <p className="type-body-3 text-grey-grey leading-snug">
                  {point.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IntroStep;
