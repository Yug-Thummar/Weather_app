export type GeoSearchResult = {
  id: number
  name: string
  latitude: number
  longitude: number
  elevation?: number
  timezone?: string
  countryCode?: string
  country?: string
  admin1?: string
  admin2?: string
  population?: number
}

export type SelectedLocation = {
  id: string
  name: string
  latitude: number
  longitude: number
  timezone?: string
  countryCode?: string
  country?: string
  admin1?: string
}

export type TemperatureUnit = 'celsius' | 'fahrenheit'
