"use client";
import React from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setStep, DonationStep } from "@/store/slices/donationSlice";
import { cn } from "@/lib/utils";
import { ArrowLeftIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const DonationSteps = () => {
  const currentStep = useAppSelector((state) => state.donation.currentStep);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const steps = [
    {
      id: "frequency",
      label: "Frequency",
      icon: "/Icons/Calendar-white.svg",
      inActiveIcon: "/Icons/Calendar-primary.svg",
    },
    {
      id: "funds",
      label: "Funds & Amount",
      icon: "/Icons/Funds-white.svg",
      inActiveIcon: "/Icons/Funds-primary.svg",
    },
    {
      id: "details",
      label: "Login Details",
      icon: "/Icons/User-white.svg",
      inActiveIcon: "/Icons/User-primary.svg",
    },
    {
      id: "review",
      label: "Checkout",
      icon: "/Icons/Review-white.svg",
      inActiveIcon: "/Icons/Review-primary.svg",
    },
  ];

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-grey-divider p-4 flex flex-col justify-between items-center gap-4">
      <div className="w-full flex justify-start border-b border-grey-divider pb-3">
        <button
          onClick={() => router.push("/")}
          className="text-grey-grey type-body-3 hover:text-grey-black text-sm flex items-center gap-2 group"
        >
          <ArrowLeftIcon className="w-4 h-4" /> Back to Home
        </button>
      </div>

      <div className="w-full flex justify-between items-center gap-4">
        {steps.map((step, index) => {
          const isActive = currentStep === step.id;
          const isCompleted = currentStepIndex > index;

          return (
            <div
              key={step.id}
              className="flex md:flex-row flex-col items-center gap-2"
            >
              <div
                className={cn(
                  "md:w-8 md:h-8 w-10 h-10 p-3 md:p-2 rounded-full flex items-center justify-center text-xs font-bold transition-colors",
                  isActive
                    ? "bg-primary text-white"
                    : isCompleted
                    ? "bg-primary text-primary"
                    : "bg-primary-lighter text-grey-grey"
                )}
              >
                <Image
                  src={
                    isActive
                      ? step.icon
                      : isCompleted
                      ? step.icon
                      : step.inActiveIcon
                  }
                  className="md:w-4 md:h-4 w-8 h-8"
                  alt={step.label}
                  width={24}
                  height={24}
                />
              </div>
              <span
                className={cn(
                  "md:text-sm text-xs normal-case tracking-tight transition-colors text-center",
                  isActive ? "font-bold!" : isCompleted ? "font-bold!" : ""
                )}
              >
                <span className="hidden md:inline">{index + 1}. </span>
                {step.label}
              </span>
              {index < steps.length - 1 && (
                <div
                  className={`md:block hidden lg:w-16 w-12 h-px ml-2 ${
                    isCompleted ? "bg-primary" : "bg-grey-divider"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DonationSteps;
