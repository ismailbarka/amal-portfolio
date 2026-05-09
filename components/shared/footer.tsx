'use client'

import Link from 'next/link'
import { Instagram, Mail, MapPin, Phone } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-foreground text-background pt-20 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 pb-12 border-b border-secondary/30">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-xl mb-4">ABS Design</h3>
            <p className="text-sm text-secondary leading-relaxed">
              Interior Architecture & Design Excellence
            </p>
            <p className="text-xs text-secondary/70 mt-3">
              Founded by Amal MARHFOUR
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-serif text-sm mb-4">Navigation</h4>
            <ul className="space-y-2">
              {[
                { name: 'Home', href: '/' },
                { name: 'About', href: '/about' },
                { name: 'Services', href: '/services' },
                { name: 'Portfolio', href: '/portfolio' },
                { name: 'References', href: '/references' },
              ].map((item) => (
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
            <h4 className="font-serif text-sm mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail size={16} className="mt-0.5 text-accent flex-shrink-0" />
                <a href="mailto:absdesigne@gmail.com" className="text-sm text-secondary hover:text-accent transition-colors">
                  absdesigne@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 text-accent flex-shrink-0" />
                <div className="text-sm text-secondary">
                  Casablanca, Anfa 20050<br />
                  Morocco
                </div>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-serif text-sm mb-4">Follow</h4>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/designbyamale"
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary hover:text-accent transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
            <p className="text-xs text-secondary/70 mt-4">
              @designbyamale
            </p>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8">
          <p className="text-xs text-secondary/60">
            © {currentYear} ABS Design. All rights reserved.
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
