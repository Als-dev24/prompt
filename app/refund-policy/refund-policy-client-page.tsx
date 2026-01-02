"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function RefundPolicyClientPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <button onClick={() => window.history.back()} className="text-primary hover:underline text-sm mb-8">
          ← Back
        </button>

        <article className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-4">Refund Policy</h1>
            <p className="text-muted-foreground text-lg">Last updated: January 2025</p>
          </div>

          <section className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-3">Digital Products Are Final</h2>
              <p className="text-muted-foreground leading-relaxed">
                Due to the digital nature of our products (AI prompts, downloadable files, and instant-access digital
                content), <strong className="text-foreground">all sales on PromptDeal are final</strong>.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Once a product has been successfully delivered or downloaded,{" "}
                <strong className="text-foreground">we do not offer refunds, returns, or exchanges</strong>.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-3">When Refunds May Be Considered</h2>
              <p className="text-muted-foreground mb-4">Refunds may be considered ONLY in the following cases:</p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold mt-1">•</span>
                  <span>
                    Payment was successfully completed, but the product was{" "}
                    <strong className="text-foreground">not delivered</strong>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold mt-1">•</span>
                  <span>
                    A <strong className="text-foreground">technical issue caused by our platform</strong> prevented
                    access to the purchased product
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold mt-1">•</span>
                  <span>
                    <strong className="text-foreground">Duplicate payment</strong> for the same product
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-3">When Refunds Will NOT Be Issued</h2>
              <p className="text-muted-foreground mb-4">Refunds will NOT be issued in the following cases:</p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold mt-1">•</span>
                  <span>The product has been delivered or downloaded</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold mt-1">•</span>
                  <span>The customer is not satisfied or expected different results</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold mt-1">•</span>
                  <span>Lack of knowledge on how to use the product</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold mt-1">•</span>
                  <span>Incorrect purchase made by the customer</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold mt-1">•</span>
                  <span>Change of mind after purchase</span>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-3">Important Notes</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold mt-1">•</span>
                  <span>
                    Refund requests must be submitted within <strong className="text-foreground">24 hours</strong> of
                    purchase
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold mt-1">•</span>
                  <span>
                    Cryptocurrency payments are <strong className="text-foreground">irreversible</strong>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold mt-1">•</span>
                  <span>
                    Approved refunds, if any, may be issued as <strong className="text-foreground">store credit</strong>{" "}
                    or equivalent value at our discretion
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold mt-1">•</span>
                  <span>
                    PromptDeal reserves the right to deny refund requests that do not meet the above conditions
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-6 mt-8">
              <h3 className="font-semibold text-amber-400 mb-2">⚠️ Cryptocurrency Payment Notice</h3>
              <p className="text-sm text-muted-foreground">
                Payments made via cryptocurrency are <strong className="text-foreground">irreversible</strong>. Please
                ensure all details are correct before completing your purchase. We cannot reverse or refund
                cryptocurrency transactions once they have been confirmed on the blockchain.
              </p>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
              <h3 className="font-semibold text-green-400 mb-2">✓ Your Protection</h3>
              <p className="text-sm text-muted-foreground">
                By purchasing from PromptDeal, you acknowledge that you have read, understood, and agreed to this Refund
                Policy. We are committed to delivering quality digital products and providing excellent customer
                support.
              </p>
            </div>

            <div className="border-t border-border pt-8 mt-8">
              <h3 className="font-semibold text-foreground mb-3">Need Help?</h3>
              <p className="text-muted-foreground mb-4">
                If you believe you qualify for a refund based on the conditions above, please contact our support team
                within 24 hours of your purchase.
              </p>
              <Button asChild>
                <Link href="mailto:support@promptdeal.com">Contact Support</Link>
              </Button>
            </div>
          </section>
        </article>
      </div>
    </main>
  )
}
