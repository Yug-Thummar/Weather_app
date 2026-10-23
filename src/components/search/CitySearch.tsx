import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'
import { LoaderCircle, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useGeocoding } from '@/hooks/useGeocoding'
import type { GeoSearchResult, SelectedLocation } from '@/types/location'
import { toSelectedLocation } from '@/utils/location'

type CitySearchProps = {
  onSelect: (location: SelectedLocation) => void
}

export function CitySearch({ onSelect }: CitySearchProps) {
  const inputId = useId()
  const listId = useId()
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const { results, isSearching, error, hasSearched } = useGeocoding(query)
  const containerRef = useRef<HTMLDivElement>(null)
  const open = focused && query.trim().length >= 2
  const safeIndex = results.length === 0 ? 0 : Math.min(activeIndex, results.length - 1)

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setFocused(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [])

  const selectResult = (result: GeoSearchResult) => {
    onSelect(toSelectedLocation(result))
    setQuery(`${result.name}${result.country ? `, ${result.country}` : ''}`)
    setFocused(false)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!open) {
      return
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex((index) => Math.min(index + 1, Math.max(results.length - 1, 0)))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((index) => Math.max(index - 1, 0))
    } else if (event.key === 'Enter') {
      event.preventDefault()
      const selected = results[safeIndex]
      if (selected) {
        selectResult(selected)
      }
    } else if (event.key === 'Escape') {
      setFocused(false)
    }
  }

  return (
    <div ref={containerRef} className="relative w-full">
      <label htmlFor={inputId} className="sr-only">
        Search for a city
      </label>
      <Search
        size={16}
        className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-slate-400"
        aria-hidden="true"
      />
      <Input
        id={inputId}
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={
          open && results[safeIndex] ? `${listId}-${results[safeIndex].id}` : undefined
        }
        value={query}
        placeholder="Search city, e.g. Paris, France"
        autoComplete="off"
        className="pl-10"
        onChange={(event) => {
          setQuery(event.target.value)
          setActiveIndex(0)
        }}
        onFocus={() => setFocused(true)}
        onKeyDown={handleKeyDown}
      />
      {open ? (
        <div
          id={listId}
          role="listbox"
          className="absolute z-30 mt-2 w-full overflow-hidden rounded-xl border border-white/10 bg-navy-900 shadow-2xl"
        >
          {isSearching ? (
            <p className="flex items-center gap-2 px-4 py-3 text-sm text-slate-300">
              <LoaderCircle size={16} className="animate-spin" aria-hidden="true" />
              Searching cities...
            </p>
          ) : null}
          {error ? <p className="px-4 py-3 text-sm text-red-200">{error}</p> : null}
          {!isSearching && !error && hasSearched && results.length === 0 ? (
            <p className="px-4 py-3 text-sm text-slate-300">
              No matching city was found. Try adding a country or region, such as
              Springfield, Illinois.
            </p>
          ) : null}
          {!isSearching
            ? results.map((result, index) => (
                <button
                  key={result.id}
                  id={`${listId}-${result.id}`}
                  type="button"
                  role="option"
                  aria-selected={index === safeIndex}
                  className={`block w-full px-4 py-3 text-left text-sm ${
                    index === safeIndex ? 'bg-white/10 text-white' : 'text-slate-200'
                  }`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => selectResult(result)}
                >
                  <span className="font-medium">{result.name}</span>
                  <span className="mt-0.5 block text-xs text-slate-400">
                    {[result.admin1, result.country].filter(Boolean).join(', ')}
                  </span>
                </button>
              ))
            : null}
        </div>
      ) : null}
    </div>
  )
}
