import { AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'

type ErrorBannerProps = {
  title?: string
  message: string
  onRetry?: () => void
}

export function ErrorBanner({
  title = 'Something went wrong',
  message,
  onRetry,
}: ErrorBannerProps) {
  return (
    <div
      role="alert"
      className="flex flex-col gap-3 rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <div className="flex items-start gap-3">
        <AlertTriangle className="mt-0.5 size-5 shrink-0 text-red-200" aria-hidden="true" />
        <div>
          <p className="font-medium text-red-50">{title}</p>
          <p className="mt-1 text-sm text-red-100/80">{message}</p>
        </div>
      </div>
      {onRetry ? (
        <Button variant="secondary" onClick={onRetry}>
          Try again
        </Button>
      ) : null}
    </div>
  )
}
