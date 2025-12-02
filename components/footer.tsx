import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card" role="contentinfo">
      <div className="max-w-6xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-semibold text-foreground mb-4 text-sm sm:text-base">Product</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/catalog" className="hover:text-foreground transition">
                  Catalog
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-foreground transition">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/collections" className="hover:text-foreground transition">
                  Collections
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-4 text-sm sm:text-base">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/blog" className="hover:text-foreground transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/guides" className="hover:text-foreground transition">
                  Guides
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-foreground transition">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-4 text-sm sm:text-base">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-foreground transition">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-foreground transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="https://twitter.com/promptdeal"
                  className="hover:text-foreground transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-4 text-sm sm:text-base">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/privacy" className="hover:text-foreground transition">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-foreground transition">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-foreground transition">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border pt-8">
          <p className="text-xs sm:text-sm text-muted-foreground text-center">
            © 2025 PromptDeal. Secure cryptocurrency payments powered by Coinbase Commerce.
          </p>
        </div>
      </div>
    </footer>
  )
}
