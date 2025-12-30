"use client"

import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import Button from "@/components/Button"

export default function SubscriptionPlansPage() {
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    packsPerWeek: 3,
    pricePerWeek: 0,
    salePricePerWeek: null,
    stripePriceId: "",
    description: "",
    active: true,
  })
  const t = useTranslations("admin")

  useEffect(() => {
    fetchPlans()
  }, [])

  const fetchPlans = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/admin/subscription-plans")
      if (res.ok) {
        const data = await res.json()
        setPlans(data)
      }
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
        ? `/api/admin/subscription-plans/${editingId}`
        : "/api/admin/subscription-plans"
      
      const res = await fetch(url, {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        fetchPlans()
        setShowForm(false)
        setEditingId(null)
        resetForm()
      } else {
        const data = await res.json()
        alert(data.error || "Failed to save")
      }
    } catch (error) {
      console.error("Error:", error)
      alert("Failed to save")
    }
  }

  const handleEdit = (plan) => {
    setFormData({
      name: plan.name || "",
      slug: plan.slug || "",
      packsPerWeek: plan.packsPerWeek || 3,
      pricePerWeek: plan.pricePerWeek || 0,
      salePricePerWeek: plan.salePricePerWeek || null,
      stripePriceId: plan.stripePriceId || "",
      description: plan.description || "",
      active: plan.active !== undefined ? plan.active : true,
    })
    setEditingId(plan._id)
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this subscription plan?")) return
    
    try {
      const res = await fetch(`/api/admin/subscription-plans/${id}`, { method: "DELETE" })
      if (res.ok) fetchPlans()
    } catch (error) {
      console.error("Error:", error)
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      slug: "",
      packsPerWeek: 3,
      pricePerWeek: 0,
      salePricePerWeek: null,
      stripePriceId: "",
      description: "",
      active: true,
    })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow-xl">Subscription Plans</h1>
        <Button onClick={() => { setShowForm(true); setEditingId(null); resetForm() }}>
          Create New Plan
        </Button>
      </div>

      {showForm && (
        <div className="glass-card rounded-2xl md:rounded-3xl p-6 md:p-8 mb-6">
          <h2 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6 drop-shadow-md">
            {editingId ? "Edit Subscription Plan" : "Create New Subscription Plan"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/90 mb-1">Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white placeholder-white/50"
                  required
                  placeholder="e.g., Starter, Family, Chef"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/90 mb-1">Slug *</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                  className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white placeholder-white/50"
                  required
                  placeholder="weekly-3-pack"
                  disabled={editingId}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/90 mb-1">Packs Per Week *</label>
                <input
                  type="number"
                  min="1"
                  value={formData.packsPerWeek}
                  onChange={(e) => setFormData({ ...formData, packsPerWeek: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white placeholder-white/50"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/90 mb-1">Price Per Week (CAD) *</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.pricePerWeek}
                  onChange={(e) => setFormData({ ...formData, pricePerWeek: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white placeholder-white/50"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white/90 mb-1">Sale Price Per Week (Optional)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.salePricePerWeek || ""}
                  onChange={(e) => setFormData({ ...formData, salePricePerWeek: e.target.value ? parseFloat(e.target.value) : null })}
                  className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white placeholder-white/50"
                  placeholder="Leave empty for no sale"
                />
                <p className="text-xs text-white/60 mt-1">Set a sale price to show discount. Leave empty to remove sale.</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-white/90 mb-1">Stripe Price ID</label>
                <input
                  type="text"
                  value={formData.stripePriceId}
                  onChange={(e) => setFormData({ ...formData, stripePriceId: e.target.value })}
                  className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white placeholder-white/50"
                  placeholder="price_..."
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-white/90 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white placeholder-white/50"
                  rows={3}
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-white/90 mb-1">
                  <input
                    type="checkbox"
                    checked={formData.active}
                    onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                    className="rounded"
                  />
                  Active
                </label>
              </div>
            </div>

            <div className="flex gap-2">
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
              <th className="px-4 py-3 text-left text-sm font-medium text-white/90">Name</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-white/90">Slug</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-white/90">Packs/Week</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-white/90">Price/Week</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-white/90">Status</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-white/90">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {loading ? (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-white/70">Loading...</td></tr>
            ) : plans.length === 0 ? (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-white/70">No subscription plans found</td></tr>
            ) : plans.map((plan) => (
              <tr key={plan._id} className="hover:bg-white/5 transition-colors">
                <td className="px-4 py-3 text-white">{plan.name}</td>
                <td className="px-4 py-3 font-mono text-sm text-white/80">{plan.slug}</td>
                <td className="px-4 py-3 text-white/80">{plan.packsPerWeek}</td>
                <td className="px-4 py-3 text-white/80">
                  {plan.salePricePerWeek ? (
                    <div className="flex flex-col">
                      <span className="text-brand-gold font-semibold">${plan.salePricePerWeek.toFixed(2)}</span>
                      <span className="text-xs text-white/50 line-through">${plan.pricePerWeek?.toFixed(2)}</span>
                    </div>
                  ) : (
                    <span>${plan.pricePerWeek?.toFixed(2)}</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {plan.active ? (
                    <span className="px-2 py-0.5 bg-green-500/30 text-green-300 text-xs rounded">Active</span>
                  ) : (
                    <span className="px-2 py-0.5 bg-gray-500/30 text-gray-300 text-xs rounded">Inactive</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => handleEdit(plan)} className="text-brand-mint hover:text-brand-gold transition-colors mr-3">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(plan._id)} className="text-red-400 hover:text-red-300 transition-colors">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

