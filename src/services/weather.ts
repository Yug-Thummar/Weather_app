import { ApiError, fetchJson } from '@/services/apiClient'
import type { SelectedLocation } from '@/types/location'
import type {
  CurrentWeather,
  DailyForecastItem,
  HourlyForecastItem,
  NormalizedWeather,
  OpenMeteoForecastResponse,
  WeatherFetchResult,
} from '@/types/weather'
import { isValidLatitude, isValidLongitude } from '@/utils/location'

const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast'
const CACHE_TTL_MS = 10 * 60 * 1000

const CURRENT_VARIABLES = [
  'temperature_2m',
  'relative_humidity_2m',
  'apparent_temperature',
  'is_day',
  'precipitation',
  'weather_code',
  'cloud_cover',
  'wind_speed_10m',
  'wind_direction_10m',
  'uv_index',
  'visibility',
] as const

const HOURLY_VARIABLES = [
  'temperature_2m',
  'precipitation_probability',
  'precipitation',
  'weather_code',
  'wind_speed_10m',
  'uv_index',
  'visibility',
  'is_day',
] as const

const DAILY_VARIABLES = [
  'weather_code',
  'temperature_2m_max',
  'temperature_2m_min',
  'sunrise',
  'sunset',
  'uv_index_max',
  'precipitation_sum',
  'precipitation_probability_max',
  'rain_sum',
] as const

type CacheEntry = {
  weather: NormalizedWeather
  storedAt: number
}

const weatherCache = new Map<string, CacheEntry>()

function cacheKey(location: SelectedLocation): string {
  return `${location.latitude.toFixed(4)},${location.longitude.toFixed(4)}`
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function asFiniteNumber(value: unknown): number | null {
  return typeof value === 'number' && Number.isFinite(value) ? value : null
}

function asString(value: unknown): string | null {
  return typeof value === 'string' && value.trim().length > 0 ? value : null
}

function asBooleanFlag(value: unknown): boolean | null {
  if (value === 1 || value === true) return true
  if (value === 0 || value === false) return false
  return null
}

function numberAt(values: Array<number | null> | undefined, index: number): number | null {
  return asFiniteNumber(values?.[index])
}

function stringAt(values: Array<string | null> | undefined, index: number): string | null {
  return asString(values?.[index])
}

function currentFromHourly(
  hourly: HourlyForecastItem[],
  observedAt: string | null,
): HourlyForecastItem | null {
  if (hourly.length === 0) {
    return null
  }

  if (!observedAt) {
    return hourly[0] ?? null
  }

  const match = hourly.find((item) => item.time === observedAt)
  if (match) {
    return match
  }

  const upcoming = hourly.find((item) => item.time >= observedAt)
  return upcoming ?? hourly[hourly.length - 1] ?? null
}

export function normalizeForecastResponse(
  payload: unknown,
  location: SelectedLocation,
  fetchedAt: string,
  fromCache = false,
): NormalizedWeather {
  if (!isRecord(payload)) {
    throw new ApiError(
      'The weather service returned an unexpected response.',
      'invalid',
    )
  }

  if (payload.error === true) {
    throw new ApiError(
      asString(payload.reason) ??
        'The weather service could not complete this request.',
      'invalid',
    )
  }

  const data = payload as OpenMeteoForecastResponse
  const currentBlock = data.current ?? {}
  const hourlyBlock = data.hourly ?? {}
  const dailyBlock = data.daily ?? {}
  const times = Array.isArray(hourlyBlock.time) ? hourlyBlock.time : []
  const days = Array.isArray(dailyBlock.time) ? dailyBlock.time : []

  const hourly: HourlyForecastItem[] = times
    .map((time, index) => {
      if (!time) {
        return null
      }

      return {
        time,
        temperatureC: numberAt(hourlyBlock.temperature_2m, index),
        precipitationProbability: numberAt(
          hourlyBlock.precipitation_probability,
          index,
        ),
        precipitationMm: numberAt(hourlyBlock.precipitation, index),
        weatherCode: numberAt(hourlyBlock.weather_code, index),
        windSpeedKmh: numberAt(hourlyBlock.wind_speed_10m, index),
        uvIndex: numberAt(hourlyBlock.uv_index, index),
        visibilityM: numberAt(hourlyBlock.visibility, index),
        isDay: asBooleanFlag(hourlyBlock.is_day?.[index]),
      } satisfies HourlyForecastItem
    })
    .filter((item): item is HourlyForecastItem => item !== null)

  const daily: DailyForecastItem[] = days
    .map((date, index) => {
      if (!date) {
        return null
      }

      return {
        date,
        weatherCode: numberAt(dailyBlock.weather_code, index),
        temperatureMaxC: numberAt(dailyBlock.temperature_2m_max, index),
        temperatureMinC: numberAt(dailyBlock.temperature_2m_min, index),
        precipitationProbability: numberAt(
          dailyBlock.precipitation_probability_max,
          index,
        ),
        precipitationSumMm: numberAt(dailyBlock.precipitation_sum, index),
        rainSumMm: numberAt(dailyBlock.rain_sum, index),
        sunrise: stringAt(dailyBlock.sunrise, index),
        sunset: stringAt(dailyBlock.sunset, index),
        uvIndexMax: numberAt(dailyBlock.uv_index_max, index),
      } satisfies DailyForecastItem
    })
    .filter((item): item is DailyForecastItem => item !== null)

  const observedAt = asString(currentBlock.time)
  const matchingHour = currentFromHourly(hourly, observedAt)

  const current: CurrentWeather = {
    observedAt,
    temperatureC: asFiniteNumber(currentBlock.temperature_2m),
    apparentTemperatureC: asFiniteNumber(currentBlock.apparent_temperature),
    humidityPercent: asFiniteNumber(currentBlock.relative_humidity_2m),
    precipitationMm: asFiniteNumber(currentBlock.precipitation),
    weatherCode: asFiniteNumber(currentBlock.weather_code),
    cloudCoverPercent: asFiniteNumber(currentBlock.cloud_cover),
    windSpeedKmh: asFiniteNumber(currentBlock.wind_speed_10m),
    windDirectionDeg: asFiniteNumber(currentBlock.wind_direction_10m),
    uvIndex:
      asFiniteNumber(currentBlock.uv_index) ?? matchingHour?.uvIndex ?? null,
    visibilityM:
      asFiniteNumber(currentBlock.visibility) ?? matchingHour?.visibilityM ?? null,
    isDay: asBooleanFlag(currentBlock.is_day) ?? matchingHour?.isDay ?? null,
  }

  if (
    current.temperatureC === null &&
    current.weatherCode === null &&
    hourly.length === 0 &&
    daily.length === 0
  ) {
    throw new ApiError(
      'The weather service did not return usable forecast data for this location.',
      'invalid',
    )
  }

  return {
    location,
    timezone: asString(data.timezone),
    timezoneAbbreviation: asString(data.timezone_abbreviation),
    utcOffsetSeconds: asFiniteNumber(data.utc_offset_seconds),
    current,
    hourly,
    daily,
    fetchedAt,
    fromCache,
  }
}

export function getCachedWeather(
  location: SelectedLocation,
): NormalizedWeather | null {
  const entry = weatherCache.get(cacheKey(location))
  if (!entry) {
    return null
  }

  if (Date.now() - entry.storedAt > CACHE_TTL_MS) {
    weatherCache.delete(cacheKey(location))
    return null
  }

  return {
    ...entry.weather,
    fromCache: true,
  }
}

export function clearWeatherCache(): void {
  weatherCache.clear()
}

export async function fetchWeather(
  location: SelectedLocation,
  options: { signal?: AbortSignal; forceRefresh?: boolean } = {},
): Promise<WeatherFetchResult> {
  if (!isValidLatitude(location.latitude) || !isValidLongitude(location.longitude)) {
    throw new ApiError(
      'The selected location has invalid coordinates.',
      'invalid',
    )
  }

  if (!options.forceRefresh) {
    const cached = getCachedWeather(location)
    if (cached) {
      return { weather: cached, fromCache: true }
    }
  }

  const params = new URLSearchParams({
    latitude: String(location.latitude),
    longitude: String(location.longitude),
    current: CURRENT_VARIABLES.join(','),
    hourly: HOURLY_VARIABLES.join(','),
    daily: DAILY_VARIABLES.join(','),
    timezone: 'auto',
    forecast_days: '7',
    temperature_unit: 'celsius',
    wind_speed_unit: 'kmh',
    precipitation_unit: 'mm',
  })

  const payload = await fetchJson<OpenMeteoForecastResponse>(
    `${FORECAST_URL}?${params.toString()}`,
    { signal: options.signal },
  )

  const fetchedAt = new Date().toISOString()
  const weather = normalizeForecastResponse(payload, location, fetchedAt, false)
  weatherCache.set(cacheKey(location), {
    weather: { ...weather, fromCache: false },
    storedAt: Date.now(),
  })

  return { weather, fromCache: false }
}

export function buildPlanningNotes(weather: NormalizedWeather): string[] {
  const notes: string[] = []
  const upcoming = weather.hourly.slice(0, 6)
  const rainLikely = upcoming.some(
    (item) =>
      (item.precipitationProbability ?? 0) >= 40 ||
      (item.precipitationMm ?? 0) > 0.2,
  )
  const uv = weather.current.uvIndex
  const wind = weather.current.windSpeedKmh
  const apparent = weather.current.apparentTemperatureC
  const actual = weather.current.temperatureC

  if (rainLikely) {
    notes.push('Rain is possible during the next few hours.')
  }

  if (uv !== null && uv >= 6) {
    notes.push('The UV index is high. Consider sun protection if you will be outdoors.')
  }

  if (wind !== null && wind >= 40) {
    notes.push('Wind is strong enough that it may affect walking, cycling, or outdoor plans.')
  }

  if (apparent !== null && actual !== null && Math.abs(apparent - actual) >= 3) {
    notes.push(
      apparent > actual
        ? 'It currently feels warmer than the measured temperature.'
        : 'It currently feels cooler than the measured temperature.',
    )
  }

  return notes
}
