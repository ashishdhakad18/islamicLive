"use client";
import React from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { resetDonation, setStep } from "@/store/slices/donationSlice";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import Image from "next/image";

const StatusStep = () => {
  const status = useAppSelector((state) => state.donation.status);
  const dispatch = useAppDispatch();

  const config = {
    success: {
      title: "Donation Successful",
      desc: "Please check your email for confirmation and further instructions about the booking.",
      icon: "/Icons/tick-primary.svg",
      color: "bg-primary-lighter",
      btn: "GO TO HOME",
      secondaryBtn: "DONATE MORE",
      receipt: true,
    },
    failed: {
      title: "Donation Failed",
      desc: "Your donation could not be processed. Please try again or contact support if the issue persists.",
      icon: "/Icons/Failed.svg",
      color: "bg-red-lighter",
      btn: "TRY AGAIN",
      secondaryBtn: null,
      receipt: false,
    },
    pending: {
      title: "Donation Pending",
      desc: "Your donation is being processed. We will notify you via email once it is confirmed.",
      icon: "/Icons/Pending.svg",
      color: "bg-yellow-lighter",
      btn: "GO TO HOME",
      secondaryBtn: null,
      receipt: false,
    },
    idle: {
      title: "",
      desc: "",
      icon: "",
      color: "bg-grey-lightest",
      btn: "",
      secondaryBtn: null,
      receipt: false,
    },
  };

  const currentConfig = config[status];

  const handlePrimary = () => {
    if (status === "failed") {
      dispatch(setStep("review"));
    } else {
      dispatch(resetDonation());
      // In a real app, maybe navigate away
      window.location.href = "/";
    }
  };

  const lastDonationSummary = useAppSelector(
    (state) => state.donation.lastDonationSummary
  );

  return (
    <div className="bg-white py-10 rounded-2xl shadow-sm border border-grey-divider overflow-hidden">
      <div className="flex flex-col gap-2 px-8 pb-3 border-b border-grey-divider">
        <h5 className="type-h5 uppercase font-black tracking-tight">
          DONATION STATUS
        </h5>
        <p className="type-body-2 text-grey-grey">
          Choose how you'd like to contribute
        </p>
      </div>

      <div
        className={cn(
          "p-7 flex flex-col items-center text-center",
          currentConfig.color
        )}
      >
        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 ">
          {/* Icon Placeholder */}
          <Image
            src={currentConfig.icon}
            alt={currentConfig.title}
            width={24}
            height={24}
          />
        </div>
        <h4 className="text-xl font-bold! text-grey-black">
          {currentConfig.title}
        </h4>
        <p className="text-sm text-grey-black mt-2">{currentConfig.desc}</p>
      </div>

      <div className="lg:px-12 px-6 pt-6 flex flex-col items-center gap-8">
        {/* Donation Summary Box */}
        {currentConfig.receipt && lastDonationSummary && (
          <div className="w-full border border-grey-divider rounded-xl p-3 bg-white">
            <div className="flex flex-col gap-3">
              {lastDonationSummary.items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center type-body-3 text-grey-black"
                >
                  <span className="normal-case!">{item.name}</span>
                  <span className="font-bold text-grey-black">
                    ${item.amount}
                  </span>
                </div>
              ))}
              <div className="flex justify-between items-center type-body-3 text-grey-black">
                <span>Total Donation</span>
                <span className="font-bold text-grey-black">
                  ${lastDonationSummary.totalAmount}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="flex md:flex-row flex-col justify-center gap-4 w-full">
          {currentConfig.secondaryBtn && (
            <Button
              variant="outline"
              color="royal-blue"
              className="py-3! px-12 md:w-auto w-full"
              size="lg"
              onClick={() => {
                dispatch(resetDonation());
                dispatch(setStep("funds"));
              }}
            >
              {currentConfig.secondaryBtn}
            </Button>
          )}
          <Button
            variant="solid"
            color="yellow"
            className="py-3! px-12 md:w-auto w-full"
            size="lg"
            rounded
            onClick={handlePrimary}
          >
            {currentConfig.btn}
          </Button>
        </div>

        {currentConfig.receipt && (
          <Button
            variant="ghost"
            color="primary"
            className="py-3! px-12"
            size="lg"
            rounded
            onClick={handlePrimary}
          >
            DOWNLOAD RECEIPT
          </Button>
        )}
      </div>
    </div>
  );
};

export default StatusStep;
