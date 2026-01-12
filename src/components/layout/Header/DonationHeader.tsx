"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setStep } from "@/store/slices/donationSlice";
import { removeItem } from "@/store/slices/cartSlice";
import { useRouter } from "next/navigation";
import { HiOutlineTrash } from "react-icons/hi";
import Container from "../Container";
import { Button } from "@/components/ui/Button";

const DonationHeader = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
      setIsCartOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Auto-open cart only when items are added, not on reload or hydration
  const [isReady, setIsReady] = useState(false);
  const prevItemsLength = useRef(cartItems.length);

  useEffect(() => {
    // Give some time for hydration to complete before enabling auto-open
    const timer = setTimeout(() => {
      setIsReady(false);
      prevItemsLength.current = cartItems.length;
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isReady && cartItems.length > prevItemsLength.current) {
      setTimeout(() => {
        setIsCartOpen(true);
      }, 100);
      setTimeout(() => {
        setIsCartOpen(false);
      }, 2000);
    }
    prevItemsLength.current = cartItems.length;
  }, [cartItems.length, isReady]);

  return (
    <nav className="bg-white relative z-50">
      <Container
        childrenClassName="flex justify-between items-center"
        className="px-6!"
      >
        <Image
          src="/Images/Logo/Primary-logo.svg"
          alt="Logo"
          width={100}
          height={100}
          className="cursor-pointer"
          onClick={() => router.push("/")}
        />
        <div className="flex items-center gap-6 type-body-2 text-grey-grey">
          <p className="lg:block hidden">Do you need help?</p>
          <p className="font-bold lg:block hidden">
            contact@islamic-relief.ch - 022 73 202 73
          </p>
          <div className="relative">
            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="bg-primary-lighter p-2 rounded-full relative hover:bg-primary-lighter/80 transition-colors"
            >
              <Image
                src="/Icons/Cart-primary.svg"
                alt="Cart"
                width={20}
                height={20}
              />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-black w-4 h-4 flex items-center justify-center rounded-full">
                  {cartItems.length}
                </span>
              )}
            </button>

            {/* Cart Summary Overlay */}
            {isCartOpen && (
              <div
                ref={cartRef}
                className="absolute top-full right-0 mt-2 bg-white border border-grey-divider rounded-xl p-6 shadow-2xl z-50 min-w-[320px]"
              >
                <div className="flex flex-col gap-6">
                  <div className="flex justify-between items-center">
                    <h5 className="type-h5 text-[24px]! font-black uppercase text-grey-black origin-left">
                      CHOOSE DONATION AMOUNT
                    </h5>
                  </div>

                  <div className="flex flex-col gap-4 max-h-48 overflow-y-auto pr-2 scrollbar-hide">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between items-center type-body-2"
                      >
                        <span className="text-grey-black uppercase">
                          {item.name}
                        </span>
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-grey-black">
                            ${item.amount}
                          </span>
                          <button
                            onClick={() => dispatch(removeItem(item.id))}
                            className="text-blue-500 hover:text-blue-600 transition-colors"
                          >
                            <HiOutlineTrash className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className=" flex justify-between items-center text-base">
                    <span className="text-grey-black font-medium">Total</span>
                    <span className="font-bold text-grey-black text-xl">
                      ${cartItems.reduce((acc, curr) => acc + curr.amount, 0)}
                    </span>
                  </div>

                  <Button
                    disabled={cartItems.length === 0}
                    onClick={() => {
                      dispatch(setStep("details"));
                      setIsCartOpen(false);
                    }}
                    rounded
                    color="yellow"
                    size="lg"
                    // className="bg-yellow py-4 type-btn-1  uppercase tracking-widest text-grey-black rounded-lg hover:bg-yellow-dark transition-colors w-full disabled:bg-yellow/40 disabled:cursor-not-allowed"
                  >
                    CONTINUE TO SHOP
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default DonationHeader;
