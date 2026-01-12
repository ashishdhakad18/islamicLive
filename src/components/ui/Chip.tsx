import React from "react";

export type ChipVariant = "solid" | "outline" | "soft";
export type ChipColor = "primary" | "teal" | "royal" | "green" | "yellow" | "red" | "purple" | "grey" | "bloodRed";
export type ChipSize = "sm" | "md";

interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  variant?: ChipVariant;
  color?: ChipColor;
  size?: ChipSize;
  onDelete?: () => void;
  // If onClick is provided, the chip becomes interactive
  onClick?: () => void;
  labelClassName?: string;
}

export const Chip = React.forwardRef<HTMLDivElement, ChipProps>(
  (
    {
      className = "",
      variant = "solid",
      color = "grey",
      size = "md",
      label,
      onDelete,
      onClick,
      labelClassName,
      ...props
    },
    ref,
  ) => {
    // Base styles
    const baseStyles = "inline-flex items-center justify-center rounded-sm transition-all duration-200 ";
    const interactiveStyles = onClick ? "cursor-pointer hover:opacity-90 active:scale-95" : "cursor-default";

    // Size styles (Typography mapping)
    const sizeStyles = {
      sm: "py-0.5 px-2 text-xs", // Compact
      md: "py-1 px-3 text-sm", // Regular
    };

    // Color definitions for Solid variant
    const solidColors = {
      primary: "bg-primary border-primary text-white",
      teal: "bg-teal border-teal text-white",
      royal: "bg-royal border-royal text-white",
      green: "bg-green border-green text-white",
      yellow: "bg-[#FEF9D2] text-primary-dark",
      red: "bg-red border-red text-white",
      purple: "bg-purple border-purple text-white",
      bloodRed: "bg-bloodRed border-bloodRed text-white",
      grey: "bg-[#F3F2F0] text-grey-black",
    };

    // Color definitions for Outline variant
    const outlineColors = {
      primary: "bg-white border-primary text-primary",
      teal: "bg-white border-teal text-teal",
      royal: "bg-white border-royal text-royal",
      green: "bg-white border-green text-green",
      yellow: "bg-white border-yellow text-yellow-dark",
      red: "bg-white border-red text-red",
      purple: "bg-white border-purple text-purple",
      bloodRed: "bg-white border-bloodRed text-bloodRed",
      grey: "bg-white border-grey-grey text-grey-grey",
    };

    const softColors = {
      primary: "bg-primary-lighter border-primary-lighter text-primary-dark",
      teal: "bg-teal-lighter border-teal-lighter text-teal-dark",
      royal: "bg-royal-lighter border-royal-lighter text-royal-dark",
      green: "bg-green-lighter border-green-lighter text-green-dark",
      yellow: "bg-yellow-lighter border-yellow-lighter text-yellow-dark",
      red: "bg-red-lighter border-red-lighter text-red-dark",
      purple: "bg-purple-lighter border-purple-lighter text-purple-dark",
      grey: "bg-grey-bg-light border-grey-bg-light text-grey-black",
      bloodRed: "bg-bloodRed border-bloodRed text-white",
    };

    // Resolve variant styles
    let variantStyles = "";
    switch (variant) {
      case "solid":
        variantStyles = solidColors[color];
        break;
      case "outline":
        variantStyles = outlineColors[color];
        break;
      case "soft":
        variantStyles = softColors[color];
        break;
    }

    return (
      <div
        ref={ref}
        className={`${baseStyles} ${interactiveStyles} ${sizeStyles[size]} ${variantStyles} ${className}`}
        onClick={onClick}
        {...props}
      >
        <span className={`font-sans font-medium ${labelClassName}`}>{label}</span>
        {onDelete && (
          <button
            type="button"
            className={`ml-1.5 p-0.5 rounded-full hover:bg-white/20 focus:outline-none transition-colors ${variant === "outline" ? "hover:bg-grey-black/10" : ""
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            aria-label="Delete"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-3 h-3"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        )}
      </div>
    );
  },
);

Chip.displayName = "Chip";
