import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, expect, it } from 'vitest'
import { FavoriteList } from '@/components/favorites/FavoriteList'
import { berlin } from '@/test/fixtures'
import type { SelectedLocation } from '@/types/location'
import { isSameLocation } from '@/utils/location'

function FavoriteHarness({ initial }: { initial: SelectedLocation[] }) {
  const [favorites, setFavorites] = useState(initial)
  const [selected, setSelected] = useState<SelectedLocation | null>(null)

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          if (!favorites.some((item) => isSameLocation(item, berlin))) {
            setFavorites([...favorites, berlin])
          }
        }}
      >
        Add Berlin
      </button>
      <FavoriteList
        favorites={favorites}
        selected={selected}
        onSelect={setSelected}
        onRemove={(location) =>
          setFavorites((current) =>
            current.filter((item) => !isSameLocation(item, location)),
          )
        }
      />
      <p>Selected: {selected?.name ?? 'none'}</p>
    </div>
  )
}

describe('favorite add and remove behavior', () => {
  it('shows an empty state when there are no favorites', () => {
    render(
      <FavoriteList
        favorites={[]}
        selected={null}
        onSelect={() => undefined}
        onRemove={() => undefined}
      />,
    )

    expect(screen.getByText(/No saved cities yet/i)).toBeInTheDocument()
  })

  it('adds a city once and can remove it', async () => {
    const user = userEvent.setup()
    render(<FavoriteHarness initial={[]} />)

    await user.click(screen.getByRole('button', { name: 'Add Berlin' }))
    await user.click(screen.getByRole('button', { name: 'Add Berlin' }))
    expect(screen.getAllByText('Berlin')).toHaveLength(1)

    await user.click(screen.getByRole('button', { name: /Load weather for Berlin/ }))
    expect(screen.getByText('Selected: Berlin')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /Remove Berlin/ }))
    expect(screen.getByText(/No saved cities yet/i)).toBeInTheDocument()
  })
})
