"use client"

import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import Button from "@/components/Button"

export default function SupportRequestsPage() {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState("")
  const [typeFilter, setTypeFilter] = useState("")
  const [editingRequest, setEditingRequest] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    status: "",
    adminNotes: "",
  })
  const t = useTranslations("admin")

  useEffect(() => {
    fetchRequests()
  }, [statusFilter, typeFilter])

  const fetchRequests = async () => {
    try {
      const params = new URLSearchParams()
      if (statusFilter) params.set("status", statusFilter)
      if (typeFilter) params.set("type", typeFilter)
      
      const url = `/api/admin/support-requests?${params.toString()}`
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
    })
    setShowModal(true)
  }

  const handleQuickAction = async (req, newStatus) => {
    try {
      const res = await fetch(`/api/admin/support-requests/${req._id}`, {
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
      const res = await fetch(`/api/admin/support-requests/${editingRequest._id}`, {
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
        <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow-xl">{t("supportRequests")}</h1>
        <div className="flex gap-2">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white"
          >
            <option value="">All Types</option>
            <option value="refund">Refund</option>
            <option value="issue">Issue</option>
            <option value="general">General</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white"
          >
            <option value="">All Statuses</option>
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      <div className="glass-card rounded-2xl md:rounded-3xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-white/5">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-white/90">{t("user")}</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-white/90">{t("type")}</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-white/90">{t("message")}</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-white/90">{t("createdAt")}</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-white/90">{t("status")}</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-white/90">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {loading ? (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-white/70">Loading...</td></tr>
            ) : requests.length === 0 ? (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-white/70">No support requests found</td></tr>
            ) : requests.map((req) => (
              <tr key={req._id} className="hover:bg-white/5 transition-colors">
                <td className="px-4 py-3">
                  <div>
                    <p className="font-medium text-white">{req.user?.name || "N/A"}</p>
                    <p className="text-sm text-white/70">{req.user?.email}</p>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                    req.type === "refund" ? "bg-purple-500/30 text-purple-300" :
                    req.type === "issue" ? "bg-orange-500/30 text-orange-300" :
                    "bg-gray-500/30 text-gray-300"
                  }`}>
                    {req.type}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <p className="text-white/80 text-sm max-w-md truncate">{req.message}</p>
                </td>
                <td className="px-4 py-3 text-white/80 text-sm">
                  {new Date(req.createdAt).toLocaleString()}
                </td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    req.status === "resolved" ? "bg-green-500/30 text-green-300" :
                    req.status === "in-progress" ? "bg-blue-500/30 text-blue-300" :
                    req.status === "open" ? "bg-yellow-500/30 text-yellow-300" :
                    "bg-gray-500/30 text-gray-300"
                  }`}>
                    {req.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right space-x-2">
                  <button onClick={() => handleView(req)} className="text-brand-mint hover:text-brand-gold transition-colors">
                    View
                  </button>
                  {req.status === "open" && (
                    <button onClick={() => handleQuickAction(req, "in-progress")} className="text-blue-400 hover:text-blue-300 transition-colors">
                      Start
                    </button>
                  )}
                  {(req.status === "open" || req.status === "in-progress") && (
                    <button onClick={() => handleQuickAction(req, "resolved")} className="text-green-400 hover:text-green-300 transition-colors">
                      Resolve
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
            <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 drop-shadow-md">Support Request Details</h2>
            
            <div className="mb-4 md:mb-6 p-4 glass rounded-lg">
              <p className="text-sm text-white/70 mb-1">User</p>
              <p className="font-medium text-white">{editingRequest.user?.name}</p>
              <p className="text-sm text-white/60">{editingRequest.user?.email}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4 md:mb-6">
              <div className="p-4 glass rounded-lg">
                <p className="text-sm text-white/70 mb-1">Type</p>
                <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                  editingRequest.type === "refund" ? "bg-purple-500/30 text-purple-300" :
                  editingRequest.type === "issue" ? "bg-orange-500/30 text-orange-300" :
                  "bg-gray-500/30 text-gray-300"
                }`}>
                  {editingRequest.type}
                </span>
              </div>
              <div className="p-4 glass rounded-lg">
                <p className="text-sm text-white/70 mb-1">Created At</p>
                <p className="text-sm text-white">{new Date(editingRequest.createdAt).toLocaleString()}</p>
              </div>
            </div>

            {editingRequest.subject && (
              <div className="mb-4 md:mb-6 p-4 glass rounded-lg">
                <p className="text-sm text-white/70 mb-1">Subject</p>
                <p className="font-medium text-white">{editingRequest.subject}</p>
              </div>
            )}

            <div className="mb-4 md:mb-6 p-4 glass rounded-lg">
              <p className="text-sm text-white/70 mb-1">Message</p>
              <p className="text-white whitespace-pre-wrap">{editingRequest.message}</p>
            </div>

            {editingRequest.order && (
              <div className="mb-4 md:mb-6 p-4 glass rounded-lg">
                <p className="text-sm text-white/70 mb-1">Related Order</p>
                <p className="text-sm font-mono text-white">{editingRequest.order._id || editingRequest.order}</p>
              </div>
            )}

            {editingRequest.resolvedAt && (
              <div className="mb-4 md:mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg">
                <p className="text-sm text-green-300 mb-1">Resolved At</p>
                <p className="text-sm text-green-200">{new Date(editingRequest.resolvedAt).toLocaleString()}</p>
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
                  <option value="open">Open</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/90 mb-1">Admin Notes</label>
                <textarea
                  value={formData.adminNotes}
                  onChange={(e) => setFormData({ ...formData, adminNotes: e.target.value })}
                  className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white placeholder-white/50"
                  rows={4}
                  placeholder="Add internal notes about this support request..."
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

