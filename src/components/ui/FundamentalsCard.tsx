"use client";
import { Button } from "./Button";
import { ArrowRightIcon } from "lucide-react";

interface FundamentalsCardData {
  id: number;
  title: string;
  description: string;
  buttonText?: string;
  buttonLink?: string;
  example?: string;
  itemsLabel?: string;
  items?: string[];
  caption?: {
    captionHeading?: string;
    captionDescription?: string;
  };
}
const FundamentalsCard = ({ card }: { card: FundamentalsCardData }) => {
  return (
    <div className="flex flex-col bg-white w-full lg:w-1/2 rounded-lg shadow-lg">
      <div className="p-6 flex flex-col justify-between gap-4 h-full">
        <div className="flex flex-col gap-4">
          <h5 className="type-h5 uppercase">{card.title}</h5>
          <p className="type-body-2 text-grey-grey">{card.description}</p>
          {card.itemsLabel && (
            <p className="type-body-2 text-grey-black font-bold!">
              {card.itemsLabel}
            </p>
          )}
          {card.items && card.items.length > 0 && (
            <ul className="flex flex-col gap-2">
              {card.items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  {/* Check Circle */}
                  <div
                    className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 bg-green"
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 5L4.5 8.5L11 1"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span className="type-body-2 text-grey-black">{item}</span>
                </li>
              ))}
            </ul>
          )}
          {card.example && (
            <div className="p-4 bg-teal-lighter rounded-xl">
              <p className="type-body-2 text-grey-black font-bold!">Exemple:</p>
              <p className="type-body-2 text-grey-black">{card.example}</p>
            </div>
          )}
        </div>
          {card.caption && (
            <div className="p-4 rounded-xl bg-primary-lighter">
            <p className="type-body-2 text-grey-black font-bold!">{card.caption.captionHeading}</p>
            <p className="type-body-2 text-grey-black">{card.caption.captionDescription}</p>
            </div>
          )}
        {card.buttonText && (
          <Button
            endIcon={<ArrowRightIcon />}
            className="w-full mt-5"
            rounded
            color="yellow"
            onClick={() => (window.location.href = card.buttonLink || "#")}
          >
            {card.buttonText}
          </Button>
        )}
      </div>
    </div>
  );
};

export default FundamentalsCard;
