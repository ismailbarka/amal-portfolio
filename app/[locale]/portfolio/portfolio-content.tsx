'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { projects } from '@/core/constants/projects'
import type { Dictionary } from '@/core/lib/get-dictionary'

interface PortfolioContentProps {
  locale: string
  dict: Dictionary
  categories: readonly string[]
}

export function PortfolioContent({ locale, dict, categories }: PortfolioContentProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(p => p.category === activeCategory)

  const categoryLabels: Record<string, string> = {
    all: locale === 'fr' ? 'Tous les projets' : 'All Projects',
    residential: dict.portfolio.filterResidential,
    villa: dict.portfolio.filterVillas,
    office: dict.portfolio.filterOffices,
    bank: dict.portfolio.filterBanks,
    kitchen: dict.portfolio.filterKitchens,
    furniture: dict.portfolio.filterFurniture,
  }

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="space-y-6">
          <p className="text-sm uppercase tracking-widest text-accent">
            {locale === 'fr' ? 'Notre travail' : 'Our Work'}
          </p>
          <h1 className="font-serif text-6xl md:text-7xl text-foreground leading-tight">
            {dict.portfolio.title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
            {dict.portfolio.subtitle}
          </p>
        </div>
      </section>

      {/* Filter */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-foreground text-background'
                    : 'border border-border text-foreground hover:border-accent'
                }`}
              >
                {categoryLabels[cat]}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <Link
                key={project.id}
                href={`/${locale}/portfolio/${project.slug}`}
                className="group cursor-pointer"
              >
                <div className="relative h-80 rounded-lg overflow-hidden mb-4 shadow-md">
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
    </>
  )
}
