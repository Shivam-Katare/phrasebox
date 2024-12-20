import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlusCircleIcon, SearchIcon, ShareIcon } from 'lucide-react'

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button className="w-full">
          <PlusCircleIcon className="w-4 h-4 mr-2" />
          Create New Microcopy
        </Button>
        <div className="flex space-x-2">
          <Input placeholder="Search templates..." />
          <Button variant="outline">
            <SearchIcon className="w-4 h-4" />
          </Button>
        </div>
        <Button variant="outline" className="w-full">
          <ShareIcon className="w-4 h-4 mr-2" />
          Share with Team
        </Button>
      </CardContent>
    </Card>
  )
}

