"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, ShoppingCart } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { CartDrawer } from "@/components/cart-drawer"

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const { itemCount } = useCart()

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <span className="font-bold text-foreground text-xl">PromptDeal</span>
            </Link>

            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            <div className="hidden md:flex items-center gap-8">
              <Link
                href="/pricing"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition"
              >
                Pricing
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition"
              >
                About Us
              </Link>
              <Link href="/blog" className="text-sm font-medium text-muted-foreground hover:text-foreground transition">
                Blog
              </Link>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2 hover:bg-muted rounded-lg transition"
                aria-label="Open shopping cart"
              >
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>
              <Link href="/pricing">
                <Button>View Packs</Button>
              </Link>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-border">
              <div className="flex flex-col space-y-3">
                <Link
                  href="/pricing"
                  className="text-base font-medium text-muted-foreground hover:text-foreground transition px-2 py-2 rounded-lg hover:bg-muted"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Pricing
                </Link>
                <Link
                  href="/about"
                  className="text-base font-medium text-muted-foreground hover:text-foreground transition px-2 py-2 rounded-lg hover:bg-muted"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About Us
                </Link>
                <Link
                  href="/blog"
                  className="text-base font-medium text-muted-foreground hover:text-foreground transition px-2 py-2 rounded-lg hover:bg-muted"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Blog
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false)
                    setCartOpen(true)
                  }}
                  className="flex items-center justify-between text-base font-medium text-muted-foreground hover:text-foreground transition px-2 py-2 rounded-lg hover:bg-muted"
                >
                  <span>Cart</span>
                  {itemCount > 0 && (
                    <span className="bg-primary text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </button>
                <Link href="/pricing" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full mt-2">View Packs</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}
