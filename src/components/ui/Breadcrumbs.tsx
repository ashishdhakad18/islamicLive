"use client";
import Link from "next/link";
import React, { useMemo } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { usePathname } from "next/navigation";

export interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  className?: string;
  theme?: "dark" | "light"; // dark theme = light text (for dark backgrounds)
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({
  className,
  theme = "light",
}) => {
  const pathname = usePathname();

  const items = useMemo(() => {
    if (!pathname) return [];
    return pathname
      .split("/")
      .filter(
        segment =>
          segment !== ""
          && segment !== "en"
          && segment !== "fr"
          && segment !== "de",
      )
      .map((segment, index, arr) => {
        const href = `/${arr.slice(0, index + 1).join("/")}`;
        const label
          = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");
        return { label, href };
      });
  }, [pathname]);

  const isDarkTheme = theme === "dark";
  const iconColor = isDarkTheme ? "text-yellow" : "text-primary";

  if (!items || items.length === 0) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn("flex items-center py-4", className)}
    >
      <ol className="flex items-center gap-2">
        {/* Home Icon */}
        <Link
          href="/"
          className={cn(
            "hover:opacity-80 transition-opacity flex items-center bg-yellow-surface p-1.5 rounded-full",
            iconColor,
          )}
        >
          <Image src="/Icons/Home-icon.svg" alt="Home" width={16} height={16} />
          <span className="sr-only">Home</span>
        </Link>

        {items.map((item, index) => {
          const isSustainableProjectParent
            = item.href.endsWith("/sustainable-projects")
              || item.label.toLowerCase() === "sustainable projects";

          return (
            <li key={item.href} className="flex items-center gap-2">
              {/* Separator */}
              <Image
                src="/Icons/Dropdown-down.svg"
                alt="Seperator-Icon"
                height={14}
                width={14}
                className="rotate-270"
              />

              {isSustainableProjectParent
                ? (
                    <span
                      className={cn(
                        "uppercase tracking-wider",
                        index === 0
                          ? "font-islamic text-[14px] leading-3 font-bold text-yellow"
                          : "type-body-4 mb-1 text-yellow-divider!",
                      )}
                    >
                      {item.label}
                    </span>
                  )
                : (
                    <Link
                      href={item.href}
                      className={cn(
                        "uppercase tracking-wider hover:underline underline-offset-4",
                        index === 0
                          ? "font-islamic text-[14px] leading-3 font-bold text-yellow"
                          : "type-body-4 mb-1 text-yellow-divider!",
                      )}
                      aria-current={index === items.length - 1 ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
