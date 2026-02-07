"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SummaryCards } from "./summary-cards"
import { TimelineView } from "@/components/timeline/timeline-view"
import { LiveTrackingPanel } from "./live-tracking-panel"
import { BehaviorScoreboard } from "./behavior-scoreboard"
import { Clock, Radio, Award } from "lucide-react"
import type { DashboardSummary, EmployeeDayView } from "@/lib/types"

type Props = {
  summary: DashboardSummary
  employees: EmployeeDayView[]
}

export function DashboardContent({ summary, employees }: Props) {
  return (
    <div className="space-y-6">
      <SummaryCards summary={summary} />

      <Tabs defaultValue="timeline" className="space-y-4">
        <TabsList>
          <TabsTrigger value="timeline" className="gap-1.5">
            <Clock className="h-4 w-4" />
            <span className="hidden sm:inline">Timeline</span>
          </TabsTrigger>
          <TabsTrigger value="live" className="gap-1.5">
            <Radio className="h-4 w-4" />
            <span className="hidden sm:inline">En Vivo</span>
          </TabsTrigger>
          <TabsTrigger value="behavior" className="gap-1.5">
            <Award className="h-4 w-4" />
            <span className="hidden sm:inline">Comportamiento</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="timeline">
          <TimelineView employees={employees} />
        </TabsContent>

        <TabsContent value="live">
          <LiveTrackingPanel employees={employees} />
        </TabsContent>

        <TabsContent value="behavior">
          <BehaviorScoreboard employees={employees} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
