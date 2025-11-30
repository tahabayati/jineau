import { contactInfo, brandName, seoKeywords } from "@/data/siteCopy"
import { regionConfig } from "@/lib/config"

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brandName,
    url: "https://jineau.ca",
    logo: "https://jineau.ca/logo-jineau.svg",
    description: "Locally grown microgreens and hydrosols, delivered fresh to your door.",
    address: {
      "@type": "PostalAddress",
      addressLocality: regionConfig.companyLocation,
      addressRegion: regionConfig.province,
      addressCountry: "CA",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: contactInfo.phone,
      email: contactInfo.email,
      contactType: "customer service",
    },
    sameAs: [
      contactInfo.socialMedia.instagram,
      contactInfo.socialMedia.facebook,
    ],
    areaServed: {
      "@type": "Place",
      name: regionConfig.deliveryRegion,
    },
  }
}

export function generateProductSchema(product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description || product.shortDescription,
    image: `https://jineau.ca/products/${product.slug}.jpg`,
    brand: {
      "@type": "Brand",
      name: brandName,
    },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "CAD",
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: brandName,
      },
    },
    category: product.type === "microgreen" ? "Microgreens" : "Hydrosols",
  }
}

export function generateFAQSchema(faqItems) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  }
}

export function generateBreadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://jineau.ca${item.href}`,
    })),
  }
}

export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: brandName,
    image: "https://jineau.ca/og-image.jpg",
    "@id": "https://jineau.ca",
    url: "https://jineau.ca",
    telephone: contactInfo.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: regionConfig.companyLocation,
      addressRegion: regionConfig.province,
      addressCountry: "CA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 45.3789,
      longitude: -73.5191,
    },
    areaServed: regionConfig.deliveryRegion,
    priceRange: "$$",
  }
}
