"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import Button from "./Button"
import MainNav from "./MainNav"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-brand-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">J</span>
            </div>
            <span className="text-xl font-bold text-brand-primary hidden sm:block">Jineau</span>
          </Link>

          <div className="hidden lg:block">
            <MainNav />
          </div>

          <div className="flex items-center gap-4">
            <Button href="/shop" size="sm" className="hidden sm:inline-flex">
              Shop Microgreens
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
              <Link href="/shop" className="px-4 py-2 text-gray-700 hover:bg-brand-mist/20 rounded-lg" onClick={() => setMobileMenuOpen(false)}>
                Shop
              </Link>
              <Link href="/subscribe" className="px-4 py-2 text-gray-700 hover:bg-brand-mist/20 rounded-lg" onClick={() => setMobileMenuOpen(false)}>
                Subscribe
              </Link>
              <Link href="/how-it-works" className="px-4 py-2 text-gray-700 hover:bg-brand-mist/20 rounded-lg" onClick={() => setMobileMenuOpen(false)}>
                How It Works
              </Link>
              <Link href="/about" className="px-4 py-2 text-gray-700 hover:bg-brand-mist/20 rounded-lg" onClick={() => setMobileMenuOpen(false)}>
                About
              </Link>
              <Link href="/blog" className="px-4 py-2 text-gray-700 hover:bg-brand-mist/20 rounded-lg" onClick={() => setMobileMenuOpen(false)}>
                Blog
              </Link>
              <div className="border-t border-gray-100 mt-2 pt-2">
                <Link href="/for-families" className="px-4 py-2 text-gray-600 hover:bg-brand-mist/20 rounded-lg block" onClick={() => setMobileMenuOpen(false)}>
                  For Families
                </Link>
                <Link href="/for-chefs" className="px-4 py-2 text-gray-600 hover:bg-brand-mist/20 rounded-lg block" onClick={() => setMobileMenuOpen(false)}>
                  For Chefs
                </Link>
                <Link href="/for-wellness" className="px-4 py-2 text-gray-600 hover:bg-brand-mist/20 rounded-lg block" onClick={() => setMobileMenuOpen(false)}>
                  For Wellness
                </Link>
              </div>
              <div className="border-t border-gray-100 mt-2 pt-2">
                <Link href="/login" className="px-4 py-2 text-gray-700 hover:bg-brand-mist/20 rounded-lg block" onClick={() => setMobileMenuOpen(false)}>
                  Login
                </Link>
                <Link href="/account" className="px-4 py-2 text-gray-700 hover:bg-brand-mist/20 rounded-lg block" onClick={() => setMobileMenuOpen(false)}>
                  Account
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

