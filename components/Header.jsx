"use client"

import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import { Link, usePathname } from "@/i18n/routing"
import { useCart } from "./CartProvider"
import LanguageSwitcher from "./LanguageSwitcher"

export default function Header({ locale }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const t = useTranslations("nav")
  const tCommon = useTranslations("common")
  const { itemCount, openCart } = useCart()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'glass-strong shadow-2xl shadow-black/20' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-brand-mint to-brand-gold rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
              <div className="relative w-10 h-10 bg-gradient-to-br from-brand-mint to-brand-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">J</span>
              </div>
            </div>
            <span className="text-xl font-bold gradient-text hidden sm:block">Jineau</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {mainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-white/80 hover:text-white font-medium transition-all rounded-full hover:bg-white/10"
              >
                {link.label}
              </Link>
            ))}

            <div className="relative group">
              <button className="px-4 py-2 text-white/80 hover:text-white font-medium transition-all rounded-full hover:bg-white/10 flex items-center gap-1">
                {t("forYou")}
                <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div className="absolute top-full left-0 mt-2 w-56 glass-card rounded-2xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                {audienceLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 transition-all"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/login"
              className="px-4 py-2 text-white/80 hover:text-white font-medium transition-all rounded-full hover:bg-white/10"
            >
              {tCommon("account")}
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <LanguageSwitcher locale={locale} />

            <button
              onClick={openCart}
              className="relative p-2.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all"
              aria-label="Open cart"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-gold text-xs font-bold text-gray-900 rounded-full flex items-center justify-center animate-pulse">
                  {itemCount}
                </span>
              )}
            </button>

            <Link 
              href="/shop" 
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-brand-mint to-brand-primary text-white font-medium rounded-full hover:shadow-[0_0_20px_rgba(112,178,178,0.4)] transition-all"
            >
              {tCommon("shopMicrogreens")}
            </Link>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-all"
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

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden glass-card rounded-2xl mt-2 mb-4 overflow-hidden">
            <nav className="flex flex-col py-4">
              {mainLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-6 py-3 text-white/80 hover:text-white hover:bg-white/10 transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-white/10 mt-2 pt-2">
                {audienceLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-6 py-3 text-white/60 hover:text-white hover:bg-white/10 transition-all block"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <div className="border-t border-white/10 mt-2 pt-2">
                <Link
                  href="/login"
                  className="px-6 py-3 text-white/80 hover:text-white hover:bg-white/10 transition-all block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {tCommon("login")}
                </Link>
                <Link
                  href="/account"
                  className="px-6 py-3 text-white/80 hover:text-white hover:bg-white/10 transition-all block"
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
