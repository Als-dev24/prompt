"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Check } from "lucide-react"
import { useCart } from "@/lib/cart-context"

interface AddToCartButtonProps {
  item: {
    id: string
    title: string
    price: number
    category: string
  }
  variant?: "default" | "outline"
  fullWidth?: boolean
}

export function AddToCartButton({ item, variant = "default", fullWidth = false }: AddToCartButtonProps) {
  const [added, setAdded] = useState(false)
  const { addItem } = useCart()

  const handleAddToCart = () => {
    addItem(item)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <Button
      onClick={handleAddToCart}
      variant={variant}
      size="lg"
      className={fullWidth ? "w-full" : ""}
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
