import { NextRequest, NextResponse } from 'next/server'
import { defaultLocale, isValidLocale } from './core/lib/i18n-config'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Check if pathname starts with a valid locale
  const pathnameHasLocale = isValidLocale(pathname.split('/')[1])

  // If pathname doesn't start with a locale, redirect to default locale
  if (!pathnameHasLocale) {
    // Handle root path
    if (pathname === '/') {
      return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url))
    }

    // Handle other paths without locale
    return NextResponse.redirect(
      new URL(`/${defaultLocale}${pathname}`, request.url)
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Match all pathnames except for:
    // - api (API routes)
    // - _next/static (static files)
    // - _next/image (image optimization files)
    // - favicon.ico (favicon file)
    // - public folder files
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|images|icon|apple-icon|placeholder).*)',
  ],
}
