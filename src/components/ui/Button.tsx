"use client";
import React from "react";

export type ButtonVariant = "solid" | "outline" | "ghost";
export type ButtonColor
  = | "primary"
    | "teal"
    | "royal"
    | "green"
    | "yellow"
    | "red"
    | "purple"
    | "grey"
    | "white"
    | "royal-blue";

export type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  rounded?: boolean;
  href?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "solid",
      color = "primary",
      size = "md",
      startIcon,
      endIcon,
      children,
      disabled,
      rounded,
      href,
      ...props
    },
    ref,
  ) => {
    // Base styles
    const baseStyles = `flex items-center justify-center cursor-pointer transition-all duration-200 ease-in-out focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed ${rounded && "rounded"
    }`;

    // Size styles (Typography mapping)
    const sizeStyles = {
      sm: "type-btn-3 h-[48px] px-2", // Mobile: 13px, Desktop: 14px
      md: "type-btn-2 h-[48px] px-4", // Mobile: 15px, Desktop: 16px
      lg: "type-btn-1 h-[48px] px-8", // Mobile: 19px, Desktop: 20px
    };

    // Color definitions for Solid variant
    const solidColors = {
      "primary": "bg-primary text-white hover:bg-primary-dark",
      "teal": "bg-teal text-white hover:bg-teal-dark",
      "royal": "bg-royal text-white hover:bg-royal-dark",
      "green": "bg-green text-white hover:bg-green-dark",
      "yellow": "bg-yellow text-grey-black hover:bg-yellow-surface",
      "red": "bg-red text-white hover:bg-red-dark",
      "purple": "bg-purple text-white hover:bg-purple-dark",
      "grey": "bg-grey-grey text-white hover:bg-gray-500",
      "white": "bg-white text-grey-black hover:bg-gray-100",
      "royal-blue": "bg-royal-dark text-white hover:bg-royal-dark",
    };

    // Color definitions for Outline variant
    const outlineColors = {
      "primary":
        "border-1 rounded-sm border-primary text-primary hover:bg-primary hover:text-white",
      "teal": "border-1 rounded-sm border-teal text-teal hover:bg-teal hover:text-white",
      "royal":
        "border-1 rounded-sm border-royal text-royal hover:bg-royal hover:text-white",
      "green":
        "border-1 rounded-sm border-green text-green hover:bg-green hover:text-white",
      "yellow":
        "border-1 rounded-sm border-yellow text-yellow-dark hover:bg-yellow hover:text-grey-black",
      "red": "border-1 rounded-sm border-red text-red hover:bg-red hover:text-white",
      "purple":
        "border-1 rounded-sm border-purple text-purple hover:bg-purple hover:text-white",
      "grey": "border-1 rounded-sm border-grey-grey text-grey-grey hover:bg-grey-grey hover:text-white",
      "white": "border-1 rounded-sm border-white text-white hover:bg-white/10",
      "royal-blue": "border-1 rounded-sm border-royal-dark text-royal-dark hover:bg-royal-dark hover:text-white",
    };

    // Color definitions for Ghost variant
    const ghostColors = {
      "primary": "text-primary hover:bg-primary hover:text-white",
      "teal": "text-teal hover:bg-teal hover:text-white",
      "royal": "text-royal hover:bg-royal hover:text-white",
      "green": "text-green hover:bg-green hover:text-white",
      "yellow": "text-yellow-dark hover:bg-yellow hover:text-grey-black",
      "red": "text-red hover:bg-red hover:text-white",
      "purple": "text-purple hover:bg-purple hover:text-white",
      "grey": "text-grey-grey hover:bg-grey-grey hover:text-white",
      "white": "text-white hover:bg-white/10",
      "royal-blue": "text-royal-dark hover:bg-royal-dark hover:text-white",
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
      case "ghost":
        variantStyles = ghostColors[color];
        break;
    }

    const { onClick, ...restProps } = props;

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${sizeStyles[size]} ${variantStyles} ${className}`}
        disabled={disabled}
        onClick={(e) => {
          if (onClick) onClick(e);
          if (href) {
            window.location.href = href;
          }
        }}
        {...restProps}
      >
        {startIcon && <span className="mr-2">{startIcon}</span>}
        <span className="h-[16px]">{children}</span>
        {endIcon && <span className="ml-2">{endIcon}</span>}
      </button>
    );
  },
);

Button.displayName = "Button";
