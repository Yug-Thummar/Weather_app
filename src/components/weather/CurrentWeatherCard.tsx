import { MapPin, Star, Sunrise, Sunset } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { WeatherIcon } from '@/components/weather/WeatherIcon'
import { useZonedClock } from '@/hooks/useZonedClock'
import type { SelectedLocation, TemperatureUnit } from '@/types/location'
import type { DailyForecastItem, NormalizedWeather } from '@/types/weather'
import { formatClockTime } from '@/utils/dateTime'
import { formatLocationSubtitle, formatLocationTitle } from '@/utils/location'
import { formatTemperature } from '@/utils/temperature'
import { interpretWeatherCode } from '@/utils/weatherCodes'

type CurrentWeatherCardProps = {
  weather: NormalizedWeather
  unit: TemperatureUnit
  isFavorite: boolean
  onToggleFavorite: (location: SelectedLocation) => void
}

function todayRecord(daily: DailyForecastItem[]): DailyForecastItem | undefined {
  return daily[0]
}

export function CurrentWeatherCard({
  weather,
  unit,
  isFavorite,
  onToggleFavorite,
}: CurrentWeatherCardProps) {
  const localTime = useZonedClock(weather.timezone)
  const condition = interpretWeatherCode(weather.current.weatherCode)
  const today = todayRecord(weather.daily)
  const locationLabel = [
    formatLocationTitle(weather.location),
    formatLocationSubtitle(weather.location),
  ]
    .filter(Boolean)
    .join(', ')

  return (
    <Card className="relative overflow-hidden p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <div className="flex items-start gap-2 text-slate-300">
            <MapPin size={16} className="mt-1 shrink-0" aria-hidden="true" />
            <div>
              <h2 className="text-xl font-semibold text-white sm:text-2xl">
                {formatLocationTitle(weather.location)}
              </h2>
              <p className="text-sm text-slate-300">
                {formatLocationSubtitle(weather.location) || 'Coordinates selected'}
              </p>
            </div>
          </div>
          <p className="mt-3 text-sm text-slate-400">
            Local time{weather.timezoneAbbreviation ? ` (${weather.timezoneAbbreviation})` : ''}:{' '}
            <span className="text-slate-200">{localTime ?? 'Unavailable'}</span>
          </p>
        </div>
        <Button
          variant={isFavorite ? 'default' : 'secondary'}
          onClick={() => onToggleFavorite(weather.location)}
          aria-pressed={isFavorite}
          aria-label={
            isFavorite
              ? `Remove ${locationLabel} from favorites`
              : `Save ${locationLabel} as a favorite`
          }
        >
          <Star size={16} fill={isFavorite ? 'currentColor' : 'none'} aria-hidden="true" />
          {isFavorite ? 'Saved' : 'Save city'}
        </Button>
      </div>

      <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-6xl font-semibold tracking-tight text-white sm:text-7xl">
            {formatTemperature(weather.current.temperatureC, unit)}
          </p>
          <div className="mt-3 flex items-center gap-3 text-slate-200">
            <WeatherIcon
              name={condition.icon}
              isDay={weather.current.isDay}
              size={36}
            />
            <p className="text-lg">{condition.description}</p>
          </div>
          <p className="mt-2 text-sm text-slate-400">
            Feels like {formatTemperature(weather.current.apparentTemperatureC, unit)}
          </p>
        </div>
        <dl className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
          <div>
            <dt className="flex items-center gap-2 text-slate-400">
              <Sunrise size={16} aria-hidden="true" /> Sunrise
            </dt>
            <dd className="mt-1 text-white">{formatClockTime(today?.sunrise)}</dd>
          </div>
          <div>
            <dt className="flex items-center gap-2 text-slate-400">
              <Sunset size={16} aria-hidden="true" /> Sunset
            </dt>
            <dd className="mt-1 text-white">{formatClockTime(today?.sunset)}</dd>
          </div>
        </dl>
      </div>
    </Card>
  )
}
