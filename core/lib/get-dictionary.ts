import type { Locale } from './i18n-config'
import { defaultLocale, isValidLocale } from './i18n-config'

const dictionaries = {
  fr: () => import('../../locales/fr.json').then((module) => module.default),
  en: () => import('../../locales/en.json').then((module) => module.default),
}

export async function getDictionary(locale: string) {
  const validLocale = isValidLocale(locale) ? locale : defaultLocale
  return dictionaries[validLocale]()
}

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>
