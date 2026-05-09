'use client'

import Link from 'next/link'
import { Instagram, Mail, MapPin } from 'lucide-react'
import type { Locale } from '@/core/lib/i18n-config'
import type { Dictionary } from '@/core/lib/get-dictionary'

interface LocaleFooterProps {
  locale: Locale
  dictionary: Dictionary
}

export function LocaleFooter({ locale, dictionary }: LocaleFooterProps) {
  const currentYear = new Date().getFullYear()

  const navigationLinks = [
    { name: dictionary.navigation.home, href: `/${locale}` },
    { name: dictionary.navigation.about, href: `/${locale}/about` },
    { name: dictionary.navigation.services, href: `/${locale}/services` },
    { name: dictionary.navigation.portfolio, href: `/${locale}/portfolio` },
    { name: dictionary.navigation.references, href: `/${locale}/references` },
  ]

  return (
    <footer className="bg-foreground text-background pt-20 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 pb-12 border-b border-secondary/30">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-xl mb-4">{dictionary.footer.aboutTitle}</h3>
            <p className="text-sm text-secondary leading-relaxed">
              {dictionary.footer.about}
            </p>
            <p className="text-xs text-secondary/70 mt-3">
              Amal MARHFOUR
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-serif text-sm mb-4">{dictionary.footer.quickLinksTitle}</h4>
            <ul className="space-y-2">
              {navigationLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-secondary hover:text-accent transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h4 className="font-serif text-sm mb-4">{dictionary.footer.contactTitle}</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail size={16} className="mt-0.5 text-accent flex-shrink-0" />
                <a
                  href={`mailto:${dictionary.common.email}`}
                  className="text-sm text-secondary hover:text-accent transition-colors"
                >
                  {dictionary.common.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 text-accent flex-shrink-0" />
                <div className="text-sm text-secondary">
                  {dictionary.common.address}
                </div>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-serif text-sm mb-4">{dictionary.footer.followTitle}</h4>
            <div className="flex gap-4">
              <a
                href={`https://instagram.com/${dictionary.common.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:text-accent transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
            <p className="text-xs text-secondary/70 mt-4">
              @{dictionary.common.instagram}
            </p>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8">
          <p className="text-xs text-secondary/60">
            © {currentYear} {dictionary.common.siteName}. {dictionary.common.allRightsReserved}.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-xs text-secondary/60 hover:text-secondary transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-xs text-secondary/60 hover:text-secondary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
