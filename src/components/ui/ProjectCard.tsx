import Image from "next/image";
import React from "react";
import { Button } from "./Button";
import { ArrowRightIcon } from "lucide-react";

interface ProjectCardData {
  id: number;
  image: string;
  alt: string;
  imageChip: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  lists: string[];
}

const ProjectCard = ({ card }: { card: ProjectCardData }) => {
  return (
    <div className="flex flex-col bg-white w-full lg:w-1/2 rounded-lg shadow-lg">
      <div className="relative">
        <Image
          src={card.image}
          alt={card.alt}
          width={360}
          height={240}
          className="object-cover w-full h-[240px] md:h-[300px] lg:h-[360px] rounded-t-lg"
        />

        <div className="absolute top-1 left-0 z-10">
          <span className="type-body-5 text-white px-6 py-2.5 rounded-tl-lg font-bold! uppercase bg-(--color-blood-red-dark)">
            {card.imageChip}
          </span>
        </div>
      </div>

      <div className="p-4 lg:p-6 flex flex-col justify-between h-full">
        <div className="flex flex-col gap-4">
          <h5 className="type-h5 uppercase">{card.title}</h5>
          <p className="type-body-2 text-grey-grey">{card.subtitle}</p>
          <ul className="flex flex-col gap-2">
            {card.lists.map((list, idx) => (
              <li key={idx} className="flex items-start gap-3">
                {/* Check Circle */}
                <div className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 bg-green">
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
                <span className="type-body-2 text-grey-black">{list}</span>
              </li>
            ))}
          </ul>
        </div>
        <Button
          endIcon={<ArrowRightIcon />}
          className="w-full mt-5"
          rounded
          color="yellow"
          href={card.buttonLink}
          size="lg"
        >
          {card.buttonText}
        </Button>
      </div>
    </div>
  );
};

export default ProjectCard;
