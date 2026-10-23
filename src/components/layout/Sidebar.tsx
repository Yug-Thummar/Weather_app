import { FavoriteList } from '@/components/favorites/FavoriteList'
import type { SelectedLocation } from '@/types/location'

type SidebarProps = {
  favorites: SelectedLocation[]
  selected: SelectedLocation | null
  onSelect: (location: SelectedLocation) => void
  onRemove: (location: SelectedLocation) => void
}

export function Sidebar({ favorites, selected, onSelect, onRemove }: SidebarProps) {
  return (
    <aside className="rounded-2xl border border-white/10 bg-white/5 p-5 lg:sticky lg:top-6 lg:h-fit">
      <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
        Favorite cities
      </h2>
      <p className="mt-2 mb-4 text-xs leading-5 text-slate-400">
        Saved only in this browser. They do not sync across devices.
      </p>
      <FavoriteList
        favorites={favorites}
        selected={selected}
        onSelect={onSelect}
        onRemove={onRemove}
      />
    </aside>
  )
}
