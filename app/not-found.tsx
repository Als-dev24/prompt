import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Home, Search } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for doesn't exist or has been moved.",
  robots: {
    index: false,
    follow: false,
  },
}

export default function NotFoundPage() {
  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="max-w-md w-full">
        <CardContent className="pt-12 pb-8 text-center space-y-6">
          <div className="text-8xl font-bold text-primary/20">404</div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Page Not Found</h1>
            <p className="text-muted-foreground">Sorry, we couldn't find the page you're looking for.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <Button asChild>
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/pricing">
                <Search className="mr-2 h-4 w-4" />
                Browse Prompts
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}
