import type { ReactNode } from 'react'
import { Card } from '@/components/ui/card'

type MetricCardProps = {
  icon: ReactNode
  label: string
  value: string
  hint?: string | null
}

export function MetricCard({ icon, label, value, hint }: MetricCardProps) {
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm text-slate-300">{label}</p>
        <span className="text-sky-300">{icon}</span>
      </div>
      <p className="mt-3 text-2xl font-semibold tracking-tight text-white">{value}</p>
      {hint ? <p className="mt-1 text-xs text-slate-400">{hint}</p> : null}
    </Card>
  )
}
