"use client"

import { useTranslations } from "next-intl"
import { regionConfig } from "@/lib/config"

// Helper function to highlight "Jineau" with gradient text
const highlightJineau = (text) => {
  const parts = text.split(/(Jineau|jineau)/gi)
  return parts.map((part, i) => 
    /^Jineau$/i.test(part) ? (
      <span key={i} className="gradient-text font-bold">{part}</span>
    ) : (
      part
    )
  )
}

export default function GiftOneSection({
  enabled,
  onToggle,
  giftType,
  onTypeChange,
  customCenter,
  onCustomCenterChange,
}) {
  const t = useTranslations("subscribe")

  return (
    <div className="bg-gradient-to-r from-brand-gold/20 to-brand-gold/5 rounded-xl p-6 border border-brand-gold/30">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 mt-1">
          <button
            onClick={() => onToggle(!enabled)}
            className={`w-12 h-6 rounded-full transition-colors relative ${
              enabled ? "bg-brand-primary" : "bg-brand-secondary/40"
            }`}
          >
            <span
              className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                enabled ? "translate-x-6" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
            {t("buyOneGiftOne")}
            <span className="text-2xl">🎁</span>
          </h4>
          <p className="text-sm text-gray-600 mb-4">
            {t("buyOneGiftOneDesc")}
          </p>

          {enabled && (
            <div className="space-y-4 pt-4 border-t border-brand-gold/30">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="giftType"
                  value="default-center"
                  checked={giftType === "default-center"}
                  onChange={(e) => onTypeChange(e.target.value)}
                  className="mt-1 w-4 h-4 text-brand-primary focus:ring-brand-primary"
                />
                <div>
                  <span className="font-medium text-gray-900">{highlightJineau(t("letJineauChoose"))}</span>
                  <p className="text-sm text-gray-500">We'll select an active senior center in {regionConfig.deliveryRegion}</p>
                </div>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="giftType"
                  value="custom-center"
                  checked={giftType === "custom-center"}
                  onChange={(e) => onTypeChange(e.target.value)}
                  className="mt-1 w-4 h-4 text-brand-primary focus:ring-brand-primary"
                />
                <div>
                  <span className="font-medium text-gray-900">{t("specifyCenter")}</span>
                </div>
              </label>

              {giftType === "custom-center" && (
                <div className="ml-7 space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("centerName")}
                    </label>
                    <input
                      type="text"
                      value={customCenter.name}
                      onChange={(e) => onCustomCenterChange({ ...customCenter, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                      placeholder="Senior Center Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("centerAddress")}
                    </label>
                    <input
                      type="text"
                      value={customCenter.address}
                      onChange={(e) => onCustomCenterChange({ ...customCenter, address: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                      placeholder="Full address"
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

