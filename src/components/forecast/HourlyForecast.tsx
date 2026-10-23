import { Droplets, Wind } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { WeatherIcon } from '@/components/weather/WeatherIcon'
import type { TemperatureUnit } from '@/types/location'
import type { HourlyForecastItem } from '@/types/weather'
import { formatHourLabel } from '@/utils/dateTime'
import { formatPercent, formatWindSpeed } from '@/utils/format'
import { formatTemperature } from '@/utils/temperature'
import { interpretWeatherCode } from '@/utils/weatherCodes'

type HourlyForecastProps = {
  items: HourlyForecastItem[]
  unit: TemperatureUnit
}

export function HourlyForecast({ items, unit }: HourlyForecastProps) {
  if (items.length === 0) {
    return (
      <Card className="p-5">
        <h2 className="text-base font-semibold text-white">Hourly forecast</h2>
        <p className="mt-2 text-sm text-slate-300">
          Hourly forecast data is currently unavailable for this location.
        </p>
      </Card>
    )
  }

  return (
    <Card className="p-5">
      <h2 className="text-base font-semibold text-white">Next 24 hours</h2>
      <div className="mt-4 flex gap-3 overflow-x-auto pb-2 no-scrollbar">
        {items.map((item) => {
          const condition = interpretWeatherCode(item.weatherCode)
          return (
            <article
              key={item.time}
              className="min-w-[108px] rounded-2xl border border-white/10 bg-navy-900/50 px-3 py-4 text-center"
            >
              <p className="text-xs font-medium text-slate-400">{formatHourLabel(item.time)}</p>
              <div className="mt-3 flex justify-center">
                <WeatherIcon name={condition.icon} isDay={item.isDay} size={26} />
              </div>
              <p className="mt-3 text-lg font-semibold text-white">
                {formatTemperature(item.temperatureC, unit)}
              </p>
              <p className="mt-2 flex items-center justify-center gap-1 text-xs text-sky-200">
                <Droplets size={12} aria-hidden="true" />
                {formatPercent(item.precipitationProbability)}
              </p>
              <p className="mt-1 flex items-center justify-center gap-1 text-xs text-slate-400">
                <Wind size={12} aria-hidden="true" />
                {formatWindSpeed(item.windSpeedKmh)}
              </p>
            </article>
          )
        })}
      </div>
    </Card>
  )
}
