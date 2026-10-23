import { format, isValid, parseISO } from 'date-fns'

export function parseApiDateTime(value: string | null | undefined): Date | null {
  if (!value) {
    return null
  }

  const parsed = parseISO(value)
  return isValid(parsed) ? parsed : null
}

export function formatHourLabel(isoLocal: string | null | undefined): string {
  if (!isoLocal) {
    return 'Unavailable'
  }

  const timePart = isoLocal.split('T')[1]
  if (!timePart) {
    const parsed = parseApiDateTime(isoLocal)
    return parsed ? format(parsed, 'HH:mm') : 'Unavailable'
  }

  const [hour = '00', minute = '00'] = timePart.split(':')
  return `${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`
}

export function formatDayLabel(dateValue: string | null | undefined): string {
  const parsed = parseApiDateTime(dateValue)
  if (!parsed) {
    return 'Unavailable'
  }

  return format(parsed, 'EEE d MMM')
}

export function formatClockTime(isoLocal: string | null | undefined): string {
  const parsed = parseApiDateTime(isoLocal)
  if (!parsed) {
    return 'Unavailable'
  }

  return format(parsed, 'HH:mm')
}

export function formatUpdatedAt(isoUtc: string | null | undefined): string {
  const parsed = parseApiDateTime(isoUtc)
  if (!parsed) {
    return 'Not yet updated'
  }

  return format(parsed, "d MMM yyyy, HH:mm")
}

export function formatZonedDateTime(
  timeZone: string | null | undefined,
  date: Date = new Date(),
): string | null {
  if (!timeZone) {
    return null
  }

  try {
    return new Intl.DateTimeFormat(undefined, {
      timeZone,
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      hour: 'numeric',
      minute: '2-digit',
    }).format(date)
  } catch {
    return null
  }
}

export function getUpcomingHourlyItems<T extends { time: string }>(
  items: T[],
  currentTime: string | null,
  count = 24,
): T[] {
  if (items.length === 0) {
    return []
  }

  if (!currentTime) {
    return items.slice(0, count)
  }

  const startIndex = items.findIndex((item) => item.time >= currentTime)
  if (startIndex === -1) {
    return items.slice(-count)
  }

  return items.slice(startIndex, startIndex + count)
}
