// components/ui/ResponseTimelineCard.tsx
import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface ResponseCardData {
  id: string;
  theme: "red" | "blue" | "green";
  icon: string;
  label: string; // "First 72 hours"
  title: string; // "EMERGENCY RESPONSE"
  description: string;
  items: string[]; // List of check items
}

interface ResponseTimelineCardProps {
  data: ResponseCardData;
}

const themeStyles = {
  red: {
    bgIcon: "bg-red-lighter",
    borderIcon: "border-red-light",
    hoverBorder: "hover:border-red", // If we want hover effects
    textLabel: "text-red",
    iconColor: "text-red", // Assuming SVG is current color
    checkColor: "bg-red",
  },
  blue: {
    bgIcon: "bg-primary-lighter", // Using primary for blue
    borderIcon: "border-primary-light",
    textLabel: "text-royal",
    checkColor: "bg-royal",
  },
  green: {
    bgIcon: "bg-green-lighter",
    borderIcon: "border-green-light",
    textLabel: "text-green",
    checkColor: "bg-green",
  },
};

const ResponseTimelineCard: React.FC<ResponseTimelineCardProps> = ({ data }) => {
  const theme = themeStyles[data.theme];
  const borderColor = theme.checkColor.split("-")[1];
  return (
    <div className="bg-white py-10 px-8 rounded-sm shadow-lg w-full min-w-[300px] md:min-w-[290px] flex flex-col items-start h-full">
      {/* Icon */}
      <div className={cn(`w-16 h-16 flex items-center justify-center mb-6 rounded-sm border border-${borderColor}`, theme.bgIcon)}>
        <Image src={data.icon} alt={data.title} width={32} height={32} className="w-8 h-8 " />
      </div>

      {/* Label */}
      <span className={cn("type-caption-3 text-lg  block", theme.textLabel)}>
        {data.label}
      </span>

      {/* Title */}
      <h5 className="type-h5 uppercase font-bold text-grey-black my-2">
        {data.title}
      </h5>

      {/* Description */}
      <p className="type-body-2 text-grey-grey mb-8">
        {data.description}
      </p>

      {/* Check List */}
      <ul className="space-y-4">
        {data.items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-3">
            {/* Check Circle */}
            <div className={cn("shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5", theme.checkColor)}>
              <svg width="12" height="12" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 5L4.5 8.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="type-body-2 text-grey-black">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResponseTimelineCard;
