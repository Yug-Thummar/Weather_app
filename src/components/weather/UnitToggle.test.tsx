import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, expect, it } from 'vitest'
import { UnitToggle } from '@/components/weather/UnitToggle'
import { CurrentWeatherCard } from '@/components/weather/CurrentWeatherCard'
import { berlin, sampleForecastResponse } from '@/test/fixtures'
import { normalizeForecastResponse } from '@/services/weather'
import type { TemperatureUnit } from '@/types/location'

function UnitHarness() {
  const [unit, setUnit] = useState<TemperatureUnit>('celsius')
  const weather = normalizeForecastResponse(
    sampleForecastResponse,
    berlin,
    '2026-10-23T12:05:00.000Z',
  )

  return (
    <div>
      <UnitToggle unit={unit} onChange={setUnit} />
      <CurrentWeatherCard
        weather={weather}
        unit={unit}
        isFavorite={false}
        onToggleFavorite={() => undefined}
      />
    </div>
  )
}

describe('unit toggle behavior', () => {
  it('switches displayed temperatures from Celsius to Fahrenheit', async () => {
    const user = userEvent.setup()
    render(<UnitHarness />)

    expect(screen.getByRole('button', { name: '°C' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByText('18°C')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: '°F' }))

    expect(screen.getByRole('button', { name: '°F' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByText('65°F')).toBeInTheDocument()
  })
})
