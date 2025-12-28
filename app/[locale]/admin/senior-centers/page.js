"use client"

import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import Button from "@/components/Button"

export default function SeniorCentersPage() {
  const [centers, setCenters] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    addressLine1: "",
    city: "",
    region: "Montérégie",
    postalCode: "",
    active: true,
  })
  const t = useTranslations("admin")

  useEffect(() => {
    fetchCenters()
  }, [])

  const fetchCenters = async () => {
    try {
      const res = await fetch("/api/admin/senior-centers")
      if (res.ok) setCenters(await res.json())
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const url = editingId 
        ? `/api/admin/senior-centers/${editingId}`
        : "/api/admin/senior-centers"
      
      const res = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        fetchCenters()
        setShowForm(false)
        setEditingId(null)
        setFormData({ name: "", addressLine1: "", city: "", region: "Montérégie", postalCode: "", active: true })
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  const handleEdit = (center) => {
    setFormData({
      name: center.name,
      addressLine1: center.addressLine1,
      city: center.city,
      region: center.region,
      postalCode: center.postalCode || "",
      active: center.active,
    })
    setEditingId(center._id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this center?")) return
    
    try {
      const res = await fetch(`/api/admin/senior-centers/${id}`, { method: "DELETE" })
      if (res.ok) fetchCenters()
    } catch (error) {
      console.error("Error:", error)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow-xl">{t("seniorCenters")}</h1>
        <Button onClick={() => setShowForm(true)}>{t("addCenter")}</Button>
      </div>

      {showForm && (
        <div className="glass-card rounded-2xl md:rounded-3xl p-6 md:p-8 mb-6">
          <h2 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6 drop-shadow-md">
            {editingId ? t("editCenter") : t("addCenter")}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/90 mb-1">{t("centerName")}</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white placeholder-white/50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/90 mb-1">{t("address")}</label>
              <input
                type="text"
                value={formData.addressLine1}
                onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white placeholder-white/50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/90 mb-1">{t("city")}</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white placeholder-white/50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/90 mb-1">{t("postalCode")}</label>
              <input
                type="text"
                value={formData.postalCode}
                onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white placeholder-white/50"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="active"
                checked={formData.active}
                onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                className="w-4 h-4 text-brand-mint focus:ring-brand-mint"
              />
              <label htmlFor="active" className="text-sm text-white/90">{t("active")}</label>
            </div>
            <div className="flex gap-2 md:col-span-2">
              <Button type="submit">{editingId ? "Update" : "Create"}</Button>
              <Button type="button" variant="ghost" onClick={() => { setShowForm(false); setEditingId(null) }}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="glass-card rounded-2xl md:rounded-3xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-white/5">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-white/90">{t("centerName")}</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-white/90">{t("address")}</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-white/90">{t("city")}</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-white/90">{t("active")}</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-white/90">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {loading ? (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-white/70">Loading...</td></tr>
            ) : centers.length === 0 ? (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-white/70">No centers found</td></tr>
            ) : centers.map((center) => (
              <tr key={center._id} className="hover:bg-white/5 transition-colors">
                <td className="px-4 py-3 font-medium text-white">{center.name}</td>
                <td className="px-4 py-3 text-white/80">{center.addressLine1}</td>
                <td className="px-4 py-3 text-white/80">{center.city}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    center.active ? "bg-green-500/30 text-green-300" : "bg-gray-500/30 text-gray-300"
                  }`}>
                    {center.active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => handleEdit(center)} className="text-brand-mint hover:text-brand-gold transition-colors mr-3">Edit</button>
                  <button onClick={() => handleDelete(center._id)} className="text-red-400 hover:text-red-300 transition-colors">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

