import { Bot, Paintbrush, Share2, Users2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function FeaturesSection() {
  return (
    <section id="features" className="container px-4 py-16 md:py-24">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need for perfect microcopy</h2>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <Bot className="w-12 h-12 text-blue-500 mb-4" />
            <CardTitle>AI-Powered Suggestions</CardTitle>
            <CardDescription>
              Get intelligent microcopy suggestions based on context, tone, and audience.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <Paintbrush className="w-12 h-12 text-blue-500 mb-4" />
            <CardTitle>Customizable Tone</CardTitle>
            <CardDescription>
              Adjust the tone from professional to friendly, matching your brand voice perfectly.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <Users2 className="w-12 h-12 text-blue-500 mb-4" />
            <CardTitle>Explore Templates</CardTitle>
            <CardDescription>
              Explore a library of microcopy templates for various use cases and industries.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <Share2 className="w-12 h-12 text-blue-500 mb-4" />
            <CardTitle>Save the Best</CardTitle>
            <CardDescription>
              Save your favorite microcopy templates for quick access and reuse.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </section>
  )
}

