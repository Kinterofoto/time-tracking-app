import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function DashboardLoading() {
  return (
    <div className="space-y-6">
      {/* Summary cards skeleton */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="flex items-center gap-4 p-5">
              <Skeleton className="h-12 w-12 rounded-lg" />
              <div className="space-y-2">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-6 w-12" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs skeleton */}
      <Skeleton className="h-10 w-80" />

      {/* Timeline skeleton */}
      <Card>
        <div className="p-4 space-y-3">
          <Skeleton className="ml-[200px] h-6 w-full lg:ml-[240px]" />
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="flex w-[200px] items-center gap-3 lg:w-[240px]">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="space-y-1">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-2 w-16" />
                </div>
              </div>
              <Skeleton className="h-6 flex-1" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
