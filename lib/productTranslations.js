/**
 * Helper functions to get translated product fields
 * Falls back to original value if translation is missing
 */

/**
 * Get translated product field (works for both server and client components)
 * @param {Function|Object} t - Translation function from getTranslations (server) or object from useTranslations (client)
 * @param {string} slug - Product slug
 * @param {string} field - Field name (name, shortDescription, description, etc.)
 * @param {string} fallback - Fallback value from database
 * @returns {string}
 */
export function getTranslatedProductField(t, slug, field, fallback = "") {
  try {
    let translation
    // Handle both server (function) and client (object with rich method or direct access)
    if (typeof t === "function") {
      translation = t(`${slug}.${field}`)
    } else if (t && typeof t === "object") {
      // For client components using useTranslations with namespace
      // Try to access nested property
      const productTranslations = t[slug]
      if (productTranslations && typeof productTranslations === "object") {
        translation = productTranslations[field]
      } else {
        // Fallback: try using the translation function if available
        const tFunc = t.rich || t
        if (typeof tFunc === "function") {
          translation = tFunc(`${slug}.${field}`)
        }
      }
    }
    
    // If we got a valid translation (not empty and not the key itself)
    if (translation && typeof translation === "string" && translation.trim() && translation !== `${slug}.${field}`) {
      return translation
    }
  } catch (error) {
    // Translation doesn't exist, use fallback
  }
  return fallback || ""
}

/**
 * Get all translated fields for a product (server component)
 * @param {Function} t - Translation function from getTranslations with "products" namespace
 * @param {Object} product - Product object from database
 * @returns {Object} Product object with translated fields
 */
export function getTranslatedProduct(t, product) {
  if (!product || !product.slug) return product

  try {
    return {
      ...product,
      name: t(`${product.slug}.name`) || product.name,
      shortDescription: t(`${product.slug}.shortDescription`) || product.shortDescription,
      description: t(`${product.slug}.description`) || product.description,
      usage: t(`${product.slug}.usage`) || product.usage,
      storage: t(`${product.slug}.storage`) || product.storage,
      safetyNote: t(`${product.slug}.safetyNote`) || product.safetyNote,
      allergenNote: t(`${product.slug}.allergenNote`) || product.allergenNote,
    }
  } catch (error) {
    // If translation fails, return original product
    return product
  }
}

