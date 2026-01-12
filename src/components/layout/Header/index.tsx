"use client";
import React, { useState, useEffect } from "react";
import PrimaryHeader from "./PrimaryHeader";
import SecondaryHeader from "./SecondaryHeader";
import { headerSocialLinks } from "@/data/headerData";
import { ProjectNavigationItem } from "@/lib/pages/sustainable-projects/getAllSustainableProjects";

interface HeaderProps {
  sustainableProjects?: ProjectNavigationItem[];
}

const Header = ({ sustainableProjects = [] }: HeaderProps) => {
  const [hideSecondary, setHideSecondary] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById("hero");
      const threshold = hero ? hero.offsetHeight : window.innerHeight;
      const currentScroll = window.scrollY;

      setHideSecondary((prev) => {
        // Hysteresis: prevent flickering by adding a buffer
        if (prev) {
          // If already hidden, keep hidden until scrolled well above threshold
          // Buffer increased to 100px to handle layout shifts from header resizing
          return currentScroll >= threshold - 100;
        } else {
          // If visible, hide only when passing the threshold
          return currentScroll >= threshold;
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-royal-dark">
      {/* Secondary Header */}
      <div
        className={`transition-all duration-300 ease-in-out hidden min-[950px]:block relative z-60
          ${
            hideSecondary
              ? "max-h-0 opacity-0 overflow-hidden"
              : "max-h-[60px] opacity-100"
          }
        `}
      >
        <SecondaryHeader links={headerSocialLinks} />
      </div>

      {/* Primary Header (always visible) */}
      <PrimaryHeader sustainableProjects={sustainableProjects} />
    </header>
  );
};

export default Header;
