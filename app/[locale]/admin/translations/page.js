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
          <h1 className="text-2xl font-bold text-gray-800">🌐 Translations</h1>
          <p className="text-gray-600 text-sm mt-1">
            Manage all website translations for English, French, and Persian
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            ➕ Add Translation
          </button>
          
          <div className="relative group">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              📥 Export
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
              {LOCALES.map((locale) => (
                <button
                  key={locale.code}
                  onClick={() => handleExport(locale.code)}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
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
        <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center justify-between">
          <span>{error}</span>
          <button onClick={() => setError(null)} className="text-red-700 hover:text-red-900">✕</button>
        </div>
      )}
      
      {success && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-center justify-between">
          <span>{success}</span>
          <button onClick={() => setSuccess(null)} className="text-green-700 hover:text-green-900">✕</button>
        </div>
      )}
      
      {/* Seed Status Card */}
      <div className="mb-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-lg">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h3 className="font-semibold text-amber-800">📦 Import from JSON Files</h3>
            <p className="text-sm text-amber-700 mt-1">
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
              className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 disabled:opacity-50 transition-colors"
            >
              {seeding ? "Importing..." : "Import New Only"}
            </button>
            <button
              onClick={() => handleSeed(true)}
              disabled={seeding}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
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
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        
        <select
          value={selectedNamespace}
          onChange={(e) => setSelectedNamespace(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="">All Namespaces</option>
          {namespaces.map((ns) => (
            <option key={ns} value={ns}>{ns}</option>
          ))}
        </select>
      </div>
      
      {/* Translations Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Namespace / Key
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  🇬🇧 English
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  🇫🇷 Français
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  🇮🇷 فارسی
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                    Loading translations...
                  </td>
                </tr>
              ) : translations.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                    No translations found. Click "Import New Only" to import from JSON files.
                  </td>
                </tr>
              ) : (
                translations.map((t) => (
                  <tr key={t._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded mr-2">
                        {t.namespace}
                      </span>
                      <span className="text-sm font-mono text-gray-900">{t.key}</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 max-w-xs truncate" title={t.values.en}>
                      {t.values.en || <span className="text-gray-400 italic">Empty</span>}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 max-w-xs truncate" title={t.values.fr}>
                      {t.values.fr || <span className="text-gray-400 italic">Empty</span>}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 max-w-xs truncate" dir="rtl" title={t.values.fa}>
                      {t.values.fa || <span className="text-gray-400 italic">Empty</span>}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => handleEdit(t)}
                        className="text-blue-600 hover:text-blue-800 mr-3"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(t._id)}
                        className="text-red-600 hover:text-red-800"
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Edit Translation</h2>
              
              <form onSubmit={handleUpdate}>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Namespace
                    </label>
                    <input
                      type="text"
                      value={editForm.namespace}
                      onChange={(e) => setEditForm({ ...editForm, namespace: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Key
                    </label>
                    <input
                      type="text"
                      value={editForm.key}
                      onChange={(e) => setEditForm({ ...editForm, key: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      required
                    />
                  </div>
                </div>
                
                {LOCALES.map((locale) => (
                  <div key={locale.code} className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                ))}
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description (optional)
                  </label>
                  <input
                    type="text"
                    value={editForm.description}
                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                    placeholder="Where is this translation used?"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingTranslation(null)}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Add New Translation</h2>
              
              <form onSubmit={handleCreate}>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Namespace
                    </label>
                    <input
                      type="text"
                      value={createForm.namespace}
                      onChange={(e) => setCreateForm({ ...createForm, namespace: e.target.value })}
                      placeholder="e.g., common, nav, home"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Key
                    </label>
                    <input
                      type="text"
                      value={createForm.key}
                      onChange={(e) => setCreateForm({ ...createForm, key: e.target.value })}
                      placeholder="e.g., buttonLabel, pageTitle"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      required
                    />
                  </div>
                </div>
                
                {LOCALES.map((locale) => (
                  <div key={locale.code} className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                ))}
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description (optional)
                  </label>
                  <input
                    type="text"
                    value={createForm.description}
                    onChange={(e) => setCreateForm({ ...createForm, description: e.target.value })}
                    placeholder="Where is this translation used?"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                
                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
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

