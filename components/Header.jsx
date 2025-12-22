"use client"

import { useState, useEffect, useRef, useCallback, memo } from "react"
import { useTranslations } from "next-intl"
import { Link, usePathname, useRouter } from "@/i18n/routing"
import { useCart } from "./CartProvider"
import LanguageSwitcher from "./LanguageSwitcher"
import Image from "next/image"

function Header({ locale }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [forYouDropdownOpen, setForYouDropdownOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [showMobileSearch, setShowMobileSearch] = useState(false)
  const searchRef = useRef(null)
  const searchInputRef = useRef(null)
  const forYouDropdownRef = useRef(null)
  const forYouButtonRef = useRef(null)
  const t = useTranslations("nav")
  const tCommon = useTranslations("common")
  const router = useRouter()
  const { itemCount, openCart } = useCart()

  const closeForYouDropdown = useCallback(() => {
    setForYouDropdownOpen(false)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        if (forYouDropdownOpen) {
          closeForYouDropdown()
          forYouButtonRef.current?.focus()
        }
        if (mobileMenuOpen) {
          setMobileMenuOpen(false)
        }
      }
    }

    const handleClickOutside = (e) => {
      if (forYouDropdownOpen && forYouDropdownRef.current && !forYouDropdownRef.current.contains(e.target)) {
        closeForYouDropdown()
      }
    }

    document.addEventListener("keydown", handleKeyDown, { passive: true })
    document.addEventListener("click", handleClickOutside, { passive: true })
    document.addEventListener("touchstart", handleClickOutside, { passive: true })

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("click", handleClickOutside)
      document.removeEventListener("touchstart", handleClickOutside)
    }
  }, [forYouDropdownOpen, mobileMenuOpen, closeForYouDropdown])

  useEffect(() => {
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20)
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Search functionality with debounce
  useEffect(() => {
    const searchProducts = async () => {
      if (searchQuery.trim().length < 2) {
        setSearchResults([])
        setShowSearchResults(false)
        return
      }

      setIsSearching(true)
      try {
        const response = await fetch(`/api/products/search?q=${encodeURIComponent(searchQuery)}`)
        if (response.ok) {
          const products = await response.json()
          setSearchResults(products)
          setShowSearchResults(products.length > 0)
        }
      } catch (error) {
        console.error("Error searching products:", error)
        setSearchResults([])
      } finally {
        setIsSearching(false)
      }
    }

    const timeoutId = setTimeout(searchProducts, 400)
    return () => clearTimeout(timeoutId)
  }, [searchQuery])

  // Close search results and mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false)
      }
      
      if (mobileMenuOpen) {
        const header = event.target.closest('header')
        if (!header) {
          setMobileMenuOpen(false)
        }
      }
    }

    if (showSearchResults || mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside, { passive: true })
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showSearchResults, mobileMenuOpen])

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery)}`)
      setSearchQuery("")
      setShowSearchResults(false)
      setShowMobileSearch(false)
    }
  }

  const handleProductClick = (slug) => {
    router.push(`/products/${slug}`)
    setSearchQuery("")
    setShowSearchResults(false)
    setShowMobileSearch(false)
  }

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
        ? 'bg-black/35 backdrop-blur-xl border-b border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]'
        : 'bg-gradient-to-b from-black/20 to-transparent backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-3 group" aria-label="Jineau - Go to homepage">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <Image 
                src="/jineauLogo.svg" 
                alt="" 
                width={40} 
                height={40}
                className="w-full h-full transition-transform duration-300 group-hover:scale-110"
                aria-hidden="true"
              />
            </div>
            <span className="text-xl md:text-2xl font-bold gradient-text hidden sm:block transition-all duration-300 group-hover:scale-105" aria-hidden="true">Jineau</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-2" aria-label="Main navigation">
            {mainLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-white/90 hover:text-white font-medium transition-all duration-300 rounded-lg hover:bg-white/10 hover:backdrop-blur-sm relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-transparent via-brand-mint to-transparent group-hover:w-full transition-all duration-300" />
              </Link>
            ))}

            <div className="relative" ref={forYouDropdownRef}>
              <button
                ref={forYouButtonRef}
                onClick={(e) => {
                  e.stopPropagation()
                  setForYouDropdownOpen(!forYouDropdownOpen)
                }}
                onMouseEnter={() => setForYouDropdownOpen(true)}
                onMouseLeave={() => setForYouDropdownOpen(false)}
                aria-expanded={forYouDropdownOpen}
                aria-haspopup="true"
                className="px-4 py-2 text-white/90 hover:text-white font-medium transition-all duration-300 rounded-lg hover:bg-white/10 hover:backdrop-blur-sm flex items-center gap-1 relative"
              >
                {t("forYou")}
                <svg className={`w-4 h-4 transition-transform duration-300 ${forYouDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-transparent via-brand-mint to-transparent transition-all duration-300 ${forYouDropdownOpen ? 'w-full' : 'w-0'}`} aria-hidden="true" />
              </button>

              <div 
                className={`absolute top-full left-0 mt-2 w-56 bg-black/40 backdrop-blur-xl border border-white/15 rounded-xl py-2 shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition-all duration-300 ${forYouDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
                onMouseEnter={() => setForYouDropdownOpen(true)}
                onMouseLeave={() => setForYouDropdownOpen(false)}
                role="menu"
                aria-label="For You submenu"
              >
                {audienceLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setForYouDropdownOpen(false)}
                    className="block px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200 first:rounded-t-xl last:rounded-b-xl focus-visible:outline-none focus-visible:bg-white/10"
                    role="menuitem"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/login"
              className="px-4 py-2 text-white/90 hover:text-white font-medium transition-all duration-300 rounded-lg hover:bg-white/10 hover:backdrop-blur-sm relative group"
            >
              {tCommon("account")}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-transparent via-brand-mint to-transparent group-hover:w-full transition-all duration-300" />
            </Link>
          </nav>

          <div className="flex items-center gap-2 lg:gap-3">
            {/* Mobile Search */}
            <div className="lg:hidden relative" ref={searchRef}>
              {showMobileSearch ? (
                <form onSubmit={handleSearchSubmit} className="relative">
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => {
                      if (searchResults.length > 0) {
                        setShowSearchResults(true)
                      }
                    }}
                    onBlur={() => {
                      // Delay to allow clicks on suggestions
                      setTimeout(() => setShowSearchResults(false), 200)
                    }}
                    placeholder={t("searchPlaceholder")}
                    className="w-[180px] px-3 py-2 pl-9 pr-9 bg-black/30 backdrop-blur-md border border-white/15 rounded-full text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-brand-mint/50 focus:border-white/30 focus:bg-black/40 transition-all text-sm"
                    autoFocus
                  />
                  <svg
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  {isSearching && (
                    <div className="absolute right-8 top-1/2 -translate-y-1/2">
                      <div className="w-3 h-3 border-2 border-white/20 border-t-brand-mint rounded-full animate-spin" />
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setShowMobileSearch(false)
                      setSearchQuery("")
                      setShowSearchResults(false)
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-white/40 hover:text-white transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>

                  {/* Search Suggestions */}
                  {showSearchResults && searchResults.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 glass-strong rounded-xl border border-white/10 overflow-hidden shadow-xl z-50 max-h-[400px] overflow-y-auto">
                      {searchResults.map((product) => (
                        <button
                          key={product._id}
                          onClick={() => handleProductClick(product.slug)}
                          className="w-full px-4 py-3 text-left hover:bg-white/10 transition-all border-b border-white/5 last:border-0 flex items-center gap-3 group"
                        >
                          <div className="flex-1">
                            <div className="text-white font-medium group-hover:text-brand-gold transition-colors text-sm">
                              {product.name}
                            </div>
                            {product.shortDescription && (
                              <div className="text-white/50 text-xs mt-1 line-clamp-1">
                                {product.shortDescription}
                              </div>
                            )}
                            <div className="text-brand-gold text-xs font-semibold mt-1">
                              ${product.price?.toFixed(2)}
                            </div>
                          </div>
                          <svg
                            className="w-4 h-4 text-white/40 group-hover:text-white transition-all"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>
                      ))}
                      {searchQuery && (
                        <button
                          onClick={handleSearchSubmit}
                          className="w-full px-4 py-3 text-left hover:bg-white/10 transition-all border-t border-white/10 flex items-center gap-2 text-brand-mint font-medium text-sm"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                          </svg>
                          {t("viewAllResults")}
                        </button>
                      )}
                    </div>
                  )}
                </form>
              ) : (
                <button
                  onClick={() => {
                    setShowMobileSearch(true)
                    setTimeout(() => searchInputRef.current?.focus(), 100)
                  }}
                  className="p-2.5 text-white/90 hover:text-white hover:bg-white/10 backdrop-blur-sm rounded-full transition-all duration-300"
                  aria-label="Search"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              )}
            </div>

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
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-brand-mint to-brand-primary text-white font-semibold rounded-full hover:from-brand-mist hover:to-brand-secondary hover:shadow-[0_0_25px_rgba(112,178,178,0.5)] hover:scale-105 transition-all duration-300"
            >
              {tCommon("shopMicrogreens")}
            </Link>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden relative p-2.5 text-white/90 hover:text-white hover:bg-white/10 backdrop-blur-sm rounded-full transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-mint"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <div className="relative w-6 h-5 flex flex-col justify-between" aria-hidden="true">
                <span
                  className={`block h-0.5 w-full bg-current rounded-full transition-all duration-300 ${
                    mobileMenuOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-full bg-current rounded-full transition-all duration-300 ${
                    mobileMenuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-full bg-current rounded-full transition-all duration-300 ${
                    mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden" id="mobile-menu">
            <div className="bg-black/40 backdrop-blur-xl rounded-xl mt-3 mb-4 overflow-hidden border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
              {/* Navigation Menu */}
              <nav className="flex flex-col" aria-label="Mobile navigation">
                {/* Main Links */}
                <div className="px-4 py-2">
                  <div className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-2 px-2">
                    {t("menu")}
                  </div>
                  {mainLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center gap-3 px-3 py-3 rounded-lg text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200 group"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="font-medium">{link.label}</span>
                      <svg
                        className="w-4 h-4 ml-auto text-white/20 group-hover:text-white group-hover:translate-x-1 transition-all"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  ))}
                </div>

                {/* For You Section */}
                <div className="border-t border-white/10 px-4 py-2">
                  <div className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-2 px-2">
                    {t("forYou")}
                  </div>
                  {audienceLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center gap-3 px-3 py-3 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 group"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span>{link.label}</span>
                      <svg
                        className="w-4 h-4 ml-auto text-white/20 group-hover:text-white group-hover:translate-x-1 transition-all"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  ))}
                </div>

                {/* Account Section */}
                <div className="border-t border-white/10 px-4 py-2 pb-4">
                  <div className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-2 px-2">
                    {tCommon("account")}
                  </div>
                  <Link
                    href="/login"
                    className="flex items-center gap-3 px-3 py-3 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all group"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="font-medium">{tCommon("login")}</span>
                    <svg
                      className="w-4 h-4 ml-auto text-white/20 group-hover:text-white group-hover:translate-x-1 transition-all"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                  <Link
                    href="/account"
                    className="flex items-center gap-3 px-3 py-3 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all group"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="font-medium">{tCommon("account")}</span>
                    <svg
                      className="w-4 h-4 ml-auto text-white/20 group-hover:text-white group-hover:translate-x-1 transition-all"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default memo(Header)
