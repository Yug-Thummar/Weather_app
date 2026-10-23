import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  CloudSun,
  HelpCircle,
  Moon,
  Sun,
} from 'lucide-react'
import type { WeatherIconName } from '@/types/weather'
import { cn } from '@/lib/utils'

type WeatherIconProps = {
  name: WeatherIconName
  isDay?: boolean | null
  className?: string
  size?: number
}

export function WeatherIcon({
  name,
  isDay = true,
  className,
  size = 28,
}: WeatherIconProps) {
  const iconClass = cn('shrink-0 text-sky-200', className)
  const day = isDay !== false

  switch (name) {
    case 'clear':
      return day ? (
        <Sun size={size} className={cn(iconClass, 'text-amber-300')} aria-hidden="true" />
      ) : (
        <Moon size={size} className={cn(iconClass, 'text-indigo-200')} aria-hidden="true" />
      )
    case 'mainly-clear':
    case 'partly-cloudy':
      return day ? (
        <CloudSun size={size} className={iconClass} aria-hidden="true" />
      ) : (
        <Cloud size={size} className={iconClass} aria-hidden="true" />
      )
    case 'overcast':
      return <Cloud size={size} className={iconClass} aria-hidden="true" />
    case 'fog':
      return <CloudFog size={size} className={iconClass} aria-hidden="true" />
    case 'drizzle':
      return <CloudDrizzle size={size} className={iconClass} aria-hidden="true" />
    case 'rain':
      return <CloudRain size={size} className={iconClass} aria-hidden="true" />
    case 'snow':
      return <CloudSnow size={size} className={cn(iconClass, 'text-slate-100')} aria-hidden="true" />
    case 'showers':
      return <CloudRain size={size} className={iconClass} aria-hidden="true" />
    case 'thunderstorm':
      return <CloudLightning size={size} className={cn(iconClass, 'text-violet-200')} aria-hidden="true" />
    default:
      return <HelpCircle size={size} className={cn(iconClass, 'text-slate-400')} aria-hidden="true" />
  }
}
