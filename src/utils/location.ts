import type { GeoSearchResult, SelectedLocation } from '@/types/location'

const MAX_NAME_LENGTH = 80

export function createLocationId(latitude: number, longitude: number): string {
  return `${latitude.toFixed(4)},${longitude.toFixed(4)}`
}

export function toSelectedLocation(result: GeoSearchResult): SelectedLocation {
  return {
    id: String(result.id),
    name: result.name,
    latitude: result.latitude,
    longitude: result.longitude,
    timezone: result.timezone,
    countryCode: result.countryCode,
    country: result.country,
    admin1: result.admin1,
  }
}

export function formatLocationSubtitle(location: SelectedLocation): string {
  return [location.admin1, location.country].filter(Boolean).join(', ')
}

export function formatLocationTitle(location: SelectedLocation): string {
  return location.name
}

export function isSameLocation(
  a: SelectedLocation | null | undefined,
  b: SelectedLocation | null | undefined,
): boolean {
  if (!a || !b) {
    return false
  }

  return (
    Math.abs(a.latitude - b.latitude) < 0.0001 &&
    Math.abs(a.longitude - b.longitude) < 0.0001
  )
}

export function sanitizeLocationName(value: string): string {
  return value.replace(/[<>]/g, '').trim().slice(0, MAX_NAME_LENGTH)
}

export function isValidLatitude(value: number): boolean {
  return Number.isFinite(value) && value >= -90 && value <= 90
}

export function isValidLongitude(value: number): boolean {
  return Number.isFinite(value) && value >= -180 && value <= 180
}

export function parseCoordinate(value: string | null): number | null {
  if (!value) {
    return null
  }

  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}
