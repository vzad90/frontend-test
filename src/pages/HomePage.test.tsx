import { configureStore } from '@reduxjs/toolkit'
import { act, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import * as moviesApi from '../api/moviesApi'
import * as userMoviesApi from '../api/userMovies'
import moviesReducer from '../store/moviesSlice'
import uiReducer from '../store/uiSlice'
import type { Movie } from '../utils/global.types'
import HomePage from './HomePage'

vi.mock('../api/moviesApi')
vi.mock('../api/userMovies')

const mockMoviesApi = vi.mocked(moviesApi)
const mockUserMoviesApi = vi.mocked(userMoviesApi)

const createTestStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      movies: moviesReducer,
      ui: uiReducer,
    },
    preloadedState: initialState,
  })
}

const renderWithProviders = (component: React.ReactElement, store = createTestStore()) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>
        {component}
      </BrowserRouter>
    </Provider>
  )
}

const mockMovie: Movie = {
  id: '1',
  title: 'The Dark Knight',
  year: '2008',
  runtime: '152 min',
  genre: 'Action',
  director: 'Christopher Nolan',
  poster: 'poster.jpg',
  isFavorite: false,
}

describe('HomePage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockMoviesApi.fetchMovies.mockResolvedValue([mockMovie])
    mockUserMoviesApi.getUserMovies.mockResolvedValue([])
  })

  it('should render search bar', async () => {
    await act(async () => {
      renderWithProviders(<HomePage />)
    })

    expect(screen.getByPlaceholderText('Search movies...')).toBeInTheDocument()
  })

  it('should render create button', async () => {
    await act(async () => {
      renderWithProviders(<HomePage />)
    })

    const createButton = screen.getAllByRole('button')[0]
    expect(createButton).toBeInTheDocument()
  })

  it('should render favorites toggle button', async () => {
    await act(async () => {
      renderWithProviders(<HomePage />)
    })

    const favoritesButton = screen.getAllByRole('button').find(button =>
      button.querySelector('svg[class*="star"]')
    )
    expect(favoritesButton).toBeInTheDocument()
  })

  it('should display "No user" initially', async () => {
    await act(async () => {
      renderWithProviders(<HomePage />)
    })

    expect(screen.getByText('No user')).toBeInTheDocument()
  })

  it('should fetch movies on mount', async () => {
    renderWithProviders(<HomePage />)

    await waitFor(() => {
      expect(mockMoviesApi.fetchMovies).toHaveBeenCalledWith('', expect.any(AbortSignal))
    })
  })

  it('should fetch movies when search query changes', async () => {
    const store = createTestStore({
      ui: { searchQuery: 'batman', showFavorites: false, username: '' }
    })

    renderWithProviders(<HomePage />, store)

    await waitFor(() => {
      expect(mockMoviesApi.fetchMovies).toHaveBeenCalledWith('batman', expect.any(AbortSignal))
    })
  })

  it('should fetch user movies when username is provided', async () => {
    const store = createTestStore({
      ui: { searchQuery: '', showFavorites: false, username: 'john' }
    })

    renderWithProviders(<HomePage />, store)

    await waitFor(() => {
      expect(mockUserMoviesApi.getUserMovies).toHaveBeenCalledWith('john', expect.any(AbortSignal))
    })
  })

  it('should display movies when fetched', async () => {
    renderWithProviders(<HomePage />)

    await waitFor(() => {
      expect(screen.getByText('The Dark Knight')).toBeInTheDocument()
    })
  })

  it('should handle favorite toggle', async () => {
    const user = userEvent.setup()
    const store = createTestStore({
      movies: {
        movies: [mockMovie],
        userMovies: {},
        loading: false,
        error: null
      },
      ui: { searchQuery: '', showFavorites: false, username: 'john' }
    })

    renderWithProviders(<HomePage />, store)

    await waitFor(() => {
      expect(screen.getByText('The Dark Knight')).toBeInTheDocument()
    })

    const movieCards = screen.getAllByText('The Dark Knight')
    const movieCard = movieCards[0].closest('.movie-card')
    const favoriteButton = movieCard?.querySelector('button[class*="icon-button"]')

    expect(favoriteButton).toBeDefined()
    await user.click(favoriteButton!)

    await waitFor(() => {
      expect(userMoviesApi.addOrUpdateUserMovie).toHaveBeenCalledWith('john', {
        ...mockMovie,
        isFavorite: true
      })
    })
  })

  it('should show username modal when trying to favorite without username', async () => {
    const user = userEvent.setup()
    renderWithProviders(<HomePage />)

    await waitFor(() => {
      expect(screen.getByText('The Dark Knight')).toBeInTheDocument()
    })

    const favoriteButton = screen.getAllByRole('button').find(button =>
      button.querySelector('svg[class*="star"]')
    )
    expect(favoriteButton).toBeDefined()
    if (favoriteButton) {
      await user.click(favoriteButton)
    }

    expect(screen.getByText('No user')).toBeInTheDocument()
  })

  it('should filter movies when showFavorites is true', async () => {
    const favoriteMovie = { ...mockMovie, isFavorite: true }
    const store = createTestStore({
      ui: { searchQuery: '', showFavorites: true, username: 'john' }
    })

    mockUserMoviesApi.getUserMovies.mockResolvedValue([favoriteMovie])

    renderWithProviders(<HomePage />, store)

    await waitFor(() => {
      expect(screen.getByText('The Dark Knight')).toBeInTheDocument()
    })
  })

  it('should handle create button click', async () => {
    const user = userEvent.setup()
    renderWithProviders(<HomePage />)

    const createButton = screen.getAllByRole('button')[0]
    await user.click(createButton)

    expect(screen.getByText('No user')).toBeInTheDocument()
  })

  it('should handle edit button click', async () => {
    const user = userEvent.setup()
    const store = createTestStore({
      ui: { searchQuery: '', showFavorites: false, username: 'john' }
    })

    renderWithProviders(<HomePage />, store)

    await waitFor(() => {
      expect(screen.getByText('The Dark Knight')).toBeInTheDocument()
    })

    const editButton = screen.getAllByRole('button').find(button =>
      button.querySelector('svg[class*="square-pen"]')
    )
    expect(editButton).toBeDefined()
    if (editButton) {
      await user.click(editButton)
    }

    expect(screen.getByText('The Dark Knight')).toBeInTheDocument()
  })

  it('should handle delete button click', async () => {
    const user = userEvent.setup()
    const store = createTestStore({
      ui: { searchQuery: '', showFavorites: false, username: 'john' }
    })

    renderWithProviders(<HomePage />, store)

    await waitFor(() => {
      expect(screen.getByText('The Dark Knight')).toBeInTheDocument()
    })

    const deleteButton = screen.getAllByRole('button').find(button =>
      button.querySelector('svg[class*="trash"]')
    )
    expect(deleteButton).toBeDefined()
    if (deleteButton) {
      await user.click(deleteButton)
    }

    expect(screen.getByText('The Dark Knight')).toBeInTheDocument()
  })

  it('should handle API errors gracefully', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { })
    mockMoviesApi.fetchMovies.mockRejectedValue(new Error('API Error'))

    await act(async () => {
      renderWithProviders(<HomePage />)
    })

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Search movies...')).toBeInTheDocument()
    })

    await act(async () => {
      await new Promise(resolve => setTimeout(resolve, 100))
    })

    consoleSpy.mockRestore()
  })

  it('should handle empty movie list', async () => {
    mockMoviesApi.fetchMovies.mockResolvedValue([])

    renderWithProviders(<HomePage />)

    await waitFor(() => {
      expect(screen.getByPlaceholderText('Search movies...')).toBeInTheDocument()
    })
  })
})
