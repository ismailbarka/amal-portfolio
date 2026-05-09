import type { Metadata } from 'next'
import { isValidLocale } from '@/core/lib/i18n-config'
import { getDictionary } from '@/core/lib/get-dictionary'
import { LocaleHeader } from '@/components/layout/locale-header'
import { LocaleFooter } from '@/components/layout/locale-footer'
import { notFound } from 'next/navigation'
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
  const pathname = `/${locale}/references`
  const alternates = getAlternateUrls(pathname)

  return {
    title: dict.references.pageTitle,
    description: dict.references.pageDescription,
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

export default async function References({
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
            {locale === 'fr' ? 'Nos Clients' : 'Our Clients'}
          </p>
          <h1 className="font-serif text-6xl md:text-7xl text-foreground leading-tight">
            {dict.references.title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
            {dict.references.subtitle}
          </p>
        </div>
      </section>

      {/* Credentials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/5">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {dict.references.credentials.map((cred, idx) => (
              <div key={idx} className="p-6 bg-background rounded-lg shadow-sm">
                <p className="font-serif text-2xl text-accent mb-2">
                  {cred.split('+')[0]}+
                </p>
                <p className="text-sm text-muted-foreground">
                  {cred.substring(cred.indexOf('+') + 2)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-16">
          {[
            {
              titleKey: 'bankingTitle',
              descKey: 'bankingDesc',
              clients: ['Bank of Africa', 'Attijariwafa Bank', 'Banque Populaire'],
            },
            {
              titleKey: 'residentialTitle',
              descKey: 'residentialDesc',
              clients: ['Villa Laimoun', 'Villa Temara', 'Residential Portfolio'],
            },
            {
              titleKey: 'professionalTitle',
              descKey: 'professionalDesc',
              clients: ['Corporate Offices', 'Business Centers', 'Professional Spaces'],
            },
          ].map((sector, idx) => (
            <div key={idx}>
              <div className="mb-8">
                <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-3">
                  {dict.references[sector.titleKey as keyof typeof dict.references]}
                </h2>
                <p className="text-lg text-muted-foreground">
                  {dict.references[sector.descKey as keyof typeof dict.references]}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {sector.clients.map((client, cIdx) => (
                  <div key={cIdx} className="p-8 border-2 border-border hover:border-accent transition-colors rounded-lg text-center">
                    <h3 className="font-serif text-xl text-foreground mb-2">{client}</h3>
                    <p className="text-sm text-accent mb-3">
                      {idx === 0 ? (locale === 'fr' ? 'Secteur Bancaire' : 'Banking Sector') : idx === 1 ? (locale === 'fr' ? 'Résidentiel' : 'Residential') : (locale === 'fr' ? 'Professionnel' : 'Professional')}
                    </p>
                    <p className="text-sm text-muted-foreground">{locale === 'fr' ? '5+ Projets' : '5+ Projects'}</p>
                  </div>
                ))}
              </div>

              {idx < 2 && <hr className="my-8 border-border" />}
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-serif text-4xl text-foreground mb-12 text-center">
            {dict.references.testimonialTitle}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {dict.references.testimonials.map((testimonial, idx) => (
              <div key={idx} className="space-y-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-accent text-lg">★</span>
                  ))}
                </div>
                <p className="text-lg text-foreground italic leading-relaxed">
                  "{testimonial.text}"
                </p>
                <p className="text-sm text-muted-foreground font-semibold">
                  — {testimonial.author}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LocaleFooter locale={locale} dictionary={dict} />
    </div>
  )
}
