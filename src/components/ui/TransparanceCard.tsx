"use client";

import React from "react";
import Image from "next/image";
import { Button } from "./Button";
import { ArrowRight } from "lucide-react";

interface TransparanceCardProps {
  title?: string;
  content?: string[];
  ctaText?: string;
  ctaLink?: string;
  imageSrc?: string;
  imageAlt?: string;
  className?: string;
}

export default function TransparanceCard({
  title = "NOTRE ENGAGEMENT POUR UNE GESTION RIGOUREUSE DE VOS DONS",
  content = [
    "Depuis 1994, Islamic Relief s'engage à agir avec une transparence financière totale, afin de préserver la confiance de ses donateurs et de garantir le meilleur intérêt de ses bénéficiaires.",
    "Chez Islamic Relief Suisse, chaque franc est géré avec rigueur, audité et transformé en actions concrètes qui sauvent des vies. Islamic Relief Suisse a investi dans des moyens financiers et technologiques et a mis en place des procédures strictes pour assurer la traçabilité des fonds et garantir une gestion financière rigoureuse et transparente. Une fois les projets réalisés sur le terrain, une évaluation des projets est menée aussi bien par notre siège international que par des cabinets d'audit externes.",
    "Chaque année, nos comptes font l'objet d'un audit financier indépendant, garantissant transparence et redevabilité par le cabinet indépendant Bonnefous & Cie SA.",
    "Nous publions un rapport annuel détaillé, accessible à tous, présentant les projets réalisés, les fonds collectés et les dépenses engagées.",
    "Reconnue d'utilité publique depuis 2005, les contributions de nos donateurs sont déductibles des impôts.",
  ],
  ctaText = "TÉLÉCHARGER NOTRE DERNIER RAPPORT ANNUEL",
  ctaLink = "#",
  imageSrc = "/Images/mockImages/blackboys.png",
  imageAlt = "Transparence Islamic Relief",
  className,
}: TransparanceCardProps) {
  return (
    <div className={`w-full bg-grey-white py-12 lg:py-20 ${className || ""}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-stretch">
          {/* Text Content */}
          <div className="flex-1 space-y-8 flex flex-col justify-center">
            <h2 className="type-h3 text-grey-black uppercase">{title}</h2>

            <div className="space-y-6 text-grey-grey type-body-2 text-justify">
              {content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            <Button
              variant="solid"
              color="yellow"
              className="rounded-sm type-btn-2"
              endIcon={<ArrowRight className="w-5 h-5" />}
            >
              Télécharger notre dernier rapport annuel
            </Button>
          </div>

          {/* Image */}
          <div className="flex-1 w-full lg:w-1/2 min-h-[400px] lg:min-h-auto relative">
            <div className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden shadow-card-soft">
              <Image
                src={imageSrc}
                alt={imageAlt || ""}
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
