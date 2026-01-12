// src/components/ui/ImpactHistorySection.tsx
import React from "react";
import Image from "next/image";
import Container from "../layout/Container";
import { Button } from "./Button";
import { ArrowRightIcon } from "lucide-react";
import { ImpactHistoryCardData } from "@/lib/mappers/history";

interface ImpactHistorySectionProps {
  cards?: ImpactHistoryCardData[];
}

const ImpactHistorySection = ({ cards }: ImpactHistorySectionProps) => {
  // Fallback static data for when cards are not provided
  const defaultCards: ImpactHistoryCardData[] = [
    {
      id: 1,
      image: "/Images/History-Impact-Img-1.png",
      imageAlt: "Dr. Hany El-Banna",
      title: "ISLAMIC RELIEF : 40 ANS D'ACTION HUMANITAIRE ET DE SOLIDARITÉ",
      description:
        "Islamic Relief a été créée en 1984 à Birmingham en Angleterre, lorsqu'un jeune étudiant en médecine, le Dr Hany El-Banna, a décidé de répondre à la terrible famine qui frappait l'Afrique de l'Est notamment le Soudan. Avec un groupe de jeunes bénévoles, il lança les premières collectes de fonds qui ont permis de réaliser trois projets fondateurs : deux fermes avicoles ainsi que l'envoi d'aide alimentaire au Soudan et l'acheminement de farine de blé vers la Mauritanie.",
      btnText: "EN SAVOIR PLUS",
      btnUrl: "#",
    },
    {
      id: 2,
      image: "/Images/history-Impact-Img-2.png",
      imageAlt: "Islamic Relief Truck",
      title: "DES PROGRAMMES DURABLES",
      description:
        "Depuis sa création, Islamic Relief lutte contre la famine tout en réalisant des programmes saisonniers comme le Ramadan, le Kurban et l'hiver. En parallèle, Islamic Relief répond présente lors de grandes urgences humanitaires comme les guerres (Bosnie, Tchétchénie), les conflits ou encore les catastrophes naturelles comme les séismes, les tsunamis, les inondations et les sécheresses.\n\nTout en continuant à intervenir sur les urgences humanitaires et les programmes saisonniers, l'organisation met en place des projets de développement durables dans divers domaines tels que la santé, l'éducation, l'amélioration des conditions de vie, l'eau et la nutrition.",
      btnText: "EN SAVOIR PLUS",
      btnUrl: "#",
    },
  ];

  const displayCards = cards?.length ? cards : defaultCards;
  return (
    <section className="w-full pb-12">
      {/* <Container> */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
        {/* Left Column: Image -> Text -> Decoration */}
        <div className="flex flex-col gap-8 relative items-center lg:items-start text-left">
          {/* Row 1: Image */}
          <div className="relative w-full  aspect-square rounded-sm overflow-hidden shadow-lg z-10">
            <Image
              src={displayCards[0]?.image || "/Images/History-Impact-Img-1.png"}
              alt={displayCards[0]?.imageAlt || "Impact image"}
              fill
              className="object-cover object-top"
            />
          </div>

          {/* Row 2: Text */}
          <div className="relative w-full z-10">
            <h5 className="type-h5 uppercase font-bold text-grey-black mb-4">
              {displayCards[0]?.title ||
                "ISLAMIC RELIEF : 40 ANS D'ACTION HUMANITAIRE ET DE SOLIDARITÉ"}
            </h5>
            <p className="type-body-2 text-grey-grey">
              {displayCards[0]?.description ||
                "Islamic Relief a été créée en 1984 à Birmingham en Angleterre, lorsqu’un jeune étudiant en médecine, le Dr Hany El-Banna, a décidé de répondre à la terrible famine qui frappait l’Afrique de l’Est notamment le Soudan. Avec un groupe de jeunes bénévoles, il lança les premières collectes de fonds qui ont permis de réaliser trois projets fondateurs : deux fermes avicoles ainsi que l’envoi d’aide alimentaire au Soudan et l’acheminement de farine de blé vers la Mauritanie."}
            </p>
          </div>

          {/* Row 3: Decoration (L-Shape: Left & Bottom) */}
          <div className="relative w-full h-72 pl-12 pointer-events-none hidden lg:block ">
            <div className="w-full h-full border-l-2 border-b-2 border-primary-light"></div>
          </div>
        </div>

        {/* Right Column: Decoration -> Content -> Image */}
        <div className="flex flex-col gap-8 relative items-center lg:items-start text-center lg:text-left pt-0 lg:pt-12">
          {/* Row 1: Decoration (Top & Right) */}
          <div
            className="relative w-full h-72 pointer-events-none hidden lg:block mb-12 ml-12"
            style={{ width: "90%" }}
          >
            <div className="w-full h-full pr-12 border-t-2 border-r-2 border-primary-light"></div>
          </div>

          {/* Row 2: Truck Image */}
          <div className="relative w-full aspect-4/3 rounded-sm overflow-hidden shadow-lg z-10">
            <Image
              src={displayCards[1]?.image || "/Images/history-Impact-Img-2.png"}
              alt={displayCards[1]?.imageAlt || "Impact image"}
              fill
              className="object-cover object-bottom"
            />
          </div>
          {/* Row 3: Text Content */}
          <div className="flex flex-col gap-4 items-start relative w-full pt-4 z-10 ">
            <h5 className="type-h5 uppercase font-bold text-grey-black">
              {displayCards[1]?.title || "DES PROGRAMMES DURABLES"}
            </h5>
            <p className="type-body-2 text-grey-grey mb-4 text-left">
              {displayCards[1]?.description ||
                "Depuis sa création, Islamic Relief lutte contre la famine tout en réalisant des programmes saisonniers comme le Ramadan, le Kurban et l’hiver. En parallèle, Islamic Relief répond présente lors de grandes urgences humanitaires comme les guerres (Bosnie, Tchétchénie), les conflits ou encore les catastrophes naturelles comme les séismes, les tsunamis, les inondations et les sécheresses.\n\nTout en continuant à intervenir sur les urgences humanitaires et les programmes saisonniers, l’organisation met en place des projets de développement durables dans divers domaines tels que la santé, l’éducation, l’amélioration des conditions de vie, l’eau et la nutrition."}
            </p>
          </div>

          {displayCards[1]?.btnText && (
            <Button
              variant="solid"
              color="primary"
              endIcon={<ArrowRightIcon className="w-4 h-4" />}
              className="uppercase font-bold mb-4"
            >
              {displayCards[1].btnText}
            </Button>
          )}
        </div>
      </div>
      {/* </Container> */}
    </section>
  );
};

export default ImpactHistorySection;
