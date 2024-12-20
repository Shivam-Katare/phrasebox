import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

export function TrendingTemplates({ templates }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Trending Templates</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          {templates.map((template) => (
            <div key={template.id} className="mb-4 p-2 bg-secondary rounded-md">
              <div className="flex justify-between items-center">
                <span className="font-semibold">{template.name}</span>
                <span className="text-sm text-muted-foreground">{template.popularity}% popular</span>
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

