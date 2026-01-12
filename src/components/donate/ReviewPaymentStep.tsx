"use client";
import React from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setPaymentMethod, PaymentMethod } from "@/store/slices/donationSlice";
import { cn } from "@/lib/utils";
import Image from "next/image";

const ReviewPaymentStep = () => {
  const { userDetails, isLoading, paymentMethod } = useAppSelector(
    (state) => state.donation
  );
  const { items: cartItems, totalAmount } = useAppSelector(
    (state) => state.cart
  );
  const dispatch = useAppDispatch();

  // Handle payment method selection
  const handleSelectPaymentMethod = (method: PaymentMethod) => {
    dispatch(setPaymentMethod(method));
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-2 pb-2 lg:px-12 md:px-6 px-4">
        <h5 className="type-h5 uppercase font-black tracking-tight">
          PAYMENT DETAILS
        </h5>
        <p className="md:type-body-2 type-body-4 text-grey-grey">
          Choose how you'd like to contribute
        </p>
      </div>
      <div className="w-full h-[2px] bg-grey-divider" />

      <div className="flex flex-col md:flex-row gap-6 pt-6 lg:px-12 md:px-6 px-4">
        {/* Left: Payment Methods */}
        <div className="flex-1 flex flex-col gap-4">
          {/* TWINT Option */}
          <button
            onClick={() => handleSelectPaymentMethod("twint")}
            disabled={isLoading}
            className={cn(
              "w-full py-4 px-5 rounded-xl border-2 flex justify-between items-center transition-all",
              paymentMethod === "twint"
                ? "border-primary bg-white"
                : "border-grey-divider bg-white hover:border-grey-grey"
            )}
          >
            <div className="flex items-center gap-3">
              {/* Radio indicator */}
              <div
                className={cn(
                  "w-5 h-5 rounded-full border flex items-center justify-center ",
                  paymentMethod === "twint"
                    ? "border-2 border-primary"
                    : "border-grey-grey"
                )}
              >
                <div
                  className={cn(
                    "w-2.5 h-2.5 rounded-full transition-all",
                    paymentMethod === "twint"
                      ? " bg-primary"
                      : "border border-grey-grey"
                  )}
                />
              </div>
              <span className="type-btn-2 uppercase tracking-widest text-grey-grey">
                TWINT
              </span>
            </div>
            {/* Twint Logo - user will add the image */}
            <Image
              src="/Icons/Twint.svg"
              alt="TWINT"
              width={40}
              height={40}
              className="h-8 w-auto object-contain"
            />
          </button>

          {/* Other Payment Methods Option */}
          <button
            onClick={() => handleSelectPaymentMethod("other")}
            disabled={isLoading}
            className={cn(
              "w-full py-4 px-5 rounded-xl border-2 flex flex-col transition-all",
              paymentMethod === "other"
                ? "border-primary bg-white"
                : "border-grey-divider bg-white hover:border-grey-grey"
            )}
          >
            <div className="flex flex-wrap items-center gap-3 w-full">
              {/* Radio indicator */}
              <div
                className={cn(
                  "w-5 h-5 rounded-full border flex items-center justify-center ",
                  paymentMethod === "other"
                    ? "border-2 border-primary"
                    : "border-grey-grey"
                )}
              >
                <div
                  className={cn(
                    "w-2.5 h-2.5 rounded-full transition-all",
                    paymentMethod === "other"
                      ? "bg-primary"
                      : "border border-grey-grey"
                  )}
                />
              </div>
              <span className="type-btn-2 uppercase tracking-widest text-grey-grey md:text-left text-center">
                OTHER PAYMENT METHODS
              </span>
            </div>
            {/* Payment logos grid */}
            <div className="flex flex-wrap items-center gap-3 mt-4 ml-8">
              <Image
                src="/Icons/Visa.svg"
                alt="Visa"
                width={48}
                height={30}
                className="h-6 w-auto object-contain"
              />
              <Image
                src="/Icons/Mastercard.svg"
                alt="Mastercard"
                width={40}
                height={30}
                className="h-6 w-auto object-contain"
              />
              <Image
                src="/Icons/Postfinance.svg"
                alt="PostFinance"
                width={80}
                height={30}
                className="h-6 w-auto object-contain"
              />
              <Image
                src="/Icons/Google-pay.svg"
                alt="Google Pay"
                width={60}
                height={40}
                className="h-6 w-auto object-contain"
              />
              <Image
                src="/Icons/Apple-pay.svg"
                alt="Apple Pay"
                width={60}
                height={30}
                className="h-6 w-auto object-contain"
              />
              <Image
                src="/Icons/Samsung-wallet.svg"
                alt="Samsung Wallet"
                width={100}
                height={40}
                className="h-8 w-auto object-contain"
              />
            </div>
          </button>
        </div>

        {/* Right: Summary */}
        <div className="flex-1 md:pl-6 pl-0 border-0 md:border-l border-grey-divider">
          <p className="type-body-2 font-bold! text-grey-black mb-4">
            Summary of your donation
          </p>
          <div className="flex flex-col gap-2 mb-8">
            <div className="flex flex-col gap-2">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center type-body-2 text-grey-grey"
                >
                  <span className="uppercase">{item.name}</span>
                  <span className="font-bold">${item.amount}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center type-body-2 text-grey-grey">
              <span>Total</span>
              <span className="font-bold">${totalAmount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewPaymentStep;
