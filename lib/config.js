export const shippingConfig = {
  freeShippingThreshold: 20,
  deliveryFee: 5,
  currency: "CAD",
}

export const deliveryConfig = {
  deliveryDay: "Friday evening",
  harvestDay: "Friday",
  orderCutoff: "Wednesday 11:59 PM",
  orderCutoffDay: 3,
  orderCutoffHour: 23,
  orderCutoffMinute: 59,
}

export const freshSwapConfig = {
  maxPerMonth: 2,
  requestWindowStartDay: 0,
  requestWindowEndDay: 3,
  requestWindowEndHour: 23,
  requestWindowEndMinute: 59,
}

export const regionConfig = {
  companyLocation: "Candiac",
  deliveryRegion: "Montérégie",
  province: "Quebec",
  country: "Canada",
}

export const locales = ["en", "fr", "fa"]
export const defaultLocale = "en"

export function getShippingFee(orderTotal) {
  if (orderTotal > shippingConfig.freeShippingThreshold) {
    return 0
  }
  return shippingConfig.deliveryFee
}

export function isWithinFreshSwapWindow() {
  const now = new Date()
  const day = now.getDay()
  const hour = now.getHours()
  const minute = now.getMinutes()

  if (day < freshSwapConfig.requestWindowStartDay) return false
  if (day > freshSwapConfig.requestWindowEndDay) return false
  if (day === freshSwapConfig.requestWindowEndDay) {
    if (hour > freshSwapConfig.requestWindowEndHour) return false
    if (hour === freshSwapConfig.requestWindowEndHour && minute > freshSwapConfig.requestWindowEndMinute) return false
  }
  return true
}

