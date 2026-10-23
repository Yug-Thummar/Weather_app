import { useEffect, useState } from 'react'
import { formatZonedDateTime } from '@/utils/dateTime'

export function useZonedClock(timeZone: string | null | undefined): string | null {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setNow(new Date())
    }, 30000)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [timeZone])

  return formatZonedDateTime(timeZone, now)
}
