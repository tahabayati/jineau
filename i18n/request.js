import { getRequestConfig } from "next-intl/server"
import { cookies } from "next/headers"

function deepMerge(target, source) {
  const output = { ...target }
  
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          output[key] = source[key]
        } else {
          output[key] = deepMerge(target[key], source[key])
        }
      } else {
        output[key] = source[key]
      }
    })
  }
  
  return output
}

function isObject(item) {
  return item && typeof item === "object" && !Array.isArray(item)
}

function isNodeRuntime() {
  try {
    return typeof process !== "undefined" && process.versions && process.versions.node
  } catch {
    return false
  }
}

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale

  if (!locale) {
    const cookieStore = await cookies()
    locale = cookieStore.get("NEXT_LOCALE")?.value || "en"
  }

  if (!["en", "fr", "fa"].includes(locale)) {
    locale = "en"
  }

  const jsonMessages = (await import(`../messages/${locale}.json`)).default
  
  if (!isNodeRuntime()) {
    return {
      locale,
      messages: jsonMessages,
    }
  }
  
  try {
    const { getSiteContentMap, convertMapToNestedMessages } = await import("@/lib/siteContent")
    const dbMap = await getSiteContentMap()
    const dbMessages = convertMapToNestedMessages(dbMap, locale)
    const finalMessages = deepMerge(jsonMessages, dbMessages)
    
    return {
      locale,
      messages: finalMessages,
    }
  } catch (error) {
    return {
      locale,
      messages: jsonMessages,
    }
  }
})
