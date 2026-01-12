import { Locale, defaultLocale, locales } from "@/config/i18n.config";

/**
 * Extracts and validates the locale from page params.
 * Use in async server components.
 *
 * @param params - The page params promise containing locale
 * @returns Valid Locale string
 *
 * @example
 * ```tsx
 * export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
 *   const locale = await getValidLocale(params);
 *   const data = await getPageData(locale);
 * }
 * ```
 */
export async function getValidLocale(
  params: Promise<{ locale: string }>
): Promise<Locale> {
  const { locale } = await params;
  return (locales as readonly string[]).includes(locale)
    ? (locale as Locale)
    : defaultLocale;
}
