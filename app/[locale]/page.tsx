import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { isValidLocale } from '@/core/lib/i18n-config'
import { getDictionary } from '@/core/lib/get-dictionary'
import { LocaleHeader } from '@/components/layout/locale-header'
import { LocaleFooter } from '@/components/layout/locale-footer'
import { getFeaturedProjects } from '@/core/constants/projects'
import { services } from '@/core/constants/services'
import { ArrowRight } from 'lucide-react'
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
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://absdesignepro.com'
  const pathname = `/${locale}`
  const alternates = getAlternateUrls(pathname)

  return {
    title: dict.seo.homeTitle,
    description: dict.seo.homeDescription,
    canonical: getCanonicalUrl(locale, pathname),
    alternates: {
      canonical: getCanonicalUrl(locale, pathname),
      languages: {
        'fr-FR': alternates.fr,
        'en-US': alternates.en,
        'x-default': alternates.fr,
      },
    },
    openGraph: {
      title: dict.seo.homeTitle,
      description: dict.seo.homeDescription,
      url: getCanonicalUrl(locale, pathname),
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
    },
  }
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!isValidLocale(locale)) {
    notFound()
  }

  const dict = await getDictionary(locale)
  const featuredProjects = getFeaturedProjects()

  return (
    <div className="min-h-screen bg-background">
      <LocaleHeader locale={locale} dictionary={dict} />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div className="space-y-8">
            <div>
              <p className="text-sm uppercase tracking-widest text-accent mb-4">
                {dict.navigation.services} & Design
              </p>
              <h1 className="font-serif text-6xl md:text-7xl text-foreground leading-tight">
                {dict.hero.title}
              </h1>
              <p className="text-xl text-muted-foreground mt-6 leading-relaxed max-w-lg">
                {dict.hero.subtitle}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/${locale}/portfolio`}
                className="px-8 py-3 bg-foreground text-background hover:bg-accent hover:text-foreground transition-all duration-300 text-sm font-medium flex items-center justify-center gap-2"
              >
                {dict.hero.cta} <ArrowRight size={16} />
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="px-8 py-3 border-2 border-foreground text-foreground hover:bg-foreground hover:text-background transition-all duration-300 text-sm font-medium"
              >
                {dict.navigation.contact}
              </Link>
            </div>

            {/* Credentials */}
            <div className="pt-8 border-t border-border">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-4">
                {locale === 'fr' ? 'De confiance pour les institutions' : 'Trusted by Leading Institutions'}
              </p>
              <div className="flex flex-wrap gap-6">
                {['Bank of Africa', 'Attijariwafa Bank', 'Banque Populaire'].map((org) => (
                  <span key={org} className="text-sm text-foreground font-medium px-3 py-1.5 border border-border/50 rounded-sm">
                    {org}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Featured Image */}
          <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/images/hero-main.png"
              alt={locale === 'fr' ? 'Salon de luxe design par ABS Design' : 'Luxury living room designed by ABS Design'}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 to-transparent" />
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-sm uppercase tracking-widest text-accent mb-3">
                {locale === 'fr' ? 'Travaux récents' : 'Recent Work'}
              </p>
              <h2 className="font-serif text-4xl md:text-5xl text-foreground">
                {locale === 'fr' ? 'Projets en vedette' : 'Featured Projects'}
              </h2>
            </div>
            <Link href={`/${locale}/portfolio`} className="hidden md:block text-sm text-accent hover:text-foreground transition-colors">
              {locale === 'fr' ? 'Voir tout' : 'View all'} <ArrowRight className="inline ml-2" size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProjects.slice(0, 3).map((project) => (
              <Link
                key={project.id}
                href={`/${locale}/portfolio/${project.slug}`}
                className="group cursor-pointer"
              >
                <div className="relative h-72 rounded-lg overflow-hidden mb-4 shadow-md">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-wider text-accent">
                    {project.category}
                  </p>
                  <h3 className="font-serif text-xl text-foreground group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview — now with images */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-sm uppercase tracking-widest text-accent mb-3">
                {locale === 'fr' ? 'Expertise' : 'Expertise'}
              </p>
              <h2 className="font-serif text-4xl md:text-5xl text-foreground">
                {dict.services.title}
              </h2>
            </div>
            <Link href={`/${locale}/services`} className="hidden md:block text-sm text-accent hover:text-foreground transition-colors">
              {dict.services.learnMore} <ArrowRight className="inline ml-2" size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.slice(0, 4).map((service) => (
              <div
                key={service.id}
                className="group border border-border hover:border-accent transition-colors duration-300 overflow-hidden rounded-lg"
              >
                {/* Service image */}
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={service.image || '/images/hero-main.png'}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  <div className="absolute bottom-3 left-4 text-3xl">{service.icon}</div>
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-lg text-foreground mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Amal Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Image */}
            <div className="relative h-96 lg:h-[450px] rounded-lg overflow-hidden shadow-lg order-2 lg:order-1">
              <Image
                src="/images/amal-portrait.jpg"
                alt="Amal MARHFOUR — Interior Architect and founder of ABS Design"
                fill
                className="object-cover"
              />
            </div>

            {/* Right: Text */}
            <div className="space-y-6 order-1 lg:order-2">
              <div>
                <p className="text-sm uppercase tracking-widest text-accent mb-3">
                  {locale === 'fr' ? 'À propos de la fondatrice' : 'About the Founder'}
                </p>
                <h2 className="font-serif text-4xl md:text-5xl text-foreground">
                  Amal MARHFOUR
                </h2>
              </div>

              <p className="text-lg text-foreground leading-relaxed">
                {dict.about.bio}
              </p>

              <p className="text-base text-muted-foreground leading-relaxed">
                {locale === 'fr'
                  ? "Avec une expertise couvrant les villas résidentielles, les bureaux d'entreprise, les espaces bancaires et les meubles sur mesure, Amal apporte la précision technique et la sensibilité artistique à chaque projet."
                  : 'With expertise spanning residential villas, corporate offices, banking spaces, and bespoke furniture, Amal brings technical precision and artistic sensibility to every project.'}
              </p>

              <ul className="space-y-3 pt-4">
                {dict.about.expertise.slice(0, 4).map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                    <span className="text-sm text-foreground">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-6">
                <Link
                  href={`/${locale}/about`}
                  className="text-accent hover:text-foreground transition-colors text-sm font-medium flex items-center gap-2"
                >
                  {dict.services.learnMore} <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clients / References — with project images */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-widest text-accent mb-3">
              {locale === 'fr' ? 'Confiance & Crédibilité' : 'Trust & Credibility'}
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-foreground">
              {locale === 'fr' ? 'Institutions de Confiance' : 'Trusted Institutions'}
            </h2>
            <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
              {locale === 'fr'
                ? 'ABS Design a livré des résultats exceptionnels pour des banques de premier plan, des bureaux d\'entreprise et des projets résidentiels prestigieux.'
                : 'ABS Design has delivered exceptional results for leading banks, corporate offices, and high-profile residential projects.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Bank of Africa', sector: locale === 'fr' ? 'Secteur Bancaire' : 'Banking', projects: locale === 'fr' ? 'Projets' : 'Projects', image: '/images/bank-interior.png' },
              { name: 'Attijariwafa Bank', sector: locale === 'fr' ? 'Secteur Bancaire' : 'Banking', projects: locale === 'fr' ? 'Projets' : 'Projects', image: '/images/bank-branch-1.jpg' },
              { name: 'Banque Populaire', sector: locale === 'fr' ? 'Secteur Bancaire' : 'Banking', projects: locale === 'fr' ? 'Projets' : 'Projects', image: '/images/office-space.jpg' },
            ].map((client, idx) => (
              <div key={idx} className="group relative rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                {/* Background image */}
                <div className="relative h-64">
                  <Image
                    src={client.image}
                    alt={`${client.name} — ${locale === 'fr' ? 'Projet réalisé par ABS Design' : 'Project by ABS Design'}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
                </div>
                {/* Overlay text */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-background">
                  <h3 className="font-serif text-xl mb-1">{client.name}</h3>
                  <p className="text-sm opacity-80 mb-1">{client.sector}</p>
                  <p className="text-sm opacity-60">5+ {client.projects}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full-width Portfolio Showcase Strip */}
      <section className="py-4 bg-secondary/5">
        <div className="flex gap-4 overflow-hidden">
          {['/images/villa-luxury.png', '/images/kitchen-bespoke.png', '/images/hero-main.png', '/images/bank-interior.png', '/images/office-space.jpg', '/images/furniture.jpg'].map((src, idx) => (
            <div key={idx} className="relative h-48 min-w-[280px] flex-shrink-0 rounded-md overflow-hidden">
              <Image
                src={src}
                alt={`ABS Design portfolio showcase ${idx + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-foreground text-background">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div>
            <h2 className="font-serif text-5xl md:text-6xl mb-4">
              {locale === 'fr'
                ? 'Prêt à transformer votre espace?'
                : 'Ready to Transform Your Space?'}
            </h2>
            <p className="text-lg text-secondary leading-relaxed">
              {locale === 'fr'
                ? "Discutons de votre projet et créons quelque chose d'extraordinaire ensemble."
                : "Let's discuss your project and create something extraordinary together."}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              href={`/${locale}/contact`}
              className="px-8 py-3 bg-background text-foreground hover:bg-accent transition-all duration-300 text-sm font-medium"
            >
              {locale === 'fr' ? 'Nous contacter' : 'Get In Touch'}
            </Link>
            <a
              href="https://instagram.com/designbyamale"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border-2 border-background text-background hover:bg-background hover:text-foreground transition-all duration-300 text-sm font-medium"
            >
              {locale === 'fr' ? 'Suivre sur Instagram' : 'Follow on Instagram'}
            </a>
          </div>
        </div>
      </section>

      <LocaleFooter locale={locale} dictionary={dict} />
    </div>
  )
}
