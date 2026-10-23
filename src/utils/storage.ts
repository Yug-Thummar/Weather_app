export function readJsonStorage<T>(
  key: string,
  fallback: T,
  isValid: (value: unknown) => value is T,
): T {
  if (typeof window === 'undefined') {
    return fallback
  }

  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) {
      return fallback
    }

    const parsed: unknown = JSON.parse(raw)
    return isValid(parsed) ? parsed : fallback
  } catch {
    return fallback
  }
}

export function writeJsonStorage(key: string, value: unknown): void {
  if (typeof window === 'undefined') {
    return
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Ignore quota or privacy-mode failures so the app remains usable.
  }
}
