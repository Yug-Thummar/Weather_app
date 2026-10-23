import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { ErrorBanner } from '@/components/states/ErrorBanner'
import { WeatherSkeleton } from '@/components/states/WeatherSkeleton'

describe('loading and error states', () => {
  it('renders a user-facing error message and retry action', async () => {
    const user = userEvent.setup()
    const onRetry = vi.fn()

    render(
      <ErrorBanner
        title="Weather data could not be loaded"
        message="Unable to reach the weather service."
        onRetry={onRetry}
      />,
    )

    expect(screen.getByRole('alert')).toHaveTextContent('Unable to reach the weather service.')
    await user.click(screen.getByRole('button', { name: 'Try again' }))
    expect(onRetry).toHaveBeenCalledOnce()
  })

  it('exposes a loading message for assistive technologies', () => {
    render(<WeatherSkeleton />)
    expect(screen.getByText('Loading weather data')).toBeInTheDocument()
  })
})
