const DIRECTIONS = [
  'N',
  'NNE',
  'NE',
  'ENE',
  'E',
  'ESE',
  'SE',
  'SSE',
  'S',
  'SSW',
  'SW',
  'WSW',
  'W',
  'WNW',
  'NW',
  'NNW',
] as const

export function formatWindDirection(degrees: number | null | undefined): string {
  if (degrees === null || degrees === undefined || !Number.isFinite(degrees)) {
    return 'Unavailable'
  }

  const normalized = ((degrees % 360) + 360) % 360
  const index = Math.round(normalized / 22.5) % DIRECTIONS.length
  const label = DIRECTIONS[index] ?? 'N'
  return `${label} (${Math.round(normalized)}°)`
}

export function windCompassLabel(degrees: number | null | undefined): string {
  if (degrees === null || degrees === undefined || !Number.isFinite(degrees)) {
    return 'Unavailable'
  }

  const normalized = ((degrees % 360) + 360) % 360
  const index = Math.round(normalized / 22.5) % DIRECTIONS.length
  return DIRECTIONS[index] ?? 'N'
}
