import type { TemperatureUnit } from '@/types/location'

export function celsiusToFahrenheit(celsius: number): number {
  return (celsius * 9) / 5 + 32
}

export function convertTemperature(
  celsius: number,
  unit: TemperatureUnit,
): number {
  return unit === 'fahrenheit' ? celsiusToFahrenheit(celsius) : celsius
}

export function temperatureUnitLabel(unit: TemperatureUnit): '°C' | '°F' {
  return unit === 'fahrenheit' ? '°F' : '°C'
}

export function formatTemperature(
  celsius: number | null | undefined,
  unit: TemperatureUnit,
  options?: { digits?: number; withUnit?: boolean },
): string {
  if (celsius === null || celsius === undefined || !Number.isFinite(celsius)) {
    return 'Unavailable'
  }

  const digits = options?.digits ?? 0
  const converted = convertTemperature(celsius, unit)
  const value = converted.toFixed(digits)
  if (options?.withUnit === false) {
    return value
  }
  return `${value}${temperatureUnitLabel(unit)}`
}
