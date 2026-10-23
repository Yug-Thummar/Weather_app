import type { ReactNode } from 'react'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { Sidebar } from '@/components/layout/Sidebar'
import type { SelectedLocation, TemperatureUnit } from '@/types/location'

type AppLayoutProps = {
  unit: TemperatureUnit
  onUnitChange: (unit: TemperatureUnit) => void
  onSelectLocation: (location: SelectedLocation) => void
  onUseLocation: () => void
  onRefresh: () => void
  isLocating: boolean
  canRefresh: boolean
  isRefreshing: boolean
  favorites: SelectedLocation[]
  selected: SelectedLocation | null
  onRemoveFavorite: (location: SelectedLocation) => void
  children: ReactNode
}

export function AppLayout({
  unit,
  onUnitChange,
  onSelectLocation,
  onUseLocation,
  onRefresh,
  isLocating,
  canRefresh,
  isRefreshing,
  favorites,
  selected,
  onRemoveFavorite,
  children,
}: AppLayoutProps) {
  return (
    <div className="min-h-svh">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-sky-400 focus:px-3 focus:py-2 focus:text-navy-950"
      >
        Skip to main content
      </a>
      <Header
        unit={unit}
        onUnitChange={onUnitChange}
        onSelectLocation={onSelectLocation}
        onUseLocation={onUseLocation}
        onRefresh={onRefresh}
        isLocating={isLocating}
        canRefresh={canRefresh}
        isRefreshing={isRefreshing}
      />
      <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-6 lg:grid-cols-[270px_minmax(0,1fr)]">
        <Sidebar
          favorites={favorites}
          selected={selected}
          onSelect={onSelectLocation}
          onRemove={onRemoveFavorite}
        />
        <main id="main-content">{children}</main>
      </div>
      <Footer />
    </div>
  )
}
