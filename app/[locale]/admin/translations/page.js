"use client"

import { useState, useEffect, useCallback } from "react"

const LOCALES = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "fa", name: "فارسی", flag: "🇮🇷", rtl: true },
]

export default function TranslationsPage() {
  const [translations, setTranslations] = useState([])
  const [namespaces, setNamespaces] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  
  // Filters
  const [selectedNamespace, setSelectedNamespace] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  
  // Edit modal
  const [editingTranslation, setEditingTranslation] = useState(null)
  const [editForm, setEditForm] = useState({
    namespace: "",
    key: "",
    values: { en: "", fr: "", fa: "" },
    description: "",
  })
  
  // Create modal
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [createForm, setCreateForm] = useState({
    namespace: "",
    key: "",
    values: { en: "", fr: "", fa: "" },
    description: "",
  })
  
  // Seed status
  const [seedStatus, setSeedStatus] = useState(null)
  const [seeding, setSeeding] = useState(false)

  const fetchTranslations = useCallback(async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (selectedNamespace) params.set("namespace", selectedNamespace)
      if (searchQuery) params.set("search", searchQuery)
      
      const res = await fetch(`/api/admin/translations?${params}`)
      if (!res.ok) throw new Error("Failed to fetch translations")
      
      const data = await res.json()
      setTranslations(data.translations)
      setNamespaces(data.namespaces)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [selectedNamespace, searchQuery])
  
  const fetchSeedStatus = async () => {
    try {
      const res = await fetch("/api/admin/translations/seed")
      if (res.ok) {
        const data = await res.json()
        setSeedStatus(data)
      }
    } catch (err) {
      console.error("Failed to fetch seed status:", err)
    }
  }

  useEffect(() => {
    fetchTranslations()
    fetchSeedStatus()
  }, [fetchTranslations])
  
  const handleSeed = async (overwrite = false) => {
    if (!confirm(
      overwrite 
        ? "This will overwrite ALL existing translations with values from JSON files. Are you sure?"
        : "This will import translations from JSON files. Existing translations will NOT be overwritten. Continue?"
    )) return
    
    setSeeding(true)
    setError(null)
    try {
      const res = await fetch(`/api/admin/translations/seed?overwrite=${overwrite}`, {
        method: "POST",
      })
      if (!res.ok) throw new Error("Failed to seed translations")
      
      const data = await res.json()
      setSuccess(`Seed completed: ${data.created} created, ${data.updated} updated, ${data.skipped} skipped`)
      fetchTranslations()
      fetchSeedStatus()
    } catch (err) {
      setError(err.message)
    } finally {
      setSeeding(false)
    }
  }
  
  const handleCreate = async (e) => {
    e.preventDefault()
    setError(null)
    
    try {
      const res = await fetch("/api/admin/translations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(createForm),
      })
      
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Failed to create translation")
      }
      
      setSuccess("Translation created successfully")
      setShowCreateModal(false)
      setCreateForm({ namespace: "", key: "", values: { en: "", fr: "", fa: "" }, description: "" })
      fetchTranslations()
      fetchSeedStatus()
    } catch (err) {
      setError(err.message)
    }
  }
  
  const handleEdit = (translation) => {
    setEditingTranslation(translation)
    setEditForm({
      namespace: translation.namespace,
      key: translation.key,
      values: { ...translation.values },
      description: translation.description || "",
    })
  }
  
  const handleUpdate = async (e) => {
    e.preventDefault()
    setError(null)
    
    try {
      const res = await fetch(`/api/admin/translations/${editingTranslation._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      })
      
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Failed to update translation")
      }
      
      setSuccess("Translation updated successfully")
      setEditingTranslation(null)
      fetchTranslations()
    } catch (err) {
      setError(err.message)
    }
  }
  
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this translation?")) return
    
    try {
      const res = await fetch(`/api/admin/translations/${id}`, {
        method: "DELETE",
      })
      
      if (!res.ok) throw new Error("Failed to delete translation")
      
      setSuccess("Translation deleted successfully")
      fetchTranslations()
      fetchSeedStatus()
    } catch (err) {
      setError(err.message)
    }
  }
  
  const handleExport = async (locale) => {
    try {
      const res = await fetch(`/api/admin/translations/export?locale=${locale}`)
      if (!res.ok) throw new Error("Failed to export translations")
      
      const data = await res.json()
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${locale}.json`
      a.click()
      URL.revokeObjectURL(url)
    } catch (err) {
      setError(err.message)
    }
  }

  // Auto-dismiss success messages
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(null), 5000)
      return () => clearTimeout(timer)
    }
  }, [success])

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow-xl">🌐 Translations</h1>
          <p className="text-white/80 text-sm md:text-base mt-1">
            Manage all website translations for English, French, and Persian
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-gradient-to-r from-brand-mint to-brand-primary text-white rounded-lg hover:shadow-[0_0_40px_rgba(112,178,178,0.5)] transition-all"
          >
            ➕ Add Translation
          </button>
          
          <div className="relative group">
            <button className="px-4 py-2 glass text-white rounded-lg hover:bg-white/10 transition-all">
              📥 Export
            </button>
            <div className="absolute right-0 mt-2 w-48 glass-strong rounded-lg shadow-lg border border-white/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
              {LOCALES.map((locale) => (
                <button
                  key={locale.code}
                  onClick={() => handleExport(locale.code)}
                  className="block w-full px-4 py-2 text-left text-white/90 hover:bg-white/10 hover:text-white first:rounded-t-lg last:rounded-b-lg transition-colors"
                >
                  {locale.flag} {locale.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Alerts */}
      {error && (
        <div className="mb-4 p-4 bg-red-500/20 border border-red-500/50 text-red-300 rounded-lg flex items-center justify-between">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="text-red-300 hover:text-red-200">✕</button>
        </div>
      )}
      
      {success && (
        <div className="mb-4 p-4 bg-green-500/20 border border-green-500/50 text-green-300 rounded-lg flex items-center justify-between">
          <span>{success}</span>
          <button onClick={() => setSuccess(null)} className="text-green-300 hover:text-green-200">✕</button>
        </div>
      )}
      
      {/* Seed Status Card */}
      <div className="mb-6 p-4 glass-card rounded-xl md:rounded-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h3 className="font-semibold text-white">📦 Import from JSON Files</h3>
            <p className="text-sm text-white/80 mt-1">
              {seedStatus ? (
                <>
                  Database has <strong>{seedStatus.dbCount}</strong> translations. 
                  JSON files have <strong>{seedStatus.jsonCount}</strong> keys.
                  {seedStatus.isSynced ? " ✓ Synced" : " ⚠️ Not synced"}
                </>
              ) : (
                "Loading status..."
              )}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handleSeed(false)}
              disabled={seeding}
              className="px-4 py-2 bg-gradient-to-r from-brand-gold to-amber-400 text-gray-900 rounded-lg hover:shadow-[0_0_40px_rgba(233,196,106,0.5)] disabled:opacity-50 transition-all font-semibold"
            >
              {seeding ? "Importing..." : "Import New Only"}
            </button>
            <button
              onClick={() => handleSeed(true)}
              disabled={seeding}
              className="px-4 py-2 bg-red-500/80 text-white rounded-lg hover:bg-red-500 disabled:opacity-50 transition-colors font-semibold"
            >
              Overwrite All
            </button>
          </div>
        </div>
      </div>
      
      {/* Filters */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <input
          type="text"
          placeholder="Search translations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 px-4 py-2 glass border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-mint text-white placeholder-white/50"
        />
        
        <select
          value={selectedNamespace}
          onChange={(e) => setSelectedNamespace(e.target.value)}
          className="px-4 py-2 glass border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-mint text-white"
        >
          <option value="">All Namespaces</option>
          {namespaces.map((ns) => (
            <option key={ns} value={ns}>{ns}</option>
          ))}
        </select>
      </div>
      
      {/* Translations Table */}
      <div className="glass-card rounded-2xl md:rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5 border-b border-white/10">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-white/90 uppercase tracking-wider">
                  Namespace / Key
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-white/90 uppercase tracking-wider">
                  🇬🇧 English
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-white/90 uppercase tracking-wider">
                  🇫🇷 Français
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-white/90 uppercase tracking-wider">
                  🇮🇷 فارسی
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-white/90 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-white/70">
                    Loading translations...
                  </td>
                </tr>
              ) : translations.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-white/70">
                    No translations found. Click "Import New Only" to import from JSON files.
                  </td>
                </tr>
              ) : (
                translations.map((t) => (
                  <tr key={t._id} className="hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3">
                      <span className="inline-block px-2 py-1 text-xs font-medium glass text-white/90 rounded mr-2">
                        {t.namespace}
                      </span>
                      <span className="text-sm font-mono text-white">{t.key}</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-white/80 max-w-xs truncate" title={t.values.en}>
                      {t.values.en || <span className="text-white/40 italic">Empty</span>}
                    </td>
                    <td className="px-4 py-3 text-sm text-white/80 max-w-xs truncate" title={t.values.fr}>
                      {t.values.fr || <span className="text-white/40 italic">Empty</span>}
                    </td>
                    <td className="px-4 py-3 text-sm text-white/80 max-w-xs truncate" dir="rtl" title={t.values.fa}>
                      {t.values.fa || <span className="text-white/40 italic">Empty</span>}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => handleEdit(t)}
                        className="text-brand-mint hover:text-brand-gold transition-colors mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(t._id)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Edit Modal */}
      {editingTranslation && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="glass-strong rounded-2xl md:rounded-3xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 drop-shadow-md">Edit Translation</h2>
              
              <form onSubmit={handleUpdate}>
                <div className="grid grid-cols-2 gap-4 mb-4 md:mb-6">
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-1">
                      Namespace
                    </label>
                    <input
                      type="text"
                      value={editForm.namespace}
                      onChange={(e) => setEditForm({ ...editForm, namespace: e.target.value })}
                      className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-mint text-white placeholder-white/50"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-1">
                      Key
                    </label>
                    <input
                      type="text"
                      value={editForm.key}
                      onChange={(e) => setEditForm({ ...editForm, key: e.target.value })}
                      className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-mint text-white placeholder-white/50"
                      required
                    />
                  </div>
                </div>
                
                {LOCALES.map((locale) => (
                  <div key={locale.code} className="mb-4">
                    <label className="block text-sm font-medium text-white/90 mb-1">
                      {locale.flag} {locale.name}
                    </label>
                    <textarea
                      value={editForm.values[locale.code]}
                      onChange={(e) => setEditForm({
                        ...editForm,
                        values: { ...editForm.values, [locale.code]: e.target.value }
                      })}
                      rows={3}
                      dir={locale.rtl ? "rtl" : "ltr"}
                      className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-mint text-white placeholder-white/50"
                    />
                  </div>
                ))}
                
                <div className="mb-4 md:mb-6">
                  <label className="block text-sm font-medium text-white/90 mb-1">
                    Description (optional)
                  </label>
                  <input
                    type="text"
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    placeholder="Where is this translation used?"
                    className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-mint text-white placeholder-white/50"
                  />
                </div>
                
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingTranslation(null)}
                    className="px-4 py-2 text-white/80 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gradient-to-r from-brand-mint to-brand-primary text-white rounded-lg hover:shadow-[0_0_40px_rgba(112,178,178,0.5)] transition-all"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      
      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="glass-strong rounded-2xl md:rounded-3xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-4 md:mb-6 drop-shadow-md">Add New Translation</h2>
              
              <form onSubmit={handleCreate}>
                <div className="grid grid-cols-2 gap-4 mb-4 md:mb-6">
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-1">
                      Namespace
                    </label>
                    <input
                      type="text"
                      value={createForm.namespace}
                      onChange={(e) => setCreateForm({ ...createForm, namespace: e.target.value })}
                      placeholder="e.g., common, nav, home"
                      className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-mint text-white placeholder-white/50"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/90 mb-1">
                      Key
                    </label>
                    <input
                      type="text"
                      value={createForm.key}
                      onChange={(e) => setCreateForm({ ...createForm, key: e.target.value })}
                      placeholder="e.g., buttonLabel, pageTitle"
                      className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-mint text-white placeholder-white/50"
                      required
                    />
                  </div>
                </div>
                
                {LOCALES.map((locale) => (
                  <div key={locale.code} className="mb-4">
                    <label className="block text-sm font-medium text-white/90 mb-1">
                      {locale.flag} {locale.name}
                    </label>
                    <textarea
                      value={createForm.values[locale.code]}
                      onChange={(e) => setCreateForm({
                        ...createForm,
                        values: { ...createForm.values, [locale.code]: e.target.value }
                      })}
                      rows={3}
                      dir={locale.rtl ? "rtl" : "ltr"}
                      className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-mint text-white placeholder-white/50"
                    />
                  </div>
                ))}
                
                <div className="mb-4 md:mb-6">
                  <label className="block text-sm font-medium text-white/90 mb-1">
                    Description (optional)
                  </label>
                  <input
                    type="text"
                    value={createForm.description}
                    onChange={(e) => setCreateForm({ ...createForm, description: e.target.value })}
                    placeholder="Where is this translation used?"
                    className="w-full px-3 py-2 glass border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-mint text-white placeholder-white/50"
                  />
                </div>
                
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 text-white/80 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-gradient-to-r from-brand-mint to-brand-primary text-white rounded-lg hover:shadow-[0_0_40px_rgba(112,178,178,0.5)] transition-all"
                  >
                    Create Translation
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

