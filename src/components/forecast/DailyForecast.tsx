import { Card } from '@/components/ui/card'
import { WeatherIcon } from '@/components/weather/WeatherIcon'
import type { TemperatureUnit } from '@/types/location'
import type { DailyForecastItem } from '@/types/weather'
import { formatDayLabel } from '@/utils/dateTime'
import { formatMillimeters, formatPercent } from '@/utils/format'
import { formatTemperature } from '@/utils/temperature'
import { interpretWeatherCode } from '@/utils/weatherCodes'

type DailyForecastProps = {
  items: DailyForecastItem[]
  unit: TemperatureUnit
}

export function DailyForecast({ items, unit }: DailyForecastProps) {
  if (items.length === 0) {
    return (
      <Card className="p-5">
        <h2 className="text-base font-semibold text-white">Seven-day forecast</h2>
        <p className="mt-2 text-sm text-slate-300">
          Daily forecast data is currently unavailable for this location.
        </p>
      </Card>
    )
  }

  return (
    <Card className="p-5">
      <h2 className="text-base font-semibold text-white">Seven-day forecast</h2>
      <ul className="mt-4 divide-y divide-white/10">
        {items.map((item) => {
          const condition = interpretWeatherCode(item.weatherCode)
          return (
            <li
              key={item.date}
              className="grid grid-cols-1 gap-3 py-4 sm:grid-cols-[8rem_1fr_auto] sm:items-center"
            >
              <p className="font-medium text-white">{formatDayLabel(item.date)}</p>
              <div className="flex items-center gap-3 text-sm text-slate-300">
                <WeatherIcon name={condition.icon} size={22} />
                <span>{condition.description}</span>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-300">
                <span>
                  {formatTemperature(item.temperatureMinC, unit)} /{' '}
                  <span className="text-white">
                    {formatTemperature(item.temperatureMaxC, unit)}
                  </span>
                </span>
                <span>Precip {formatPercent(item.precipitationProbability)}</span>
                <span>Rain {formatMillimeters(item.rainSumMm ?? item.precipitationSumMm)}</span>
              </div>
            </li>
          )
        })}
      </ul>
    </Card>
  )
}
