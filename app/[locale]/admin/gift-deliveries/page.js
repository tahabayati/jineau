"use client"

import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"

export default function GiftDeliveriesPage() {
  const [deliveries, setDeliveries] = useState([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState("")
  const t = useTranslations("admin")

  useEffect(() => {
    fetchDeliveries()
  }, [statusFilter])

  const fetchDeliveries = async () => {
    try {
      const url = statusFilter 
        ? `/api/admin/gift-deliveries?status=${statusFilter}`
        : "/api/admin/gift-deliveries"
      const res = await fetch(url)
      if (res.ok) setDeliveries(await res.json())
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{t("giftDeliveries")}</h1>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary"
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="scheduled">Scheduled</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">{t("subscriber")}</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">{t("giftCenter")}</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">{t("type")}</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">{t("date")}</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">{t("status")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-500">Loading...</td></tr>
            ) : deliveries.length === 0 ? (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-500">No gift deliveries found</td></tr>
            ) : deliveries.map((delivery) => (
              <tr key={delivery._id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div>
                    <p className="font-medium text-gray-900">{delivery.subscriber?.name || "N/A"}</p>
                    <p className="text-sm text-gray-500">{delivery.subscriber?.email}</p>
                  </div>
                </td>
                <td className="px-4 py-3">
                  {delivery.giftType === "default-center" ? (
                    <span className="text-gray-900">{delivery.seniorCenter?.name || "Default Center"}</span>
                  ) : (
                    <div>
                      <p className="text-gray-900">{delivery.customCenterName}</p>
                      <p className="text-sm text-gray-500">{delivery.customCenterAddress}</p>
                    </div>
                  )}
                </td>
                <td className="px-4 py-3 text-gray-600 capitalize">{delivery.giftType.replace("-", " ")}</td>
                <td className="px-4 py-3 text-gray-600">
                  {delivery.deliveryDate ? new Date(delivery.deliveryDate).toLocaleDateString() : "-"}
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    delivery.status === "delivered" ? "bg-green-100 text-green-800" :
                    delivery.status === "scheduled" ? "bg-blue-100 text-blue-800" :
                    delivery.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                    "bg-gray-100 text-gray-800"
                  }`}>
                    {delivery.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

