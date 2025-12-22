import createMiddleware from "next-intl/middleware"
import { NextResponse } from "next/server"
import { routing } from "./i18n/routing"

const intlMiddleware = createMiddleware(routing)

export default async function middleware(request) {
  const { pathname } = request.nextUrl
  
  // Check if this is an admin route (but not the login page)
  const isAdminRoute = pathname.match(/^\/[a-z]{2}\/admin(?!\/login)/) || 
                       pathname.match(/^\/admin(?!\/login)/)
  const isAdminLoginRoute = pathname.includes('/admin/login')
  
  if (isAdminRoute && !isAdminLoginRoute) {
    // Check for admin session cookie
    const adminSession = request.cookies.get('admin_session')
    
    if (adminSession?.value !== 'authenticated') {
      // Get locale from pathname or default to 'en'
      const localeMatch = pathname.match(/^\/([a-z]{2})\//)
      const locale = localeMatch ? localeMatch[1] : 'en'
      
      return NextResponse.redirect(new URL(`/${locale}/admin/login`, request.url))
    }
  }
  
  // If on login page and already authenticated, redirect to admin dashboard
  if (isAdminLoginRoute) {
    const adminSession = request.cookies.get('admin_session')
    
    if (adminSession?.value === 'authenticated') {
      const localeMatch = pathname.match(/^\/([a-z]{2})\//)
      const locale = localeMatch ? localeMatch[1] : 'en'
      
      return NextResponse.redirect(new URL(`/${locale}/admin`, request.url))
    }
  }
  
  // Get the response from intl middleware
  const response = intlMiddleware(request)
  
  // Add pathname header for layout to detect admin routes
  response.headers.set('x-pathname', pathname)
  
  return response
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
}

