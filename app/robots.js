export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jineau.ca"

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/account", "/login", "/register"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}

