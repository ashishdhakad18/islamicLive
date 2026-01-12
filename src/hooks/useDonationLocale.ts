"use client";
import { useParams } from "next/navigation";
import { Locale, defaultLocale, locales } from "@/config/i18n.config";

/**
 * Hook to get the current locale from URL params.
 * Falls back to default locale if not found or invalid.
 */
export function useDonationLocale(): Locale {
  const params = useParams();
  const locale = params?.locale as string | undefined;

  if (locale && (locales as readonly string[]).includes(locale)) {
    return locale as Locale;
  }

  return defaultLocale;
}
