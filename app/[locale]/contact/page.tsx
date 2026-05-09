import type { Metadata } from 'next'
import Link from 'next/link'
import { isValidLocale } from '@/core/lib/i18n-config'
import { getDictionary } from '@/core/lib/get-dictionary'
import { LocaleHeader } from '@/components/layout/locale-header'
import { LocaleFooter } from '@/components/layout/locale-footer'
import { notFound } from 'next/navigation'
import { Mail, MapPin } from 'lucide-react'
import { ContactForm } from './ContactForm'
import { getCanonicalUrl, getAlternateUrls } from '@/core/utils/locale-utils'

export async function generateMetadata(
  props: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const params = await props.params
  const locale = params.locale

  if (!isValidLocale(locale)) {
    return {}
  }

  const dict = await getDictionary(locale)
  const pathname = `/${locale}/contact`
  const alternates = getAlternateUrls(pathname)

  return {
    title: dict.contact.pageTitle,
    description: dict.contact.pageDescription,
    canonical: getCanonicalUrl(locale, pathname),
    alternates: {
      canonical: getCanonicalUrl(locale, pathname),
      languages: {
        'fr-FR': alternates.fr,
        'en-US': alternates.en,
      },
    },
  }
}

export default async function Contact({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!isValidLocale(locale)) {
    notFound()
  }

  const dict = await getDictionary(locale)

  return (
    <div className="min-h-screen bg-background">
      <LocaleHeader locale={locale} dictionary={dict} />

      {/* Hero */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-widest text-accent">
            {locale === 'fr' ? 'Parlons' : 'Get In Touch'}
          </p>
          <h1 className="font-serif text-6xl md:text-7xl text-foreground leading-tight">
            {dict.contact.title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
            {dict.contact.description}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            <ContactForm dict={dict} />
          </div>

          {/* Info */}
          <div className="space-y-8">
            {/* Contact Info */}
            <div>
              <h3 className="font-serif text-xl text-foreground mb-6">
                {dict.contact.infoTitle}
              </h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <Mail size={20} className="text-accent flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Email</p>
                    <a href={`mailto:${dict.common.email}`} className="text-foreground hover:text-accent transition-colors">
                      {dict.common.email}
                    </a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <MapPin size={20} className="text-accent flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Address</p>
                    <p className="text-foreground">{dict.common.address}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div>
              <h3 className="font-serif text-xl text-foreground mb-6">
                {dict.contact.businessHoursTitle}
              </h3>
              <div className="space-y-2">
                {dict.contact.businessHours.map((hour, idx) => (
                  <p key={idx} className="text-sm text-muted-foreground">{hour}</p>
                ))}
              </div>
            </div>

            {/* Social */}
            <div>
              <h3 className="font-serif text-xl text-foreground mb-4">
                {locale === 'fr' ? 'Nous Suivre' : 'Follow Us'}
              </h3>
              <a
                href={`https://instagram.com/${dict.common.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-accent hover:text-foreground transition-colors"
              >
                Instagram @{dict.common.instagram}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-4xl text-foreground mb-12 text-center">
            {dict.contact.faqTitle}
          </h2>

          <div className="space-y-6">
            {dict.contact.faq.map((item, idx) => (
              <details key={idx} className="p-6 border border-border hover:border-accent transition-colors group cursor-pointer">
                <summary className="font-semibold text-foreground flex justify-between items-center">
                  {item.question}
                  <span className="text-accent group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="text-muted-foreground mt-4 text-sm leading-relaxed">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <LocaleFooter locale={locale} dictionary={dict} />
    </div>
  )
}


