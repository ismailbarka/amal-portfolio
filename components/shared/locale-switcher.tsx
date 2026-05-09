'use client'

import { usePathname } from 'next/navigation'
import { locales, localeLabels, type Locale } from '@/core/lib/i18n-config'
import { getLocalePath } from '@/core/utils/locale-utils'

interface LocaleSwitcherProps {
  currentLocale: Locale
}

export function LocaleSwitcher({ currentLocale }: LocaleSwitcherProps) {
  const pathname = usePathname()

  const handleLocaleChange = (newLocale: Locale) => {
    if (newLocale === currentLocale) return

    // Get the path without the current locale prefix
    const segments = pathname.split('/').filter(Boolean)
    let pathWithoutLocale = segments
      .filter((seg) => !locales.includes(seg as Locale))
      .join('/')

    // Build the new path with the new locale
    const newPath = getLocalePath(newLocale, pathWithoutLocale)

    // Full page reload to ensure server components re-render with new locale
    window.location.href = newPath
  }

  return (
    <div className="flex items-center gap-1 bg-secondary/10 rounded-full p-1">
      {locales.map((locale) => (
        <button
          key={locale}
          onClick={() => handleLocaleChange(locale)}
          className={`px-3 py-1 text-xs font-medium uppercase tracking-wider rounded-full transition-all duration-300 ${
            currentLocale === locale
              ? 'bg-foreground text-background'
              : 'text-foreground hover:bg-secondary/20'
          }`}
          aria-label={`Switch to ${localeLabels[locale]}`}
        >
          {localeLabels[locale]}
        </button>
      ))}
    </div>
  )
}
