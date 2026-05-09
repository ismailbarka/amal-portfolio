import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { isValidLocale } from '@/core/lib/i18n-config'
import { getDictionary } from '@/core/lib/get-dictionary'
import { LocaleHeader } from '@/components/layout/locale-header'
import { LocaleFooter } from '@/components/layout/locale-footer'
import { projects } from '@/core/constants/projects'
import type { Project } from '@/core/types'
import { notFound } from 'next/navigation'
import { getCanonicalUrl, getAlternateUrls } from '@/core/utils/locale-utils'
import { PortfolioContent } from './portfolio-content'

const categories = ['all', 'residential', 'villa', 'office', 'bank', 'kitchen', 'furniture'] as const

export async function generateMetadata(
  props: { params: Promise<{ locale: string }> }
): Promise<Metadata> {
  const params = await props.params
  const locale = params.locale

  if (!isValidLocale(locale)) {
    return {}
  }

  const dict = await getDictionary(locale)
  const pathname = `/${locale}/portfolio`
  const alternates = getAlternateUrls(pathname)

  return {
    title: dict.portfolio.pageTitle || `${dict.portfolio.title} | ${dict.common.siteName}`,
    description: dict.portfolio.pageDescription || dict.portfolio.subtitle,
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

export default async function Portfolio({
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
      <PortfolioContent locale={locale} dict={dict} categories={categories} />
      <LocaleFooter locale={locale} dictionary={dict} />
    </div>
  )
}
