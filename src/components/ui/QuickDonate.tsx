"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "./Button";
import { cn } from "@/lib/utils";
import Container from "@/components/layout/Container";
import { ArrowRight, ChevronUp } from "lucide-react";
import { donationFormData } from "@/types/donationForm";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setFrequency,
  setStep,
  setBackendData,
} from "@/store/slices/donationSlice";
import { addItem } from "@/store/slices/cartSlice";
import { useDonationLocale } from "@/hooks/useDonationLocale";
import { getDonateData } from "@/lib/pages/donate/getDonateData";

interface QuickDonateProps {
  data?: typeof donationFormData;
  className?: string;
}

const QuickDonate: React.FC<QuickDonateProps> = ({
  data = donationFormData,
  className,
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { content, backendData } = useAppSelector((state) => state.donation);
  const { causes: staticCauses, labels, amounts } = content;
  const locale = useDonationLocale();

  useEffect(() => {
    if (!backendData) {
      const fetchBackendData = async () => {
        try {
          const data = await getDonateData(locale);
          if (data) {
            dispatch(setBackendData(data));
          }
        } catch (error) {
          console.error("Failed to fetch donation data:", error);
        }
      };
      fetchBackendData();
    }
  }, [backendData, dispatch, locale]);

  const causes =
    backendData?.funds?.causes?.length > 0
      ? backendData.funds.causes
      : staticCauses;

  const [selectedFund, setSelectedFund] = useState("");
  const [amount, setAmount] = useState<string>("");
  const [isAmountDropdownOpen, setIsAmountDropdownOpen] = useState(false);
  const [isFundDropdownOpen, setIsFundDropdownOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const amountRef = useRef<HTMLDivElement>(null);
  const fundRef = useRef<HTMLDivElement>(null);

  const selectedCause = causes.find(
    (c: any) => c.id === selectedFund || c.value === selectedFund
  );

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        amountRef.current &&
        !amountRef.current.contains(event.target as Node)
      ) {
        setIsAmountDropdownOpen(false);
      }
      if (fundRef.current && !fundRef.current.contains(event.target as Node)) {
        setIsFundDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDonateNow = () => {
    if (!selectedFund) {
      alert("Please select a fund");
      return;
    }

    const numAmount = parseFloat(amount);
    if (!amount || isNaN(numAmount) || numAmount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    // Default to one-time for quick donate
    dispatch(setFrequency("one-time"));

    // Add item to cart
    dispatch(
      addItem({
        id: Math.random().toString(36).substr(2, 9),
        causeId: selectedFund,
        name: selectedCause?.name || selectedCause?.label || "Donation",
        amount: numAmount,
        frequency: "one-time",
      })
    );

    // Skip steps and go to details
    dispatch(setStep("details"));

    // Navigate to donate page
    router.push("/donate");
  };

  return (
    <div
      className={cn(
        "w-full bg-royal-dark md:py-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 ",
        className
      )}
    >
      <Container className="w-full flex justify-center " childrenClassName="w-full">
        <div className="  flex flex-col md:flex-row items-stretch md:items-center md:justify-between gap-4 md:gap-6 flex-wrap">
          <div className="flex items-center justify-between w-full md:w-auto">
            <div className="text-grey-white type-h5 uppercase tracking-wider font-bold shrink-0">
              QUICK DONATE
            </div>

            <button
              type="button"
              className="md:hidden flex items-center justify-center w-6 h-6 rounded-full bg-yellow text-grey-black hover:bg-yellow-200 transition-colors ml-2"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <ChevronUp
                className={cn(
                  "w-4 h-4 transition-transform duration-200",
                  isExpanded && "rotate-180"
                )}
              />
            </button>
          </div>

          <div
            className={cn(
              "w-full md:w-auto flex flex-col md:flex-row items-stretch md:items-center gap-4 md:gap-6",
              !isExpanded && "hidden md:flex"
            )}
          >
            <div
              className="relative w-full md:w-[220px] lg:w-[280px]"
              ref={fundRef}
            >
              <div
                className={cn(
                  "flex items-center justify-between w-full py-3 bg-grey-white pl-4 pr-4 h-10 rounded-sm cursor-pointer",
                  !selectedFund && "text-grey-inactive"
                )}
                onClick={() => setIsFundDropdownOpen(!isFundDropdownOpen)}
              >
                <span
                  className={cn(
                    "type-btn-2 uppercase truncate select-none",
                    !selectedFund ? "text-grey-inactive" : "text-grey-grey"
                  )}
                >
                  {selectedFund
                    ? causes.find(
                        (c: any) =>
                          c.id === selectedFund || c.value === selectedFund
                      )?.name ||
                      causes.find(
                        (c: any) =>
                          c.id === selectedFund || c.value === selectedFund
                      )?.label
                    : "SELECT A FUND"}
                </span>
                <ChevronUp
                  className={cn(
                    "w-4 h-4 text-grey-black transition-transform shrink-0 ml-2",
                    isFundDropdownOpen && "rotate-180"
                  )}
                />
              </div>

              {isFundDropdownOpen && (
                <div className="absolute bottom-full left-0 w-full  bg-grey-white rounded-sm shadow-xl z-50 border border-grey-divider max-h-60 overflow-y-auto">
                  <button
                    type="button"
                    className={cn(
                      "w-full text-left px-5 py-3 hover:bg-grey-divider transition-colors type-btn-2 uppercase border-b border-grey-divider last:border-0 ",
                      selectedFund === ""
                        ? "text-primary font-bold"
                        : "text-grey-grey"
                    )}
                    onClick={() => {
                      setSelectedFund("");
                      setIsFundDropdownOpen(false);
                    }}
                  >
                    SELECT A FUND
                  </button>
                  {causes.map((cause: any) => (
                    <button
                      key={cause.id || cause.value}
                      type="button"
                      className={cn(
                        "w-full text-left px-5 py-3 hover:bg-grey-divider transition-colors type-btn-2 uppercase border-b border-grey-divider last:border-0",
                        cause.id === selectedFund ||
                          cause.value === selectedFund
                          ? "text-primary font-bold"
                          : "text-grey-grey"
                      )}
                      onClick={() => {
                        setSelectedFund(cause.id || cause.value);
                        setIsFundDropdownOpen(false);
                      }}
                    >
                      {cause.name || cause.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Amount Selection - Custom Combo Box */}
            <div
              className="relative w-full md:w-[220px] lg:w-[280px]"
              ref={amountRef}
            >
              <div className="flex items-center bg-grey-white rounded-sm overflow-hidden py-3 h-10">
                <span className="pl-4 text-grey-grey type-btn-2 font-black">
                  $
                </span>
                <input
                  type="text"
                  className="w-full h-full bg-transparent pl-1 pr-2 text-grey-grey type-btn-2 uppercase focus:outline-none font-black"
                  value={amount}
                  placeholder="ENTER AMOUNT"
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9.]/g, "");
                    // Allow only two decimal places
                    const parts = val.split(".");
                    if (parts[1] && parts[1].length > 2) return;
                    if (parts.length > 2) return;
                    setAmount(val);
                  }}
                  onFocus={() => setIsAmountDropdownOpen(true)}
                />
                <button
                  type="button"
                  className="pr-4 h-full flex items-center justify-center text-grey-black hover:text-royal-blue transition-colors"
                  onClick={() => setIsAmountDropdownOpen(!isAmountDropdownOpen)}
                >
                  <ChevronUp
                    className={cn(
                      "w-4 h-4 transition-transform",
                      isAmountDropdownOpen && "rotate-180"
                    )}
                  />
                </button>
              </div>

              {isAmountDropdownOpen && amounts.length > 0 && (
                <div className="absolute bottom-full left-0 w-full mb-1 bg-grey-white rounded-sm shadow-xl z-50 border border-grey-divider max-h-60 overflow-y-auto">
                  {amounts.map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      className="w-full text-left px-5 py-3 hover:bg-grey-divider transition-colors text-grey-grey type-btn-2 font-black border-b border-grey-divider last:border-0"
                      onClick={() => {
                        setAmount(amt.toString());
                        setIsAmountDropdownOpen(false);
                      }}
                    >
                      ${amt}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Donate Button */}
            <Button
              color="yellow"
              className="shrink-0 w-full md:w-auto rounded-sm py-3 h-10! px-8"
              endIcon={<ArrowRight className="w-5 h-5" />}
              onClick={handleDonateNow}
              rounded={false}
              size="lg"
            >
              DONATE NOW
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default QuickDonate;
