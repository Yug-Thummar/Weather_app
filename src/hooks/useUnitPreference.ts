import { useCallback, useState } from 'react'
import type { TemperatureUnit } from '@/types/location'
import { readJsonStorage, writeJsonStorage } from '@/utils/storage'

const STORAGE_KEY = 'weather-dashboard:units'

function isTemperatureUnit(value: unknown): value is TemperatureUnit {
  return value === 'celsius' || value === 'fahrenheit'
}

export function useUnitPreference() {
  const [unit, setUnitState] = useState<TemperatureUnit>(() =>
    readJsonStorage<TemperatureUnit>(STORAGE_KEY, 'celsius', isTemperatureUnit),
  )

  const setUnit = useCallback((next: TemperatureUnit) => {
    setUnitState(next)
    writeJsonStorage(STORAGE_KEY, next)
  }, [])

  return { unit, setUnit }
}
