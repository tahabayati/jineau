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
    email: contactInfo.email,
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

export function generateWebSiteSchema(locale = "en") {
  const siteNames = {
    en: "Jineau - Fresh Microgreens & Hydrosols",
    fr: "Jineau - Micropousses & Hydrolats Frais",
    fa: "ژینو - میکروگرین و هیدروسول تازه"
  }

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://jineau.ca/#website",
    url: "https://jineau.ca",
    name: siteNames[locale] || siteNames.en,
    description: "Locally grown microgreens and hydrosols, delivered fresh to your door.",
    publisher: {
      "@id": "https://jineau.ca/#organization"
    },
    inLanguage: locale === "fa" ? "fa-IR" : locale === "fr" ? "fr-CA" : "en-CA",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `https://jineau.ca/${locale}/shop?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  }
}
