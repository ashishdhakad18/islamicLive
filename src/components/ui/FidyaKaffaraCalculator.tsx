"use client";
import React, { useState } from "react";
import { Button } from "./Button";
import { ArrowRightIcon } from "lucide-react";
import Tabs from "./Tabs";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

const calculatorTabs = [
  { value: "fidya", label: "Fidya" },
  { value: "kaffara", label: "Kaffara" },
];

const FidyaKaffaraCalculator = () => {
  const [type, setType] = useState<"fidya" | "kaffara">("fidya");
  const [days, setDays] = useState<number>(0);

  // Based on the page description, 15 CHF per day
  const pricePerDay = 15;
  const total = days * pricePerDay;

  return (
    <div className="flex flex-col bg-white w-full rounded-lg shadow-card-soft p-6 h-full min-h-[440px]">
      <h5 className="type-h5 mb-8 uppercase leading-tight font-bold!">
        Calculez votre Fidya et Kaffara
      </h5>

      {/* Tabs */}
      <Tabs
        tabs={calculatorTabs}
        value={type}
        onChange={val => setType(val as "fidya" | "kaffara")}
        variant="filled"
        color="primary"
        fullWidth
        gap={0}
        className="mb-6 rounded-md overflow-hidden bg-grey-bg-dark border border-grey-divider"
        tabClassName="py-4 font-bold! text-sm tracking-wider"
        activeTabClassName="bg-primary text-white"
        inactiveTabClassName="bg-grey-bg-dark text-grey-black hover:bg-grey-lighter"
      />

      {/* Input Field */}
      <div className="relative mb-4">
        <input
          type="number"
          value={days === 0 ? "" : days}

          onChange={e => setDays(Math.max(0, parseInt(e.target.value) || 0))}
          placeholder="ENTREZ LE NOMBRE DE JOURS MANQUÉS"
          className="w-full p-4 text-[14px]! pr-12 border border-grey-divider rounded-md type-body-2 font-bold! uppercase placeholder:text-grey-grey focus:outline-hidden [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col ">
          <button onClick={() => setDays(days + 1)} className="text-grey-grey hover:text-grey-black transition-colors">
            <FaCaretUp className="w-4 h-4" />
          </button>
          <button onClick={() => setDays(Math.max(0, days - 1))} className="text-grey-grey hover:text-grey-black transition-colors">
            <FaCaretDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Total Display */}
      <div className="px-4 py-3 border border-grey-divider rounded-md bg-white flex flex-col justify-center items-center mb-8 ">
        <span className="type-h6  uppercase font-bold! text-grey-black">
          Total:
          {" "}
          {total}
          {" "}
          CHF
        </span>
      </div>

      {/* CTA Button */}
      <Button
        endIcon={<ArrowRightIcon className="w-5 h-5" />}
        className="w-full py-6 text-sm uppercase font-bold! type-btn-1!"
        rounded
        color="yellow"
        onClick={() => window.location.href = "/donate"}
      >
        Je donne maintenant
      </Button>
    </div>
  );
};

export default FidyaKaffaraCalculator;
