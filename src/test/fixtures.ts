import type { SelectedLocation } from '@/types/location'
import type { OpenMeteoForecastResponse } from '@/types/weather'

export const berlin: SelectedLocation = {
  id: '2950159',
  name: 'Berlin',
  latitude: 52.52,
  longitude: 13.41,
  country: 'Germany',
  admin1: 'Berlin',
  timezone: 'Europe/Berlin',
}

export const sampleForecastResponse: OpenMeteoForecastResponse = {
  latitude: 52.52,
  longitude: 13.41,
  timezone: 'Europe/Berlin',
  timezone_abbreviation: 'CEST',
  utc_offset_seconds: 7200,
  current: {
    time: '2026-10-23T12:00',
    temperature_2m: 18.4,
    relative_humidity_2m: 62,
    apparent_temperature: 17.1,
    precipitation: 0.2,
    weather_code: 61,
    cloud_cover: 74,
    wind_speed_10m: 14.5,
    wind_direction_10m: 230,
    uv_index: 4.2,
    visibility: 12000,
    is_day: 1,
  },
  hourly: {
    time: ['2026-10-23T12:00', '2026-10-23T13:00', '2026-10-23T14:00'],
    temperature_2m: [18.4, 19.1, 19.8],
    precipitation_probability: [40, 55, 60],
    precipitation: [0.2, 0.4, 0.1],
    weather_code: [61, 63, 61],
    wind_speed_10m: [14.5, 15, 13],
    uv_index: [4.2, 3.8, 3.1],
    visibility: [12000, 11000, 10000],
    is_day: [1, 1, 1],
  },
  daily: {
    time: ['2026-10-23', '2026-10-24'],
    weather_code: [61, 2],
    temperature_2m_max: [20, 17],
    temperature_2m_min: [12, 9],
    sunrise: ['2026-10-23T07:32', '2026-10-24T07:34'],
    sunset: ['2026-10-23T18:04', '2026-10-24T18:02'],
    uv_index_max: [4.5, 3.2],
    precipitation_sum: [2.4, 0],
    precipitation_probability_max: [70, 10],
    rain_sum: [2.4, 0],
  },
}
