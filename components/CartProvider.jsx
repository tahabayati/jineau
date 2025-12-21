"use client"

import { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react"
import { getShippingFee } from "@/lib/config"

const CartContext = createContext()

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

export default function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("jineau-cart")
    if (stored) {
      try {
        setItems(JSON.parse(stored))
      } catch (e) {
        setItems([])
      }
    }
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("jineau-cart", JSON.stringify(items))
    }
  }, [items, isLoaded])

  const addItem = useCallback((product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.slug === product.slug)
      if (existing) {
        return prev.map((item) =>
          item.slug === product.slug
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...prev, { ...product, quantity }]
    })
    setIsOpen(true)
  }, [])

  const removeItem = useCallback((slug) => {
    setItems((prev) => prev.filter((item) => item.slug !== slug))
  }, [])

  const updateQuantity = useCallback((slug, quantity) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((item) => item.slug !== slug))
      return
    }
    setItems((prev) =>
      prev.map((item) =>
        item.slug === slug ? { ...item, quantity } : item
      )
    )
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])
  const toggleCart = useCallback(() => setIsOpen((prev) => !prev), [])

  const itemCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items])
  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items])
  const shippingFee = useMemo(() => getShippingFee(subtotal), [subtotal])
  const total = useMemo(() => subtotal + shippingFee, [subtotal, shippingFee])

  const value = useMemo(() => ({
    items,
    isOpen,
    isLoaded,
    itemCount,
    subtotal,
    shippingFee,
    total,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    openCart,
    closeCart,
    toggleCart,
  }), [items, isOpen, isLoaded, itemCount, subtotal, shippingFee, total, addItem, removeItem, updateQuantity, clearCart, openCart, closeCart, toggleCart])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

