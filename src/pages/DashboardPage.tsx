import { lazy, Suspense, useCallback, useEffect, useRef, useState } from 'react'
import type { MutableRefObject } from 'react'
import { CloudSun } from 'lucide-react'
import { AppLayout } from '@/components/layout/AppLayout'
import { DailyForecast } from '@/components/forecast/DailyForecast'
import { HourlyForecast } from '@/components/forecast/HourlyForecast'
import { CurrentWeatherCard } from '@/components/weather/CurrentWeatherCard'
import { WeatherMetrics } from '@/components/weather/WeatherMetrics'
import { EmptyState } from '@/components/states/EmptyState'
import { ErrorBanner } from '@/components/states/ErrorBanner'
import { WeatherSkeleton } from '@/components/states/WeatherSkeleton'
import { Card } from '@/components/ui/card'
import { useFavorites } from '@/hooks/useFavorites'
import { useGeolocation } from '@/hooks/useGeolocation'
import { useOnlineStatus } from '@/hooks/useOnlineStatus'
import { useUnitPreference } from '@/hooks/useUnitPreference'
import { useUrlLocation } from '@/hooks/useUrlLocation'
import { useWeather } from '@/hooks/useWeather'
import { buildPlanningNotes } from '@/services/weather'
import type { SelectedLocation, TemperatureUnit } from '@/types/location'
import { formatUpdatedAt, getUpcomingHourlyItems } from '@/utils/dateTime'

const TemperatureChart = lazy(() => import('@/components/charts/TemperatureChart'))

function locationKey(location: SelectedLocation): string {
  return `${location.latitude.toFixed(4)},${location.longitude.toFixed(4)}`
}

type WeatherPanelProps = {
  location: SelectedLocation
  unit: TemperatureUnit
  isFavorite: boolean
  onToggleFavorite: (location: SelectedLocation) => void
  refreshRef: MutableRefObject<() => void>
}

function WeatherPanel({
  location,
  unit,
  isFavorite,
  onToggleFavorite,
  refreshRef,
}: WeatherPanelProps) {
  const { weather, isLoading, isRefreshing, error, fromCache, refresh } =
    useWeather(location)

  useEffect(() => {
    refreshRef.current = refresh
  }, [refresh, refreshRef])

  const upcomingHours = weather
    ? getUpcomingHourlyItems(weather.hourly, weather.current.observedAt, 24)
    : []
  const planningNotes = weather
    ? buildPlanningNotes({ ...weather, hourly: upcomingHours })
    : []

  if (isLoading) {
    return <WeatherSkeleton />
  }

  if (error) {
    return (
      <ErrorBanner
        title="Weather data could not be loaded"
        message={error}
        onRetry={refresh}
      />
    )
  }

  if (!weather) {
    return (
      <ErrorBanner
        title="Weather data could not be loaded"
        message="No forecast is available for this location yet."
        onRetry={refresh}
      />
    )
  }

  return (
    <>
      <div className="flex flex-col gap-2 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <p>
          Last successful update: {formatUpdatedAt(weather.fetchedAt)}
          {isRefreshing ? ' · Refreshing…' : ''}
        </p>
        <p>
          {fromCache
            ? 'Showing recently cached data for this location.'
            : 'Showing newly fetched weather data.'}
        </p>
      </div>
      <CurrentWeatherCard
        weather={weather}
        unit={unit}
        isFavorite={isFavorite}
        onToggleFavorite={onToggleFavorite}
      />
      {planningNotes.length > 0 ? (
        <Card className="p-5">
          <h2 className="text-base font-semibold text-white">Planning notes</h2>
          <p className="mt-1 text-sm text-slate-400">
            These notes are derived from the forecast values and are not official warnings.
          </p>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-200">
            {planningNotes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </Card>
      ) : null}
      <WeatherMetrics current={weather.current} unit={unit} />
      <HourlyForecast items={upcomingHours} unit={unit} />
      <Suspense
        fallback={<Card className="p-5 text-sm text-slate-300">Loading temperature chart…</Card>}
      >
        <TemperatureChart items={upcomingHours} unit={unit} />
      </Suspense>
      <DailyForecast items={weather.daily} unit={unit} />
    </>
  )
}

export function DashboardPage() {
  const { initialLocation, syncLocationToUrl } = useUrlLocation()
  const [selectedLocation, setSelectedLocation] = useState<SelectedLocation | null>(
    initialLocation,
  )
  const { unit, setUnit } = useUnitPreference()
  const { favorites, isFavorite, toggleFavorite, removeFavorite } = useFavorites()
  const online = useOnlineStatus()
  const refreshRef = useRef<() => void>(() => {})

  const handleSelectLocation = useCallback((location: SelectedLocation) => {
    setSelectedLocation(location)
  }, [])

  const geolocation = useGeolocation(handleSelectLocation)

  useEffect(() => {
    syncLocationToUrl(selectedLocation)
  }, [selectedLocation, syncLocationToUrl])

  const handleRefresh = useCallback(() => {
    refreshRef.current()
  }, [])

  return (
    <AppLayout
      unit={unit}
      onUnitChange={setUnit}
      onSelectLocation={handleSelectLocation}
      onUseLocation={geolocation.requestLocation}
      onRefresh={handleRefresh}
      isLocating={geolocation.isLocating}
      canRefresh={Boolean(selectedLocation)}
      isRefreshing={false}
      favorites={favorites}
      selected={selectedLocation}
      onRemoveFavorite={removeFavorite}
    >
      <div className="space-y-5">
        <p className="text-sm text-slate-400">
          Search a city to load live conditions. Location is requested only after you click
          Use my location, and coordinates are not stored as a history.
        </p>

        {!online ? (
          <ErrorBanner
            title="You are offline"
            message="The dashboard cannot fetch new weather data until your internet connection is restored."
          />
        ) : null}

        {geolocation.error ? <ErrorBanner message={geolocation.error} /> : null}

        {!selectedLocation ? (
          <EmptyState
            icon={<CloudSun size={36} aria-hidden="true" />}
            title="Search for a city to get started"
            description="Use the search field to look up a city worldwide, or use your current location. Weather is fetched only after you choose a specific place, so ambiguous names never load the wrong forecast."
          />
        ) : (
          <WeatherPanel
            key={locationKey(selectedLocation)}
            location={selectedLocation}
            unit={unit}
            isFavorite={isFavorite(selectedLocation)}
            onToggleFavorite={toggleFavorite}
            refreshRef={refreshRef}
          />
        )}
      </div>
    </AppLayout>
  )
}
