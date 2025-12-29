import createMiddleware from "next-intl/middleware"
import { NextResponse } from "next/server"
import { routing } from "./i18n/routing"

const intlMiddleware = createMiddleware(routing)

/**
 * Detects the best matching locale from the Accept-Language header
 * @param {string} acceptLanguage - The Accept-Language header value
 * @returns {string} - The detected locale (en, fr, or fa)
 */
function detectLocaleFromHeader(acceptLanguage) {
  if (!acceptLanguage) return routing.defaultLocale

  // Parse Accept-Language header (e.g., "en-US,en;q=0.9,fr;q=0.8,fa;q=0.7")
  const languages = acceptLanguage
    .split(',')
    .map(lang => {
      const [locale, q = 'q=1'] = lang.trim().split(';')
      const quality = parseFloat(q.replace('q=', '')) || 1
      return { locale: locale.toLowerCase().split('-')[0], quality }
    })
    .sort((a, b) => b.quality - a.quality)

  // Check for supported locales in order of preference
  for (const { locale } of languages) {
    if (locale === 'fa' || locale === 'per') return 'fa' // Persian/Farsi
    if (locale === 'fr') return 'fr' // French
    if (locale === 'en') return 'en' // English
  }

  return routing.defaultLocale
}

export default async function middleware(request) {
  const { pathname } = request.nextUrl
  
  // Check if locale is already in the path (e.g., /en/, /fr/, /fa/)
  const localeMatch = pathname.match(/^\/([a-z]{2})(\/|$)/)
  const pathLocale = localeMatch ? localeMatch[1] : null
  
  // Check if user has a saved locale preference
  const savedLocale = request.cookies.get('NEXT_LOCALE')?.value
  
  // If no locale in path, use saved preference or detect from browser
  if (!pathLocale) {
    let localeToUse = savedLocale
    
    // If no saved preference, detect from browser
    if (!localeToUse) {
      const acceptLanguage = request.headers.get('accept-language')
      localeToUse = detectLocaleFromHeader(acceptLanguage)
    }
    
    // Ensure locale is valid
    if (!routing.locales.includes(localeToUse)) {
      localeToUse = routing.defaultLocale
    }
    
    // Redirect to the locale (always ensure locale is in URL)
    const newUrl = new URL(`/${localeToUse}${pathname === '/' ? '' : pathname}`, request.url)
    const response = NextResponse.redirect(newUrl)
    
    // Save the locale preference if not already saved
    if (!savedLocale) {
      response.cookies.set('NEXT_LOCALE', localeToUse, {
        path: '/',
        maxAge: 60 * 60 * 24 * 365, // 1 year
        sameSite: 'lax'
      })
    }
    
    return response
  }
  
  // Check if this is an admin route (but not the login page)
  const isAdminRoute = pathname.match(/^\/[a-z]{2}\/admin(?!\/login)/) || 
                       pathname.match(/^\/admin(?!\/login)/)
  const isAdminLoginRoute = pathname.includes('/admin/login')
  
  if (isAdminRoute && !isAdminLoginRoute) {
    // Check for admin session cookie
    const adminSession = request.cookies.get('admin_session')
    
    if (adminSession?.value !== 'authenticated') {
      // Get locale from pathname or default to 'en'
      const locale = pathLocale || savedLocale || 'en'
      
      return NextResponse.redirect(new URL(`/${locale}/admin/login`, request.url))
    }
  }
  
  // If on login page and already authenticated, redirect to admin dashboard
  if (isAdminLoginRoute) {
    const adminSession = request.cookies.get('admin_session')
    
    if (adminSession?.value === 'authenticated') {
      const locale = pathLocale || savedLocale || 'en'
      
      return NextResponse.redirect(new URL(`/${locale}/admin`, request.url))
    }
  }
  
  // Get the response from intl middleware
  const response = intlMiddleware(request)
  
  // Save locale preference if user explicitly navigated to a locale path
  if (pathLocale && routing.locales.includes(pathLocale)) {
    const currentLocale = request.cookies.get('NEXT_LOCALE')?.value
    if (currentLocale !== pathLocale) {
      response.cookies.set('NEXT_LOCALE', pathLocale, {
        path: '/',
        maxAge: 60 * 60 * 24 * 365, // 1 year
        sameSite: 'lax'
      })
    }
  }
  
  // Add pathname header for layout to detect admin routes
  response.headers.set('x-pathname', pathname)
  
  return response
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
}

