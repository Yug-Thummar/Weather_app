import { useCallback, useMemo } from 'react'
import type { SelectedLocation } from '@/types/location'
import {
  isValidLatitude,
  isValidLongitude,
  parseCoordinate,
  sanitizeLocationName,
} from '@/utils/location'

function readLocationFromUrl(): SelectedLocation | null {
  if (typeof window === 'undefined') {
    return null
  }

  const params = new URLSearchParams(window.location.search)
  const latitude = parseCoordinate(params.get('lat'))
  const longitude = parseCoordinate(params.get('lon'))
  const name = sanitizeLocationName(params.get('name') ?? '')

  if (
    latitude === null ||
    longitude === null ||
    !isValidLatitude(latitude) ||
    !isValidLongitude(longitude) ||
    !name
  ) {
    return null
  }

  return {
    id: params.get('id')?.trim() || `${latitude.toFixed(4)},${longitude.toFixed(4)}`,
    name,
    latitude,
    longitude,
    admin1: sanitizeLocationName(params.get('admin1') ?? '') || undefined,
    country: sanitizeLocationName(params.get('country') ?? '') || undefined,
  }
}

export function useUrlLocation() {
  const initialLocation = useMemo(() => readLocationFromUrl(), [])

  const syncLocationToUrl = useCallback((location: SelectedLocation | null) => {
    const url = new URL(window.location.href)

    if (!location) {
      url.search = ''
      window.history.replaceState({}, '', url)
      return
    }

    const params = new URLSearchParams({
      lat: location.latitude.toFixed(4),
      lon: location.longitude.toFixed(4),
      name: location.name,
    })

    if (location.admin1) {
      params.set('admin1', location.admin1)
    }
    if (location.country) {
      params.set('country', location.country)
    }

    url.search = params.toString()
    window.history.replaceState({}, '', url)
  }, [])

  return { initialLocation, syncLocationToUrl }
}
