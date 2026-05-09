import type { Metadata } from 'next'
import Image from 'next/image'
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
  const pathname = `/${locale}/about`
  const alternates = getAlternateUrls(pathname)

  return {
    title: dict.about.pageTitle,
    description: dict.about.pageDescription,
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

export default async function About({
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
            {locale === 'fr' ? 'À Propos' : 'About'}
          </p>
          <h1 className="font-serif text-6xl md:text-7xl text-foreground leading-tight">
            {dict.about.title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
            {dict.about.bio}
          </p>
        </div>
      </section>

      {/* Main Image */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20">
        <div className="relative h-96 md:h-[500px] rounded-lg overflow-hidden shadow-lg">
          <Image
            src="/images/amal-portrait.jpg"
            alt="Amal MARHFOUR - Interior Architect"
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* Bio Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/5">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Main Bio */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
                  {locale === 'fr' ? 'Parcours Professionnel' : 'Professional Journey'}
                </h2>
                <p className="text-lg text-foreground leading-relaxed mb-6">
                  {locale === 'fr'
                    ? 'Forte d\'une expertise de plus d\'une décennie en architecture d\'intérieur et design, Amal MARHFOUR s\'est établie comme une figure de premier plan du design d\'intérieur de luxe à Casablanca et au-delà.'
                    : 'With over a decade of expertise in interior architecture and design, Amal MARHFOUR has established herself as a leading figure in luxury interior design across Casablanca and beyond.'}
                </p>
                <p className="text-base text-muted-foreground leading-relaxed">
                  {locale === 'fr'
                    ? 'Sa philosophie de design est centrée sur la création d\'espaces qui transcendent la simple esthétique. Chaque projet est considéré comme une opportunité de comprendre non seulement ce que les clients ont besoin, mais ce qui transformera leur façon de vivre, de travailler et de prospérer.'
                    : 'Her design philosophy centers on creating spaces that transcend mere aesthetics. Each project is approached as an opportunity to understand not just what clients need, but what will transform how they live, work, and thrive within their spaces.'}
                </p>
              </div>

              <div className="pt-8 border-t border-border">
                <h3 className="font-serif text-2xl text-foreground mb-6">
                  {dict.about.philosophyTitle}
                </h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      {locale === 'fr' ? 'Luxe avec Intention' : 'Luxury with Purpose'}
                    </h4>
                    <p className="text-muted-foreground">
                      {locale === 'fr'
                        ? 'Le luxe ne consiste pas en l\'excès. Il s\'agit d\'intentionnalité, de qualité et de créer des environnements qui se sentent élevés mais vivables. Chaque élément a un but.'
                        : "Luxury is not about excess. It's about intentionality, quality, and creating environments that feel elevated yet livable. Every element serves a purpose."}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      {locale === 'fr' ? 'Minimalisme comme Expression' : 'Minimalism as Expression'}
                    </h4>
                    <p className="text-muted-foreground">
                      {locale === 'fr'
                        ? 'En supprimant l\'inutile, nous mettons en évidence ce qui compte vraiment. Le minimalisme permet aux espaces de respirer et laisse briller les matériaux et les formes soigneusement sélectionnés.'
                        : 'By removing the unnecessary, we highlight what truly matters. Minimalism allows spaces to breathe and lets the carefully selected materials and forms shine.'}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">
                      {locale === 'fr' ? 'Maîtrise Technique & Artistique' : 'Technical Mastery Meets Artistry'}
                    </h4>
                    <p className="text-muted-foreground">
                      {locale === 'fr'
                        ? 'La précision technique sans la sensibilité artistique produit des espaces stériles. L\'art sans compétence technique compromet la fonctionnalité. Nous cherchons l\'équilibre parfait.'
                        : 'Technical precision without artistic sensitivity produces sterile spaces. Art without technical competence compromises functionality. We seek the perfect balance.'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t border-border">
                <h3 className="font-serif text-2xl text-foreground mb-6">
                  {dict.about.valuesTitle}
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  {dict.about.values.map((value, idx) => (
                    <div key={idx}>
                      <h4 className="font-semibold text-foreground mb-2">{value.title}</h4>
                      <p className="text-sm text-muted-foreground">{value.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                <div className="p-6 bg-secondary/10 rounded-lg">
                  <h4 className="font-serif text-lg text-foreground mb-4">{dict.about.expertiseTitle}</h4>
                  <ul className="space-y-3">
                    {dict.about.expertise.map((item, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-accent mt-1.5 flex-shrink-0">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <LocaleFooter locale={locale} dictionary={dict} />
    </div>
  )
}
