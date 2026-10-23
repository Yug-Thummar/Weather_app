import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { DailyForecast } from '@/components/forecast/DailyForecast'
import { HourlyForecast } from '@/components/forecast/HourlyForecast'
import { berlin, sampleForecastResponse } from '@/test/fixtures'
import { normalizeForecastResponse } from '@/services/weather'

describe('forecast rendering', () => {
  it('renders daily dates, conditions, and temperature range from API data', () => {
    const weather = normalizeForecastResponse(
      sampleForecastResponse,
      berlin,
      '2026-10-23T12:05:00.000Z',
    )

    render(<DailyForecast items={weather.daily} unit="celsius" />)

    expect(screen.getByText('Fri 23 Oct')).toBeInTheDocument()
    expect(screen.getByText('Sat 24 Oct')).toBeInTheDocument()
    expect(screen.getByText('Slight rain')).toBeInTheDocument()
    expect(screen.getByText('Partly cloudy')).toBeInTheDocument()
    expect(screen.getByText(/12°C/)).toBeInTheDocument()
    expect(screen.getByText('20°C')).toBeInTheDocument()
  })

  it('renders hourly temperatures and precipitation probability', () => {
    const weather = normalizeForecastResponse(
      sampleForecastResponse,
      berlin,
      '2026-10-23T12:05:00.000Z',
    )

    render(<HourlyForecast items={weather.hourly} unit="celsius" />)

    expect(screen.getByText('12:00')).toBeInTheDocument()
    expect(screen.getByText('18°C')).toBeInTheDocument()
    expect(screen.getByText('40%')).toBeInTheDocument()
  })
})
