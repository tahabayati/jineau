export const SUPPORTED_LOCALES = ["en", "fr", "fa"]

export const PUBLIC_ROUTES = [
  "/",
  "/about",
  "/privacy",
  "/terms",
  "/faq",
  "/how-it-works",
  "/for-families",
  "/for-chefs",
  "/for-wellness",
  "/refunds",
  "/shop",
  "/blog",
]

// Note: Blog post detail pages (/blog/[slug]) are handled dynamically via revalidatePath in API routes

export function getPathsToRevalidate() {
  const paths = []
  
  paths.push("/")
  
  SUPPORTED_LOCALES.forEach((locale) => {
    paths.push(`/${locale}`)
    
    PUBLIC_ROUTES.forEach((route) => {
      if (route !== "/") {
        paths.push(`/${locale}${route}`)
      }
    })
  })
  
  return paths
}



