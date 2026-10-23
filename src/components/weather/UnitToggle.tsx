import type { TemperatureUnit } from '@/types/location'
import { cn } from '@/lib/utils'

type UnitToggleProps = {
  unit: TemperatureUnit
  onChange: (unit: TemperatureUnit) => void
}

export function UnitToggle({ unit, onChange }: UnitToggleProps) {
  return (
    <div
      className="inline-flex rounded-xl border border-white/10 bg-white/5 p-1"
      role="group"
      aria-label="Temperature unit"
    >
      <button
        type="button"
        aria-pressed={unit === 'celsius'}
        className={cn(
          'rounded-lg px-3 py-1.5 text-sm font-medium',
          unit === 'celsius' ? 'bg-sky-400 text-navy-950' : 'text-slate-300 hover:text-white',
        )}
        onClick={() => onChange('celsius')}
      >
        °C
      </button>
      <button
        type="button"
        aria-pressed={unit === 'fahrenheit'}
        className={cn(
          'rounded-lg px-3 py-1.5 text-sm font-medium',
          unit === 'fahrenheit' ? 'bg-sky-400 text-navy-950' : 'text-slate-300 hover:text-white',
        )}
        onClick={() => onChange('fahrenheit')}
      >
        °F
      </button>
    </div>
  )
}
