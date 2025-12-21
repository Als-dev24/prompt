import type { Metadata } from "next"
import { Shield } from "lucide-react"

export const metadata: Metadata = {
  title: "Privacy Policy - Data Protection | PromptDeal",
  description:
    "Learn how PromptDeal collects, uses, and protects your personal information. GDPR compliant, secure crypto payments, transparent data practices.",
  openGraph: {
    title: "Privacy Policy - PromptDeal",
    description: "How we protect your data and privacy",
    url: "https://promptdeal.store/privacy",
    type: "website",
  },
  alternates: {
    canonical: "https://promptdeal.store/privacy",
  },
  robots: {
    index: false,
    follow: true,
  },
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <section className="px-4 py-16 sm:py-24 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl mb-6">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: January 2025</p>
          </div>

          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Information We Collect</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">We collect the following information:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Email address for order confirmation and newsletter subscriptions</li>
                <li>Payment information processed securely through Coinbase Commerce</li>
                <li>Usage data and analytics to improve our service</li>
                <li>Browser and device information for security and optimization</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">2. How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">Your information is used to:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Process and deliver your purchases</li>
                <li>Send order confirmations and download links</li>
                <li>Provide customer support</li>
                <li>Send marketing emails (only if you subscribe to our newsletter)</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">3. Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We implement industry-standard security measures to protect your personal information. All payment
                processing is handled securely through Coinbase Commerce. We do not store credit card or cryptocurrency
                wallet information on our servers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Third-Party Services</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">We use the following third-party services:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Coinbase Commerce for cryptocurrency payment processing</li>
                <li>Resend for transactional email delivery</li>
                <li>Vercel for website hosting and analytics</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                These services have their own privacy policies governing their use of your information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">5. Cookies and Tracking</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use cookies and similar tracking technologies to improve your browsing experience, remember your
                preferences, and analyze site traffic. You can control cookie settings through your browser preferences.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">You have the right to:</p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal information</li>
                <li>Opt-out of marketing communications at any time</li>
                <li>Object to processing of your personal information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">7. Data Retention</h2>
              <p className="text-muted-foreground leading-relaxed">
                We retain your personal information only as long as necessary to fulfill the purposes outlined in this
                privacy policy, unless a longer retention period is required by law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">8. Children's Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our service is not intended for children under 18. We do not knowingly collect personal information from
                children. If you believe we have collected information from a child, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">9. International Data Transfers</h2>
              <p className="text-muted-foreground leading-relaxed">
                Your information may be transferred to and processed in countries other than your country of residence.
                We ensure appropriate safeguards are in place for such transfers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">10. Changes to Privacy Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this privacy policy from time to time. We will notify you of significant changes by
                posting the new policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">11. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have questions about this privacy policy or wish to exercise your rights, please contact us
                through the support channels listed in our footer.
              </p>
            </section>
          </div>
        </div>
      </section>
    </div>
  )
}
