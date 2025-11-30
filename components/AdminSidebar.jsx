"use client"

import { usePathname } from "next/navigation"
import { Link } from "@/i18n/routing"
import { useTranslations } from "next-intl"

export default function AdminSidebar() {
  const pathname = usePathname()
  const t = useTranslations("admin")

  const links = [
    { href: "/admin", label: t("title"), icon: "📊" },
    { href: "/admin/senior-centers", label: t("seniorCenters"), icon: "🏠" },
    { href: "/admin/gift-deliveries", label: t("giftDeliveries"), icon: "🎁" },
    { href: "/admin/replacement-requests", label: t("replacementRequests"), icon: "🔄" },
    { href: "/admin/support-requests", label: t("supportRequests"), icon: "💬" },
  ]

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200 shadow-sm">
      <div className="p-4 border-b border-gray-200">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-primary rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">J</span>
          </div>
          <span className="font-bold text-brand-primary">Jineau Admin</span>
        </Link>
      </div>

      <nav className="p-4 space-y-1">
        {links.map((link) => {
          const isActive = pathname.endsWith(link.href) || 
            (link.href === "/admin" && pathname.match(/\/admin$/))
          
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? "bg-brand-primary text-white"
                  : "text-gray-700 hover:bg-brand-mist/20"
              }`}
            >
              <span className="text-lg">{link.icon}</span>
              <span className="font-medium text-sm">{link.label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
        <Link
          href="/"
          className="flex items-center gap-2 text-gray-600 hover:text-brand-primary text-sm"
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

