"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { DropdownItem } from "@/types/header.types";

interface DropdownProps {
  label: string;
  items: DropdownItem[];
  className?: string;
  isMobile?: boolean; // Top-level mobile flag
  href?: string;
  // Controlled state for accordion behavior (parent manages open/close)
  isOpen?: boolean;
  onToggle?: () => void;
}

const NavigationDropdown: React.FC<DropdownProps> = ({
  label,
  items,
  className = "",
  isMobile = false,
  href,
  isOpen: controlledIsOpen,
  onToggle,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);

  // Use controlled state if provided, otherwise use internal state
  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close dropdown when clicking outside (desktop only)
  useEffect(() => {
    if (isMobile) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setInternalIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, isMobile]);

  const handleToggle = (e: React.MouseEvent) => {
    // If it's a link parent on mobile, we might want to navigate OR open dropdown.
    // Usually split button or arrow toggle is better.
    // Here we'll treat the whole row as toggle for simplicity if it has items.
    // If explicit href is there, typically you'd want to go there?
    // But for dropdowns "label" usually just opens it.
    if (items && items.length > 0) {
      e.preventDefault();
      e.stopPropagation();
      if (isControlled && onToggle) {
        onToggle();
      } else {
        setInternalIsOpen((prev) => !prev);
      }
    }
  };

  // Mobile Version (Recursive)
  if (isMobile) {
    return (
      <div className="w-full">
        <div className="w-full flex items-center justify-between py-2">
          {href ? (
            <Link
              href={href}
              className="type-btn-2 text-white tracking-wide hover:text-royal-light transition-colors"
            >
              {label}
            </Link>
          ) : (
            <span
              className="type-btn-2 text-white tracking-wide cursor-pointer"
              onClick={handleToggle}
            >
              {label}
            </span>
          )}

          {items?.length > 0 && (
            <button onClick={handleToggle} className="p-1 focus:outline-none">
              <Image
                src="/Icons/Dropdown-down.svg"
                alt=""
                width={12}
                height={12}
                className={`transition-transform duration-300 ${
                  isOpen ? "rotate-180 " : ""
                }`}
              />
            </button>
          )}
        </div>

        {/* Slide layer */}
        <div
          className={`grid transition-all duration-400 ease-[cubic-bezier(.16,1,.3,1)]
        ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
        >
          <div className="overflow-hidden">
            <div className="ml-4 mt-2 space-y-3 border-l border-white/10 pl-4">
              {items.map((item, index) =>
                item.items ? (
                  <NavigationDropdown
                    key={index}
                    label={item.label}
                    items={item.items}
                    href={item.href}
                    isMobile
                  />
                ) : (
                  <Link
                    key={index}
                    href={item.href || "#"}
                    className="block type-body-4 text-white/70 hover:text-white hover:translate-x-1 transition-all"
                  >
                    {item.label}
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Desktop Version
  return (
    <div
      className={`relative inline-block text-left ${className}`}
      ref={dropdownRef}
      onMouseEnter={() => setInternalIsOpen(true)}
      onMouseLeave={() => setInternalIsOpen(false)}
    >
      {/* Trigger */}
      <div className="flex items-center gap-2 cursor-pointer">
        {href ? (
          <Link
            href={href}
            className="type-btn-2 text-white uppercase hover:text-royal-light transition-colors"
          >
            {label}
          </Link>
        ) : (
          <span className="type-btn-2 text-white uppercase cursor-pointer">
            {label}
          </span>
        )}
        {items && items.length > 0 && (
          <button
            ref={buttonRef}
            onClick={() => setInternalIsOpen(!isOpen)}
            className="focus:outline-none"
          >
            <Image
              src="/Icons/Dropdown-down.svg"
              alt=""
              width={16}
              height={16}
              className={`transition-transform duration-300 ease-in-out ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>
        )}
      </div>

      {/* Main Dropdown */}
      <div
        className={`absolute left-0 mt-2 w-64 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-100 origin-top-right transition-all duration-200 ease-in-out ${
          isOpen
            ? "opacity-100 scale-100 visible translate-y-0"
            : "opacity-0 scale-95 invisible -translate-y-2"
        }`}
      >
        <div className="py-2">
          {items.map((item, index) => (
            <div
              key={index}
              className="px-4 py-2 hover:bg-gray-50 group relative"
            >
              {item.items && item.items.length > 0 ? (
                // Sub-menu Trigger
                <div className="flex items-center justify-between w-full cursor-pointer">
                  <Link
                    href={item.href || "#"}
                    className="type-body-4 text-gray-700 group-hover:text-primary transition-colors flex-1"
                  >
                    {item.label}
                  </Link>
                  <svg
                    className="w-4 h-4 text-gray-400 group-hover:text-primary -rotate-90"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>

                  {/* Sub-menu (Recursive) - Displayed on Group Hover */}
                  <div className="absolute left-full top-0 w-64 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 invisible opacity-0 -translate-x-2 group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 z-110">
                    <div className="py-2">
                      {item.items.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          href={subItem.href || "#"}
                          className="block px-4 py-2 type-body-4 text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : item.onClick ? (
                <div
                  onClick={() => {
                    item.onClick?.();
                    setInternalIsOpen(false);
                  }}
                  className="block type-body-4 text-gray-700 group-hover:text-primary transition-colors cursor-pointer"
                >
                  {item.label}
                </div>
              ) : (
                // Simple Link
                <Link
                  href={item.href || "#"}
                  className="block type-body-4 text-gray-700 group-hover:text-primary transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavigationDropdown;
