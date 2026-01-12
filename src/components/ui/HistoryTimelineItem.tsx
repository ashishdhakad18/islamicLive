// src/components/ui/HistoryTimelineItem.tsx
import React from "react";
import { cn } from "@/lib/utils";

export interface TimelineItemData {
  id: string;
  year: string;
  title?: string;
  description: string;
  color?: "blue" | "purple" | "green" | "red" | "teal";
  position?: "top" | "bottom";
}

interface HistoryTimelineItemProps {
  data: TimelineItemData;
  index?: number;
  isLast?: boolean;
}

const colorStyles = {
  blue: {
    text: "text-primary",
    bg: "bg-primary",
  },
  purple: {
    text: "text-purple",
    bg: "bg-purple",
  },
  green: {
    text: "text-green",
    bg: "bg-green",
  },
  red: {
    text: "text-red",
    bg: "bg-red",
  },
  teal: {
    text: "text-teal",
    bg: "bg-teal",
  },
};

// Color palette for auto-assignment when not provided by backend
const TIMELINE_COLORS: Array<"blue" | "purple" | "green" | "red" | "teal"> = [
  "blue",
  "teal",
  "purple",
  "green",
  "red",
];

const HistoryTimelineItem: React.FC<HistoryTimelineItemProps> = ({
  data,
  index = 0,
  isLast,
}) => {
  // Auto-assign color and position based on index if not provided
  const color = data.color || TIMELINE_COLORS[index % TIMELINE_COLORS.length];
  const position = data.position || (index % 2 === 0 ? "top" : "bottom");

  const styles = colorStyles[color];
  const isTop = position === "top";

  return (
    <div className="relative shrink-0 flex flex-col items-center justify-end w-[300px] lg:w-96 h-[450px] lg:h-[550px]">
      {/* Layout: Axis in middle, Content alternates - now enabled for ALL screens */}

      {/* Axis Segment (The main horizontal line) - 12px thick */}
      <div className="absolute top-1/2 left-0 w-full h-[12px] -translate-y-1/2 block z-10">
        {/* The colored axis segment */}
        <div className={cn("w-full h-full", styles.bg)}></div>
      </div>

      {/* Vertical Line with Flag */}
      <div
        className={cn(
          "absolute w-[2px] h-32 lg:h-48 block",
          styles.bg,
          "right-0",
          isTop ? "bottom-1/2 pb-[6px]" : "top-1/2 pt-[6px]"
        )}
      >
        {/* The Flag (Triangle) at the tip */}
        <div
          className={cn(
            "absolute w-0 h-0 border-r-12 border-l-0 border-transparent",
            "right-0 translate-x-[10px]",
            isTop ? "-top-2 border-b-12" : "-bottom-2 border-t-12",
            isTop
              ? `border-b-${color === "blue" ? "primary" : color}`
              : `border-t-${color === "blue" ? "primary" : color}`
          )}
          style={{
            borderBottomColor: isTop
              ? `var(--color-${color === "blue" ? "primary" : color})`
              : "transparent",
            borderTopColor: !isTop
              ? `var(--color-${color === "blue" ? "primary" : color})`
              : "transparent",
          }}
        ></div>
      </div>

      {/* Content Container - Flex Column, Aligned Right */}
      <div
        className={cn(
          "flex flex-col relative w-full",
          "absolute right-[20px] lg:right-[20px]", // Fixed positioning on all screens
          "text-right items-end",
          isTop ? "bottom-1/2 mb-4 justify-end" : "top-1/2 mt-4 justify-start"
        )}
      >
        {/* Top Position: Description UP, Year DOWN (near axis) */}
        {isTop ? (
          <>
            <p className="text-grey-grey text-xs lg:text-sm max-w-[200px] lg:max-w-[240px] mb-4 lg:mb-8 font-medium">
              {data.description}
            </p>
            <h2
              className={cn(
                "text-3xl lg:text-5xl font-bold leading-none",
                styles.text
              )}
            >
              {data.year}
            </h2>
          </>
        ) : (
          /* Bottom Position: Year UP (near axis), Description DOWN */
          <>
            <h2
              className={cn(
                "text-3xl lg:text-5xl font-bold leading-none mb-4 lg:mb-8",
                styles.text
              )}
            >
              {data.year}
            </h2>
            <p className="text-grey-grey text-xs lg:text-sm max-w-[200px] lg:max-w-[240px] font-medium">
              {data.description}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default HistoryTimelineItem;
