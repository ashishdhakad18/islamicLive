"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItem {
  id: string | number;
  title: React.ReactNode;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
  defaultOpen?: (string | number)[];
  className?: string; // Container class
  itemClassName?: string; // Item wrapper class
  headerClassName?: string; // Header button class
  contentClassName?: string; // Content wrapper class
  activeHeaderClassName?: string; // Header class when active
  activeContentClassName?: string; // Content class when active
  icon?: React.ReactNode; // Custom icon (defaults to ChevronDown)
  iconPosition?: "left" | "right";
}

export default function Accordion({
  items,
  allowMultiple = false,
  defaultOpen = [],
  className,
  itemClassName,
  headerClassName,
  contentClassName,
  activeHeaderClassName,
  activeContentClassName,
  icon = <ChevronDown className="w-5 h-5 transition-transform duration-300" />,
  iconPosition = "right",
}: AccordionProps) {
  const [openIds, setOpenIds] = useState<(string | number)[]>(defaultOpen);

  const toggle = (id: string | number) => {
    if (allowMultiple) {
      setOpenIds(prev =>
        prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id],
      );
    }
    else {
      setOpenIds(prev => (prev.includes(id) ? [] : [id]));
    }
  };

  return (
    <div className={cn("w-full flex flex-col", className)}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);

        return (
          <div key={item.id} className={cn("overflow-hidden", itemClassName)}>
            <button
              onClick={() => toggle(item.id)}
              className={cn(
                "flex items-center justify-between w-full text-left transition-all duration-200",
                iconPosition === "left" && "flex-row-reverse justify-end gap-4",
                headerClassName,
                isOpen && activeHeaderClassName,
              )}
            >
              <span className="flex-1">{item.title}</span>
              <span
                className={cn(
                  "shrink-0 transition-transform duration-300",
                  isOpen ? "rotate-180" : "rotate-0",
                )}
              >
                {icon}
              </span>
            </button>
            <div
              className={cn(
                "grid transition-all duration-300 ease-in-out",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                contentClassName,
                isOpen && activeContentClassName,
              )}
            >
              <div className="overflow-hidden min-h-0">{item.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
