"use client";

import React, { useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { donationFormData } from "@/types/donationForm";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/store/hooks";
import { setFrequency, setStep, updateFundsSelection } from "@/store/slices/donationSlice";
import { addItem } from "@/store/slices/cartSlice";

interface DonationFormProps {
  data: typeof donationFormData;
}

export default function DonationForm({ data }: DonationFormProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [selectedFund, setSelectedFund] = useState("");
  const [frequency, setFrequencyLocal] = useState("once");
  const [amount, setAmount] = useState<number | string>(
    donationFormData.fields.find(f => f.type === "amount_selector")
      ?.preset_amounts?.[0] || "",
  );
  const [customAmount, setCustomAmount] = useState<number>(0);

  const handleAmountClick = (val: number) => {
    setAmount(val);
    setCustomAmount(val);
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(parseInt(e.target.value));
    setAmount("custom");
  };

  const handleDonateNow = () => {
    // Validate selections
    if (!selectedFund) {
      alert("Please select a fund");
      return;
    }
    
    const finalAmount = amount === "custom" ? customAmount : (amount as number);
    if (!finalAmount || finalAmount <= 0) {
      alert("Please select or enter a valid amount");
      return;
    }

    // Set frequency in Redux
    dispatch(setFrequency(frequency === "once" ? "one-time" : "monthly"));

    // Add item to cart
    dispatch(addItem({
      id: selectedFund,
      name: data.fields.find(f => f.id === "fund")?.options?.find(o => o.value === selectedFund)?.label || "Donation",
      amount: finalAmount,
      frequency: frequency === "once" ? "one-time" : "monthly",
    }));

    // Skip intro, frequency, and funds steps - go directly to details
    dispatch(setStep("details"));

    // Navigate to donate page
    router.push("/donate");
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-sm shadow-md max-w-[412px] h-[560px] text-grey-black">
      {/* Header */}
      <h5 className="type-h5 uppercase  ">{data.title}</h5>
      <p className="type-body-3 font-medium! text-grey-grey ">
        {data.subtitle}
      </p>

      {/* Fields */}
      <div className="space-y-4 mt-8">
        {data.fields.map((field) => {
          if (field.type === "select") {
            return (
              <div key={field.id} className="relative">
                <select
                  className="w-full type-btn-2 uppercase text-grey-grey p-3   rounded-sm appearance-none shadow-sm "
                  value={selectedFund}
                  onChange={(e) => setSelectedFund(e.target.value)}
                >
                  <option value="" disabled>
                    {field.label?.toUpperCase()}
                  </option>
                  {field.options?.map(
                    (opt: { value: string; label: string }) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ),
                  )}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-grey-grey pointer-events-none " />
              </div>
            );
          }

          if (field.type === "toggle") {
            return (
              <div
                key={field.id}
                className="flex rounded-sm overflow-hidden border border-gray-100 mb-6 shadow-sm"
              >
                {field.options?.map((opt: { value: string; label: string }) => (
                  <button
                    key={opt.value}
                    onClick={() => setFrequencyLocal(opt.value)}
                    className={`flex-1 py-3 type-btn-2 uppercase cursor-pointer  ${
                      frequency === opt.value
                        ? "bg-primary-main text-white"
                        : "bg-gray-50 text-gray-800 hover:bg-gray-100"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            );
          }

          if (field.type === "amount_selector") {
            return (
              <div
                key={field.id}
                className="space-y-3 flex flex-col gap-4"
              >
                <div className="grid grid-cols-4 gap-0 rounded-sm overflow-hidden border border-gray-100">
                  {field.preset_amounts?.map((amt: number) => (
                    <button
                      key={amt}
                      onClick={() => handleAmountClick(amt)}
                      className={`py-3 type-btn-2 uppercase border-r border-gray-100 last:border-r-0 cursor-pointer ${
                        amount === amt
                          ? "bg-primary-main text-white"
                          : "bg-gray-50 text-gray-800 hover:bg-gray-100"
                      }`}
                    >
                      $
                      {amt}
                    </button>
                  ))}
                </div>
                {field.allow_custom_amount && (
                  <div className="relative">
                    <span className="absolute left-4 top-[46%] transform -translate-y-1/2 font-bold text-gray-600 ">
                      $
                    </span>
                    <input
                      type="number"
                      placeholder="OTHER AMOUNT"
                      value={customAmount}
                      onChange={handleCustomAmountChange}
                      className={`w-full p-3 pl-8 bg-gray-50 border ${
                        amount === "custom"
                          ? "border-primary-main"
                          : "border-transparent"
                      } rounded-sm type-btn-2 uppercase text-gray-700 focus:outline-none 
                      focus:ring-2 placeholder-gray-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col ">
                      <button onClick={() => setCustomAmount(customAmount + 1)} className="text-grey-grey hover:text-grey-black transition-colors">
                        <FaCaretUp className="w-4 h-4" />
                      </button>
                      <button onClick={() => setCustomAmount(customAmount - 1)} className="text-grey-grey hover:text-grey-black transition-colors">
                        <FaCaretDown className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          }
          return null;
        })}
      </div>

      {/* Actions */}
      <div className="mt-8 space-y-4">
        {data.actions.map((action) => {
          if (action.type === "primary_button") {
            return (
              <button
                key={action.id}
                onClick={handleDonateNow}
                className="w-full type-btn-1 uppercase py-4 bg-[#FFD200]  text-black font-black tracking-wide rounded-sm flex items-center justify-center gap-2 transition-colors cursor-pointer hover:bg-yellow-surface"
              >
                {action.label}
                {action.icon === "arrow-right" && (
                  <ArrowRight className="w-5 h-5" />
                )}
              </button>
            );
          }
          if (action.type === "link") {
            return (
              <div key={action.id} className="text-center">
                <a
                  href="#"
                  className="type-btn-3 text-grey-black uppercase hover:underline tracking-tight"
                >
                  {action.label}
                </a>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}
