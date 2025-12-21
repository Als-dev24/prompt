"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Check } from "lucide-react"
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
  const [added, setAdded] = useState(false)
  const { addItem } = useCart()

  const handleAddToCart = () => {
    addItem(item)
    trackAddToCart(item.title, item.price)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <Button
      onClick={handleAddToCart}
      variant={variant}
      size={size}
      className={`${fullWidth ? "w-full" : ""} ${className}`}
      disabled={added}
    >
      {added ? (
        <>
          <Check className="mr-2 h-5 w-5" />
          Added to Cart
        </>
      ) : (
        <>
          <ShoppingCart className="mr-2 h-5 w-5" />
          Add to Cart
        </>
      )}
    </Button>
  )
}
