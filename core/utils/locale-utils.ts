import { locales, type Locale, defaultLocale } from '../lib/i18n-config'

export function getLocaleFromPathname(pathname: string): Locale {
  const segments = pathname.split('/').filter(Boolean)
  const firstSegment = segments[0]

  if (firstSegment && isValidLocale(firstSegment)) {
    return firstSegment
  }

  return defaultLocale
}

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale)
}

export function getLocalePath(locale: Locale, path: string = ''): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path

  // If path is empty or just '/', return locale root
  if (!cleanPath || cleanPath === '/') {
    return `/${locale}`
  }

  // Remove locale prefix if it exists
  const pathWithoutLocale = cleanPath.startsWith('fr/') || cleanPath.startsWith('en/')
    ? cleanPath.split('/').slice(1).join('/')
    : cleanPath

  // Return locale-prefixed path
  return `/${locale}/${pathWithoutLocale}`.replace(/\/$/, '')
}

export function getCanonicalUrl(locale: Locale, pathname: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://absdesignepro.com'
  const cleanPath = pathname.startsWith('/') ? pathname : `/${pathname}`
  return `${baseUrl}${cleanPath}`
}

export function getAlternateUrls(pathname: string): {
  [key in Locale]: string
} {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://absdesignepro.com'
  const segments = pathname.split('/').filter(Boolean)

  // Remove locale from segments if present
  let pathWithoutLocale = segments
    .filter((seg) => !isValidLocale(seg))
    .join('/')

  if (!pathWithoutLocale) {
    pathWithoutLocale = ''
  }

  return {
    fr: `${baseUrl}/fr${pathWithoutLocale ? `/${pathWithoutLocale}` : ''}`,
    en: `${baseUrl}/en${pathWithoutLocale ? `/${pathWithoutLocale}` : ''}`,
  }
}
