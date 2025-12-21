"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { trackNewsletterSignup } from "@/components/analytics"

export function NewsletterForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      setStatus("error")
      setMessage("Please enter a valid email address")
      return
    }

    setIsSubmitting(true)
    setStatus("idle")
    setMessage("")

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        throw new Error("Failed to register email")
      }

      trackNewsletterSignup()

      router.push(`/free-prompts?email=${encodeURIComponent(email)}`)
    } catch (error) {
      console.error("[v0] Newsletter signup error:", error)
      setStatus("error")
      setMessage("Something went wrong. Please try again.")
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (status === "error") {
              setStatus("idle")
              setMessage("")
            }
          }}
          className="flex-1 h-14 rounded-xl text-base"
          disabled={isSubmitting}
          required
        />
        <Button size="lg" className="rounded-xl h-14 px-8" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Processing..." : "Get Free Prompts"}
        </Button>
      </form>

      {status === "error" && <p className="text-sm mt-4 text-center text-red-600">{message}</p>}

      <p className="text-xs text-muted-foreground mt-4 text-center">
        Instant download. No spam, ever. Unsubscribe anytime.
      </p>
    </div>
  )
}
