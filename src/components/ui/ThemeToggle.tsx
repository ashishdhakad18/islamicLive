"use client";

import { useTheme } from "@/hooks/useTheme";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-grey-bg-dark transition-colors border border-grey-divider"
      aria-label="Toggle theme"
    >
      {theme === "light"
        ? (
            <Moon className="w-5 h-5 text-grey-grey" />
          )
        : (
            <Sun className="w-5 h-5 text-yellow" />
          )}
    </button>
  );
}
