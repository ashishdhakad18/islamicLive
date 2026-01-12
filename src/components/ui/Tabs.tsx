"use client";

import React, { useState, useCallback, ReactNode } from "react";
import { cn } from "@/lib/utils";

// ============== Types ==============

export type TabVariant = "filled" | "outlined" | "soft" | "underlined";
export type TabSize = "sm" | "md" | "lg";
export type TabColor =
  | "primary"
  | "secondary"
  | "grey"
  | "white"
  | "yellow"
  | "red"
  | "teal";
export type TabOrientation = "horizontal" | "vertical";

export interface TabItem {
  /** Unique identifier for the tab */
  value: string;
  /** Display label for the tab */
  label: string;
  /** Optional icon component */
  icon?: ReactNode;
  /** Icon position relative to label */
  iconPosition?: "start" | "end" | "top" | "bottom";
  /** Whether the tab is disabled */
  disabled?: boolean;
  /** Custom content to render instead of label */
  customContent?: ReactNode;
}

export interface TabsProps {
  /** Array of tab items */
  tabs: TabItem[];
  /** Currently selected tab value */
  value?: string;
  /** Default selected tab (uncontrolled) */
  defaultValue?: string;
  /** Callback when tab changes */
  onChange?: (value: string) => void;
  /** Visual variant of tabs */
  variant?: TabVariant;
  /** Size of tabs */
  size?: TabSize;
  /** Color scheme */
  color?: TabColor;
  /** Orientation of tabs */
  orientation?: TabOrientation;
  /** Whether tabs should take full width */
  fullWidth?: boolean;
  /** Whether to center tabs */
  centered?: boolean;
  /** Whether tabs are scrollable */
  scrollable?: boolean;
  /** Custom class for the container */
  className?: string;
  /** Custom class for individual tabs */
  tabClassName?: string;
  /** Custom class for active tab */
  activeTabClassName?: string;
  /** Custom class for inactive tab */
  inactiveTabClassName?: string;
  /** Gap between tabs */
  gap?: number;
  /** Border radius style */
  rounded?: boolean | "sm" | "md" | "lg" | "full";
  /** Show indicator line for underlined variant */
  showIndicator?: boolean;
  /** Indicator position for underlined variant */
  indicatorPosition?: "top" | "bottom";
  /** Custom class for label */
  labelClassName?: string;
}

// ============== Styles ==============

const sizeStyles: Record<TabSize, string> = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

const iconSizeStyles: Record<TabSize, string> = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
};

const getColorStyles = (color: TabColor, variant: TabVariant) => {
  const colorMap: Record<
    TabColor,
    { active: string; inactive: string; indicator: string }
  > = {
    primary: {
      active:
        variant === "filled"
          ? "bg-primary text-white"
          : variant === "outlined"
          ? "border-primary text-primary bg-transparent"
          : variant === "soft"
          ? "bg-primary-lighter text-primary"
          : "text-primary",
      inactive:
        variant === "outlined"
          ? "border-grey-divider text-grey-grey hover:border-primary/50 hover:text-primary"
          : "text-grey-grey hover:text-primary hover:bg-primary-lighter/50",
      indicator: "bg-primary",
    },
    secondary: {
      active:
        variant === "filled"
          ? "bg-grey-black text-white"
          : variant === "outlined"
          ? "border-grey-black text-grey-black bg-transparent"
          : variant === "soft"
          ? "bg-grey-bg-light text-grey-black"
          : "text-grey-black",
      inactive:
        variant === "outlined"
          ? "border-grey-divider text-grey-grey hover:border-grey-black/50"
          : "text-grey-grey hover:text-grey-black hover:bg-grey-bg-light/50",
      indicator: "bg-grey-black",
    },
    grey: {
      active:
        variant === "filled"
          ? "bg-grey-grey text-white"
          : variant === "outlined"
          ? "border-grey-grey text-grey-grey bg-transparent"
          : variant === "soft"
          ? "bg-grey-bg-light text-grey-black"
          : "text-grey-black",
      inactive:
        "text-grey-grey hover:text-grey-black hover:bg-grey-bg-light/50",
      indicator: "bg-grey-grey",
    },
    white: {
      active:
        variant === "filled"
          ? "bg-white text-grey-black shadow-sm"
          : variant === "outlined"
          ? "border-white text-white bg-transparent"
          : variant === "soft"
          ? "bg-white/20 text-white"
          : "text-white",
      inactive: "text-white/70 hover:text-white hover:bg-white/10",
      indicator: "bg-white",
    },
    yellow: {
      active:
        variant === "filled"
          ? "bg-yellow text-grey-black"
          : variant === "outlined"
          ? "border-yellow text-yellow bg-transparent"
          : variant === "soft"
          ? "bg-yellow/20 text-yellow"
          : "text-yellow",
      inactive: "text-grey-grey hover:text-yellow hover:bg-yellow/10",
      indicator: "bg-yellow",
    },
    red: {
      active:
        variant === "filled"
          ? "bg-red text-white"
          : variant === "outlined"
          ? "border-red text-red bg-transparent"
          : variant === "soft"
          ? "bg-red/10 text-red"
          : "text-red",
      inactive: "text-grey-grey hover:text-red hover:bg-red/10",
      indicator: "bg-red",
    },
    teal: {
      active:
        variant === "filled"
          ? "bg-teal text-white"
          : variant === "outlined"
          ? "border-teal text-teal bg-transparent"
          : variant === "soft"
          ? "bg-teal/10 text-teal"
          : "text-teal",
      inactive: "text-grey-grey hover:text-teal hover:bg-teal/10",
      indicator: "bg-teal",
    },
  };

  return colorMap[color];
};

const getRoundedStyles = (rounded: TabsProps["rounded"]): string => {
  if (rounded === true || rounded === "md") return "rounded-md";
  if (rounded === "sm") return "rounded-sm";
  if (rounded === "lg") return "rounded-lg";
  if (rounded === "full") return "rounded-full";
  return "rounded-sm";
};

// ============== Component ==============

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      tabs,
      value: controlledValue,
      defaultValue,
      onChange,
      variant = "filled",
      size = "md",
      color = "primary",
      orientation = "horizontal",
      fullWidth = false,
      centered = false,
      scrollable = false,
      className,
      tabClassName,
      activeTabClassName,
      inactiveTabClassName,
      gap = 3,
      rounded = "sm",
      showIndicator = true,
      indicatorPosition = "bottom",
      labelClassName,
    },
    ref
  ) => {
    // Internal state for uncontrolled mode
    const [internalValue, setInternalValue] = useState(
      defaultValue || tabs[0]?.value || ""
    );

    // Use controlled value if provided, otherwise use internal state
    const activeValue =
      controlledValue !== undefined ? controlledValue : internalValue;

    const handleTabClick = useCallback(
      (tabValue: string) => {
        if (controlledValue === undefined) {
          setInternalValue(tabValue);
        }
        onChange?.(tabValue);
      },
      [controlledValue, onChange]
    );

    const colorStyles = getColorStyles(color, variant);
    const roundedStyles = getRoundedStyles(rounded);

    const containerClasses = cn(
      "relative",
      orientation === "horizontal"
        ? "flex flex-row flex-wrap"
        : "flex flex-col",
      centered && "justify-center",
      scrollable && "overflow-x-auto pb-2",
      className
    );

    const getTabClasses = (tab: TabItem, isActive: boolean) => {
      const baseClasses = cn(
        "inline-flex items-center justify-center font-medium uppercase tracking-wide transition-all duration-200 cursor-pointer",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
        sizeStyles[size],
        fullWidth && "flex-1",
        tab.disabled && "opacity-50 cursor-not-allowed pointer-events-none"
      );

      const variantClasses = cn(
        variant === "outlined" && "border-2",
        variant !== "underlined" && roundedStyles
      );

      const stateClasses = isActive
        ? cn(colorStyles.active, activeTabClassName)
        : cn(colorStyles.inactive, inactiveTabClassName);

      // Icon position classes
      const iconPositionClasses = cn(
        tab.iconPosition === "top" && "flex-col",
        tab.iconPosition === "bottom" && "flex-col-reverse"
      );

      return cn(
        baseClasses,
        variantClasses,
        stateClasses,
        iconPositionClasses,
        tabClassName
      );
    };

    const renderTabContent = (tab: TabItem) => {
      if (tab.customContent) {
        return tab.customContent;
      }

      const iconElement = tab.icon && (
        <span className={cn(iconSizeStyles[size], "shrink-0 h-[14px]")}>
          {React.isValidElement(tab.icon)
            ? React.cloneElement(
                tab.icon as React.ReactElement<{ className?: string }>,
                {
                  className: cn(iconSizeStyles[size]),
                }
              )
            : tab.icon}
        </span>
      );

      const gapClass =
        tab.iconPosition === "top" || tab.iconPosition === "bottom"
          ? "gap-1"
          : "gap-2";

      return (
        <span className={cn("flex items-center", gapClass)}>
          {(tab.iconPosition === "start" || !tab.iconPosition) && iconElement}
          {tab.iconPosition === "top" && iconElement}
          <span className={cn("h-[16px]", labelClassName)}>{tab.label}</span>
          {tab.iconPosition === "end" && iconElement}
          {tab.iconPosition === "bottom" && iconElement}
        </span>
      );
    };

    return (
      <div
        ref={ref}
        className={containerClasses}
        role="tablist"
        aria-orientation={orientation}
        style={{ gap: `${gap * 4}px` }}
      >
        {tabs.map((tab) => {
          const isActive = activeValue === tab.value;

          return (
            <button
              key={tab.value}
              role="tab"
              aria-selected={isActive}
              aria-disabled={tab.disabled}
              tabIndex={tab.disabled ? -1 : 0}
              onClick={() => !tab.disabled && handleTabClick(tab.value)}
              className={getTabClasses(tab, isActive)}
            >
              {renderTabContent(tab)}

              {/* Underline indicator for underlined variant */}
              {variant === "underlined" && showIndicator && (
                <span
                  className={cn(
                    "absolute left-0 right-0 h-0.5 transition-all duration-200",
                    indicatorPosition === "bottom" ? "bottom-0" : "top-0",
                    isActive ? colorStyles.indicator : "bg-transparent"
                  )}
                />
              )}
            </button>
          );
        })}
      </div>
    );
  }
);

Tabs.displayName = "Tabs";

// ============== Tab Panel Component ==============

export interface TabPanelProps {
  /** The value that corresponds to this panel */
  value: string;
  /** The currently active tab value */
  activeValue: string;
  /** Content to render */
  children: ReactNode;
  /** Custom className */
  className?: string;
  /** Keep panel mounted when not active (for preserving state) */
  keepMounted?: boolean;
}

export const TabPanel: React.FC<TabPanelProps> = ({
  value,
  activeValue,
  children,
  className,
  keepMounted = false,
}) => {
  const isActive = value === activeValue;

  if (!isActive && !keepMounted) {
    return null;
  }

  return (
    <div
      role="tabpanel"
      hidden={!isActive}
      className={cn("focus:outline-none", !isActive && "hidden", className)}
      tabIndex={0}
    >
      {children}
    </div>
  );
};

export default Tabs;
