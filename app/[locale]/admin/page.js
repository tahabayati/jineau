import { getTranslations } from "next-intl/server"
import dbConnect from "@/lib/mongodb"
import SeniorCenter from "@/models/SeniorCenter"
import GiftDelivery from "@/models/GiftDelivery"
import ReplacementRequest from "@/models/ReplacementRequest"
import SupportRequest from "@/models/SupportRequest"
import { Link } from "@/i18n/routing"

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

async function getStats() {
  await dbConnect()
  
  const [centers, gifts, replacements, support] = await Promise.all([
    SeniorCenter.countDocuments({ active: true }),
    GiftDelivery.countDocuments(),
    ReplacementRequest.countDocuments({ status: "pending" }),
    SupportRequest.countDocuments({ status: "open" }),
  ])

  return { centers, gifts, replacements, support }
}

export default async function AdminDashboard() {
  const stats = await getStats()
  const t = await getTranslations("admin")

  const cards = [
    { label: t("seniorCenters"), value: stats.centers, icon: "🏠", href: "/admin/senior-centers" },
    { label: t("giftDeliveries"), value: stats.gifts, icon: "🎁", href: "/admin/gift-deliveries" },
    { label: "Pending Replacements", value: stats.replacements, icon: "🔄", href: "/admin/replacement-requests" },
    { label: "Open Support", value: stats.support, icon: "💬", href: "/admin/support-requests" },
  ]

  return (
    <div>
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-6 md:mb-8 drop-shadow-xl">{t("title")}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="glass-card rounded-2xl md:rounded-3xl p-6 md:p-8 hover:scale-105 transition-all duration-300 group"
          >
            <div className="flex items-center justify-between mb-2 md:mb-4">
              <span className="text-3xl md:text-4xl">{card.icon}</span>
              <span className="text-3xl md:text-4xl font-bold gradient-text drop-shadow-lg">{card.value}</span>
            </div>
            <p className="text-white/90 font-medium text-sm md:text-base group-hover:text-brand-gold transition-colors">{card.label}</p>
          </Link>
        ))}
      </div>

      <div className="glass-card rounded-2xl md:rounded-3xl p-6 md:p-8">
        <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 drop-shadow-md">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <Link
            href="/admin/senior-centers"
            className="glass rounded-xl md:rounded-2xl p-4 md:p-6 text-center hover:bg-white/10 transition-all duration-300 hover:scale-105 group"
          >
            <span className="text-2xl md:text-3xl mb-2 md:mb-3 block">{t("addCenter") ? "➕" : "➕"}</span>
            <span className="text-sm md:text-base font-medium text-white/90 group-hover:text-brand-gold transition-colors">Add Senior Center</span>
          </Link>
          <Link
            href="/admin/replacement-requests"
            className="glass rounded-xl md:rounded-2xl p-4 md:p-6 text-center hover:bg-white/10 transition-all duration-300 hover:scale-105 group"
          >
            <span className="text-2xl md:text-3xl mb-2 md:mb-3 block">📋</span>
            <span className="text-sm md:text-base font-medium text-white/90 group-hover:text-brand-gold transition-colors">Review Pending Replacements</span>
          </Link>
          <Link
            href="/admin/support-requests"
            className="glass rounded-xl md:rounded-2xl p-4 md:p-6 text-center hover:bg-white/10 transition-all duration-300 hover:scale-105 group"
          >
            <span className="text-2xl md:text-3xl mb-2 md:mb-3 block">📩</span>
            <span className="text-sm md:text-base font-medium text-white/90 group-hover:text-brand-gold transition-colors">View Open Tickets</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
