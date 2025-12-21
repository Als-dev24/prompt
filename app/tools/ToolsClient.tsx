"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Lightbulb, Hash, Search, Sparkles, PenTool, TrendingUp, Loader2, RefreshCw, X } from "lucide-react"

const tools = [
  {
    id: "title-generator",
    icon: Lightbulb,
    title: "AI Title Generator",
    description: "Create catchy headlines that drive clicks",
    placeholder: "Enter your topic...",
  },
  {
    id: "hashtag-generator",
    icon: Hash,
    title: "Hashtag Generator",
    description: "Generate trending hashtags instantly",
    placeholder: "Enter your content theme...",
  },
  {
    id: "seo-keyword",
    icon: Search,
    title: "SEO Keyword Tool",
    description: "Find profitable keywords for your niche",
    placeholder: "Enter your niche...",
  },
  {
    id: "content-ideas",
    icon: Sparkles,
    title: "Content Ideas Generator",
    description: "Never run out of content ideas again",
    placeholder: "Enter your industry...",
  },
  {
    id: "ad-copy",
    icon: PenTool,
    title: "Ad Copy Creator",
    description: "Write high-converting ad copy",
    placeholder: "Describe your product...",
  },
  {
    id: "trend-analyzer",
    icon: TrendingUp,
    title: "Trend Analyzer",
    description: "Stay ahead of industry trends",
    placeholder: "Enter keywords to analyze...",
  },
]

export default function ToolsClient() {
  const [inputs, setInputs] = useState<Record<string, string>>({})
  const [outputs, setOutputs] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState<Record<string, boolean>>({})

  const handleGenerate = async (toolId: string) => {
    const input = inputs[toolId]
    if (!input?.trim()) return

    setLoading((prev) => ({ ...prev, [toolId]: true }))
    setOutputs((prev) => ({ ...prev, [toolId]: "" }))

    try {
      const response = await fetch("/api/tools", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ toolId, input }),
      })

      const data = await response.json()

      if (data.success) {
        setOutputs((prev) => ({ ...prev, [toolId]: data.output }))
      } else {
        setOutputs((prev) => ({ ...prev, [toolId]: "Error generating content. Please try again." }))
      }
    } catch (error) {
      console.error("Tool generation error:", error)
      setOutputs((prev) => ({ ...prev, [toolId]: "Network error. Please try again." }))
    } finally {
      setLoading((prev) => ({ ...prev, [toolId]: false }))
    }
  }

  const handleClear = (toolId: string) => {
    setOutputs((prev) => ({ ...prev, [toolId]: "" }))
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {tools.map((tool) => {
          const Icon = tool.icon
          const isLoading = loading[tool.id]
          const output = outputs[tool.id]

          return (
            <Card key={tool.id} className="border-2 rounded-2xl">
              <CardHeader>
                <div className="flex items-center gap-4 mb-2">
                  <div className="p-3 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{tool.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{tool.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder={tool.placeholder}
                  className="min-h-[100px] rounded-xl"
                  value={inputs[tool.id] || ""}
                  onChange={(e) => setInputs((prev) => ({ ...prev, [tool.id]: e.target.value }))}
                  disabled={isLoading}
                />
                <Button
                  className="w-full rounded-xl"
                  onClick={() => handleGenerate(tool.id)}
                  disabled={isLoading || !inputs[tool.id]?.trim()}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    "Generate"
                  )}
                </Button>

                {output && (
                  <div className="mt-4 p-4 bg-muted rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium">Results:</p>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="rounded-lg bg-transparent"
                          onClick={() => handleGenerate(tool.id)}
                          disabled={isLoading}
                        >
                          <RefreshCw className="w-4 h-4 mr-1" />
                          Regenerate
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="rounded-lg bg-transparent"
                          onClick={() => handleClear(tool.id)}
                        >
                          <X className="w-4 h-4 mr-1" />
                          Clear
                        </Button>
                      </div>
                    </div>
                    <div className="text-sm whitespace-pre-wrap">{output}</div>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
