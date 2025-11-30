import { brandName, taglines, contactInfo } from "@/data/siteCopy"

export function generateMetadata({
  title,
  description,
  path = "",
  image = "/og-image.jpg",
  type = "website"
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jineau.ca"
  const fullUrl = `${siteUrl}${path}`
  const fullTitle = title ? `${title} | ${brandName}` : `${brandName} - ${taglines.primary}`

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: fullUrl,
      siteName: brandName,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title || brandName,
        },
      ],
      locale: "en_CA",
      type,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  }
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brandName,
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://jineau.ca",
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || "https://jineau.ca"}/logo-jineau.svg`,
    description: taglines.secondary,
    email: contactInfo.email,
    telephone: contactInfo.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Montreal",
      addressRegion: "QC",
      addressCountry: "CA",
    },
    sameAs: [
      contactInfo.socialMedia.instagram,
      contactInfo.socialMedia.facebook,
    ],
  }
}

export function generateProductSchema(product) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jineau.ca"
  
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: `${siteUrl}${product.image}`,
    url: `${siteUrl}/products/${product.slug}`,
    brand: {
      "@type": "Brand",
      name: brandName,
    },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "CAD",
      availability: product.active 
        ? "https://schema.org/InStock" 
        : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: brandName,
      },
    },
  }
}

export function generateFAQSchema(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}

export function generateBreadcrumbSchema(items) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jineau.ca"
  
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  }
}

export function generateLocalBusinessSchema() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jineau.ca"
  
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: brandName,
    description: taglines.secondary,
    url: siteUrl,
    telephone: contactInfo.phone,
    email: contactInfo.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "South Shore Montreal",
      addressRegion: "Quebec",
      addressCountry: "CA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 45.5017,
      longitude: -73.5673,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
    priceRange: "$$",
    image: `${siteUrl}/logo-jineau.svg`,
    sameAs: [
      contactInfo.socialMedia.instagram,
      contactInfo.socialMedia.facebook,
    ],
  }
}

