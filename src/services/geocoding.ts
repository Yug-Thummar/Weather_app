import { ApiError, fetchJson } from '@/services/apiClient'
import type { GeoSearchResult } from '@/types/location'
import type {
  OpenMeteoGeocodingResponse,
  OpenMeteoGeocodingResult,
} from '@/types/weather'
import { isValidLatitude, isValidLongitude } from '@/utils/location'

const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search'
const REVERSE_GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/reverse'

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function asFiniteNumber(value: unknown): number | undefined {
  return typeof value === 'number' && Number.isFinite(value) ? value : undefined
}

function asString(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim().length > 0
    ? value.trim()
    : undefined
}

function normalizeGeocodingResult(
  result: OpenMeteoGeocodingResult,
): GeoSearchResult | null {
  const id = asFiniteNumber(result.id)
  const name = asString(result.name)
  const latitude = asFiniteNumber(result.latitude)
  const longitude = asFiniteNumber(result.longitude)

  if (
    id === undefined ||
    !name ||
    latitude === undefined ||
    longitude === undefined ||
    !isValidLatitude(latitude) ||
    !isValidLongitude(longitude)
  ) {
    return null
  }

  return {
    id,
    name,
    latitude,
    longitude,
    elevation: asFiniteNumber(result.elevation),
    timezone: asString(result.timezone),
    countryCode: asString(result.country_code),
    country: asString(result.country),
    admin1: asString(result.admin1),
    admin2: asString(result.admin2),
    population: asFiniteNumber(result.population),
  }
}

function parseGeocodingResponse(payload: unknown): GeoSearchResult[] {
  if (!isRecord(payload)) {
    throw new ApiError(
      'The location search returned an unexpected response.',
      'invalid',
    )
  }

  if (payload.error === true) {
    throw new ApiError(
      asString(payload.reason) ??
        'The location search could not be completed. Please try again.',
      'invalid',
    )
  }

  const results = Array.isArray(payload.results)
    ? (payload.results as OpenMeteoGeocodingResult[])
    : []

  return results
    .map((result) => normalizeGeocodingResult(result))
    .filter((result): result is GeoSearchResult => result !== null)
}

export async function searchCities(
  query: string,
  signal?: AbortSignal,
): Promise<GeoSearchResult[]> {
  const trimmed = query.trim()
  if (trimmed.length < 2) {
    return []
  }

  const params = new URLSearchParams({
    name: trimmed,
    count: '8',
    language: 'en',
    format: 'json',
  })

  const payload = await fetchJson<OpenMeteoGeocodingResponse>(
    `${GEOCODING_URL}?${params.toString()}`,
    { signal },
  )

  return parseGeocodingResponse(payload)
}

export async function reverseGeocode(
  latitude: number,
  longitude: number,
  signal?: AbortSignal,
): Promise<GeoSearchResult | null> {
  if (!isValidLatitude(latitude) || !isValidLongitude(longitude)) {
    throw new ApiError(
      'The provided coordinates are outside the valid range.',
      'invalid',
    )
  }

  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    language: 'en',
    format: 'json',
  })

  try {
    const payload = await fetchJson<OpenMeteoGeocodingResponse>(
      `${REVERSE_GEOCODING_URL}?${params.toString()}`,
      { signal },
    )
    const results = parseGeocodingResponse(payload)
    return results[0] ?? null
  } catch (error) {
    if (error instanceof ApiError && error.code === 'aborted') {
      throw error
    }

    return null
  }
}
