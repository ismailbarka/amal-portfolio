import type { Metadata } from 'next'
import Link from 'next/link'
import { isValidLocale } from '@/core/lib/i18n-config'
import { getDictionary } from '@/core/lib/get-dictionary'
import { LocaleHeader } from '@/components/layout/locale-header'
import { LocaleFooter } from '@/components/layout/locale-footer'
import { notFound } from 'next/navigation'
import { ArrowRight } from 'lucide-react'
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
  const pathname = `/${locale}/services`
  const alternates = getAlternateUrls(pathname)

  return {
    title: dict.services.pageTitle,
    description: dict.services.pageDescription,
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

export default async function Services({
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
            {locale === 'fr' ? 'Ce que nous faisons' : 'What We Do'}
          </p>
          <h1 className="font-serif text-6xl md:text-7xl text-foreground leading-tight">
            {dict.services.title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
            {dict.services.subtitle}
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {dict.services.services.map((service, idx) => (
              <div key={idx} className="space-y-6 pb-12 border-b border-border last:border-0">
                <div>
                  <h2 className="font-serif text-3xl text-foreground mb-3">
                    {service.title}
                  </h2>
                  <p className="text-lg text-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">
                    {locale === 'fr' ? 'Avantages' : 'Benefits'}
                  </h4>
                  <ul className="space-y-3">
                    {service.benefits.map((benefit, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                        <span className="text-base text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <Link
                    href={`/${locale}/contact`}
                    className="text-accent hover:text-foreground transition-colors text-sm font-medium flex items-center gap-2 pt-4"
                  >
                    {dict.services.learnMore} <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/5">
        <div className="max-w-5xl mx-auto">
          <div className="mb-16">
            <p className="text-sm uppercase tracking-widest text-accent mb-3">
              {locale === 'fr' ? 'Notre Processus' : 'Our Process'}
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground">
              {locale === 'fr' ? 'Comment nous travaillons' : 'How We Work'}
            </h2>
          </div>

          <div className="space-y-8">
            {[
              {
                number: '01',
                titleFr: 'Consultation Initiale',
                titleEn: 'Initial Consultation',
                descFr: 'Nous nous rencontrons pour comprendre votre vision, vos exigences et votre budget. Nous écoutons, posons des questions détaillées et construisons la confiance.',
                descEn: 'We meet to understand your vision, requirements, and budget. This is where we listen, ask detailed questions, and build trust.',
              },
              {
                number: '02',
                titleFr: 'Concept & Design',
                titleEn: 'Concept & Design',
                descFr: 'Nous créons des concepts détaillés, des plans et des rendus 3D photoréalistes pour présenter votre projet.',
                descEn: 'We create detailed concepts, plans, and photorealistic 3D renderings to present your project.',
              },
              {
                number: '03',
                titleFr: 'Approbation & Affinement',
                titleEn: 'Approval & Refinement',
                descFr: 'Nous raffinons les designs en fonction de vos retours jusqu\'à la perfection.',
                descEn: 'We refine designs based on your feedback until perfect.',
              },
              {
                number: '04',
                titleFr: 'Exécution & Supervision',
                titleEn: 'Execution & Supervision',
                descFr: 'Nos équipes supervisent la mise en œuvre avec attention aux détails et respect des délais.',
                descEn: 'Our teams supervise implementation with attention to detail and schedule adherence.',
              },
              {
                number: '05',
                titleFr: 'Livraison Finale',
                titleEn: 'Final Delivery',
                descFr: 'Inspection qualité complète et livraison de votre projet transformé.',
                descEn: 'Complete quality inspection and delivery of your transformed project.',
              },
            ].map((step) => (
              <div key={step.number} className="flex gap-8 items-start">
                <div className="text-5xl font-serif text-accent flex-shrink-0 w-20">{step.number}</div>
                <div className="flex-grow pt-2">
                  <h3 className="font-serif text-2xl text-foreground mb-3">
                    {locale === 'fr' ? step.titleFr : step.titleEn}
                  </h3>
                  <p className="text-muted-foreground">
                    {locale === 'fr' ? step.descFr : step.descEn}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-foreground text-background">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="font-serif text-4xl md:text-5xl">
            {locale === 'fr' ? 'Prêt à commencer?' : 'Ready to Get Started?'}
          </h2>
          <p className="text-lg text-secondary">
            {locale === 'fr'
              ? "Contactez-nous pour une consultation sans engagement et découvrez comment nous pouvons transformer votre espace."
              : 'Contact us for a no-obligation consultation and discover how we can transform your space.'}
          </p>
          <Link
            href={`/${locale}/contact`}
            className="inline-block px-8 py-3 bg-background text-foreground hover:bg-accent transition-all duration-300 text-sm font-medium"
          >
            {dict.navigation.contact}
          </Link>
        </div>
      </section>

      <LocaleFooter locale={locale} dictionary={dict} />
    </div>
  )
}
