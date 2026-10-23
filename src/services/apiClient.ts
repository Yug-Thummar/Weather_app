export type ApiErrorCode =
  | 'offline'
  | 'timeout'
  | 'aborted'
  | 'network'
  | 'http'
  | 'rate_limit'
  | 'parse'
  | 'invalid'

export class ApiError extends Error {
  readonly code: ApiErrorCode
  readonly status?: number

  constructor(message: string, code: ApiErrorCode, status?: number) {
    super(message)
    this.name = 'ApiError'
    this.code = code
    this.status = status
  }
}

type FetchJsonOptions = {
  signal?: AbortSignal
  timeoutMs?: number
}

function isAbortError(error: unknown): boolean {
  return (
    (error instanceof DOMException && error.name === 'AbortError') ||
    (error instanceof Error && error.name === 'AbortError')
  )
}

function readErrorReason(payload: unknown): string | null {
  if (
    payload &&
    typeof payload === 'object' &&
    'reason' in payload &&
    typeof payload.reason === 'string' &&
    payload.reason.trim().length > 0
  ) {
    return payload.reason
  }

  return null
}

export async function fetchJson<T>(
  url: string,
  options: FetchJsonOptions = {},
): Promise<T> {
  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    throw new ApiError(
      'You appear to be offline. Check your internet connection and try again.',
      'offline',
    )
  }

  const timeoutMs = options.timeoutMs ?? 15000
  const timeoutController = new AbortController()
  const timeoutId = window.setTimeout(() => {
    timeoutController.abort('timeout')
  }, timeoutMs)

  const onCallerAbort = () => {
    timeoutController.abort(options.signal?.reason)
  }
  options.signal?.addEventListener('abort', onCallerAbort)

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      signal: timeoutController.signal,
    })

    let payload: unknown
    try {
      payload = await response.json()
    } catch {
      if (!response.ok) {
        throw new ApiError(
          `The weather service returned HTTP ${response.status}. Please try again.`,
          response.status === 429 ? 'rate_limit' : 'http',
          response.status,
        )
      }

      throw new ApiError(
        'The weather service returned a response that could not be read.',
        'parse',
        response.status,
      )
    }

    if (!response.ok) {
      if (response.status === 429) {
        throw new ApiError(
          'Too many requests were sent to the weather service. Please wait a moment and try again.',
          'rate_limit',
          429,
        )
      }

      throw new ApiError(
        readErrorReason(payload) ??
          `The weather service returned HTTP ${response.status}. Please try again.`,
        'http',
        response.status,
      )
    }

    return payload as T
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }

    if (options.signal?.aborted) {
      throw new ApiError('The request was cancelled.', 'aborted')
    }

    if (isAbortError(error)) {
      throw new ApiError(
        'The weather service took too long to respond. Please try again.',
        'timeout',
      )
    }

    throw new ApiError(
      'Unable to reach the weather service. Please check your connection and try again.',
      'network',
    )
  } finally {
    window.clearTimeout(timeoutId)
    options.signal?.removeEventListener('abort', onCallerAbort)
  }
}

export function toUserErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    return error.message
  }

  if (error instanceof Error && error.message) {
    return error.message
  }

  return 'Something unexpected happened. Please try again.'
}
