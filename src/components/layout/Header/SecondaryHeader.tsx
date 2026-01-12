"use client";
import React from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

import { SocialLinkItem, DropdownItem } from "@/types/header.types";
import NavigationDropdown from "@/components/ui/NavigationDropdown";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { toggleTheme } from "@/store/slices/uiSlice";
import { locales, Locale } from "@/config/i18n.config";

interface SecondaryHeaderProps {
  links?: SocialLinkItem[];
}

const ICON_SRC_MAP: Record<SocialLinkItem["type"], string> = {
  facebook: "/Icons/Header-Icons/Facebook.svg",
  whatsapp: "/Icons/Header-Icons/Whatsapp.svg",
  tiktok: "/Icons/Header-Icons/Tiktok.svg",
  instagram: "/Icons/Header-Icons/Instagram.svg",
  linkedin: "/Icons/Header-Icons/LinkedIn.svg",
  youtube: "/Icons/Header-Icons/YouTube.svg",
  light: "/Icons/Header-Icons/Sun.svg",
  dark: "/Icons/Header-Icons/Sun.svg",
  default: "/Icons/Header-Icons/Sun.svg",
};

/**
 * SecondaryHeader renders a simple bar; by default it shows no links.
 * Pass `links` to render dynamic social buttons on the left.
 */
const SecondaryHeader: React.FC<SecondaryHeaderProps> = ({ links = [] }) => {
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector((state) => state.ui);
  const router = useRouter();
  const pathname = usePathname();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const hasLinks = links.length > 0;

  // Extract current locale from URL
  const currentLocale = (
    locales.find((l) => pathname.startsWith(`/${l}`)) || "en"
  ).toUpperCase();

  // Helper to switch locale
  const switchLocale = (newLocale: string) => {
    const pathWithoutLocale = pathname.replace(/^\/(en|fr|de)/, "");
    router.push(`/${newLocale.toLowerCase()}${pathWithoutLocale || "/"}`);
  };

  let leftContent: React.ReactNode;
  if (hasLinks) {
    leftContent = (
      <div className="flex text-white">
        {links.map((item, idx) => {
          const iconSrc = ICON_SRC_MAP[item.type] ?? ICON_SRC_MAP.default;

          return (
            <a
              key={`${item.type}-${item.href}`}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className={`flex items-center p-[11px] border-r border-t-0 border-b-0 border-grey-grey transition-colors ${
                idx === 0 ? "pl-8 border-l-grey-grey" : ""
              } `}
              aria-label={item.label || item.type}
            >
              <Image
                src={iconSrc}
                alt={item.label || item.type}
                width={20}
                height={15}
                className="w-[20px] h-[15px]"
              />
              {item.label ? (
                <span className="type-btn-2 mt-1">{item.label}</span>
              ) : null}
            </a>
          );
        })}
        {/* Dynamic Theme Toggle */}
        <button
          onClick={() => dispatch(toggleTheme())}
          className="flex items-center p-[11px] border-r border-t-0 border-b-0 border-grey-grey transition-colors px-6"
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
        >
          <Image
            src={ICON_SRC_MAP.light}
            alt="Theme Icon"
            width={20}
            height={15}
            className="w-[20px] h-[15px]"
          />
          <span className="type-btn-2 mt-1 uppercase ml-2">
            {theme === "light" ? "DARK" : "LIGHT"}
          </span>
        </button>
      </div>
    );
  } else {
    leftContent = <div />;
  }

  return (
    <div className="w-full  text-white">
      <div className="mx-auto flex items-stretch justify-between border-b border-grey-grey">
        {leftContent}
        <div className="flex items-stretch">
          <div className="flex cursor-pointer items-center gap-2 border-l border-r border-grey-grey px-6  transition-colors">
            <Image
              src="/Icons/Globe.svg"
              alt="Globe Icon"
              width={15}
              height={15}
            />
            {/* <span className="type-btn-2 h-[13px]">EN</span>
            <Image
              src="/Icons/Dropdown-Down.svg"
              alt="Arrow Icon"
              width={18}
              height={15}
            /> */}
            <NavigationDropdown
              label={currentLocale}
              className="type-btn-2 mt-1"
              items={[
                {
                  label: "EN",
                  onClick: () => switchLocale("en"),
                },
                {
                  label: "FR",
                  onClick: () => switchLocale("fr"),
                },
                {
                  label: "DE",
                  onClick: () => switchLocale("de"),
                },
              ]}
            />
          </div>

          <a
            href="/join-us"
            className="flex items-center gap-2 border-r border-grey-grey px-6 transition-colors"
          >
            <span className="type-btn-2 uppercase mt-1">JOIN US</span>
          </a>

          <a
            href="/contact-us"
            className="flex items-center gap-2 border-r border-grey-grey px-6  transition-colors"
          >
            <Image
              src="/Icons/Call.svg"
              alt="Phone Icon"
              width={15}
              height={15}
            />
            <span className="type-btn-2 uppercase mt-1">CALL US</span>
          </a>

          <div
            onClick={() => {
              inputRef.current?.focus();
            }}
            className="flex cursor-pointer items-center gap-2 border-r border-grey-grey px-6  pr-8  transition-colors group"
          >
            <Image
              src="/Icons/Search.svg"
              alt="Search Icon"
              width={20}
              height={15}
            />
            <input
              ref={inputRef}
              type="text"
              placeholder="SEARCH HERE"
              className="type-btn-2 w-full bg-transparent border-none outline-none text-white h-[16px] placeholder:text-grey-inactive  uppercase mt-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondaryHeader;
