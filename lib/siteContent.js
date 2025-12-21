import { unstable_cache } from "next/cache"
import dbConnect from "./mongodb"
import SiteContent from "@/models/SiteContent"

export const getCachedSiteContentMap = unstable_cache(
  async () => {
    await dbConnect()
    const items = await SiteContent.find({}).lean()
    
    const map = {}
    items.forEach((item) => {
      map[item.key] = {
        en: item.value?.en || "",
        fr: item.value?.fr || "",
        fa: item.value?.fa || "",
        type: item.type || "text",
        meta: item.meta || {},
      }
    })
    
    return map
  },
  ["site-content-map"],
  { tags: ["site-content"] }
)

export async function getSiteContentMap() {
  return await getCachedSiteContentMap()
}

export async function getSiteText(key, locale, fallback = "") {
  const map = await getSiteContentMap()
  const item = map[key]
  
  if (!item) return fallback
  
  const value = item[locale] || item.en || fallback
  return value
}

export function convertMapToNestedMessages(map, locale) {
  const nested = {}
  
  Object.keys(map).forEach((key) => {
    const value = map[key][locale]
    if (!value) return
    
    const parts = key.split(".")
    let current = nested
    
    for (let i = 0; i < parts.length - 1; i++) {
      if (typeof current[parts[i]] !== "object" || current[parts[i]] === null || Array.isArray(current[parts[i]])) {
        if (current[parts[i]] !== undefined) {
          return
        }
        current[parts[i]] = {}
      }
      current = current[parts[i]]
    }
    
    const lastKey = parts[parts.length - 1]
    if (typeof current === "object" && current !== null && !Array.isArray(current)) {
      current[lastKey] = value
    }
  })
  
  return nested
}

