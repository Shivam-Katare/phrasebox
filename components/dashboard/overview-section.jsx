import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

export function OverviewSection({ totalCreated, totalSaved, totalShared, recentActivity }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold">{totalCreated}</div>
            <div className="text-sm text-muted-foreground">Created</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{totalSaved}</div>
            <div className="text-sm text-muted-foreground">Saved</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{totalShared}</div>
            <div className="text-sm text-muted-foreground">Shared</div>
          </div>
        </div>
        <h3 className="font-semibold mb-2">Recent Activity</h3>
        <ScrollArea className="h-[200px]">
          {recentActivity?.map((activity) => (
            <div key={activity.id} className="flex justify-between items-center mb-2">
              <span>{activity.action}</span>
              <span className="text-sm text-muted-foreground">{activity.time}</span>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

