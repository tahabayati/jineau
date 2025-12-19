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
      <h1 className="text-2xl font-bold text-gray-900 mb-6">{t("title")}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-3xl">{card.icon}</span>
              <span className="text-3xl font-bold text-brand-primary">{card.value}</span>
            </div>
            <p className="text-gray-600 font-medium">{card.label}</p>
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/admin/senior-centers"
            className="p-4 bg-brand-mist/20 rounded-lg text-center hover:bg-brand-mist/30 transition-colors"
          >
            <span className="text-2xl mb-2 block">➕</span>
            <span className="text-sm font-medium text-gray-700">Add Senior Center</span>
          </Link>
          <Link
            href="/admin/replacement-requests"
            className="p-4 bg-brand-gold/20 rounded-lg text-center hover:bg-brand-gold/30 transition-colors"
          >
            <span className="text-2xl mb-2 block">📋</span>
            <span className="text-sm font-medium text-gray-700">Review Pending Replacements</span>
          </Link>
          <Link
            href="/admin/support-requests"
            className="p-4 bg-brand-mint/20 rounded-lg text-center hover:bg-brand-mint/30 transition-colors"
          >
            <span className="text-2xl mb-2 block">📩</span>
            <span className="text-sm font-medium text-gray-700">View Open Tickets</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
