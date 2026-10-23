export function formatPercent(value: number | null | undefined): string {
  if (value === null || value === undefined || !Number.isFinite(value)) {
    return 'Unavailable'
  }

  return `${Math.round(value)}%`
}

export function formatMillimeters(value: number | null | undefined): string {
  if (value === null || value === undefined || !Number.isFinite(value)) {
    return 'Unavailable'
  }

  return `${value.toFixed(value >= 10 ? 0 : 1)} mm`
}

export function formatWindSpeed(kmh: number | null | undefined): string {
  if (kmh === null || kmh === undefined || !Number.isFinite(kmh)) {
    return 'Unavailable'
  }

  return `${Math.round(kmh)} km/h`
}

export function formatVisibility(meters: number | null | undefined): string {
  if (meters === null || meters === undefined || !Number.isFinite(meters)) {
    return 'Unavailable'
  }

  if (meters >= 1000) {
    return `${(meters / 1000).toFixed(1)} km`
  }

  return `${Math.round(meters)} m`
}

export function formatUvIndex(value: number | null | undefined): string {
  if (value === null || value === undefined || !Number.isFinite(value)) {
    return 'Unavailable'
  }

  return value.toFixed(1)
}

export function describeUvIndex(value: number | null | undefined): string | null {
  if (value === null || value === undefined || !Number.isFinite(value)) {
    return null
  }

  if (value < 3) return 'Low'
  if (value < 6) return 'Moderate'
  if (value < 8) return 'High'
  if (value < 11) return 'Very high'
  return 'Extreme'
}

export function formatCoordinate(value: number, digits = 4): string {
  return value.toFixed(digits)
}
