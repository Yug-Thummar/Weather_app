import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import { useFavorites } from '@/hooks/useFavorites'
import { berlin } from '@/test/fixtures'

function FavoritesProbe() {
  const { favorites, addFavorite, removeFavorite, isFavorite } = useFavorites()

  return (
    <div>
      <p>Count: {favorites.length}</p>
      <p>{isFavorite(berlin) ? 'Berlin saved' : 'Berlin not saved'}</p>
      <button type="button" onClick={() => addFavorite(berlin)}>
        Save
      </button>
      <button type="button" onClick={() => removeFavorite(berlin)}>
        Remove
      </button>
    </div>
  )
}

describe('favorite persistence', () => {
  beforeEach(() => {
    window.localStorage.clear()
  })

  it('persists favorites in localStorage and prevents duplicates', async () => {
    const user = userEvent.setup()
    const { unmount } = render(<FavoritesProbe />)

    await user.click(screen.getByRole('button', { name: 'Save' }))
    await user.click(screen.getByRole('button', { name: 'Save' }))
    expect(screen.getByText('Count: 1')).toBeInTheDocument()
    expect(screen.getByText('Berlin saved')).toBeInTheDocument()

    unmount()
    render(<FavoritesProbe />)

    expect(screen.getByText('Count: 1')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Remove' }))
    expect(screen.getByText('Berlin not saved')).toBeInTheDocument()
  })
})
