import { CloudSun, Locate, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CitySearch } from '@/components/search/CitySearch'
import { UnitToggle } from '@/components/weather/UnitToggle'
import type { SelectedLocation, TemperatureUnit } from '@/types/location'

type HeaderProps = {
  unit: TemperatureUnit
  onUnitChange: (unit: TemperatureUnit) => void
  onSelectLocation: (location: SelectedLocation) => void
  onUseLocation: () => void
  onRefresh: () => void
  isLocating: boolean
  canRefresh: boolean
  isRefreshing: boolean
}

export function Header({
  unit,
  onUnitChange,
  onSelectLocation,
  onUseLocation,
  onRefresh,
  isLocating,
  canRefresh,
  isRefreshing,
}: HeaderProps) {
  return (
    <header className="border-b border-white/10 bg-navy-950/70 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 lg:flex-row lg:items-center">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-sky-400/15 text-sky-300">
            <CloudSun size={22} aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-semibold tracking-wide text-white">Weather Dashboard</p>
            <p className="text-xs text-slate-400">Student mini project</p>
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <CitySearch onSelect={onSelectLocation} />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <UnitToggle unit={unit} onChange={onUnitChange} />
          <Button
            variant="secondary"
            onClick={onUseLocation}
            disabled={isLocating}
            aria-label="Use my current location to load weather"
          >
            <Locate size={16} aria-hidden="true" />
            {isLocating ? 'Locating...' : 'Use my location'}
          </Button>
          <Button
            variant="secondary"
            onClick={onRefresh}
            disabled={!canRefresh || isRefreshing}
            aria-label="Refresh weather data"
          >
            <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} aria-hidden="true" />
            Refresh
          </Button>
        </div>
      </div>
    </header>
  )
}
