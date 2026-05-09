import type { Metadata } from 'next'
import { isValidLocale, locales } from '@/core/lib/i18n-config'
import { getDictionary } from '@/core/lib/get-dictionary'
import { notFound } from 'next/navigation'

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

  return {
    title: {
      template: `%s | ${dict.common.siteName}`,
      default: dict.common.siteName,
    },
    description: dict.seo.homeDescription,
    metadataBase: new URL(baseUrl),
    openGraph: {
      title: dict.seo.homeTitle,
      description: dict.seo.homeDescription,
      url: `${baseUrl}/${locale}`,
      siteName: dict.common.siteName,
      locale: locale === 'fr' ? 'fr_FR' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: dict.seo.homeTitle,
      description: dict.seo.homeDescription,
    },
    alternates: {
      languages: {
        'fr-FR': `${baseUrl}/fr`,
        'en-US': `${baseUrl}/en`,
        'x-default': `${baseUrl}/fr`,
      },
    },
  }
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!isValidLocale(locale)) {
    notFound()
  }

  return (
    <>
      <html lang={locale} suppressHydrationWarning>
        <body className="font-sans antialiased text-foreground bg-background">
          {children}
        </body>
      </html>
    </>
  )
}
