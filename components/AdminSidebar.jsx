"use client"

import { usePathname, useRouter } from "next/navigation"
import { Link } from "@/i18n/routing"
import { useTranslations } from "next-intl"
import { useState } from "react"

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const t = useTranslations("admin")
  const [loggingOut, setLoggingOut] = useState(false)

  const handleLogout = async () => {
    setLoggingOut(true)
    try {
      await fetch('/api/admin/logout', { method: 'POST' })
      router.push('/admin/login')
      router.refresh()
    } catch (error) {
      console.error('Logout error:', error)
      setLoggingOut(false)
    }
  }

  const links = [
    { href: "/admin", label: t("title"), icon: "📊" },
    { href: "/admin/translations", label: "Translations", icon: "🌐" },
    { href: "/admin/site-content", label: "Site Content", icon: "📝" },
    { href: "/admin/senior-centers", label: t("seniorCenters"), icon: "🏠" },
    { href: "/admin/gift-deliveries", label: t("giftDeliveries"), icon: "🎁" },
    { href: "/admin/replacement-requests", label: t("replacementRequests"), icon: "🔄" },
    { href: "/admin/support-requests", label: t("supportRequests"), icon: "💬" },
  ]

  return (
    <aside className="relative w-64 min-h-screen glass-card border-r border-white/10 shadow-sm flex flex-col">
      <div className="p-4 border-b border-white/10">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-brand-mint to-brand-primary rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">J</span>
          </div>
          <span className="font-bold"><span className="gradient-text">Jineau</span> <span className="text-brand-mint">Admin</span></span>
        </Link>
      </div>

      <nav className="p-4 space-y-1 flex-1">
        {links.map((link) => {
          const isActive = pathname.endsWith(link.href) || 
            (link.href === "/admin" && pathname.match(/\/admin$/))
          
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? "bg-gradient-to-r from-brand-mint to-brand-primary text-white"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              }`}
            >
              <span className="text-lg">{link.icon}</span>
              <span className="font-medium text-sm">{link.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="mt-auto p-4 border-t border-white/10 space-y-2">
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="w-full flex items-center gap-2 text-white/80 hover:text-red-400 text-sm py-2 px-3 rounded-lg hover:bg-red-500/20 transition-colors disabled:opacity-50"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          {loggingOut ? 'Logging out...' : 'Logout'}
        </button>
        <Link
          href="/"
          className="flex items-center gap-2 text-white/80 hover:text-brand-mint text-sm py-2 px-3 rounded-lg hover:bg-white/10 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Site
        </Link>
      </div>
    </aside>
  )
}

