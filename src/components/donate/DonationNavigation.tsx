"use client";
import React, { useState, useMemo } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
  setStep,
  DonationStep,
  updateUserDetails,
  setDonationStatus,
  setLastDonationSummary,
  clearFundsSelection,
  saveDonationDraft,
} from "@/store/slices/donationSlice";
import { addItem, clearCart } from "@/store/slices/cartSlice";
import { Button } from "@/components/ui/Button";
import { ArrowLeftIcon, ArrowRightIcon, Loader2 } from "lucide-react";
import { causes } from "@/data/donationCauses";
import { payrexxService } from "@/lib/services/payrexx.service";
import LoadingOverlay from "./LoadingOverlay";

const DonationNavigation = () => {
  const currentStep = useAppSelector((state) => state.donation.currentStep);
  const frequency = useAppSelector((state) => state.donation.frequency);
  const paymentMethod = useAppSelector((state) => state.donation.paymentMethod);
  const cartItems = useAppSelector((state) => state.cart.items);
  const userDetails = useAppSelector((state) => state.donation.userDetails);
  const { causeId, amount, customAmount } = useAppSelector(
    (state) => state.donation.currentFundsSelection
  );
  const dispatch = useAppDispatch();
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Check if we have prefilled data from localStorage (user has previously entered details)
  // Required fields for prefill check
  const REQUIRED_CONTACT_FIELDS = [
    "civility",
    "fullName",
    "email",
    "phone",
    "address",
    "city",
    "country",
    "postalCode",
  ] as const;

  // Check if we have prefilled data from localStorage (user has previously entered details)
  const hasPrefillData = useMemo(() => {
    return REQUIRED_CONTACT_FIELDS.every((field) => !!userDetails?.[field]);
  }, [userDetails]);

  const isFundsSelectionValid = () => {
    const numericAmount = amount || parseFloat(customAmount);
    return !!causeId && numericAmount > 0;
  };

  if (currentStep === "status") return null;

  const steps: DonationStep[] = [
    "intro",
    "frequency",
    "funds",
    "details",
    "review",
    "status",
  ];
  const currentIndex = steps.indexOf(currentStep);

  const handleBack = () => {
    if (currentIndex > 0) {
      dispatch(setStep(steps[currentIndex - 1]));
    }
  };

  const handleNext = async () => {
    if (currentStep === "intro") {
      dispatch(setStep("frequency"));
    } else if (currentStep === "frequency") {
      dispatch(setStep("funds"));
    } else if (currentStep === "funds") {
      // If there's a valid selection not yet in cart, add it now
      if (isFundsSelectionValid()) {
        const finalAmount = amount || parseFloat(customAmount);
        const cause = causes.find((c) => c.id === causeId);
        if (cause) {
          dispatch(
            addItem({
              id: Math.random().toString(36).substr(2, 9),
              causeId: cause.id,
              name: cause.name,
              amount: finalAmount,
            })
          );
          dispatch(clearFundsSelection());
        }
      }
      dispatch(setStep("details"));
    } else if (currentStep === "details") {
      // When user has prefilled data and clicks Continue, save and proceed
      if (hasPrefillData) {
        dispatch(updateUserDetails(userDetails));
        dispatch(
          saveDonationDraft({
            userDetails: userDetails,
            currentStep: "review",
          })
        );
      }
      dispatch(setStep("review"));
    } else if (currentStep === "review") {
      // Validate cart before payment
      if (cartItems.length === 0) {
        dispatch(setStep("funds"));
        return;
      }

      // Handle payment gateway creation
      setIsProcessingPayment(true);

      try {
        // Calculate total amount
        const totalAmount = cartItems.reduce(
          (acc, curr) => acc + curr.amount,
          0
        );

        // Validate total amount
        if (totalAmount <= 0) {
          dispatch(setStep("funds"));
          return;
        }

        // Save donation summary before redirect
        dispatch(
          setLastDonationSummary({
            items: cartItems.map((item) => ({
              name: item.name,
              amount: item.amount,
            })),
            frequency,
            totalAmount,
          })
        );

        // Generate reference ID for tracking
        const timestamp = Date.now();
        const random = Math.random().toString(36).substring(2, 8).toUpperCase();
        const referenceId = `DON-${timestamp}-${random}`;

        // Store donation details in localStorage for recovery after redirect
        const donationBackup = {
          referenceId,
          items: cartItems.map((item) => ({
            name: item.name,
            amount: item.amount,
          })),
          frequency,
          totalAmount,
          timestamp,
        };
        localStorage.setItem("pendingDonation", JSON.stringify(donationBackup));

        // Create payment gateway
        const paymentRequest = {
          amount: totalAmount,
          currency: "CHF",
          referenceId, // Pass referenceId to backend
          paymentMethod, // "twint" or "other"
          donationData: {
            frequency: frequency || "one-time",
            cartItems: cartItems.map((item) => ({
              id: item.id,
              name: item.name,
              amount: item.amount,
              causeId: item.causeId,
            })),
            userDetails: {
              fullName: userDetails.fullName || "",
              email: userDetails.email || "",
              phone: userDetails.phone,
              address: userDetails.address,
              city: userDetails.city,
              country: userDetails.country,
              postalCode: userDetails.postalCode,
            },
          },
        };

        console.log(
          "Payment request data:",
          JSON.stringify(paymentRequest, null, 2)
        );

        const response = await payrexxService.createGateway(paymentRequest);

        if (response.success && response.data?.paymentLink) {
          console.log(
            "Payment gateway created, redirecting to:",
            response.data.paymentLink
          );

          // Show loading overlay and redirect immediately
          setIsRedirecting(true);

          // Redirect to Payrexx payment page using the link from API
          window.location.href = response.data.paymentLink;
        } else {
          throw new Error(response.error || "Failed to create payment");
        }
      } catch (error: any) {
        console.error("Payment error:", error);
        // toast.error(
        //   error.message || "Failed to process payment. Please try again."
        // );

        // Set status to failed
        dispatch(setDonationStatus("failed"));
        dispatch(setStep("status"));
      } finally {
        setIsProcessingPayment(false);
      }
    }
  };

  const isNextDisabled = () => {
    // Frequency step: Must select a frequency
    if (currentStep === "frequency") return !frequency;

    // Funds step: Must have items in cart OR valid selection ready to add
    if (currentStep === "funds") {
      return cartItems.length === 0 && !isFundsSelectionValid();
    }

    // Details step: Form validation handled by form submit
    // Button is type="submit", validation happens in form
    if (currentStep === "details") {
      return false; // Let form validation handle it
    }

    // Review step: Must have items in cart
    if (currentStep === "review") {
      return cartItems.length === 0 || isProcessingPayment;
    }

    return false;
  };

  const nextLabel = () => {
    if (currentStep === "intro") return "START DONATION";
    if (currentStep === "review") return "DONATE NOW";
    return "CONTINUE";
  };

  return (
    <>
      {/* Loading Overlay for payment processing and redirect */}
      <LoadingOverlay
        isVisible={isProcessingPayment || isRedirecting}
        // isVisible={true}
        message={
          isRedirecting ? "Redirecting to Payment" : "Processing Your Donation"
        }
        subMessage={
          isRedirecting
            ? "You will be redirected to complete your payment"
            : "Please wait while we prepare your secure payment"
        }
      />

      <div className="flex sm:flex-row flex-col gap-3 justify-between items-center lg:mt-6 mt-3 w-full md:px-8 px-4 lg:px-12">
        {currentStep !== "intro" ? (
          <Button
            variant="outline"
            color="royal-blue"
            onClick={handleBack}
            startIcon={<ArrowLeftIcon className="w-5 h-5" />}
            size="lg"
            className="uppercase font-black md:w-auto w-full"
          >
            GO BACK
          </Button>
        ) : (
          <div />
        )}

        <Button
          type={
            currentStep === "details" && !hasPrefillData ? "submit" : "button"
          }
          form={
            currentStep === "details" && !hasPrefillData
              ? "donation-contact-form"
              : undefined
          }
          variant="solid"
          color="yellow"
          onClick={
            currentStep !== "details" || hasPrefillData ? handleNext : undefined
          }
          disabled={isNextDisabled() || isProcessingPayment || isRedirecting}
          endIcon={
            isProcessingPayment ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : currentStep !== "review" && currentStep !== "intro" ? (
              <ArrowRightIcon className="w-5 h-5" />
            ) : undefined
          }
          rounded
          size="lg"
          className="px-12 uppercase font-black md:w-auto w-full"
        >
          {isProcessingPayment ? "PROCESSING..." : nextLabel()}
        </Button>
      </div>
    </>
  );
};

export default DonationNavigation;
