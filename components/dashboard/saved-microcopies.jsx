import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CopyIcon } from 'lucide-react'


export function SavedMicrocopies({ microcopies, onCopy }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Saved Microcopies</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          {microcopies.map((microcopy) => (
            <div key={microcopy.id} className="mb-4 p-2 bg-secondary rounded-md">
              <div className="text-sm font-semibold mb-1">{microcopy.purpose}</div>
              <p className="text-sm mb-2">{microcopy.text}</p>
              <Button variant="outline" size="sm" onClick={onCopy}>
                <CopyIcon className="w-4 h-4 mr-2" />
                Copy
              </Button>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

