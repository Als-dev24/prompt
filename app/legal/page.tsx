import type { Metadata } from "next"
import { Scale } from "lucide-react"

export const metadata: Metadata = {
  title: "Legal Terms & Conditions | PromptDeal",
  description: "Terms of service, licensing, and legal information for PromptDeal.",
}

export default function LegalPage() {
  return (
    <div className="min-h-screen">
      <section className="px-4 py-16 sm:py-24 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl mb-6">
              <Scale className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Terms & Conditions</h1>
            <p className="text-muted-foreground">Last updated: January 2025</p>
          </div>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Agreement to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using PromptDeal, you agree to be bound by these Terms and Conditions. If you disagree
                with any part of these terms, you may not access our service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">2. License and Usage Rights</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Upon purchase, you receive a non-exclusive, non-transferable license to use the AI prompts for:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Personal marketing and business projects</li>
                <li>Client work and commercial applications</li>
                <li>Internal team use within your organization</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                You may NOT resell, redistribute, or share the prompts as standalone products.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">3. Payment and Refunds</h2>
              <p className="text-muted-foreground leading-relaxed">
                All payments are processed through Coinbase Commerce in cryptocurrency. Due to the instant digital
                delivery nature of our products, all sales are final. We do not offer refunds except in cases of
                technical errors preventing download access.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Intellectual Property</h2>
              <p className="text-muted-foreground leading-relaxed">
                All prompts, content, and materials on PromptDeal are protected by copyright and intellectual property
                laws. The purchase grants you usage rights but not ownership of the intellectual property.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Disclaimer of Warranties</h2>
              <p className="text-muted-foreground leading-relaxed">
                PromptDeal provides prompts "as is" without warranties of any kind. While we strive for quality, we
                cannot guarantee specific results from AI-generated content. Results may vary based on the AI tool used
                and implementation.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                PromptDeal shall not be liable for any indirect, incidental, or consequential damages arising from the
                use or inability to use our prompts or services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">7. Updates to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify these terms at any time. Continued use of PromptDeal after changes
                constitutes acceptance of the updated terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">8. Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                For questions about these terms, please contact us through our support channels listed in the footer.
              </p>
            </section>
          </div>
        </div>
      </section>
    </div>
  )
}
