"use client";

import React, { useState } from "react";
import { Button } from "./Button";
import { cn } from "@/lib/utils";
import Container from "@/components/layout/Container";
import { ArrowRight } from "lucide-react";

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterGroup {
  id: string; // Key to identify the filter (e.g., 'country', 'theme')
  placeholder: string;
  options: FilterOption[];
}

interface FilterProps {
  filters: FilterGroup[];
  onApply?: (selectedFilters: Record<string, string>) => void;
  className?: string; // Allow custom styling
}

const Filter: React.FC<FilterProps> = ({ filters, onApply, className }) => {
  const [selected, setSelected] = useState<Record<string, string>>({});

  const handleChange = (id: string, value: string) => {
    setSelected((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleApply = () => {
    if (onApply) {
      onApply(selected);
    }
  };

  return (
    <div
      className={cn(
        "w-full bg-royal-dark py-4   flex flex-col md:flex-row items-center justify-between gap-4",
        className
      )}
    >
      <Container className="w-full flex justify-center">
        {/* Dropdowns Container */}
        <div className="w-full flex flex-col md:flex-row items-stretch md:items-center gap-4 md:gap-6 flex-wrap">
          <div className="text-grey-white type-h5 uppercase tracking-wider font-bold shrink-0 text-center md:text-left">
            FILTERS
          </div>
          {filters.map((group) => (
            <div key={group.id} className="relative w-full md:w-auto">
              <select
                className="w-full md:w-[220px] lg:w-[280px] py-3 bg-grey-white pl-4 text-grey-grey type-btn-2 uppercase appearance-none rounded-sm focus:outline-none cursor-pointer"
                value={selected[group.id] || ""}
                onChange={(e) => handleChange(group.id, e.target.value)}
              >
                <option value="" disabled className="text-grey-inactive">
                  {group.placeholder}
                </option>
                {group.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {/* Custom Chevron Icon */}
              <div className="absolute inset-y-0 right-0 flex items-center justify-end pointer-events-none text-grey-black pr-4">
                <svg
                  width="12"
                  height="8"
                  viewBox="0 0 12 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.41 0.589844L6 5.16984L10.59 0.589844L12 1.99984L6 7.99984L0 1.99984L1.41 0.589844Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>
          ))}
          <Button
            color="yellow"
            className="shrink-0 w-full md:w-auto rounded-sm py-3 h-10!"
            endIcon={<ArrowRight className="w-5 h-5" />}
            onClick={handleApply}
            rounded={false}
            size="lg"
          >
            APPLY FILTER
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default Filter;
