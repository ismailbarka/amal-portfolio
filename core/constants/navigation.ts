/**
 * Navigation configuration for locale-aware routing
 * Defines all main navigation items with their paths
 */

export const NAV_ITEMS = {
  home: { key: 'home', path: '' },
  about: { key: 'about', path: 'about' },
  services: { key: 'services', path: 'services' },
  portfolio: { key: 'portfolio', path: 'portfolio' },
  references: { key: 'references', path: 'references' },
  contact: { key: 'contact', path: 'contact' },
} as const

export type NavKey = (typeof NAV_ITEMS)[keyof typeof NAV_ITEMS]['key']

/**
 * Get the nav key for the current pathname
 * Handles dynamic routes like portfolio/[slug]
 */
export function getActiveNavKey(pathname: string): NavKey | null {
  const segments = pathname.split('/').filter(Boolean)

  // Remove locale from first segment
  if (segments.length > 1 && (segments[0] === 'fr' || segments[0] === 'en')) {
    segments.shift()
  }

  const firstPath = segments[0]

  // Match nav items
  if (!firstPath) return 'home'
  if (firstPath === 'about') return 'about'
  if (firstPath === 'services') return 'services'
  if (firstPath === 'portfolio') return 'portfolio'
  if (firstPath === 'references') return 'references'
  if (firstPath === 'contact') return 'contact'

  return null
}

/**
 * Build a locale-aware navigation URL
 */
export function buildNavUrl(locale: string, navKey: NavKey): string {
  const path = NAV_ITEMS[navKey].path
  return path ? `/${locale}/${path}` : `/${locale}`
}
