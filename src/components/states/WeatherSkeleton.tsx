import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function WeatherSkeleton() {
  return (
    <div className="space-y-5" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading weather data</span>
      <Card className="p-6">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="mt-6 h-20 w-48" />
        <Skeleton className="mt-4 h-4 w-56" />
      </Card>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 8 }, (_, index) => (
          <Card key={index} className="p-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="mt-4 h-8 w-20" />
          </Card>
        ))}
      </div>
    </div>
  )
}
