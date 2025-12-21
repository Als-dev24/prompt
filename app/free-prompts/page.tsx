"use client"

import { useState, useEffect, Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check, Download } from "lucide-react"
import { useSearchParams } from "next/navigation"

function FreePromptsContent() {
  const searchParams = useSearchParams()
  const [showDownload, setShowDownload] = useState(false)
  const [email, setEmail] = useState("")

  useEffect(() => {
    const emailParam = searchParams.get("email")
    if (emailParam) {
      setEmail(emailParam)
      setShowDownload(true)
    }
  }, [searchParams])

  const handleDownload = () => {
    const prompts = `50 FREE DIGITAL MARKETING PROMPTS
==========================================

SOCIAL MEDIA MARKETING (10 Prompts)
1. Create a 30-day Instagram content calendar for a [product/service] targeting [audience]
2. Write 10 engaging Twitter threads about [topic] that encourage discussion
3. Generate 5 viral TikTok video ideas for promoting [product]
4. Design a Facebook ad campaign strategy for [business] with A/B testing variations
5. Create LinkedIn posts that position [brand] as a thought leader in [industry]
6. Write Instagram carousel captions for [product launch]
7. Generate hashtag strategies for [brand] to increase reach by 200%
8. Create a social media crisis management response template
9. Write engaging Instagram Stories scripts for [product demo]
10. Design a Pinterest board strategy for [niche] with SEO optimization

EMAIL MARKETING (10 Prompts)
11. Write a welcome email sequence (5 emails) for new subscribers of [product]
12. Create abandoned cart email templates with urgency triggers
13. Generate newsletter content ideas for [industry] for 3 months
14. Write re-engagement emails for inactive subscribers
15. Create product launch email campaign with storytelling elements
16. Generate email subject lines with 50%+ open rates for [topic]
17. Write promotional emails that don't sound salesy
18. Create seasonal email campaigns for [business type]
19. Generate personalized email templates for different customer segments
20. Write post-purchase follow-up emails that increase retention

CONTENT MARKETING (10 Prompts)
21. Generate 20 blog post titles for [niche] with SEO keywords
22. Write a comprehensive guide on [topic] that ranks on Google's first page
23. Create a content pillar strategy for [brand] covering 12 months
24. Generate case study templates that showcase ROI
25. Write engaging product descriptions that convert at 15%+
26. Create a lead magnet (ebook/checklist) outline for [industry]
27. Generate podcast episode ideas and outlines for [topic]
28. Write video scripts for YouTube that increase watch time
29. Create infographic content ideas with data visualization
30. Generate whitepaper outlines for B2B audiences

SEO & PAID ADVERTISING (10 Prompts)
31. Write Google Ads copy for [product] with high quality scores
32. Generate long-tail keywords for [niche] with buying intent
33. Create meta descriptions that increase CTR by 30%
34. Write Facebook ad copy variations for split testing
35. Generate retargeting ad campaigns for website visitors
36. Create local SEO strategies for [business type]
37. Write landing page copy optimized for conversions
38. Generate PPC campaign structures for [industry]
39. Create YouTube pre-roll ad scripts under 15 seconds
40. Write display ad copy that stands out

INFLUENCER & PARTNERSHIP MARKETING (10 Prompts)
41. Write influencer outreach templates for [campaign]
42. Create partnership proposal documents for [collaboration type]
43. Generate affiliate program terms that attract top promoters
44. Write brand ambassador program guidelines
45. Create co-marketing campaign ideas for [brands]
46. Generate influencer campaign briefs with clear KPIs
47. Write testimonial request emails for satisfied customers
48. Create user-generated content campaign strategies
49. Generate referral program mechanics that go viral
50. Write brand collaboration pitch decks for [opportunity]

==========================================
© PromptDeal - Premium AI Marketing Prompts
Visit promptdeal.com for more premium prompts
`

    const blob = new Blob([prompts], { type: "text/plain" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "50-free-marketing-prompts.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  if (showDownload && email) {
    return (
      <main className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 mb-6">
              <Check className="h-10 w-10 text-green-500" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Your Free Prompts Are Ready!</h1>
            <p className="text-xl text-muted-foreground">
              Thank you {email}. Click below to download your 50 marketing prompts
            </p>
          </div>

          <Card className="max-w-2xl mx-auto rounded-2xl border-2">
            <CardContent className="pt-8 space-y-6">
              <div className="bg-primary/5 rounded-xl p-6 space-y-4">
                <h3 className="font-semibold text-lg">What's Included:</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>10 Social Media Marketing prompts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>10 Email Marketing prompts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>10 Content Marketing prompts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>10 SEO & Paid Advertising prompts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>10 Influencer & Partnership prompts</span>
                  </li>
                </ul>
              </div>

              <Button size="lg" className="w-full h-14 rounded-xl text-base" onClick={handleDownload}>
                <Download className="mr-2 h-5 w-5" />
                Download Your 50 Free Prompts
              </Button>

              <p className="text-sm text-center text-muted-foreground">
                Want access to 500+ premium prompts?{" "}
                <a href="/pricing" className="text-primary hover:underline font-medium">
                  View our plans
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Email Required</h1>
        <p className="text-muted-foreground mb-6">Please enter your email to access free prompts</p>
        <Button onClick={() => (window.location.href = "/#newsletter")}>Go Back</Button>
      </div>
    </main>
  )
}

export default function FreePromptsPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-background flex items-center justify-center">
          <div className="inline-block">
            <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          </div>
        </main>
      }
    >
      <FreePromptsContent />
    </Suspense>
  )
}
