import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HelpCircleIcon } from 'lucide-react'

export function OnboardingSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Getting Started</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>Welcome to Typley! Here are some quick tips to get you started:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Create your first microcopy using the &quot;Create New Microcopy&quot; button</li>
          <li>Explore trending templates for inspiration</li>
          <li>Save your favorite microcopies for quick access</li>
        </ul>
        <Button variant="outline" className="w-full">
          <HelpCircleIcon className="w-4 h-4 mr-2" />
          View Full Tutorial
        </Button>
      </CardContent>
    </Card>
  )
}

