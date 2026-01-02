import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border bg-foreground text-background" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Logo + description */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <span className="font-bold text-xl">PromptDeal</span>
            </Link>
            <p className="text-sm text-background/70 leading-relaxed">
              Premium AI prompts for digital marketing. Pay with crypto, download instantly.
            </p>
          </div>

          {/* Menu column */}
          <div>
            <h3 className="font-semibold mb-4 text-base">Menu</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="text-background/70 hover:text-background transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-background/70 hover:text-background transition">
                  Prompts
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-background/70 hover:text-background transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/tools" className="text-background/70 hover:text-background transition">
                  Tools
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-background/70 hover:text-background transition">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Company column */}
          <div>
            <h3 className="font-semibold mb-4 text-base">Company</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/about" className="text-background/70 hover:text-background transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-background/70 hover:text-background transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="text-background/70 hover:text-background transition">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/legal" className="text-background/70 hover:text-background transition">
                  Legal
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-background/70 hover:text-background transition">
                  Privacy
                </Link>
              </li>
            </ul>
          </div>

          {/* Payment column */}
          <div>
            <h3 className="font-semibold mb-4 text-base">Payment</h3>
            <ul className="space-y-3 text-sm">
              <li className="text-background/70">Bitcoin (BTC)</li>
              <li className="text-background/70">Ethereum (ETH)</li>
              <li className="text-background/70">USDC</li>
              <li className="text-background/70">Solana (SOL)</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 text-center">
          <p className="text-sm text-background/60">
            © 2025 PromptDeal. All rights reserved. Secure cryptocurrency payments powered by Coinbase Commerce.
          </p>
        </div>
      </div>
    </footer>
  )
}
