import { getRequestConfig } from "next-intl/server"
import { cookies } from "next/headers"

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
  
  return {
    locale,
    messages: jsonMessages,
  }
})
