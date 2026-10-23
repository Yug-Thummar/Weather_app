import { describe, expect, it } from 'vitest'
import { interpretWeatherCode } from '@/utils/weatherCodes'

describe('weather code descriptions', () => {
  it('maps official WMO codes to descriptions and icons', () => {
    expect(interpretWeatherCode(0)).toMatchObject({
      description: 'Clear sky',
      icon: 'clear',
    })
    expect(interpretWeatherCode(3)).toMatchObject({
      description: 'Overcast',
      icon: 'overcast',
    })
    expect(interpretWeatherCode(95)).toMatchObject({
      description: 'Thunderstorm',
      icon: 'thunderstorm',
    })
  })

  it('does not treat a missing code as clear weather', () => {
    expect(interpretWeatherCode(null)).toMatchObject({
      code: null,
      description: 'Condition unavailable',
      icon: 'unknown',
    })
    expect(interpretWeatherCode(undefined).icon).toBe('unknown')
    expect(interpretWeatherCode(1234).description).toBe('Unrecognized weather condition')
  })
})
