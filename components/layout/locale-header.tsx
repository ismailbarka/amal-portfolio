'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { LocaleSwitcher } from '../shared/locale-switcher'
import { getActiveNavKey } from '@/core/constants/navigation'
import type { Locale } from '@/core/lib/i18n-config'
import type { Dictionary } from '@/core/lib/get-dictionary'

interface LocaleHeaderProps {
  locale: Locale
  dictionary: Dictionary
}

export function LocaleHeader({ locale, dictionary }: LocaleHeaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const activeNavKey = getActiveNavKey(pathname)

  const navigation = [
    { key: 'about', name: dictionary.navigation.about, href: `/${locale}/about` },
    { key: 'services', name: dictionary.navigation.services, href: `/${locale}/services` },
    { key: 'portfolio', name: dictionary.navigation.portfolio, href: `/${locale}/portfolio` },
    { key: 'references', name: dictionary.navigation.references, href: `/${locale}/references` },
    { key: 'contact', name: dictionary.navigation.contact, href: `/${locale}/contact` },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex flex-col leading-none flex-shrink-0">
            <span className="text-lg font-serif font-semibold text-foreground">ABS Design</span>
            <span className="text-xs text-muted-foreground">Interior Architecture</span>
          </Link>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden lg:flex items-center gap-12 flex-1 justify-center">
            {navigation.map((item) => {
              const isActive = activeNavKey === item.key
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`text-sm transition-all duration-300 relative group ${
                    isActive
                      ? 'font-bold text-foreground'
                      : 'font-medium text-foreground hover:text-accent'
                  }`}
                >
                  {item.name}
                  <span
                    className={`absolute bottom-0 left-0 h-px bg-accent transition-all duration-300 ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  ></span>
                </Link>
              )
            })}
          </nav>

          {/* Desktop Controls */}
          <div className="hidden lg:flex items-center gap-6 flex-shrink-0">
            <LocaleSwitcher currentLocale={locale} />
          </div>

          {/* Mobile: Locale Switcher + Menu */}
          <div className="md:hidden flex items-center gap-3 flex-shrink-0">
            <LocaleSwitcher currentLocale={locale} />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-foreground hover:text-accent transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Tablet: Locale Switcher + Menu */}
          <div className="hidden md:flex lg:hidden items-center gap-3 flex-shrink-0">
            <LocaleSwitcher currentLocale={locale} />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-foreground hover:text-accent transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="lg:hidden pb-6 space-y-2 border-t border-border pt-6">
            {navigation.map((item) => {
              const isActive = activeNavKey === item.key
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`block px-4 py-2 text-sm transition-colors ${
                    isActive
                      ? 'font-bold text-foreground bg-secondary/10'
                      : 'text-foreground hover:text-accent'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              )
            })}
          </nav>
        )}
      </div>
    </header>
  )
}
