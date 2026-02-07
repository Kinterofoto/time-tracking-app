import { generateHourMarkers } from "@/lib/timeline/utils"

export function TimelineHeader() {
  const markers = generateHourMarkers()

  return (
    <div className="relative ml-[200px] h-8 border-b border-border lg:ml-[240px]">
      {markers.map((marker) => (
        <div
          key={marker.hour}
          className="absolute top-0 flex h-full flex-col items-center"
          style={{ left: `${marker.position}%` }}
        >
          <div className="h-3 w-px bg-border" />
          <span className="mt-0.5 font-mono text-[10px] text-muted-foreground">
            {marker.label}
          </span>
        </div>
      ))}
    </div>
  )
}
