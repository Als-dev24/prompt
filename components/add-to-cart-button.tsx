"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Loader2 } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { trackAddToCart } from "@/components/analytics"

interface AddToCartButtonProps {
  item: {
    id: string
    title: string
    price: number
    category: string
    packType?: string
  }
  variant?: "default" | "outline"
  size?: "default" | "sm" | "lg"
  fullWidth?: boolean
  className?: string
}

export function AddToCartButton({
  item,
  variant = "default",
  size = "lg",
  fullWidth = false,
  className = "",
}: AddToCartButtonProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { addItem } = useCart()

  const handleAddToCart = async () => {
    setLoading(true)
    try {
      console.log("[v0] Adding item to cart:", item)
      // Add item to cart
      addItem(item)
      trackAddToCart(item.title, item.price)

      // Save to localStorage immediately
      const currentCart = localStorage.getItem("promptdeal-cart") || "[]"
      const parsedCart = JSON.parse(currentCart)
      const newCart = parsedCart.find((i: any) => i.id === item.id) ? parsedCart : [...parsedCart, item]
      localStorage.setItem("promptdeal-cart", JSON.stringify(newCart))
      console.log("[v0] Saved to localStorage:", newCart)

      // Give checkout page time to load and read localStorage
      await new Promise((resolve) => setTimeout(resolve, 600))
      console.log("[v0] Redirecting to checkout...")
      router.push("/checkout")
    } catch (error) {
      console.error("[v0] Error adding to cart:", error)
      setLoading(false)
    }
  }

  return (
    <Button
      onClick={handleAddToCart}
      variant={variant}
      size={size}
      className={`${fullWidth ? "w-full" : ""} ${className}`}
      disabled={loading}
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Going to Checkout...
        </>
      ) : (
        <>
          <ShoppingCart className="mr-2 h-5 w-5" />
          Buy Now
        </>
      )}
    </Button>
  )
}
