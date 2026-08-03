"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface CartItem {
  id: string
  title: string
  price: number
  category: string
  packType?: string // Added packType to track which pack is being purchased
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  clearCart: () => void
  total: number
  itemCount: number
  isReady: boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isReady, setIsReady] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    console.log("[v0] Cart provider mounting, loading from localStorage...")
    const savedCart = localStorage.getItem("promptdeal-cart")
    console.log("[v0] Saved cart from localStorage:", savedCart)
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        console.log("[v0] Parsed cart items:", parsedCart)
        setItems(parsedCart)
      } catch (error) {
        console.error("[v0] Error parsing cart:", error)
      }
    }
    setIsReady(true)
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      console.log("[v0] Saving cart to localStorage:", items)
      localStorage.setItem("promptdeal-cart", JSON.stringify(items))
      console.log("[v0] Cart saved. Verification:", localStorage.getItem("promptdeal-cart"))
    }
  }, [items])

  const addItem = (item: CartItem) => {
    setItems((prev) => {
      const exists = prev.find((i) => i.id === item.id)
      if (exists) {
        return prev
      }
      return [...prev, item]
    })
  }

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const clearCart = () => {
    setItems([])
  }

  const total = items.reduce((sum, item) => sum + item.price, 0)
  const itemCount = items.length

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart, total, itemCount, isReady }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
