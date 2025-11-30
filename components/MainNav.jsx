"use client"

import { useState } from "react"
import Link from "next/link"

export default function MainNav() {
  const [audienceMenuOpen, setAudienceMenuOpen] = useState(false)

  const mainLinks = [
    { href: "/shop", label: "Shop" },
    { href: "/subscribe", label: "Subscribe" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
  ]

  const audienceLinks = [
    { href: "/for-families", label: "For Families" },
    { href: "/for-chefs", label: "For Chefs" },
    { href: "/for-wellness", label: "For Wellness" },
  ]

  return (
    <nav className="flex items-center gap-1">
      {mainLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="px-3 py-2 text-gray-700 hover:text-brand-primary font-medium transition-colors rounded-lg hover:bg-brand-mist/20"
        >
          {link.label}
        </Link>
      ))}

      <div className="relative">
        <button
          onClick={() => setAudienceMenuOpen(!audienceMenuOpen)}
          onBlur={() => setTimeout(() => setAudienceMenuOpen(false), 150)}
          className="px-3 py-2 text-gray-700 hover:text-brand-primary font-medium transition-colors rounded-lg hover:bg-brand-mist/20 flex items-center gap-1"
        >
          For You
          <svg className={`w-4 h-4 transition-transform ${audienceMenuOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {audienceMenuOpen && (
          <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2">
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
        )}
      </div>

      <Link
        href="/login"
        className="px-3 py-2 text-gray-700 hover:text-brand-primary font-medium transition-colors rounded-lg hover:bg-brand-mist/20"
      >
        Account
      </Link>
    </nav>
  )
}

