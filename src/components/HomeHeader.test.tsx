import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import HomeHeader from './HomeHeader'

describe('HomeHeader', () => {
  const mockSetQuery = vi.fn()
  const mockOnToggleFavorites = vi.fn()
  const mockOnCreate = vi.fn()
  const mockOnChangeUser = vi.fn()

  const defaultProps = {
    query: '',
    setQuery: mockSetQuery,
    showFavorites: false,
    onToggleFavorites: mockOnToggleFavorites,
    onCreate: mockOnCreate,
    username: '',
    onChangeUser: mockOnChangeUser,
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render search bar', () => {
    render(<HomeHeader {...defaultProps} />)

    expect(screen.getByPlaceholderText('Search movies...')).toBeInTheDocument()
  })

  it('should render create button', () => {
    render(<HomeHeader {...defaultProps} />)

    const createButton = screen.getAllByRole('button')[0]
    expect(createButton).toBeInTheDocument()
  })

  it('should render favorites toggle button', () => {
    render(<HomeHeader {...defaultProps} />)

    const favoritesButton = screen.getAllByRole('button').find(button =>
      button.querySelector('svg[class*="star"]')
    )
    expect(favoritesButton).toBeInTheDocument()
  })

  it('should render user change button', () => {
    render(<HomeHeader {...defaultProps} />)

    const userButton = screen.getByRole('button', { name: /set user/i })
    expect(userButton).toBeInTheDocument()
  })

  it('should display "No user" when username is empty', () => {
    render(<HomeHeader {...defaultProps} />)

    expect(screen.getByText('No user')).toBeInTheDocument()
  })

  it('should display username when provided', () => {
    render(<HomeHeader {...defaultProps} username="john" />)

    expect(screen.getByText((content, element) => {
      return element?.textContent === 'User: john'
    })).toBeInTheDocument()
  })

  it('should display "Change user" when username is provided', () => {
    render(<HomeHeader {...defaultProps} username="john" />)

    expect(screen.getByText('Change user')).toBeInTheDocument()
  })

  it('should call onCreate when create button is clicked', async () => {
    const user = userEvent.setup()
    render(<HomeHeader {...defaultProps} />)

    const createButton = screen.getAllByRole('button')[0]
    await user.click(createButton)

    expect(mockOnCreate).toHaveBeenCalledTimes(1)
  })

  it('should call onToggleFavorites when favorites button is clicked', async () => {
    const user = userEvent.setup()
    render(<HomeHeader {...defaultProps} />)

    const favoritesButton = screen.getAllByRole('button').find(button =>
      button.querySelector('svg[class*="star"]')
    ) as Element
    await user.click(favoritesButton)

    expect(mockOnToggleFavorites).toHaveBeenCalledTimes(1)
  })

  it('should call onChangeUser when user button is clicked', async () => {
    const user = userEvent.setup()
    render(<HomeHeader {...defaultProps} />)

    const userButton = screen.getByRole('button', { name: /set user/i })
    await user.click(userButton)

    expect(mockOnChangeUser).toHaveBeenCalledTimes(1)
  })

  it('should pass query to SearchBar', () => {
    render(<HomeHeader {...defaultProps} query="batman" />)

    const searchInput = screen.getByDisplayValue('batman')
    expect(searchInput).toBeInTheDocument()
  })

  it('should pass setQuery to SearchBar', async () => {
    const user = userEvent.setup()
    render(<HomeHeader {...defaultProps} />)

    const searchInput = screen.getByPlaceholderText('Search movies...')
    await user.type(searchInput, 'test')

    expect(mockSetQuery).toHaveBeenCalledWith('t')
    expect(mockSetQuery).toHaveBeenCalledWith('e')
    expect(mockSetQuery).toHaveBeenCalledWith('s')
    expect(mockSetQuery).toHaveBeenCalledWith('t')
  })

  it('should show favorites button as active when showFavorites is true', () => {
    render(<HomeHeader {...defaultProps} showFavorites={true} />)

    const favoritesButton = screen.getAllByRole('button').find(button =>
      button.querySelector('svg[class*="star"]')
    )
    expect(favoritesButton).toHaveClass('favorite-button')
  })

  it('should show favorites button as inactive when showFavorites is false', () => {
    render(<HomeHeader {...defaultProps} showFavorites={false} />)

    const favoritesButton = screen.getAllByRole('button').find(button =>
      button.querySelector('svg[class*="star"]')
    )
    expect(favoritesButton).toHaveClass('favorite-button-inactive')
  })

  it('should handle all props correctly together', () => {
    const props = {
      ...defaultProps,
      query: 'inception',
      showFavorites: true,
      username: 'jane',
    }

    render(<HomeHeader {...props} />)

    expect(screen.getByDisplayValue('inception')).toBeInTheDocument()
    expect(screen.getByText((content, element) => {
      return element?.textContent === 'User: jane'
    })).toBeInTheDocument()
    expect(screen.getByText('Change user')).toBeInTheDocument()

    const favoritesButton = screen.getAllByRole('button').find(button =>
      button.querySelector('svg[class*="star"]')
    )
    expect(favoritesButton).toHaveClass('favorite-button')
  })

  it('should handle empty query', () => {
    render(<HomeHeader {...defaultProps} query="" />)

    const searchInput = screen.getByPlaceholderText('Search movies...')
    expect(searchInput).toHaveValue('')
  })

  it('should handle special characters in username', () => {
    render(<HomeHeader {...defaultProps} username="user@example.com" />)

    expect(screen.getByText((content, element) => {
      return element?.textContent === 'User: user@example.com'
    })).toBeInTheDocument()
  })
})
