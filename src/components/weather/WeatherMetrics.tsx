import {
  Cloud,
  Droplets,
  Eye,
  Gauge,
  Navigation,
  SunMedium,
  Thermometer,
  Wind,
} from 'lucide-react'
import { MetricCard } from '@/components/weather/MetricCard'
import type { TemperatureUnit } from '@/types/location'
import type { CurrentWeather } from '@/types/weather'
import {
  describeUvIndex,
  formatMillimeters,
  formatPercent,
  formatUvIndex,
  formatVisibility,
  formatWindSpeed,
} from '@/utils/format'
import { formatTemperature } from '@/utils/temperature'
import { formatWindDirection } from '@/utils/wind'

type WeatherMetricsProps = {
  current: CurrentWeather
  unit: TemperatureUnit
}

export function WeatherMetrics({ current, unit }: WeatherMetricsProps) {
  return (
    <section aria-labelledby="metrics-heading">
      <h2 id="metrics-heading" className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
        Weather metrics
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          icon={<Thermometer size={18} aria-hidden="true" />}
          label="Feels like"
          value={formatTemperature(current.apparentTemperatureC, unit)}
        />
        <MetricCard
          icon={<Droplets size={18} aria-hidden="true" />}
          label="Humidity"
          value={formatPercent(current.humidityPercent)}
        />
        <MetricCard
          icon={<Wind size={18} aria-hidden="true" />}
          label="Wind speed"
          value={formatWindSpeed(current.windSpeedKmh)}
        />
        <MetricCard
          icon={<Navigation size={18} aria-hidden="true" />}
          label="Wind direction"
          value={formatWindDirection(current.windDirectionDeg)}
        />
        <MetricCard
          icon={<Gauge size={18} aria-hidden="true" />}
          label="Precipitation"
          value={formatMillimeters(current.precipitationMm)}
        />
        <MetricCard
          icon={<Cloud size={18} aria-hidden="true" />}
          label="Cloud cover"
          value={formatPercent(current.cloudCoverPercent)}
        />
        <MetricCard
          icon={<SunMedium size={18} aria-hidden="true" />}
          label="UV index"
          value={formatUvIndex(current.uvIndex)}
          hint={describeUvIndex(current.uvIndex)}
        />
        <MetricCard
          icon={<Eye size={18} aria-hidden="true" />}
          label="Visibility"
          value={formatVisibility(current.visibilityM)}
        />
      </div>
    </section>
  )
}
