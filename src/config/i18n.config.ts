// src/config/i18n.config.ts

export const locales = ['en', 'fr', 'de'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

// Strapi uses different locale codes
export const strapiLocaleMap: Record<Locale, string> = {
  en: 'en',
  fr: 'fr',
  de: 'de',
};
