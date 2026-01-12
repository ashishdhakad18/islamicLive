"use client";
import React, { useState, useEffect, useRef } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
  setStep,
  updateFundsSelection,
  clearFundsSelection,
} from "@/store/slices/donationSlice";
import { addItem, removeItem, updateItem } from "@/store/slices/cartSlice";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import AllActionsModal from "./AllActionsModal";
import { toast } from "sonner";
import { validateDonationAmount } from "@/data/donationSchema";

const FundsAmountStep = () => {
  const dispatch = useAppDispatch();
  const {
    causeId: selectedCauseId,
    amount: selectedAmount,
    customAmount,
  } = useAppSelector((state) => state.donation.currentFundsSelection);
  const { content, backendData } = useAppSelector((state) => state.donation);
  const { causes: staticCauses, labels, amounts } = content;

  const causes =
    backendData?.funds?.causes?.length > 0
      ? backendData.funds.causes
      : staticCauses;

  const { items: cartItems, totalAmount } = useAppSelector(
    (state) => state.cart
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amountError, setAmountError] = useState<string | null>(null);
  const [showCartSummary, setShowCartSummary] = useState(false);
  const lastClickRef = useRef<{ id: string; time: number }>({
    id: "",
    time: 0,
  });

  const selectedCause = causes.find(
    (c: any) => c.id === selectedCauseId || c.value === selectedCauseId
  );
  const currentAmount =
    selectedAmount || (customAmount ? parseFloat(customAmount) : 0);

  // Validate amount whenever it changes
  useEffect(() => {
    if (currentAmount > 0) {
      const error = validateDonationAmount(currentAmount);
      setAmountError(error);
    } else {
      setAmountError(null);
    }
  }, [currentAmount]);

  const handleAddToCart = () => {
    if (!selectedCause) {
      toast.error("Please select a cause first");
      return;
    }

    const amount = selectedAmount || parseFloat(customAmount);
    const validationError = validateDonationAmount(amount);

    if (validationError) {
      setAmountError(validationError);
      // toast.error(validationError);
      return;
    }

    // Check if cause already exists in cart
    const existingItem = cartItems.find(
      (item) => item.causeId === selectedCause.id
    );

    if (existingItem) {
      dispatch(
        updateItem({
          causeId: selectedCause.id,
          amount: amount,
        })
      );
    } else {
      dispatch(
        addItem({
          id: Math.random().toString(36).substr(2, 9),
          causeId: selectedCause.id,
          name: selectedCause.name,
          amount: amount,
        })
      );
    }

    // Reset selection
    dispatch(clearFundsSelection());
    setAmountError(null);
  };

  const handleRemoveFromCart = (itemId: string) => {
    const item = cartItems.find((i) => i.id === itemId);
    dispatch(removeItem(itemId));
    // toast.success(`${item?.name} removed from cart`);
  };

  const updateSelection = (updates: any) => {
    dispatch(updateFundsSelection(updates));
  };

  const handleCustomAmountChange = (value: string) => {
    // Allow only numbers and decimal point
    const cleanValue = value.replace(/[^0-9.]/g, "");

    // Prevent multiple decimal points
    const parts = cleanValue.split(".");
    if (parts.length > 2) {
      return;
    }

    // Limit decimal places to 2
    if (parts[1] && parts[1].length > 2) {
      return;
    }

    updateSelection({ customAmount: cleanValue, amount: null });
  };

  const canContinue = cartItems.length > 0;
  const customAmountRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-2 mb-2 md:px-8 px-4 lg:px-12">
        <h5 className="type-h5 uppercase font-black tracking-tight">
          {backendData?.funds?.title || labels.selectFundsTitle}
        </h5>
        <p className="md:type-body-2 type-body-4 text-grey-grey">
          {backendData?.funds?.subtitle || labels.selectFundsSubtitle}
        </p>
      </div>
      <div className="w-full h-[2px] bg-grey-divider" />

      {/* Cause Selection */}
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-4 mb-6 lg:pt-6 pt-3 md:px-8 px-4 lg:px-12">
        {causes.map((cause: any) => {
          const cartItem = cartItems.find((item) => item.causeId === cause.id);
          const isInCart = !!cartItem;

          return (
            <button
              key={cause.id}
              type="button"
              onClick={() => {
                const now = Date.now();
                const isDoubleClick =
                  lastClickRef.current.id === cause.id &&
                  now - lastClickRef.current.time < 300;

                if (isDoubleClick) {
                  dispatch(clearFundsSelection());
                  lastClickRef.current = { id: "", time: 0 }; // Reset
                } else {
                  if (selectedCauseId === cause.id) {
                    // Clicking selected cause again - deselect it
                    dispatch(clearFundsSelection());
                    lastClickRef.current = { id: "", time: 0 };
                  } else {
                    // Selecting a cause
                    const updates: any = { causeId: cause.id };

                    // If it's in cart and we are selecting it, pre-fill its amount
                    if (isInCart && cartItem) {
                      const isPreset = amounts.includes(cartItem.amount);
                      if (isPreset) {
                        updates.amount = cartItem.amount;
                        updates.customAmount = "";
                      } else {
                        updates.amount = null;
                        updates.customAmount = cartItem.amount.toString();
                      }
                    } else {
                      // RESET selection if switching to a fresh cause
                      updates.amount = null;
                      updates.customAmount = "";
                    }

                    updateSelection(updates);
                    lastClickRef.current = { id: cause.id, time: now };
                  }
                }
              }}
              className={cn(
                "p-4 rounded-lg type-h6 border-2 tracking-tight transition-all uppercase relative select-none",
                selectedCauseId === cause.id
                  ? "border-primary bg-primary-lighter text-primary"
                  : isInCart
                  ? "border-grey-divider bg-grey-bg-light text-grey-grey hover:border-grey-grey"
                  : "border-grey-divider hover:border-grey-grey text-grey-grey"
              )}
            >
              <span className="leading-6! h-[20px]">{cause.name}</span>
            </button>
          );
        })}
      </div>

      <div className="flex justify-center mb-12 lg:px-0 md:px-8 px-4">
        <Button
          onClick={() => setIsModalOpen(true)}
          color="royal-blue"
          variant="outline"
          size="lg"
          className="w-full lg:w-1/2 border border-royal-dark"
        >
          {backendData?.funds?.seeAllActionsLabel || labels.seeAllActions}
        </Button>
      </div>

      {/* Amount Selection */}
      <div className="w-full h-[2px] bg-grey-divider" />
      {selectedCauseId && (
        <div className="pt-8 lg:px-12 px-4 md:px-8">
          <div className="flex md:flex-row flex-col justify-start md:justify-between items-center mb-6">
            <div className="md:w-1/2 w-full">
              <h5 className="type-h5 uppercase tracking-tight">
                {backendData?.funds?.chooseAmountTitle ||
                  labels.chooseAmountTitle}
              </h5>
              <p className="type-body-2 text-grey-grey">
                {backendData?.funds?.chooseAmountSubtitle ||
                  labels.chooseAmountSubtitle}
              </p>
            </div>
            <Button
              onClick={handleAddToCart}
              color="primary"
              variant="ghost"
              size="lg"
              rounded
              disabled={!currentAmount || !!amountError}
              className="md:block hidden hover:bg-transparent! hover:text-primary! disabled:opacity-50 disabled:cursor-not-allowed pr-0!"
            >
              {cartItems.some((item) => item.causeId === selectedCauseId)
                ? labels.updateCart
                : labels.addToCart}
            </Button>
          </div>

          {/* Preset Amounts */}
          <div className="flex sm:flex-row flex-col gap-4 mb-6">
            {amounts.map((amt) => (
              <button
                key={amt}
                onClick={() => {
                  updateSelection({ amount: amt, customAmount: "" });
                }}
                className={cn(
                  "flex-1 p-4 border-2 rounded-lg type-h6 tracking-tight transition-all",
                  selectedAmount === amt
                    ? "border-primary bg-primary-lighter text-primary"
                    : "border-grey-divider hover:border-grey-grey text-grey-grey"
                )}
              >
                <span className="h-[24px]">${amt}</span>
              </button>
            ))}
          </div>

          {/* Custom Amount Input */}
          <div
            className={`w-full rounded-lg flex justify-center border-2 cursor-pointer ${
              amountError
                ? "border-red-500"
                : customAmount
                ? "border-primary bg-primary-lighter"
                : "border-grey-divider"
            }`}
            onClick={() => customAmountRef.current?.focus()}
          >
            <input
              ref={customAmountRef}
              type="text"
              inputMode="numeric"
              value={customAmount ? `$ ${customAmount}` : ""}
              placeholder="$ ENTER OTHER AMOUNT"
              onChange={(e) => {
                // Remove the "$ " prefix before processing
                const value = e.target.value.replace(/^\$\s*/, "");
                handleCustomAmountChange(value);
              }}
              className="text-lg font-black text-grey-grey placeholder:text-grey-grey placeholder:font-black outline-none bg-transparent border-none text-center py-4 w-full"
            />
          </div>
        </div>
      )}

      <AllActionsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default FundsAmountStep;
