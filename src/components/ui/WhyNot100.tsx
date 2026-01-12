"use client";

import React from "react";
import Image from "next/image";

interface WhyNot100Props {
  title?: string;
  content?: string[];
  imageSrc?: string;
  imageAlt?: string;
}

export default function WhyNot100({
  title = "POURQUOI NOUS N’APPLIQUONS PAS UNE POLITIQUE DE « DON À 100 % » ?",
  content = [
    "Beaucoup de donateurs se posent une question légitime : où va réellement mon don ?",
    "Certaines organisations affirment que 100 % des dons atteignent directement les bénéficiaires, sans aucun frais administratif. Sur le papier, cela paraît idéal. Mais en réalité, cette approche n'est ni viable, ni totalement transparente.",
    "Toute action humanitaire professionnelle exige des moyens concrets : du personnel formé, des véhicules, des infrastructures, des évaluations de besoins, et un suivi rigoureux. Ces moyens sont indispensables pour garantir que l'aide arrive rapidement et efficacement aux populations qui en ont le plus besoin.",
  ],
  imageSrc = "/Images/water.png", // Placeholder based on context (woman with water)
  imageAlt = "Action humanitaire Islamic Relief",
}: WhyNot100Props) {
  return (
    <div className="w-full bg-primary py-12 lg:py-20 text-grey-white">
      <div className="container mx-auto flex flex-col gap-8 lg:gap-12">
        <h2 className="type-h3 uppercase leading-tight w-full lg:max-w-4xl text-grey-white">
          {title}
        </h2>

        <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-12">
          {/* Text Content */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="space-y-2 type-body-2 text-grey-white text-justify lg:pr-12">
              {content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="flex-1 w-full relative min-h-[300px] lg:min-h-[500px]">
            <div className="absolute inset-0 w-full h-full rounded-xl overflow-hidden shadow-card-soft">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
