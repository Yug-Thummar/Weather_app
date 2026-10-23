import { useCallback, useState } from 'react'
import { ApiError } from '@/services/apiClient'
import { reverseGeocode } from '@/services/geocoding'
import type { SelectedLocation } from '@/types/location'
import { createLocationId, toSelectedLocation } from '@/utils/location'

type GeolocationState = {
  isLocating: boolean
  error: string | null
}

export function useGeolocation(onLocated: (location: SelectedLocation) => void) {
  const [state, setState] = useState<GeolocationState>({
    isLocating: false,
    error: null,
  })

  const requestLocation = useCallback(() => {
    if (!('geolocation' in navigator)) {
      setState({
        isLocating: false,
        error:
          'This browser does not support location services. Please search for a city instead.',
      })
      return
    }

    setState({ isLocating: true, error: null })

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        void reverseGeocode(latitude, longitude)
          .then((result) => {
            onLocated(
              result
                ? toSelectedLocation(result)
                : {
                    id: createLocationId(latitude, longitude),
                    name: 'Current location',
                    latitude,
                    longitude,
                  },
            )
            setState({ isLocating: false, error: null })
          })
          .catch((caught) => {
            if (caught instanceof ApiError && caught.code === 'aborted') {
              return
            }

            onLocated({
              id: createLocationId(latitude, longitude),
              name: 'Current location',
              latitude,
              longitude,
            })
            setState({ isLocating: false, error: null })
          })
      },
      (error) => {
        const message =
          error.code === error.PERMISSION_DENIED
            ? 'Location permission was denied. You can still search for a city by name.'
            : error.code === error.TIMEOUT
              ? 'Finding your location took too long. Please try again or search for a city.'
              : 'Your location is currently unavailable. Please search for a city instead.'

        setState({
          isLocating: false,
          error: message,
        })
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 0,
      },
    )
  }, [onLocated])

  return {
    isLocating: state.isLocating,
    error: state.error,
    requestLocation,
  }
}
