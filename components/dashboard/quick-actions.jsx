import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from 'next/link'

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Navigation</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-4">
        <Button asChild variant="outline">
          <Link href="/generator">Generator</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/saved">Saved Copies</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/templates">Templates</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/settings">Settings</Link>
        </Button>
      </CardContent>
    </Card>
  )
}

