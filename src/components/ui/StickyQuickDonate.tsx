"use client";

import React, { useState, useEffect } from "react";
import QuickDonate from "./QuickDonate";
import { cn } from "@/lib/utils";

const StickyQuickDonate = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show QuickDonate after scrolling past ~800px (after hero + linkcard sections)
      const scrollThreshold = 800;
      const currentScroll = window.scrollY;

      if (currentScroll > scrollThreshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Add scroll listener
    window.addEventListener("scroll", handleScroll);

    // Check initial scroll position
    handleScroll();

    // Cleanup
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-40 transform transition-all duration-500 ease-out",
        isVisible ? "translate-y-0 scale-100" : "translate-y-full scale-95"
      )}
    >
      <QuickDonate />
    </div>
  );
};

export default StickyQuickDonate;
