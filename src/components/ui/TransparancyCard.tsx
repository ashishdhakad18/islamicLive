"use client";

import React from "react";
import { transparencyCardData } from "@/data/transparancycard";
import { Button } from "@/components/ui/Button";
import {
  HandHeart,
  ShieldCheck,
  FileText,
  Search,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";

const SadaqahIcon = (
  <Image
    src="/Icons/Sadaqah.png"
    alt="Sadaqah"
    width={24}
    height={24}
    className="w-6 h-6 object-contain"
  />
);

const iconMap: Record<string, React.ReactNode> = {
  charity: SadaqahIcon,
  trust: SadaqahIcon,
  audit: SadaqahIcon,
  transparency: SadaqahIcon,
};

export default function TransparancyCard() {
  const { cards, visitUs } = transparencyCardData;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Group: Grid of Cards */}
      <div className="col-span-1 lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card) => (
          <div
            key={card.id}
            className="bg-white p-6 lg:p-8 rounded-lg shadow-sm flex flex-col items-start gap-6 h-full"
          >
            <div className="bg-primary-lighter w-12 h-12 flex items-center justify-center rounded-full">
              {iconMap[card.icon]}
            </div>
            <h3 className="type-h6 uppercase text-grey-black">{card.title}</h3>
            <p className="type-body-2 text-grey-grey">{card.description}</p>
          </div>
        ))}
      </div>

      {/* Right Group: Visit Us Card */}
      <div className="col-span-1 bg-white p-6 lg:p-8 rounded-lg shadow-sm flex flex-col h-full">
        <h3 className="type-h6 uppercase text-grey-black mb-8">
          {visitUs.title}
        </h3>

        <div className="flex flex-col gap-1 mb-8">
          <p className="type-btn-1 text-grey-black uppercase">
            {visitUs.organization}
          </p>
          <div className="text-grey-grey type-body-4">
            <p>{visitUs.address.street}</p>
            <p>
              {visitUs.address.postalCode} {visitUs.address.city}
            </p>
            <p>{visitUs.address.country}</p>
          </div>
          <p className="text-grey-grey type-body-4 mt-2">{visitUs.phone}</p>
          <p className="text-grey-grey type-body-4">{visitUs.email}</p>
        </div>

        <div className="mt-auto flex flex-col gap-4 rounded-sm">
          {visitUs.actions.map((action, idx) => (
            <Button
              key={idx}
              color="yellow"
              className="w-full justify-between px-6 rounded-sm h-auto py-4 whitespace-normal"
              endIcon={<ArrowRight className="w-5 h-5 shrink-0" />}
              onClick={action.onClick}
            >
              <span className="text-left flex-1 type-btn-2">
                {action.label}
              </span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
