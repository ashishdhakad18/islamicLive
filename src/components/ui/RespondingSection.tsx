import React from "react";
import { ResponseCardData } from "@/types/responseCard";
import ResponseCard from "./ResponseCard";

const RespondingSection = ({ cards }: { cards: ResponseCardData[] }) => {
  return (
    <div className="flex flex-col gap-12">
      {cards.map((card, index) => (
        <ResponseCard
          key={index}
          data={card}
          reverse={index % 2 === 1 ? true : false}
        />
      ))}
    </div>
  );
};

export default RespondingSection;
