import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { isValidLocale } from '@/core/lib/i18n-config'
import { getDictionary } from '@/core/lib/get-dictionary'
import { LocaleHeader } from '@/components/layout/locale-header'
import { LocaleFooter } from '@/components/layout/locale-footer'
import { projects, getProjectBySlug } from '@/core/constants/projects'
import { notFound } from 'next/navigation'
import { ArrowRight, ArrowLeft } from 'lucide-react'

export async function generateStaticParams() {
  const locales = ['fr', 'en']
  const projectParams = projects.map((project) => ({
    slug: project.slug,
  }))
  
  return locales.flatMap(locale =>
    projectParams.map(project => ({
      locale,
      slug: project.slug,
    }))
  )
}

export async function generateMetadata(
  props: { params: Promise<{ locale: string; slug: string }> }
): Promise<Metadata> {
  const { locale, slug } = await props.params
  const project = getProjectBySlug(slug)

  if (!project || !isValidLocale(locale)) {
    return {}
  }

  const dict = await getDictionary(locale)
  return {
    title: `${project.title} | ${dict.common.siteName}`,
    description: project.description,
  }
}

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params

  if (!isValidLocale(locale)) {
    notFound()
  }

  const project = getProjectBySlug(slug)

  if (!project) {
    notFound()
  }

  const dict = await getDictionary(locale)
  const currentIndex = projects.findIndex(p => p.slug === slug)
  const nextProject = projects[(currentIndex + 1) % projects.length]
  const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length]

  return (
    <div className="min-h-screen bg-background">
      <LocaleHeader locale={locale} dictionary={dict} />

      {/* Hero Image */}
      <section className="pt-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-0">
        <div className="relative h-96 md:h-[600px] rounded-lg overflow-hidden shadow-lg">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
        </div>
      </section>

      {/* Project Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 pb-12 border-b border-border">
          {/* Title & Description */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <p className="text-sm uppercase tracking-widest text-accent mb-3">
                {project.category}
              </p>
              <h1 className="font-serif text-5xl md:text-6xl text-foreground">
                {project.title}
              </h1>
            </div>
            <p className="text-lg text-foreground leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Project Details */}
          <div className="space-y-6">
            {project.location && (
              <div>
                <p className="text-xs uppercase tracking-widest text-accent mb-2">
                  {locale === 'fr' ? 'Localisation' : 'Location'}
                </p>
                <p className="text-foreground">{project.location}</p>
              </div>
            )}
            {project.year && (
              <div>
                <p className="text-xs uppercase tracking-widest text-accent mb-2">
                  {locale === 'fr' ? 'Année' : 'Year'}
                </p>
                <p className="text-foreground">{project.year}</p>
              </div>
            )}
            {project.scope && (
              <div>
                <p className="text-xs uppercase tracking-widest text-accent mb-2">
                  {dict.projectDetail.scope}
                </p>
                <p className="text-foreground text-sm">{project.scope}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Project Content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-20">
        {/* Challenge & Solution */}
        {project.challenge && (
          <div>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
              {dict.projectDetail.challenge}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {project.challenge}
            </p>
          </div>
        )}

        {/* Design Process */}
        {project.designProcess && (
          <div>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
              {dict.projectDetail.designProcess}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {project.designProcess}
            </p>
          </div>
        )}

        {/* Materials */}
        {project.materials && (
          <div>
            <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-6">
              {dict.projectDetail.materials}
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.materials.map((material, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground">{material}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Gallery */}
        <div>
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-8">
            {dict.projectDetail.gallery}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.images && project.images.map((image, idx) => (
              <div key={idx} className="relative h-64 rounded-lg overflow-hidden shadow-md">
                <Image
                  src={image}
                  alt={`${project.title} - ${idx + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation & CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/5">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* CTA */}
          <div className="p-12 bg-foreground text-background rounded-lg text-center">
            <h3 className="font-serif text-3xl mb-4">
              {locale === 'fr' ? 'Intéressé par un projet similaire?' : 'Interested in a Similar Project?'}
            </h3>
            <p className="text-secondary mb-6">
              {locale === 'fr'
                ? "Contactez-nous pour discuter de votre vision d'intérieur."
                : 'Contact us to discuss your interior vision.'}
            </p>
            <Link
              href={`/${locale}/contact`}
              className="inline-block px-8 py-3 bg-background text-foreground hover:bg-accent transition-all duration-300 text-sm font-medium"
            >
              {dict.projectDetail.inquire}
            </Link>
          </div>

          {/* Project Navigation */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {prevProject && (
              <Link
                href={`/${locale}/portfolio/${prevProject.slug}`}
                className="group p-6 border border-border hover:border-accent transition-colors"
              >
                <p className="text-xs uppercase tracking-widest text-accent mb-3">
                  {dict.projectDetail.previousProject}
                </p>
                <h4 className="font-serif text-xl text-foreground group-hover:text-accent transition-colors flex items-center gap-2">
                  <ArrowLeft size={20} />
                  {prevProject.title}
                </h4>
              </Link>
            )}

            {nextProject && (
              <Link
                href={`/${locale}/portfolio/${nextProject.slug}`}
                className="group p-6 border border-border hover:border-accent transition-colors text-right"
              >
                <p className="text-xs uppercase tracking-widest text-accent mb-3">
                  {dict.projectDetail.nextProject}
                </p>
                <h4 className="font-serif text-xl text-foreground group-hover:text-accent transition-colors flex items-center gap-2 justify-end">
                  {nextProject.title}
                  <ArrowRight size={20} />
                </h4>
              </Link>
            )}
          </div>
        </div>
      </section>

      <LocaleFooter locale={locale} dictionary={dict} />
    </div>
  )
}
