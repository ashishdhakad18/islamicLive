"use client";
import React from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
  setStep,
  setFrequency,
  DonationFrequency,
} from "@/store/slices/donationSlice";
import { cn } from "@/lib/utils";
import Image from "next/image";

const FrequencyStep = () => {
  const frequency = useAppSelector((state) => state.donation.frequency);
  const { labels } = useAppSelector((state) => state.donation.content);
  const dispatch = useAppDispatch();

  const options: { label: string; sub: string; value: DonationFrequency }[] = [
    {
      label: labels.frequencyOneTime,
      sub: labels.frequencyOneTimeSub,
      value: "one-time",
    },
    {
      label: labels.frequencyMonthly,
      sub: labels.frequencyMonthlySub,
      value: "monthly",
    },
  ];

  return (
    <div className="flex flex-col">
      <div className="flex flex-col mb-2 md:px-8 px-4 lg:px-12">
        <h5 className="type-h5 uppercase font-black tracking-tight">
          {labels.frequencyTitle}
        </h5>
        <p className="md:type-body-2 type-body-4 text-grey-grey">
          {labels.frequencySubtitle}
        </p>
      </div>
      <div className="w-full h-px bg-grey-divider" />

      <div className="flex flex-col gap-4 md:px-8 px-4 lg:px-12 lg:pt-6 pt-3">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => dispatch(setFrequency(option.value))}
            className={cn(
              "w-full lg:p-6 p-3 lg:px-8 px-4 rounded-xl border-2 flex items-center gap-6 text-left transition-all",
              frequency === option.value
                ? "border-primary-light bg-primary-lighter ring-2 ring-primary"
                : "border-grey-divider hover:border-primary-light hover:bg-grey-lightest"
            )}
          >
            <div
              className={cn(
                "lg:w-16 lg:h-16 w-12 h-12 rounded-full flex items-center justify-center shrink-0",
                frequency === option.value ? "bg-primary" : "bg-grey-divider"
              )}
            >
              {/* Placeholder for icon */}
              <Image
                src="/icons/Frequency-white.svg"
                alt="Frequency"
                width={24}
                height={24}
                className={cn(
                  "transition-all",
                  frequency !== option.value && "brightness-[0.1] opacity-60"
                )}
              />
            </div>
            <div className="flex flex-col gap-1">
              <h6 className="type-h6 font-black uppercase text-grey-black">
                {option.label}
              </h6>
              <p className="type-body-2 text-grey-grey">{option.sub}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FrequencyStep;
