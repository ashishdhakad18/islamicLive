"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import Container from "@/components/layout/Container";

// Types for props
interface RegionData {
  id: string;
  name: string;
  countries: string[];
}

interface MapSectionProps {
  title?: string;
  mapImage?: {
    url: string;
    alt: string;
  };
  countryCount?: number;
  regionCount?: number;
  regions?: RegionData[];
}

// Fallback data when no props are provided
const fallbackRegions: RegionData[] = [
  {
    id: "africa",
    name: "AFRIQUE",
    countries: [
      "Afrique du Sud",
      "Éthiopie",
      "Kenya",
      "Malawi",
      "Mali",
      "Niger",
      "Somalie",
      "Soudan",
      "Soudan du Sud",
      "Tchad",
      "Tunisie",
    ],
  },
  {
    id: "asia",
    name: "ASIE",
    countries: [
      "Afghanistan",
      "Bangladesh",
      "Inde",
      "Indonésie",
      "Myanmar",
      "Népal",
      "Pakistan",
      "Philippines",
      "Sri Lanka",
    ],
  },
  {
    id: "middle-east",
    name: "MOYEN-ORIENT",
    countries: ["Irak", "Jordanie", "Liban", "Palestine", "Syrie", "Yémen"],
  },
  {
    id: "europe",
    name: "EUROPE",
    countries: [
      "Albanie",
      "Bosnie-Herzégovine",
      "Kosovo",
      "Macédoine du Nord",
      "Tchétchénie (Russie)",
    ],
  },
];

const MapSection: React.FC<MapSectionProps> = ({
  title,
  mapImage,
  countryCount,
  regionCount,
  regions,
}) => {
  const [openRegion, setOpenRegion] = useState<string | null>(null);

  const toggleRegion = (id: string) => {
    setOpenRegion(openRegion === id ? null : id);
  };

  // Use props or fallback to default values
  const displayRegions = regions?.length ? regions : fallbackRegions;
  const displayCountryCount = countryCount ?? 30;
  const displayRegionCount = regionCount ?? 4;
  const displayMapImage = mapImage?.url || "/Images/mockImages/worldmap.png";
  const displayMapAlt =
    mapImage?.alt || "World Map showing regions of operation";

  // Parse title into two lines if it contains a colon
  const titleParts = (
    title || "ISLAMIC RELIEF : SOLIDARITÉ À TRAVERS LE MONDE"
  ).split(" : ");
  const titleLine1 = titleParts[0] + (titleParts.length > 1 ? " :" : "");
  const titleLine2 = titleParts[1] || "";

  return (
    <div className="bg-primary py-25 text-grey-white overflow-hidden">
      <Container>
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
          {/* Left Column: Content */}
          <div className="w-full flex-1 flex flex-col justify-center">
            <h3 className="type-h3 text-grey-white">{titleLine1}</h3>
            {titleLine2 && (
              <h3 className="type-h3 text-grey-white">{titleLine2}</h3>
            )}

            {/* Stats */}
            <div className="flex gap-16 my-8 lg:my-12">
              <div className="flex flex-col gap-4">
                <span className="text-5xl lg:text-6xl font-bold font-islamic">
                  {displayCountryCount}
                </span>
                <span className="type-h4 uppercase">PAYS</span>
              </div>
              <div className="flex flex-col gap-4">
                <span className="text-5xl lg:text-6xl font-bold font-islamic">
                  {displayRegionCount}
                </span>
                <span className="type-h4 uppercase">RÉGIONS</span>
              </div>
            </div>

            {/* Accordion */}
            <div className="space-y-4 w-full">
              {displayRegions.map((region) => (
                <div
                  key={region.id}
                  className="border-b border-primary-light/30"
                >
                  <button
                    onClick={() => toggleRegion(region.id)}
                    className="w-full flex items-center justify-between py-4 group"
                  >
                    <span className="type-h6 uppercase tracking-wider group-hover:text-primary-lighter transition-colors">
                      {region.name}
                    </span>
                    {openRegion === region.id ? (
                      <ChevronUp className="w-6 h-6 text-white" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-white" />
                    )}
                  </button>

                  <div
                    className={cn(
                      "grid transition-all duration-300 ease-in-out px-4",
                      openRegion === region.id
                        ? "grid-rows-[1fr] opacity-100 pb-4"
                        : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <div className="overflow-hidden">
                      <ul className="grid grid-cols-2 gap-x-4 gap-y-2">
                        {region.countries.map((country) => (
                          <li
                            key={country}
                            className="type-body-6 text-primary-lighter"
                          >
                            {country}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Map Visual */}
          <div className="flex-1 flex items-center justify-center relative min-h-[400px] mt-6">
            <div className="relative w-full h-full min-h-[400px] lg:min-h-[500px] flex items-center justify-center">
              <Image
                src={displayMapImage}
                alt={displayMapAlt}
                width={800}
                height={500}
                className="object-contain w-full h-full"
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default MapSection;
