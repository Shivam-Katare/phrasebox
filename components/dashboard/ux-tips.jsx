import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const uxTips = [
  "Keep your microcopy concise and to the point.",
  "Use active voice for clearer communication.",
  "Maintain consistency in tone across your application.",
  "Avoid jargon and use simple, everyday language.",
  "Provide clear and actionable error messages.",
  "Use humor sparingly and appropriately.",
  "Personalize microcopy when possible to create a connection.",
  "Test your microcopy with real users for feedback.",
]

export function UXTips() {
  const [currentTip, setCurrentTip] = useState('')

  useEffect(() => {
    const randomTip = uxTips[Math.floor(Math.random() * uxTips.length)]
    setCurrentTip(randomTip)
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>UX Tip of the Day</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{currentTip}</p>
        <p className="text-sm text-muted-foreground mt-4">
          This tip updates every 24 hours to provide fresh insights.
        </p>
      </CardContent>
    </Card>
  )
}

