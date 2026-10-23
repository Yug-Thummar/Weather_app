import { useCallback, useEffect, useRef, useState } from 'react'
import { ApiError, toUserErrorMessage } from '@/services/apiClient'
import { fetchWeather } from '@/services/weather'
import type { SelectedLocation } from '@/types/location'
import type { NormalizedWeather } from '@/types/weather'

type WeatherState = {
  weather: NormalizedWeather | null
  isLoading: boolean
  isRefreshing: boolean
  error: string | null
  fromCache: boolean
}

export function useWeather(location: SelectedLocation) {
  const [state, setState] = useState<WeatherState>({
    weather: null,
    isLoading: true,
    isRefreshing: false,
    error: null,
    fromCache: false,
  })
  const requestIdRef = useRef(0)

  useEffect(() => {
    const requestId = requestIdRef.current + 1
    requestIdRef.current = requestId
    const controller = new AbortController()

    void fetchWeather(location, { signal: controller.signal })
      .then((result) => {
        if (requestId !== requestIdRef.current) {
          return
        }

        setState({
          weather: result.weather,
          isLoading: false,
          isRefreshing: false,
          error: null,
          fromCache: result.fromCache,
        })
      })
      .catch((caught) => {
        if (caught instanceof ApiError && caught.code === 'aborted') {
          return
        }

        if (requestId !== requestIdRef.current) {
          return
        }

        setState({
          weather: null,
          isLoading: false,
          isRefreshing: false,
          error: toUserErrorMessage(caught),
          fromCache: false,
        })
      })

    return () => {
      controller.abort()
    }
  }, [location])

  const refresh = useCallback(() => {
    const requestId = requestIdRef.current + 1
    requestIdRef.current = requestId

    setState((current) => ({
      ...current,
      isRefreshing: true,
      error: null,
    }))

    void fetchWeather(location, { forceRefresh: true })
      .then((result) => {
        if (requestId !== requestIdRef.current) {
          return
        }

        setState({
          weather: result.weather,
          isLoading: false,
          isRefreshing: false,
          error: null,
          fromCache: result.fromCache,
        })
      })
      .catch((caught) => {
        if (caught instanceof ApiError && caught.code === 'aborted') {
          return
        }

        if (requestId !== requestIdRef.current) {
          return
        }

        setState((current) => ({
          ...current,
          isRefreshing: false,
          error: toUserErrorMessage(caught),
        }))
      })
  }, [location])

  return {
    ...state,
    refresh,
  }
}
