"use client";

import React from "react";
import Image from "next/image";
import Accordion, { AccordionItem } from "@/components/ui/Accordion";
import SectionHeading from "./SectionHeading";
import { PrinciplesSectionData } from "@/lib/mappers/history";

const PRINCIPLES_DATA: AccordionItem[] = [
  {
    id: "polyvalence",
    title: "POLYVALENCE",
    content: (
      <p className="pb-6 pt-2 text-white/80 type-body-2">
        Nous nous adaptons à toutes les situations pour fournir l'aide la plus
        efficace possible, quels que soient le contexte et les besoins.
      </p>
    ),
  },
  {
    id: "partenariats",
    title: "PARTENARIATS",
    content: (
      <p className="pb-6 pt-2 text-white/80 type-body-2">
        Nous collaborons étroitement avec des partenaires locaux et
        internationaux pour maximiser notre impact.
      </p>
    ),
  },
  {
    id: "professionnalisme",
    title: "PROFESSIONNALISME ET DÉVOUEMENT",
    content: (
      <p className="pb-6 pt-2 text-white/80 type-body-2">
        Nos équipes s'engagent avec rigueur et passion pour servir les plus
        vulnérables.
      </p>
    ),
  },
  {
    id: "implication",
    title: "IMPLICATION DES BÉNÉFICIAIRES",
    content: (
      <p className="pb-6 pt-2 text-white/80 type-body-2">
        Nous plaçons les bénéficiaires au cœur de nos actions, en les écoutant
        et en les impliquant dans les décisions.
      </p>
    ),
  },
  {
    id: "multiculturalisme",
    title: "MULTICULTURALISME",
    content: (
      <p className="pb-6 pt-2 text-white/80 type-body-2">
        Nous célébrons la diversité et respectons toutes les cultures et
        croyances.
      </p>
    ),
  },
  {
    id: "neutralite",
    title: "NEUTRALITÉ",
    content: (
      <p className="pb-6 pt-2 text-white/80 type-body-2">
        Nous agissons sans parti pris politique, religieux ou ethnique, guidés
        uniquement par les besoins humanitaires.
      </p>
    ),
  },
  {
    id: "integrite",
    title: "INTÉGRITÉ",
    content: (
      <p className="pb-6 pt-2 text-white/80 type-body-2">
        Nous opérons avec transparence et honnêteté dans toutes nos actions et
        notre gestion.
      </p>
    ),
  },
];

export default function PrinciplesSection({
  data,
}: {
  data: PrinciplesSectionData;
}) {
  return (
    <section className="w-full">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
        {/* Left Column: Heading & Accordion */}
        <div className="flex-1 flex flex-col gap-8">
          {/* Header */}
          <SectionHeading
            subheading="Impact"
            heading="LES 7 PRINCIPES  D’ISLAMIC RELIEF SUISSE"
            description="Islamic Relief Suisse agit selon les principes et valeurs suivants :"
            align="left"
            subheadingClassName="text-yellow"
            headingClassName="text-white type-h4 mt-6"
            descriptionClassName="text-white type-body-2"
            headingTag="h4"
            className="mx-0"
          />

          {/* Content Accordion */}
          <Accordion
            items={PRINCIPLES_DATA}
            className="w-full"
            itemClassName=""
            headerClassName="py-5 text-white font-bold uppercase type-h6 hover:text-yellow-main"
            activeHeaderClassName="text-yellow-main"
            icon={
              <div className="text-white">
                <svg
                  width="14"
                  height="8"
                  viewBox="0 0 14 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 1L7 7L13 1"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            }
          />
        </div>

        {/* Right Column: Image */}
        <div className="flex-1 relative h-[800px] lg:h-auto min-h-full rounded-sm overflow-hidden  order-first lg:order-last">
          <Image
            src="/Images/History-Impact-Img-1.png"
            alt="Humanitarian Aid Worker"
            width={800}
            height={800}
            className="object-cover w-[800px] h-[800px]"
          />
        </div>
      </div>
    </section>
  );
}
