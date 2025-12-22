"use client"

import { usePathname, useRouter } from "@/i18n/routing"
import { useState } from "react"

const languages = [
  { code: "en", label: "EN", name: "English" },
  { code: "fr", label: "FR", name: "Français" },
  { code: "fa", label: "FA", name: "فارسی" },
]

export default function LanguageSwitcher({ locale }) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const currentLang = languages.find((l) => l.code === locale) || languages[0]

  const handleChange = (newLocale) => {
    router.replace(pathname, { locale: newLocale })
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setTimeout(() => setIsOpen(false), 150)}
        className="flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-white/90 hover:text-white bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-lg transition-all duration-300 border border-white/10 hover:border-brand-mint/30 hover:shadow-[0_0_15px_rgba(112,178,178,0.3)]"
        aria-label={`Current language: ${currentLang.name}. Click to change language.`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <svg className="w-4 h-4 text-brand-mint" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
        <span className="font-medium">{currentLang.label}</span>
        <svg className={`w-3.5 h-3.5 transition-transform duration-300 text-brand-mint ${isOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 rtl:right-auto rtl:left-0 mt-2 w-40 bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl rounded-xl shadow-2xl border border-brand-mint/20 py-2 z-50 animate-fade-in-up">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleChange(lang.code)}
              className={`w-full px-4 py-2.5 text-left rtl:text-right text-sm font-medium transition-all duration-200 flex items-center justify-between group ${
                lang.code === locale 
                  ? "text-brand-mint bg-brand-mint/10 border-l-2 border-brand-mint" 
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              <span className={`${lang.code === locale ? "font-semibold" : ""}`}>{lang.name}</span>
              {lang.code === locale && (
                <svg className="w-4 h-4 text-brand-mint animate-scale-in" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

