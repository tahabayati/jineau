"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Link, usePathname, useRouter } from "@/i18n/routing"
import { useCart } from "./CartProvider"
import Button from "./Button"
import LanguageSwitcher from "./LanguageSwitcher"

export default function Header({ locale }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const t = useTranslations("nav")
  const tCommon = useTranslations("common")
  const { itemCount, openCart } = useCart()

  const mainLinks = [
    { href: "/shop", label: t("shop") },
    { href: "/subscribe", label: t("subscribe") },
    { href: "/how-it-works", label: t("howItWorks") },
    { href: "/about", label: t("about") },
    { href: "/blog", label: t("blog") },
  ]

  const audienceLinks = [
    { href: "/for-families", label: t("forFamilies") },
    { href: "/for-chefs", label: t("forChefs") },
    { href: "/for-wellness", label: t("forWellness") },
  ]

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-brand-primary rounded-full flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-xl">J</span>
            </div>
            <span className="text-xl font-bold text-brand-primary hidden sm:block">Jineau</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {mainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-gray-700 hover:text-brand-primary font-medium transition-colors rounded-lg hover:bg-brand-mist/20"
              >
                {link.label}
              </Link>
            ))}

            <div className="relative group">
              <button className="px-3 py-2 text-gray-700 hover:text-brand-primary font-medium transition-colors rounded-lg hover:bg-brand-mist/20 flex items-center gap-1">
                {t("forYou")}
                <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                {audienceLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-2 text-gray-700 hover:text-brand-primary hover:bg-brand-mist/20"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/login"
              className="px-3 py-2 text-gray-700 hover:text-brand-primary font-medium transition-colors rounded-lg hover:bg-brand-mist/20"
            >
              {tCommon("account")}
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSwitcher locale={locale} />

            <button
              onClick={openCart}
              className="relative p-2 text-gray-700 hover:text-brand-primary hover:bg-brand-mist/20 rounded-lg transition-colors"
              aria-label="Open cart"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-gold text-xs font-bold text-gray-900 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>

            <Button href="/shop" size="sm" className="hidden sm:inline-flex">
              {tCommon("shopMicrogreens")}
            </Button>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-600 hover:text-brand-primary"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col gap-2">
              {mainLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-gray-700 hover:bg-brand-mist/20 rounded-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-gray-100 mt-2 pt-2">
                {audienceLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-4 py-2 text-gray-600 hover:bg-brand-mist/20 rounded-lg block"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="border-t border-gray-100 mt-2 pt-2">
                <Link
                  href="/login"
                  className="px-4 py-2 text-gray-700 hover:bg-brand-mist/20 rounded-lg block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {tCommon("login")}
                </Link>
                <Link
                  href="/account"
                  className="px-4 py-2 text-gray-700 hover:bg-brand-mist/20 rounded-lg block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {tCommon("account")}
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
