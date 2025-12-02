"use client"

import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { X, ShoppingCart, Trash2 } from "lucide-react"
import Link from "next/link"

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, removeItem, total, itemCount } = useCart()

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50 transition-opacity" onClick={onClose} aria-hidden="true" />
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-background z-50 shadow-2xl overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <ShoppingCart className="h-6 w-6" />
              Shopping Cart ({itemCount})
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg transition" aria-label="Close cart">
              <X className="h-5 w-5" />
            </button>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-4">Your cart is empty</p>
              <Link href="/catalog" onClick={onClose}>
                <Button>Browse Prompts</Button>
              </Link>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-start justify-between p-4 border border-border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{item.category}</p>
                      <p className="text-lg font-bold text-primary">${item.price}</p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 hover:bg-destructive/10 hover:text-destructive rounded-lg transition"
                      aria-label="Remove from cart"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="border-t border-border pt-6 space-y-4">
                <div className="flex justify-between items-center text-lg">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-2xl text-primary">${total}</span>
                </div>
                <Link href="/checkout" onClick={onClose}>
                  <Button className="w-full" size="lg">
                    Checkout with Crypto
                  </Button>
                </Link>
                <Button variant="outline" className="w-full bg-transparent" onClick={onClose}>
                  Continue Shopping
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}
