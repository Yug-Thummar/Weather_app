import type { SelectedLocation } from '@/types/location'

export type WeatherIconName =
  | 'clear'
  | 'mainly-clear'
  | 'partly-cloudy'
  | 'overcast'
  | 'fog'
  | 'drizzle'
  | 'rain'
  | 'snow'
  | 'showers'
  | 'thunderstorm'
  | 'unknown'

export type WeatherCondition = {
  code: number | null
  description: string
  icon: WeatherIconName
}

export type CurrentWeather = {
  observedAt: string | null
  temperatureC: number | null
  apparentTemperatureC: number | null
  humidityPercent: number | null
  precipitationMm: number | null
  weatherCode: number | null
  cloudCoverPercent: number | null
  windSpeedKmh: number | null
  windDirectionDeg: number | null
  uvIndex: number | null
  visibilityM: number | null
  isDay: boolean | null
}

export type HourlyForecastItem = {
  time: string
  temperatureC: number | null
  precipitationProbability: number | null
  precipitationMm: number | null
  weatherCode: number | null
  windSpeedKmh: number | null
  uvIndex: number | null
  visibilityM: number | null
  isDay: boolean | null
}

export type DailyForecastItem = {
  date: string
  weatherCode: number | null
  temperatureMaxC: number | null
  temperatureMinC: number | null
  precipitationProbability: number | null
  precipitationSumMm: number | null
  rainSumMm: number | null
  sunrise: string | null
  sunset: string | null
  uvIndexMax: number | null
}

export type NormalizedWeather = {
  location: SelectedLocation
  timezone: string | null
  timezoneAbbreviation: string | null
  utcOffsetSeconds: number | null
  current: CurrentWeather
  hourly: HourlyForecastItem[]
  daily: DailyForecastItem[]
  fetchedAt: string
  fromCache: boolean
}

export type OpenMeteoErrorPayload = {
  error?: boolean
  reason?: string
}

export type OpenMeteoCurrentBlock = {
  time?: string
  interval?: number
  temperature_2m?: number | null
  relative_humidity_2m?: number | null
  apparent_temperature?: number | null
  precipitation?: number | null
  weather_code?: number | null
  cloud_cover?: number | null
  wind_speed_10m?: number | null
  wind_direction_10m?: number | null
  uv_index?: number | null
  visibility?: number | null
  is_day?: number | null
}

export type OpenMeteoHourlyBlock = {
  time?: string[]
  temperature_2m?: Array<number | null>
  precipitation_probability?: Array<number | null>
  precipitation?: Array<number | null>
  weather_code?: Array<number | null>
  wind_speed_10m?: Array<number | null>
  uv_index?: Array<number | null>
  visibility?: Array<number | null>
  is_day?: Array<number | null>
}

export type OpenMeteoDailyBlock = {
  time?: string[]
  weather_code?: Array<number | null>
  temperature_2m_max?: Array<number | null>
  temperature_2m_min?: Array<number | null>
  sunrise?: Array<string | null>
  sunset?: Array<string | null>
  uv_index_max?: Array<number | null>
  precipitation_sum?: Array<number | null>
  precipitation_probability_max?: Array<number | null>
  rain_sum?: Array<number | null>
}

export type OpenMeteoForecastResponse = {
  latitude?: number
  longitude?: number
  timezone?: string
  timezone_abbreviation?: string
  utc_offset_seconds?: number
  current?: OpenMeteoCurrentBlock
  hourly?: OpenMeteoHourlyBlock
  daily?: OpenMeteoDailyBlock
  error?: boolean
  reason?: string
}

export type OpenMeteoGeocodingResult = {
  id?: number
  name?: string
  latitude?: number
  longitude?: number
  elevation?: number
  timezone?: string
  country_code?: string
  country?: string
  admin1?: string
  admin2?: string
  population?: number
}

export type OpenMeteoGeocodingResponse = {
  results?: OpenMeteoGeocodingResult[]
  error?: boolean
  reason?: string
}

export type WeatherFetchResult = {
  weather: NormalizedWeather
  fromCache: boolean
}
