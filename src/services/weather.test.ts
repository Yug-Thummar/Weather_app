import { describe, expect, it } from 'vitest'
import { ApiError } from '@/services/apiClient'
import { normalizeForecastResponse } from '@/services/weather'
import { berlin, sampleForecastResponse } from '@/test/fixtures'

describe('API response normalization', () => {
  it('normalizes a valid Open-Meteo forecast payload', () => {
    const weather = normalizeForecastResponse(
      sampleForecastResponse,
      berlin,
      '2026-10-23T12:05:00.000Z',
    )

    expect(weather.current.temperatureC).toBe(18.4)
    expect(weather.current.weatherCode).toBe(61)
    expect(weather.hourly).toHaveLength(3)
    expect(weather.daily[0]?.date).toBe('2026-10-23')
    expect(weather.timezone).toBe('Europe/Berlin')
  })

  it('labels missing optional measurements as null instead of zero', () => {
    const weather = normalizeForecastResponse(
      {
        ...sampleForecastResponse,
        current: {
          time: '2026-10-23T12:00',
          temperature_2m: 10,
          weather_code: 0,
        },
        hourly: {
          time: ['2026-10-23T12:00'],
          temperature_2m: [10],
        },
      },
      berlin,
      '2026-10-23T12:05:00.000Z',
    )

    expect(weather.current.uvIndex).toBeNull()
    expect(weather.current.visibilityM).toBeNull()
    expect(weather.current.humidityPercent).toBeNull()
    expect(weather.hourly[0]?.precipitationProbability).toBeNull()
  })

  it('rejects invalid or empty weather payloads', () => {
    expect(() =>
      normalizeForecastResponse({ error: true, reason: 'Invalid location' }, berlin, 'now'),
    ).toThrow(ApiError)

    expect(() => normalizeForecastResponse({}, berlin, 'now')).toThrow(
      /did not return usable forecast data/i,
    )
  })
})
