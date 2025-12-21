"use client"

import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import Button from "@/components/Button"

export default function GiftDeliveriesPage() {
  const [deliveries, setDeliveries] = useState([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState("")
  const [editingDelivery, setEditingDelivery] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    status: "",
    deliveryDate: "",
    notes: "",
  })
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

  const handleEdit = (delivery) => {
    setEditingDelivery(delivery)
    setFormData({
      status: delivery.status || "",
      deliveryDate: delivery.deliveryDate ? new Date(delivery.deliveryDate).toISOString().split('T')[0] : "",
      notes: delivery.notes || "",
    })
    setShowModal(true)
  }

  const handleSave = async () => {
    if (!editingDelivery) return
    
    try {
      const res = await fetch(`/api/admin/gift-deliveries/${editingDelivery._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        await fetchDeliveries()
        setShowModal(false)
        setEditingDelivery(null)
      } else {
        const data = await res.json()
        alert(data.error || "Failed to update")
      }
    } catch (error) {
      console.error("Error:", error)
      alert("Failed to update")
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
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-500">Loading...</td></tr>
            ) : deliveries.length === 0 ? (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-500">No gift deliveries found</td></tr>
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
                <td className="px-4 py-3 text-right">
                  <button onClick={() => handleEdit(delivery)} className="text-brand-primary hover:underline">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && editingDelivery && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Edit Gift Delivery</h2>
            
            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Subscriber</p>
              <p className="font-medium">{editingDelivery.subscriber?.name}</p>
              <p className="text-sm text-gray-500">{editingDelivery.subscriber?.email}</p>
            </div>

            <div className="mb-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Gift Center</p>
              {editingDelivery.giftType === "default-center" ? (
                <p className="font-medium">{editingDelivery.seniorCenter?.name || "Default Center"}</p>
              ) : (
                <div>
                  <p className="font-medium">{editingDelivery.customCenterName}</p>
                  <p className="text-sm text-gray-500">{editingDelivery.customCenterAddress}</p>
                  <p className="text-sm text-gray-500">{editingDelivery.customCenterCity}</p>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary"
                >
                  <option value="pending">Pending</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Date</label>
                <input
                  type="date"
                  value={formData.deliveryDate}
                  onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary"
                  rows={4}
                  placeholder="Add notes about this delivery..."
                />
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <Button onClick={handleSave}>Save Changes</Button>
              <Button variant="ghost" onClick={() => { setShowModal(false); setEditingDelivery(null) }}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

