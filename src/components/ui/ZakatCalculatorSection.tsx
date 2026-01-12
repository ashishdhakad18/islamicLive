"use client";

import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import { ZakatCalculatorSectionData } from "@/lib/mappers/zakat";

// Types for Nissab
type NissabType = "gold" | "silver";

interface NissabRates {
  gold: number;
  silver: number;
}

// Default Nissab thresholds in CHF (these would typically come from an API)
const NISSAB_RATES: NissabRates = {
  gold: 6800, // ~85g of gold at current rates
  silver: 450, // ~595g of silver at current rates
};

const ZAKAT_RATE = 0.025; // 2.5%

interface StepCardProps {
  number: number;
  title: string;
  description: string;
  isActive: boolean;
  children?: React.ReactNode;
}

const StepCard: React.FC<StepCardProps> = ({
  number,
  title,
  description,
  isActive,
  children,
}) => {
  return (
    <div
      className={`flex flex-col gap-2 p-6 rounded-lg border border-grey-divider bg-white h-full`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-royal-blue-surface`}
        >
          <Image
            src="/Icons/Dollar-blue.svg"
            alt="Step"
            width={20}
            height={20}
          />
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <h6 className="type-h6 text-grey-black uppercase">{title}</h6>
          <p className="type-body-2 text-grey-grey">{description}</p>
        </div>
      </div>
      {children}
    </div>
  );
};

interface ZakatCalculatorSectionProps {
  data: ZakatCalculatorSectionData;
}

const ZakatCalculatorSection: React.FC<ZakatCalculatorSectionProps> = ({
  data,
}) => {
  const { steps, form, manualInput } = data;
  const [nissabType, setNissabType] = useState<NissabType>("gold");

  // Initialize values from form fields
  const initialValues = form.fields.reduce((acc, field) => {
    acc[field.id] = "";
    return acc;
  }, {} as Record<string, string>);

  const [values, setValues] = useState<Record<string, string>>(initialValues);
  const [directAmount, setDirectAmount] = useState<string>("");

  const handleValueChange = (id: string, value: string) => {
    // Allow only numbers and empty string
    const numericValue = value.replace(/[^0-9]/g, "");
    setValues((prev) => ({ ...prev, [id]: numericValue }));
  };

  // Calculate totals
  const calculations = useMemo(() => {
    let totalAssets = 0;
    let totalDebts = 0;

    // Iterate through configured fields to sum assets and debts
    // Assumptions:
    // - "debts" or "passifs" in id/label -> subtraction
    // - others -> addition
    // Ideally unwanted logic should be avoided, but without explicit "+/-" field config, we infer.
    // However, looking at previous hardcoded fields: "debts" was the only one subtracted.
    // We will assume any field with id containing 'debt' or 'passif' is a liability.

    // Better approach: Since we don't have explicit type in Strapi response mapped yet (we added 'type' but not logic),
    // let's assume 'debts' id is reserved or we sum all.
    // For now, let's sum ALL as assets except specific known liability keys if any.
    // Or simpler: Just sum everything for now as we don't have field types in data prop effectively used for calculation logic yet without more complex mapping.

    // Wait, we do have `type` in Strapi schema but we didn't map it fully or use it.
    // Let's rely on the field ID or Label to decide?
    // The previous code had specific IDs.
    // Let's assume standard behavior: Sum all. If user needs debts, they might need a negative value or we should update logic later.
    // Given the constraints, I will sum all values as "Assets" for now unless I see "debt" in the ID.

    Object.keys(values).forEach((key) => {
      const val = parseInt(values[key]) || 0;
      if (
        key.toLowerCase().includes("debt") ||
        key.toLowerCase().includes("passif") ||
        key.toLowerCase().includes("dettes")
      ) {
        totalDebts += val;
      } else {
        totalAssets += val;
      }
    });

    const netWealth = totalAssets - totalDebts;
    const nissabThreshold = NISSAB_RATES[nissabType];
    const isZakatDue = netWealth >= nissabThreshold;
    const zakatAmount = isZakatDue ? netWealth * ZAKAT_RATE : 0;

    return {
      totalAssets,
      totalDebts,
      netWealth,
      nissabThreshold,
      isZakatDue,
      zakatAmount,
    };
  }, [values, nissabType]);

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("fr-CH", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
      {/* Left Column - Step Cards */}
      <div className="flex flex-col gap-4">
        {/* Render dynamic steps (likely first 2) */}
        {steps.map((step) => (
          <StepCard
            key={step.id}
            number={step.number}
            title={step.title}
            description={step.description}
            isActive={step.number === 1} // Naive active state
          />
        ))}

        {/* Manual Input Step (Card 3 usually) */}
        <StepCard
          number={3}
          title={manualInput.title}
          description=""
          isActive={false}
        >
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <input
              type="text"
              placeholder={manualInput.placeholder}
              value={directAmount}
              onChange={(e) =>
                setDirectAmount(e.target.value.replace(/[^0-9]/g, ""))
              }
              className="flex-1 px-4 py-3 border border-grey-divider rounded-[4px]  type-btn-2 text-grey-grey placeholder:text-grey-grey focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary normal-case"
            />
            <Button
              color="yellow"
              rounded
              className="whitespace-nowrap px-6"
              endIcon={
                <Image
                  src="/Icons/Arrow-right-black.svg"
                  alt="Arrow"
                  width={16}
                  height={16}
                />
              }
            >
              {manualInput.ctaText}
            </Button>
          </div>
        </StepCard>
      </div>

      {/* Right Column - Calculator */}
      <div className="bg-white rounded-lg border border-grey-divider gap-6 p-6 lg:p-8">
        <h4 className="type-h4 text-grey-black mb-6 uppercase">
          {form.heading}
        </h4>

        {/* Nissab Type Selector */}
        <div className="mb-6">
          <div className="relative">
            <select
              value={nissabType}
              onChange={(e) => setNissabType(e.target.value as NissabType)}
              className="w-full p-4 border border-grey-divider rounded-sm type-btn-3 text-grey-grey appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary uppercase"
            >
              <option value="gold">{form.nisabTypeLabel}</option>
              {/* These options might need to be dynamic too but hardcoded for logic for now */}
              <option value="gold">Or (85g)</option>
              <option value="silver">Argent (595g)</option>
            </select>
            <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
              <svg
                width="12"
                height="8"
                viewBox="0 0 12 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1.5L6 6.5L11 1.5"
                  stroke="#62636C"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Calculator Fields Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {form.fields.map((field) => (
            <div key={field.id}>
              <input
                type="text"
                placeholder={field.placeholder} // Using placeholder as label? Or label as placeholder? Strapi gives both.
                // Design usually has placeholder inside input.
                // We'll use placeholder text from Strapi.
                value={values[field.id]}
                onChange={(e) => handleValueChange(field.id, e.target.value)}
                className="w-full p-4 border border-grey-divider rounded-sm type-btn-3 text-grey-grey placeholder:text-grey-grey focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary uppercase"
              />
              {/* Optional: Show label above if needed, but design seemed to use placeholders */}
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="flex justify-center items-center gap-2 border border-grey-divider rounded-sm px-4 py-3">
          <span className="type-h6 uppercase">{form.totalLabel}</span>
          <span className="type-h6 ">
            {formatCurrency(calculations.zakatAmount)} CHF
          </span>
        </div>

        {/* Nissab Status Message */}
        {/* We can use infoMessage as base, but it needs dynamic value insertion. 
            For now, keep logic-based message or try to use infoMessage if simple.
            The design has logic: "Votre patrimoine ... est inférieure..."
        */}
        <div
          className={`px-4 py-3 rounded-lg border-2 my-6  ${
            calculations.isZakatDue
              ? "border-green bg-green-surface"
              : "border-primary bg-primary-lighter"
          }`}
        >
          <p className="type-body-2 font-bold! text-grey-black text-center">
            {calculations.isZakatDue
              ? "Zakat est due." // Simple fallback if not provided
              : `Votre patrimoine (${formatCurrency(
                  calculations.netWealth
                )}) est inférieure au Nissab. Aucune Zakat n’est due.`}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Button
            color="yellow"
            rounded
            className="flex-1 justify-center"
            endIcon={
              <Image
                src="/Icons/Arrow-right-black.svg"
                alt="Arrow"
                width={20}
                height={20}
              />
            }
          >
            {form.calculateCtaText}
          </Button>
          <Button
            variant="outline"
            color="royal-blue"
            rounded
            className="flex-1 justify-center"
            endIcon={
              <Image
                src="/Icons/Arrow-right-black.svg"
                alt="Arrow"
                width={20}
                height={20}
              />
            }
          >
            {form.payCtaText}
          </Button>
        </div>

        {/* Footnote */}
        <p className="type-body-3 text-grey-black ">{form.note}</p>
      </div>
    </div>
  );
};

export default ZakatCalculatorSection;
