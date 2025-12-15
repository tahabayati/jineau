"use client"

import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"
import { contactInfo } from "@/data/siteCopy"
import { regionConfig } from "@/lib/config"
import Image from "next/image"

export default function Footer({ locale }) {
  const t = useTranslations("footer")
  const tNav = useTranslations("nav")

  const shopLinks = [
    { href: "/shop", label: t("allProducts") },
    { href: "/shop?category=microgreens", label: "Microgreens" },
    { href: "/shop?category=hydrosols", label: "Hydrosols" },
    { href: "/subscribe", label: t("subscriptions") },
  ]

  const companyLinks = [
    { href: "/about", label: t("aboutUs") },
    { href: "/how-it-works", label: tNav("howItWorks") },
    { href: "/blog", label: tNav("blog") },
    { href: "/faq", label: tNav("faq") },
  ]

  const audienceLinks = [
    { href: "/for-families", label: tNav("forFamilies") },
    { href: "/for-chefs", label: tNav("forChefs") },
    { href: "/for-wellness", label: tNav("forWellness") },
  ]

  return (
    <footer className="relative bg-[#040a10] overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-primary/8 rounded-full blur-[180px]" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-blue/6 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-mint/4 rounded-full blur-[200px]" />
      </div>

      {/* Top border gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-mint/30 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-brand-mint to-brand-gold rounded-full blur-md opacity-50 group-hover:opacity-75 transition-opacity" />
                <div className="relative w-10 h-10 flex items-center justify-center">
                  {/* Logo - no rotation */}
                  <div className="relative w-8 h-8 z-10">
                    <Image 
                      src="/jineauLogo.svg" 
                      alt="Jineau Logo" 
                      width={32} 
                      height={32}
                      className="w-full h-full"
                    />
                  </div>
                  
                  {/* Orbiting particles */}
                  <div className="absolute -inset-6 animate-rotate-slow">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-gradient-to-br from-brand-gold to-amber-400 rounded-full shadow-[0_0_15px_rgba(233,196,106,0.6)]" />
                  </div>
                  <div className="absolute -inset-8 animate-rotate-slow" style={{ animationDirection: 'reverse', animationDuration: '45s' }}>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-gradient-to-br from-brand-mint to-brand-primary rounded-full shadow-[0_0_12px_rgba(112,178,178,0.5)]" />
                  </div>
                  <div className="absolute -inset-5 animate-rotate-slow" style={{ animationDuration: '60s' }}>
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-gradient-to-br from-brand-blue to-brand-mist rounded-full shadow-[0_0_10px_rgba(110,140,251,0.5)]" />
                  </div>
                </div>
              </div>
              <span className="text-xl font-bold gradient-text">Jineau</span>
            </Link>
            <p className="text-white/50 text-sm mb-6 leading-relaxed">
              {t("tagline")}
            </p>
            <div className="flex gap-3">
              <a
                href={contactInfo.socialMedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-brand-secondary border border-brand-mint/30 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-brand-mint hover:border-brand-mint/50 transition-all"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href={contactInfo.socialMedia.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-brand-secondary border border-brand-mint/30 rounded-full flex items-center justify-center text-white/60 hover:text-white hover:bg-brand-mint hover:border-brand-mint/50 transition-all"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Shop links */}
          <div>
            <h3 className="font-semibold text-white mb-4">{t("shop")}</h3>
            <ul className="space-y-3">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/50 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h3 className="font-semibold text-white mb-4">{t("company")}</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/50 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Audience links */}
          <div>
            <h3 className="font-semibold text-white mb-4">{tNav("forYou")}</h3>
            <ul className="space-y-3">
              {audienceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/50 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4">{t("contact")}</h3>
            <ul className="space-y-3 text-sm text-white/50">
              <li>
                <a href={`mailto:${contactInfo.email}`} className="hover:text-white transition-colors">
                  {contactInfo.email}
                </a>
              </li>
              <li>{contactInfo.phone}</li>
              <li>{regionConfig.companyLocation}, {regionConfig.province}</li>
            </ul>
            <div className="mt-4 bg-brand-primary/60 border border-brand-mint/20 rounded-xl p-4">
              <p className="text-xs text-brand-mint font-medium">{t("deliveryAreas")}</p>
              <p className="text-xs text-white/40 mt-1">{t("deliveryAreasDesc")}</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/40">
              © {new Date().getFullYear()} <span className="gradient-text font-bold">Jineau</span>. {t("allRightsReserved")}
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-sm text-white/40 hover:text-white transition-colors">
                {t("privacyPolicy")}
              </Link>
              <Link href="/terms" className="text-sm text-white/40 hover:text-white transition-colors">
                {t("termsOfService")}
              </Link>
              <Link href="/refunds" className="text-sm text-white/40 hover:text-white transition-colors">
                {t("refundPolicy")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
