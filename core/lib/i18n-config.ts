export const locales = ['fr', 'en'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'fr'

export const localeNames: Record<Locale, string> = {
  fr: 'Français',
  en: 'English',
}

export const localeLabels: Record<Locale, string> = {
  fr: 'FR',
  en: 'EN',
}

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale)
}
