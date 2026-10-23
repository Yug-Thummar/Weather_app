import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { CitySearch } from '@/components/search/CitySearch'
import { searchCities } from '@/services/geocoding'

vi.mock('@/services/geocoding', () => ({
  searchCities: vi.fn(),
}))

describe('search result selection', () => {
  it('lets the user choose a geocoding result before weather is requested', async () => {
    vi.mocked(searchCities).mockResolvedValue([
      {
        id: 2950159,
        name: 'Berlin',
        latitude: 52.52,
        longitude: 13.41,
        country: 'Germany',
        admin1: 'Berlin',
      },
    ])

    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(<CitySearch onSelect={onSelect} />)

    await user.type(screen.getByLabelText('Search for a city'), 'Berlin')
    expect(onSelect).not.toHaveBeenCalled()

    const option = await screen.findByRole('option', { name: /Berlin/ })
    await user.click(option)

    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Berlin',
        latitude: 52.52,
        longitude: 13.41,
        country: 'Germany',
      }),
    )
  })
})
