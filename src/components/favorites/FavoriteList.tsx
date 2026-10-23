import { Star, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { SelectedLocation } from '@/types/location'
import { formatLocationSubtitle, isSameLocation } from '@/utils/location'
import { cn } from '@/lib/utils'

type FavoriteListProps = {
  favorites: SelectedLocation[]
  selected: SelectedLocation | null
  onSelect: (location: SelectedLocation) => void
  onRemove: (location: SelectedLocation) => void
}

export function FavoriteList({
  favorites,
  selected,
  onSelect,
  onRemove,
}: FavoriteListProps) {
  if (favorites.length === 0) {
    return (
      <p className="text-sm leading-6 text-slate-400">
        No saved cities yet. Search for a location and use Save city to keep it on this
        device.
      </p>
    )
  }

  return (
    <ul className="space-y-2">
      {favorites.map((favorite) => {
        const active = isSameLocation(favorite, selected)
        const label = [favorite.name, formatLocationSubtitle(favorite)]
          .filter(Boolean)
          .join(', ')

        return (
          <li key={favorite.id}>
            <div
              className={cn(
                'flex items-center gap-2 rounded-xl border px-2 py-2',
                active
                  ? 'border-sky-400/40 bg-sky-400/10'
                  : 'border-white/10 bg-white/5',
              )}
            >
              <button
                type="button"
                className="flex min-w-0 flex-1 items-center gap-2 px-1 py-1 text-left"
                aria-label={`Load weather for ${label}`}
                onClick={() => onSelect(favorite)}
              >
                <Star
                  size={14}
                  className="shrink-0 text-amber-300"
                  fill="currentColor"
                  aria-hidden="true"
                />
                <span className="min-w-0">
                  <span className="block truncate text-sm text-white">{favorite.name}</span>
                  <span className="block truncate text-xs text-slate-400">
                    {formatLocationSubtitle(favorite) || 'Saved location'}
                  </span>
                </span>
              </button>
              <Button
                variant="ghost"
                size="icon"
                className="size-8 shrink-0"
                aria-label={`Remove ${label} from favorites`}
                onClick={() => onRemove(favorite)}
              >
                <X size={14} aria-hidden="true" />
              </Button>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
