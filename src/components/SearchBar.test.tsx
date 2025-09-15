import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import SearchBar from './SearchBar'

describe('SearchBar', () => {
  const mockSetQuery = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render search input with placeholder', () => {
    render(<SearchBar query="" setQuery={mockSetQuery} />)

    const input = screen.getByPlaceholderText('Search movies...')
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('type', 'text')
  })

  it('should display search icon', () => {
    render(<SearchBar query="" setQuery={mockSetQuery} />)

    const searchIcon = screen.getByLabelText('Search movies')
    expect(searchIcon).toBeInTheDocument()
  })

  it('should call setQuery when user types', async () => {
    const user = userEvent.setup()
    render(<SearchBar query="" setQuery={mockSetQuery} />)

    const input = screen.getByPlaceholderText('Search movies...')
    await user.type(input, 'batman')

    expect(mockSetQuery).toHaveBeenCalledTimes(6)
    expect(mockSetQuery).toHaveBeenNthCalledWith(1, 'b')
    expect(mockSetQuery).toHaveBeenNthCalledWith(2, 'a')
    expect(mockSetQuery).toHaveBeenNthCalledWith(3, 't')
    expect(mockSetQuery).toHaveBeenNthCalledWith(4, 'm')
    expect(mockSetQuery).toHaveBeenNthCalledWith(5, 'a')
    expect(mockSetQuery).toHaveBeenNthCalledWith(6, 'n')
  })

  it('should display clear button when query is not empty', () => {
    render(<SearchBar query="batman" setQuery={mockSetQuery} />)

    const clearButton = screen.getByLabelText('Clear search')
    expect(clearButton).toBeInTheDocument()
  })

  it('should not display clear button when query is empty', () => {
    render(<SearchBar query="" setQuery={mockSetQuery} />)

    const clearButton = screen.queryByLabelText('Clear search')
    expect(clearButton).not.toBeInTheDocument()
  })

  it('should clear query when clear button is clicked', async () => {
    const user = userEvent.setup()
    render(<SearchBar query="batman" setQuery={mockSetQuery} />)

    const clearButton = screen.getByLabelText('Clear search')
    await user.click(clearButton)

    expect(mockSetQuery).toHaveBeenCalledWith('')
  })

  it('should display current query value', () => {
    render(<SearchBar query="inception" setQuery={mockSetQuery} />)

    const input = screen.getByDisplayValue('inception')
    expect(input).toBeInTheDocument()
  })

  it('should have correct accessibility attributes', () => {
    render(<SearchBar query="" setQuery={mockSetQuery} />)

    const input = screen.getByLabelText('Search movies')
    expect(input).toHaveAttribute('aria-label', 'Search movies')

    const searchIcon = screen.getByLabelText('Search movies')
    expect(searchIcon).toBeInTheDocument()
  })

  it('should handle empty string query', () => {
    render(<SearchBar query="" setQuery={mockSetQuery} />)

    const input = screen.getByPlaceholderText('Search movies...')
    expect(input).toHaveValue('')
  })

  it('should handle special characters in query', async () => {
    const user = userEvent.setup()
    render(<SearchBar query="" setQuery={mockSetQuery} />)

    const input = screen.getByPlaceholderText('Search movies...')
    await user.type(input, 'spider-man!')

    expect(mockSetQuery).toHaveBeenCalledTimes(11)
    expect(mockSetQuery).toHaveBeenNthCalledWith(1, 's')
    expect(mockSetQuery).toHaveBeenNthCalledWith(2, 'p')
    expect(mockSetQuery).toHaveBeenNthCalledWith(3, 'i')
    expect(mockSetQuery).toHaveBeenNthCalledWith(4, 'd')
    expect(mockSetQuery).toHaveBeenNthCalledWith(5, 'e')
    expect(mockSetQuery).toHaveBeenNthCalledWith(6, 'r')
    expect(mockSetQuery).toHaveBeenNthCalledWith(7, '-')
    expect(mockSetQuery).toHaveBeenNthCalledWith(8, 'm')
    expect(mockSetQuery).toHaveBeenNthCalledWith(9, 'a')
    expect(mockSetQuery).toHaveBeenNthCalledWith(10, 'n')
    expect(mockSetQuery).toHaveBeenNthCalledWith(11, '!')
  })
})
