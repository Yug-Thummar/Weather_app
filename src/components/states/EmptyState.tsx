import type { ReactNode } from 'react'
import { Card } from '@/components/ui/card'

type EmptyStateProps = {
  title: string
  description: string
  icon?: ReactNode
  action?: ReactNode
}

export function EmptyState({ title, description, icon, action }: EmptyStateProps) {
  return (
    <Card className="px-6 py-10 text-center">
      {icon ? <div className="mb-4 flex justify-center text-sky-300">{icon}</div> : null}
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-300">{description}</p>
      {action ? <div className="mt-5">{action}</div> : null}
    </Card>
  )
}
