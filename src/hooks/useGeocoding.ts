import { useEffect, useRef, useState } from 'react'
import { searchCities } from '@/services/geocoding'
import { ApiError, toUserErrorMessage } from '@/services/apiClient'
import type { GeoSearchResult } from '@/types/location'
import { useDebouncedValue } from '@/hooks/useDebouncedValue'

type SearchState = {
  query: string
  results: GeoSearchResult[]
  error: string | null
}

export function useGeocoding(query: string) {
  const debouncedQuery = useDebouncedValue(query, 400)
  const trimmed = debouncedQuery.trim()
  const requestIdRef = useRef(0)
  const [state, setState] = useState<SearchState>({
    query: '',
    results: [],
    error: null,
  })

  useEffect(() => {
    if (trimmed.length < 2) {
      return
    }

    const controller = new AbortController()
    const requestId = requestIdRef.current + 1
    requestIdRef.current = requestId

    void searchCities(trimmed, controller.signal)
      .then((nextResults) => {
        if (requestId !== requestIdRef.current) {
          return
        }

        setState({
          query: trimmed,
          results: nextResults,
          error: null,
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
          query: trimmed,
          results: [],
          error: toUserErrorMessage(caught),
        })
      })

    return () => {
      controller.abort()
    }
  }, [trimmed])

  const isShort = trimmed.length < 2
  const matchesCurrentQuery = state.query === trimmed

  return {
    results: isShort || !matchesCurrentQuery ? [] : state.results,
    isSearching: !isShort && !matchesCurrentQuery,
    error: isShort || !matchesCurrentQuery ? null : state.error,
    hasSearched: !isShort && matchesCurrentQuery,
  }
}
