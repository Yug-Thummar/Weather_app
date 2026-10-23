import { useCallback, useMemo, useState } from 'react'
import type { SelectedLocation } from '@/types/location'
import { isSameLocation } from '@/utils/location'
import { readJsonStorage, writeJsonStorage } from '@/utils/storage'

const STORAGE_KEY = 'weather-dashboard:favorites'

function isSelectedLocation(value: unknown): value is SelectedLocation {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  const candidate = value as SelectedLocation
  return (
    typeof candidate.id === 'string' &&
    typeof candidate.name === 'string' &&
    Number.isFinite(candidate.latitude) &&
    Number.isFinite(candidate.longitude)
  )
}

function isFavoriteList(value: unknown): value is SelectedLocation[] {
  return Array.isArray(value) && value.every(isSelectedLocation)
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<SelectedLocation[]>(() =>
    readJsonStorage<SelectedLocation[]>(STORAGE_KEY, [], isFavoriteList),
  )

  const persist = useCallback((next: SelectedLocation[]) => {
    setFavorites(next)
    writeJsonStorage(STORAGE_KEY, next)
  }, [])

  const isFavorite = useCallback(
    (location: SelectedLocation | null) =>
      Boolean(location && favorites.some((item) => isSameLocation(item, location))),
    [favorites],
  )

  const addFavorite = useCallback(
    (location: SelectedLocation) => {
      if (favorites.some((item) => isSameLocation(item, location))) {
        return
      }

      persist([...favorites, location])
    },
    [favorites, persist],
  )

  const removeFavorite = useCallback(
    (location: SelectedLocation) => {
      persist(favorites.filter((item) => !isSameLocation(item, location)))
    },
    [favorites, persist],
  )

  const toggleFavorite = useCallback(
    (location: SelectedLocation) => {
      if (isFavorite(location)) {
        removeFavorite(location)
        return
      }

      addFavorite(location)
    },
    [addFavorite, isFavorite, removeFavorite],
  )

  return useMemo(
    () => ({
      favorites,
      isFavorite,
      addFavorite,
      removeFavorite,
      toggleFavorite,
    }),
    [addFavorite, favorites, isFavorite, removeFavorite, toggleFavorite],
  )
}
