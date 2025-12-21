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
    <div className="bg-gradient-to-r from-brand-gold/20 to-brand-gold/5 rounded-xl p-4 sm:p-6 border border-brand-gold/30 overflow-hidden">
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="shrink-0 pt-0.5">
          <button
            onClick={() => onToggle(!enabled)}
            aria-label={enabled ? t("disableGiftOne") : t("enableGiftOne")}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary ${
              enabled ? "bg-brand-primary" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-4 w-4 rounded-full bg-white shadow-md transition-transform duration-300 ${
                enabled ? "translate-x-6" : "translate-x-1"
              }`}
            />
          </button>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-gray-900 mb-1 flex items-center gap-2 flex-wrap">
            <span>{t("buyOneGiftOne")}</span>
            <span className="text-2xl">🎁</span>
          </h4>
          <p className="text-sm text-gray-600 mb-4">
            {t("buyOneGiftOneDesc")}
          </p>

          {enabled && (
            <div className="space-y-3 sm:space-y-4 pt-4 border-t border-brand-gold/30">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="giftType"
                  value="default-center"
                  checked={giftType === "default-center"}
                  onChange={(e) => onTypeChange(e.target.value)}
                  className="mt-1 w-4 h-4 text-brand-primary focus:ring-brand-primary focus:ring-offset-2"
                />
                <div className="flex-1 min-w-0">
                  <span className="font-medium text-gray-900 block">{highlightJineau(t("letJineauChoose"))}</span>
                  <p className="text-sm text-gray-500 mt-0.5">We'll select an active senior center in {regionConfig.deliveryRegion}</p>
                </div>
              </label>

              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="giftType"
                  value="custom-center"
                  checked={giftType === "custom-center"}
                  onChange={(e) => onTypeChange(e.target.value)}
                  className="mt-1 w-4 h-4 text-brand-primary focus:ring-brand-primary focus:ring-offset-2"
                />
                <div className="flex-1 min-w-0">
                  <span className="font-medium text-gray-900 block">{t("specifyCenter")}</span>
                </div>
              </label>

              {giftType === "custom-center" && (
                <div className="ml-0 sm:ml-7 space-y-3 pt-2">
                  <div>
                    <label htmlFor="centerName" className="block text-sm font-semibold text-gray-900 mb-1.5">
                      {t("centerName")}
                    </label>
                    <input
                      id="centerName"
                      type="text"
                      value={customCenter.name}
                      onChange={(e) => onCustomCenterChange({ ...customCenter, name: e.target.value })}
                      className="w-full px-3 py-2.5 text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-shadow bg-white"
                      placeholder="Senior Center Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="centerAddress" className="block text-sm font-semibold text-gray-900 mb-1.5">
                      {t("centerAddress")}
                    </label>
                    <input
                      id="centerAddress"
                      type="text"
                      value={customCenter.address}
                      onChange={(e) => onCustomCenterChange({ ...customCenter, address: e.target.value })}
                      className="w-full px-3 py-2.5 text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-shadow bg-white"
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

