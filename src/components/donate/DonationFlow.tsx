"use client";
import React, { useEffect, useState, useRef } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
  setStep,
  setDonationStatus,
  setLastDonationSummary,
  setDonationContent,
} from "@/store/slices/donationSlice";
import { hydrateCart, clearCart } from "@/store/slices/cartSlice";
import IntroStep from "./IntroStep";
import FrequencyStep from "./FrequencyStep";
import FundsAmountStep from "./FundsAmountStep";
import ContactDetailsStep from "./ContactDetailsStep";
import ReviewPaymentStep from "./ReviewPaymentStep";
import StatusStep from "./StatusStep";
import DonationSteps from "./DonationSteps";
import DonationNavigation from "./DonationNavigation";
import LoadingOverlay from "./LoadingOverlay";

import { cn } from "@/lib/utils";
import { Button } from "../ui/Button";
import { ArrowRightIcon } from "lucide-react";
import { useDonationLocale } from "@/hooks/useDonationLocale";
import { getDonationContent } from "@/data/donationTranslations";
import { getDonateData } from "@/lib/pages/donate/getDonateData";
import { setBackendData } from "@/store/slices/donationSlice";

const DonationFlow = () => {
  const currentStep = useAppSelector((state) => state.donation.currentStep);
  const frequency = useAppSelector((state) => state.donation.frequency);
  const cartItems = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();
  const locale = useDonationLocale();

  // Set i18n content based on locale and fetch backend data
  useEffect(() => {
    const content = getDonationContent(locale);
    dispatch(setDonationContent(content));

    const fetchBackendData = async () => {
      const data = await getDonateData(locale);
      if (data) {
        dispatch(setBackendData(data));
      }
    };
    fetchBackendData();
  }, [locale, dispatch]);

  // Flag to track if we're returning from a payment (prevents validation redirects)
  const isPaymentReturn = useRef(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Loading state for various operations
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const [loadingSubMessage, setLoadingSubMessage] = useState("");

  // FIRST useEffect: Handle payment return from Payrexx
  // This MUST run and complete before any validation
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paymentStatus = params.get("status");
    const referenceId = params.get("ref");

    if (paymentStatus) {
      // Set flag immediately to prevent validation redirects
      isPaymentReturn.current = true;

      // Show loading while processing payment return
      setIsLoading(true);
      setLoadingMessage("Processing your payment...");
      setLoadingSubMessage("Please wait while we confirm your donation");

      console.log("Payment return detected:", { paymentStatus, referenceId });

      // Restore donation details from localStorage
      const pendingDonation = localStorage.getItem("pendingDonation");
      let donationData = null;

      if (pendingDonation) {
        try {
          donationData = JSON.parse(pendingDonation);
          console.log(
            "Restored donation data from localStorage:",
            donationData
          );

          // Restore to Redux state for status page display
          dispatch(
            setLastDonationSummary({
              items: donationData.items,
              frequency: donationData.frequency,
              totalAmount: donationData.totalAmount,
              transactionId: referenceId || donationData.referenceId,
            })
          );
        } catch (error) {
          console.error("Failed to restore donation data:", error);
        }
      }

      // Handle different payment statuses with a small delay for smooth UX
      setTimeout(() => {
        switch (paymentStatus) {
          case "success":
            dispatch(setDonationStatus("success"));
            dispatch(setStep("status"));
            dispatch(clearCart());
            break;

          case "failed":
            dispatch(setDonationStatus("failed"));
            dispatch(setStep("status"));
            break;

          case "cancel":
            // On cancel, restore cart items if we have them
            // and return to review step
            isPaymentReturn.current = false; // Allow validation for cancel
            dispatch(setStep("review"));
            break;

          default:
            // Unknown status, show as pending
            dispatch(setDonationStatus("pending"));
            dispatch(setStep("status"));
            break;
        }

        // Clear localStorage (keep for cancel to restore cart)
        if (paymentStatus !== "cancel") {
          localStorage.removeItem("pendingDonation");
        }

        // Hide loading
        setIsLoading(false);

        // Clean URL (remove query parameters)
        window.history.replaceState({}, "", window.location.pathname);
      }, 800); // Small delay for smooth transition
    } else {
      // If not returning from payment, hydrate cart from localStorage
      dispatch(hydrateCart());
    }

    // Mark as initialized after payment check
    setIsInitialized(true);
  }, [dispatch]);

  // Handle beforeunload to warn user if cart is not empty
  // useEffect(() => {
  //   const handleBeforeUnload = (e: BeforeUnloadEvent) => {
  //     if (cartItems.length > 0) {
  //       e.preventDefault();
  //       e.returnValue =
  //         "You have items in your donation cart. Are you sure you want to leave?";
  //       return e.returnValue;
  //     }
  //   };

  //   window.addEventListener("beforeunload", handleBeforeUnload);
  //   return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  // }, [cartItems.length]);

  // Validation: Redirect to funds step if cart is empty on details/review steps
  // Skip if returning from payment
  useEffect(() => {
    if (!isInitialized || isPaymentReturn.current) return;

    if (
      (currentStep === "details" || currentStep === "review") &&
      cartItems.length === 0
    ) {
      dispatch(setStep("funds"));
    }
  }, [currentStep, cartItems.length, dispatch, isInitialized]);

  // Validation: Redirect to frequency step if no frequency selected on later steps
  // Skip if returning from payment
  useEffect(() => {
    if (!isInitialized || isPaymentReturn.current) return;

    if (
      (currentStep === "funds" ||
        currentStep === "details" ||
        currentStep === "review") &&
      !frequency
    ) {
      dispatch(setStep("frequency"));
    }
  }, [currentStep, frequency, dispatch, isInitialized]);

  const renderStep = () => {
    switch (currentStep) {
      case "intro":
        return <IntroStep />;
      case "frequency":
        return <FrequencyStep />;
      case "funds":
        return <FundsAmountStep />;
      case "details":
        return <ContactDetailsStep />;
      case "review":
        return <ReviewPaymentStep />;
      case "status":
        return <StatusStep />;
      default:
        return <IntroStep />;
    }
  };

  return (
    <>
      {/* Loading Overlay */}
      <LoadingOverlay
        isVisible={isLoading}
        message={loadingMessage}
        subMessage={loadingSubMessage}
      />

      <div className="w-full bg-grey-lightest py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {currentStep !== "intro" && currentStep !== "status" && (
            <DonationSteps />
          )}
          <div
            className={cn(
              "mt-8",
              currentStep !== "status" &&
                "bg-white rounded-2xl shadow-sm border border-grey-divider py-5 lg:py-10 relative"
            )}
          >
            {renderStep()}
            {currentStep !== "status" && currentStep !== "intro" && (
              <DonationNavigation />
            )}
            {currentStep === "intro" && (
              <div className="flex justify-center ">
                <Button
                  size="lg"
                  onClick={() => dispatch(setStep("frequency"))}
                  rounded
                  color="yellow"
                  endIcon={<ArrowRightIcon />}
                >
                  Start Donation
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DonationFlow;
