import { describe, expect, it } from 'vitest'
import {
  celsiusToFahrenheit,
  convertTemperature,
  formatTemperature,
} from '@/utils/temperature'

describe('temperature conversion', () => {
  it('converts Celsius to Fahrenheit with the standard formula', () => {
    expect(celsiusToFahrenheit(0)).toBe(32)
    expect(celsiusToFahrenheit(100)).toBe(212)
    expect(celsiusToFahrenheit(-10)).toBe(14)
  })

  it('keeps Celsius values unchanged', () => {
    expect(convertTemperature(21.4, 'celsius')).toBe(21.4)
  })

  it('does not treat missing values as zero', () => {
    expect(formatTemperature(null, 'celsius')).toBe('Unavailable')
    expect(formatTemperature(undefined, 'fahrenheit')).toBe('Unavailable')
  })
})
