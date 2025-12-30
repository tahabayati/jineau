"use client"

import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import Button from "@/components/Button"

export default function PopupsPage() {
  const [popup, setPopup] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    text: { en: "", fr: "", fa: "" },
    shopButtonText: { en: "Shop", fr: "Boutique", fa: "فروشگاه" },
    subscribeButtonText: { en: "Subscribe", fr: "S'abonner", fa: "اشتراک" },
    signUpButtonText: { en: "Sign Up", fr: "S'inscrire", fa: "ثبت نام" },
    isActive: false,
  })
  const t = useTranslations("admin")

  useEffect(() => {
    fetchPopup()
  }, [])

  const fetchPopup = async () => {
    try {
      const res = await fetch("/api/admin/popups")
      if (res.ok) {
        const data = await res.json()
        if (data) {
          setPopup(data)
          setFormData({
            text: {
              en: data.text?.en || "",
              fr: data.text?.fr || "",
              fa: data.text?.fa || "",
            },
            shopButtonText: {
              en: data.shopButtonText?.en || "Shop",
              fr: data.shopButtonText?.fr || "Boutique",
              fa: data.shopButtonText?.fa || "فروشگاه",
            },
            subscribeButtonText: {
              en: data.subscribeButtonText?.en || "Subscribe",
              fr: data.subscribeButtonText?.fr || "S'abonner",
              fa: data.subscribeButtonText?.fa || "اشتراک",
            },
            signUpButtonText: {
              en: data.signUpButtonText?.en || "Sign Up",
              fr: data.signUpButtonText?.fr || "S'inscrire",
              fa: data.signUpButtonText?.fa || "ثبت نام",
            },
            isActive: data.isActive || false,
          })
        }
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
      const url = popup?._id 
        ? `/api/admin/popups/${popup._id}`
        : "/api/admin/popups"
      
      const res = await fetch(url, {
        method: popup?._id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        const data = await res.json()
        setPopup(data)
        setShowForm(false)
        alert("Popup saved successfully!")
      } else {
        const data = await res.json()
        alert(data.error || "Failed to save")
      }
    } catch (error) {
      console.error("Error:", error)
      alert("Failed to save")
    }
  }

  const handleDelete = async () => {
    if (!popup?._id) return
    if (!confirm("Are you sure you want to delete this popup?")) return
    
    try {
      const res = await fetch(`/api/admin/popups/${popup._id}`, { method: "DELETE" })
      if (res.ok) {
        setPopup(null)
        setFormData({
          text: { en: "", fr: "", fa: "" },
          shopButtonText: { en: "Shop", fr: "Boutique", fa: "فروشگاه" },
          subscribeButtonText: { en: "Subscribe", fr: "S'abonner", fa: "اشتراک" },
          signUpButtonText: { en: "Sign Up", fr: "S'inscrire", fa: "ثبت نام" },
          isActive: false,
        })
        alert("Popup deleted successfully!")
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  const toggleActive = async () => {
    if (!popup?._id) return
    
    const newActiveState = !popup.isActive
    
    try {
      const res = await fetch(`/api/admin/popups/${popup._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          text: popup.text,
          shopButtonText: popup.shopButtonText,
          subscribeButtonText: popup.subscribeButtonText,
          signUpButtonText: popup.signUpButtonText,
          isActive: newActiveState 
        }),
      })

      if (res.ok) {
        const data = await res.json()
        setPopup(data)
        setFormData({ 
          text: data.text,
          shopButtonText: data.shopButtonText || { en: "Shop", fr: "Boutique", fa: "فروشگاه" },
          subscribeButtonText: data.subscribeButtonText || { en: "Subscribe", fr: "S'abonner", fa: "اشتراک" },
          signUpButtonText: data.signUpButtonText || { en: "Sign Up", fr: "S'inscrire", fa: "ثبت نام" },
          isActive: data.isActive 
        })
        alert(`Popup ${data.isActive ? "activated" : "deactivated"} successfully!`)
      }
    } catch (error) {
      console.error("Error:", error)
      alert("Failed to toggle popup status")
    }
  }

  if (loading) {
    return (
      <div className="text-center text-white/70 py-8">Loading...</div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow-xl">Popup Management</h1>
        <Button onClick={() => setShowForm(true)}>
          {popup ? "Edit Popup" : "Create Popup"}
        </Button>
      </div>

      {popup && (
        <div className="glass-card rounded-2xl md:rounded-3xl p-6 md:p-8 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-white mb-2">Current Popup</h2>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  popup.isActive 
                    ? "bg-green-500/30 text-green-300" 
                    : "bg-gray-500/30 text-gray-300"
                }`}>
                  {popup.isActive ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={toggleActive}
                variant={popup.isActive ? "ghost" : "primary"}
              >
                {popup.isActive ? "Deactivate" : "Activate"}
              </Button>
              {popup._id && (
                <Button onClick={handleDelete} variant="ghost" className="text-red-400 hover:text-red-300">
                  Delete
                </Button>
              )}
            </div>
          </div>
          
          {popup.isActive && (
            <div className="mt-4 p-4 glass border border-white/20 rounded-lg">
              <p className="text-sm text-white/70 mb-2">Preview:</p>
              <div className="text-white">
                <p className="mb-2"><strong>EN:</strong> {popup.text?.en || "N/A"}</p>
                <p className="mb-2"><strong>FR:</strong> {popup.text?.fr || "N/A"}</p>
                <p className="mb-4"><strong>FA:</strong> {popup.text?.fa || "N/A"}</p>
                <div className="mt-4 pt-4 border-t border-white/20">
                  <p className="text-xs text-white/70 mb-2">Button Texts:</p>
                  <p className="text-xs mb-1"><strong>Shop:</strong> EN: {popup.shopButtonText?.en || "Shop"}, FR: {popup.shopButtonText?.fr || "Boutique"}, FA: {popup.shopButtonText?.fa || "فروشگاه"}</p>
                  <p className="text-xs mb-1"><strong>Subscribe:</strong> EN: {popup.subscribeButtonText?.en || "Subscribe"}, FR: {popup.subscribeButtonText?.fr || "S'abonner"}, FA: {popup.subscribeButtonText?.fa || "اشتراک"}</p>
                  <p className="text-xs"><strong>Sign Up:</strong> EN: {popup.signUpButtonText?.en || "Sign Up"}, FR: {popup.signUpButtonText?.fr || "S'inscrire"}, FA: {popup.signUpButtonText?.fa || "ثبت نام"}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {showForm && (
        <div className="glass-card rounded-2xl md:rounded-3xl p-6 md:p-8 mb-6">
          <h2 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6 drop-shadow-md">
            {popup ? "Edit Popup" : "Create New Popup"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-6">
              {/* Popup Text */}
              <div>
                <label className="block text-sm font-medium text-white/90 mb-3">Popup Message</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-white/70 mb-1">English (EN)</label>
                    <textarea
                      value={formData.text.en}
                      onChange={(e) => setFormData({ ...formData, text: { ...formData.text, en: e.target.value } })}
                      className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white placeholder-white/50"
                      rows={4}
                      placeholder="e.g., Check out our Christmas sales!!"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-white/70 mb-1">French (FR)</label>
                    <textarea
                      value={formData.text.fr}
                      onChange={(e) => setFormData({ ...formData, text: { ...formData.text, fr: e.target.value } })}
                      className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white placeholder-white/50"
                      rows={4}
                      placeholder="e.g., Découvrez nos ventes de Noël!!"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-white/70 mb-1">Persian (FA)</label>
                    <textarea
                      value={formData.text.fa}
                      onChange={(e) => setFormData({ ...formData, text: { ...formData.text, fa: e.target.value } })}
                      className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white placeholder-white/50"
                      rows={4}
                      dir="rtl"
                      placeholder="مثال: فروش کریسمس ما را بررسی کنید!!"
                    />
                  </div>
                </div>
              </div>

              {/* Shop Button Text */}
              <div>
                <label className="block text-sm font-medium text-white/90 mb-3">Shop Button Text</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-white/70 mb-1">English (EN)</label>
                    <input
                      type="text"
                      value={formData.shopButtonText.en}
                      onChange={(e) => setFormData({ ...formData, shopButtonText: { ...formData.shopButtonText, en: e.target.value } })}
                      className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white placeholder-white/50"
                      placeholder="Shop"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-white/70 mb-1">French (FR)</label>
                    <input
                      type="text"
                      value={formData.shopButtonText.fr}
                      onChange={(e) => setFormData({ ...formData, shopButtonText: { ...formData.shopButtonText, fr: e.target.value } })}
                      className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white placeholder-white/50"
                      placeholder="Boutique"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-white/70 mb-1">Persian (FA)</label>
                    <input
                      type="text"
                      value={formData.shopButtonText.fa}
                      onChange={(e) => setFormData({ ...formData, shopButtonText: { ...formData.shopButtonText, fa: e.target.value } })}
                      className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white placeholder-white/50"
                      dir="rtl"
                      placeholder="فروشگاه"
                    />
                  </div>
                </div>
              </div>

              {/* Subscribe Button Text */}
              <div>
                <label className="block text-sm font-medium text-white/90 mb-3">Subscribe Button Text</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-white/70 mb-1">English (EN)</label>
                    <input
                      type="text"
                      value={formData.subscribeButtonText.en}
                      onChange={(e) => setFormData({ ...formData, subscribeButtonText: { ...formData.subscribeButtonText, en: e.target.value } })}
                      className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white placeholder-white/50"
                      placeholder="Subscribe"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-white/70 mb-1">French (FR)</label>
                    <input
                      type="text"
                      value={formData.subscribeButtonText.fr}
                      onChange={(e) => setFormData({ ...formData, subscribeButtonText: { ...formData.subscribeButtonText, fr: e.target.value } })}
                      className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white placeholder-white/50"
                      placeholder="S'abonner"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-white/70 mb-1">Persian (FA)</label>
                    <input
                      type="text"
                      value={formData.subscribeButtonText.fa}
                      onChange={(e) => setFormData({ ...formData, subscribeButtonText: { ...formData.subscribeButtonText, fa: e.target.value } })}
                      className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white placeholder-white/50"
                      dir="rtl"
                      placeholder="اشتراک"
                    />
                  </div>
                </div>
              </div>

              {/* Sign Up Button Text */}
              <div>
                <label className="block text-sm font-medium text-white/90 mb-3">Sign Up Button Text</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-white/70 mb-1">English (EN)</label>
                    <input
                      type="text"
                      value={formData.signUpButtonText.en}
                      onChange={(e) => setFormData({ ...formData, signUpButtonText: { ...formData.signUpButtonText, en: e.target.value } })}
                      className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white placeholder-white/50"
                      placeholder="Sign Up"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-white/70 mb-1">French (FR)</label>
                    <input
                      type="text"
                      value={formData.signUpButtonText.fr}
                      onChange={(e) => setFormData({ ...formData, signUpButtonText: { ...formData.signUpButtonText, fr: e.target.value } })}
                      className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white placeholder-white/50"
                      placeholder="S'inscrire"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-white/70 mb-1">Persian (FA)</label>
                    <input
                      type="text"
                      value={formData.signUpButtonText.fa}
                      onChange={(e) => setFormData({ ...formData, signUpButtonText: { ...formData.signUpButtonText, fa: e.target.value } })}
                      className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:ring-2 focus:ring-brand-mint text-white placeholder-white/50"
                      dir="rtl"
                      placeholder="ثبت نام"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="w-4 h-4 rounded border-white/20 bg-white/10 text-brand-mint focus:ring-brand-mint"
              />
              <label htmlFor="isActive" className="text-sm font-medium text-white/90">
                Activate popup (show on home page)
              </label>
            </div>

            <div className="flex gap-2">
              <Button type="submit">{popup ? "Update" : "Create"}</Button>
              <Button type="button" variant="ghost" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {!popup && !showForm && (
        <div className="glass-card rounded-2xl md:rounded-3xl p-8 text-center">
          <p className="text-white/70 mb-4">No popup created yet.</p>
          <Button onClick={() => setShowForm(true)}>Create Your First Popup</Button>
        </div>
      )}
    </div>
  )
}

