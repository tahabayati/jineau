"use client"

import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import Button from "@/components/Button"

export default function ReplacementRequestsPage() {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState("")
  const [editingRequest, setEditingRequest] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    status: "",
    adminNotes: "",
    appliedToOrder: "",
  })
  const t = useTranslations("admin")

  useEffect(() => {
    fetchRequests()
  }, [statusFilter])

  const fetchRequests = async () => {
    try {
      const url = statusFilter 
        ? `/api/admin/replacement-requests?status=${statusFilter}`
        : "/api/admin/replacement-requests"
      const res = await fetch(url)
      if (res.ok) setRequests(await res.json())
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleView = (req) => {
    setEditingRequest(req)
    setFormData({
      status: req.status || "",
      adminNotes: req.adminNotes || "",
      appliedToOrder: req.appliedToOrder || "",
    })
    setShowModal(true)
  }

  const handleQuickAction = async (req, newStatus) => {
    try {
      const res = await fetch(`/api/admin/replacement-requests/${req._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })

      if (res.ok) {
        await fetchRequests()
      } else {
        const data = await res.json()
        alert(data.error || "Failed to update")
      }
    } catch (error) {
      console.error("Error:", error)
      alert("Failed to update")
    }
  }

  const handleSave = async () => {
    if (!editingRequest) return
    
    try {
      const res = await fetch(`/api/admin/replacement-requests/${editingRequest._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        await fetchRequests()
        setShowModal(false)
        setEditingRequest(null)
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
        <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow-xl">{t("replacementRequests")}</h1>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white"
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="applied">Applied</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="glass-card rounded-2xl md:rounded-3xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-white/5">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-white/90">{t("user")}</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-white/90">{t("week")}</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-white/90">{t("monthlyCount")}</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-white/90">{t("createdAt")}</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-white/90">{t("status")}</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-white/90">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {loading ? (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-white/70">Loading...</td></tr>
            ) : requests.length === 0 ? (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-white/70">No replacement requests found</td></tr>
            ) : requests.map((req) => (
              <tr key={req._id} className="hover:bg-white/5 transition-colors">
                <td className="px-4 py-3">
                  <div>
                    <p className="font-medium text-white">{req.user?.name || "N/A"}</p>
                    <p className="text-sm text-white/70">{req.user?.email}</p>
                  </div>
                </td>
                <td className="px-4 py-3 text-white/80">
                  {new Date(req.weekStartDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    req.monthlyCount >= 2 ? "bg-red-500/30 text-red-300" : "bg-gray-500/30 text-gray-300"
                  }`}>
                    {req.monthlyCount}/2
                  </span>
                </td>
                <td className="px-4 py-3 text-white/80">
                  {new Date(req.createdAt).toLocaleString()}
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    req.status === "approved" ? "bg-green-500/30 text-green-300" :
                    req.status === "applied" ? "bg-blue-500/30 text-blue-300" :
                    req.status === "pending" ? "bg-yellow-500/30 text-yellow-300" :
                    "bg-red-500/30 text-red-300"
                  }`}>
                    {req.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right space-x-2">
                  <button onClick={() => handleView(req)} className="text-brand-mint hover:text-brand-gold transition-colors">
                    View
                  </button>
                  {req.status === "pending" && (
                    <>
                      <button onClick={() => handleQuickAction(req, "approved")} className="text-green-400 hover:text-green-300 transition-colors">
                        Approve
                      </button>
                      <button onClick={() => handleQuickAction(req, "rejected")} className="text-red-400 hover:text-red-300 transition-colors">
                        Reject
                      </button>
                    </>
                  )}
                  {req.status === "approved" && (
                    <button onClick={() => handleView(req)} className="text-blue-400 hover:text-blue-300 transition-colors">
                      Apply
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && editingRequest && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass-strong rounded-2xl md:rounded-3xl p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 drop-shadow-md">Replacement Request Details</h2>
            
            <div className="mb-4 md:mb-6 p-4 glass rounded-lg">
              <p className="text-sm text-white/70 mb-1">User</p>
              <p className="font-medium text-white">{editingRequest.user?.name}</p>
              <p className="text-sm text-white/60">{editingRequest.user?.email}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4 md:mb-6">
              <div className="p-4 glass rounded-lg">
                <p className="text-sm text-white/70 mb-1">Week Start Date</p>
                <p className="font-medium text-white">{new Date(editingRequest.weekStartDate).toLocaleDateString()}</p>
              </div>
              <div className="p-4 glass rounded-lg">
                <p className="text-sm text-white/70 mb-1">Monthly Usage</p>
                <p className="font-medium text-white">{editingRequest.monthlyCount}/2</p>
              </div>
            </div>

            {editingRequest.reason && (
              <div className="mb-4 md:mb-6 p-4 glass rounded-lg">
                <p className="text-sm text-white/70 mb-1">Reason</p>
                <p className="text-white">{editingRequest.reason}</p>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white/90 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white"
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="applied">Applied</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              {formData.status === "applied" && (
                <div>
                  <label className="block text-sm font-medium text-white/90 mb-1">Applied to Order ID</label>
                  <input
                    type="text"
                    value={formData.appliedToOrder}
                    onChange={(e) => setFormData({ ...formData, appliedToOrder: e.target.value })}
                    className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white placeholder-white/50"
                    placeholder="Optional: Order ID where replacement was applied"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-white/90 mb-1">Admin Notes</label>
                <textarea
                  value={formData.adminNotes}
                  onChange={(e) => setFormData({ ...formData, adminNotes: e.target.value })}
                  className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white placeholder-white/50"
                  rows={4}
                  placeholder="Add internal notes about this request..."
                />
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <Button onClick={handleSave}>Save Changes</Button>
              <Button variant="ghost" onClick={() => { setShowModal(false); setEditingRequest(null) }}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

