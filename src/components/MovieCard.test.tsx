import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { Movie } from '../utils/global.types'
import MovieCard from './MovieCard'

const mockMovie: Movie = {
  id: '1',
  title: 'the dark knight',
  year: '2008',
  runtime: '152 min',
  genre: 'Action',
  director: 'Christopher Nolan',
  poster: 'poster.jpg',
  isFavorite: false,
}

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  )
}

describe('MovieCard', () => {
  const mockOnToggleFavorite = vi.fn()
  const mockOnEdit = vi.fn()
  const mockOnDelete = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render movie information correctly', () => {
    renderWithRouter(
      <MovieCard
        movie={mockMovie}
        onToggleFavorite={mockOnToggleFavorite}
      />
    )

    expect(screen.getByText('The Dark Knight')).toBeInTheDocument()
    expect(screen.getByText('2008 • Action')).toBeInTheDocument()
    expect(screen.getByText('Christopher Nolan')).toBeInTheDocument()
    expect(screen.getByText('152 min')).toBeInTheDocument()
  })

  it('should format title correctly', () => {
    const movieWithSpecialTitle: Movie = {
      ...mockMovie,
      title: 'spider-man: no way home'
    }

    renderWithRouter(
      <MovieCard
        movie={movieWithSpecialTitle}
        onToggleFavorite={mockOnToggleFavorite}
      />
    )

    expect(screen.getByText('Spider Man No Way Home')).toBeInTheDocument()
  })

  it('should render favorite button', () => {
    renderWithRouter(
      <MovieCard
        movie={mockMovie}
        onToggleFavorite={mockOnToggleFavorite}
      />
    )

    const favoriteButton = screen.getAllByRole('button')[0]
    expect(favoriteButton).toBeInTheDocument()
  })

  it('should show star icon when movie is favorite', () => {
    const favoriteMovie: Movie = { ...mockMovie, isFavorite: true }

    renderWithRouter(
      <MovieCard
        movie={favoriteMovie}
        onToggleFavorite={mockOnToggleFavorite}
      />
    )

    const favoriteButton = screen.getAllByRole('button').find(button =>
      button.querySelector('svg[class*="star"]')
    )
    expect(favoriteButton).toBeInTheDocument()
  })

  it('should call onToggleFavorite when favorite button is clicked', async () => {
    const user = userEvent.setup()

    renderWithRouter(
      <MovieCard
        movie={mockMovie}
        onToggleFavorite={mockOnToggleFavorite}
      />
    )

    const favoriteButton = screen.getAllByRole('button')[0]
    await user.click(favoriteButton)

    expect(mockOnToggleFavorite).toHaveBeenCalledTimes(1)
  })

  it('should render edit button when onEdit is provided', () => {
    renderWithRouter(
      <MovieCard
        movie={mockMovie}
        onToggleFavorite={mockOnToggleFavorite}
        onEdit={mockOnEdit}
      />
    )

    const editButton = screen.getAllByRole('button').find(button =>
      button.querySelector('svg[class*="square-pen"]')
    )
    expect(editButton).toBeDefined()
  })

  it('should not render edit button when onEdit is not provided', () => {
    renderWithRouter(
      <MovieCard
        movie={mockMovie}
        onToggleFavorite={mockOnToggleFavorite}
      />
    )

    const editButton = screen.getAllByRole('button').find(button =>
      button.querySelector('svg[class*="square-pen"]')
    )
    expect(editButton).toBeUndefined()
  })

  it('should call onEdit when edit button is clicked', async () => {
    const user = userEvent.setup()

    renderWithRouter(
      <MovieCard
        movie={mockMovie}
        onToggleFavorite={mockOnToggleFavorite}
        onEdit={mockOnEdit}
      />
    )

    const editButton = screen.getAllByRole('button').find(button =>
      button.querySelector('svg[class*="square-pen"]')
    )
    expect(editButton).toBeDefined()
    if (editButton) {
      await user.click(editButton)
    }

    expect(mockOnEdit).toHaveBeenCalledTimes(1)
  })

  it('should render delete button when onDelete is provided', () => {
    renderWithRouter(
      <MovieCard
        movie={mockMovie}
        onToggleFavorite={mockOnToggleFavorite}
        onDelete={mockOnDelete}
      />
    )

    const deleteButton = screen.getAllByRole('button').find(button =>
      button.querySelector('svg[class*="trash"]')
    )
    expect(deleteButton).toBeDefined()
  })

  it('should not render delete button when onDelete is not provided', () => {
    renderWithRouter(
      <MovieCard
        movie={mockMovie}
        onToggleFavorite={mockOnToggleFavorite}
      />
    )

    const deleteButton = screen.getAllByRole('button').find(button =>
      button.querySelector('svg[class*="trash"]')
    )
    expect(deleteButton).toBeUndefined()
  })

  it('should call onDelete when delete button is clicked', async () => {
    const user = userEvent.setup()

    renderWithRouter(
      <MovieCard
        movie={mockMovie}
        onToggleFavorite={mockOnToggleFavorite}
        onDelete={mockOnDelete}
      />
    )

    const deleteButton = screen.getAllByRole('button').find(button =>
      button.querySelector('svg[class*="trash"]')
    )
    expect(deleteButton).toBeDefined()
    if (deleteButton) {
      await user.click(deleteButton)
    }

    expect(mockOnDelete).toHaveBeenCalledTimes(1)
  })

  it('should render all buttons when all handlers are provided', () => {
    renderWithRouter(
      <MovieCard
        movie={mockMovie}
        onToggleFavorite={mockOnToggleFavorite}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    )

    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(3)

    const favoriteButton = buttons[0]
    const editButton = buttons.find(button =>
      button.querySelector('svg[class*="square-pen"]')
    )
    const deleteButton = buttons.find(button =>
      button.querySelector('svg[class*="trash"]')
    )

    expect(favoriteButton).toBeInTheDocument()
    expect(editButton).toBeDefined()
    expect(deleteButton).toBeDefined()
  })

  it('should have correct link to movie details', () => {
    renderWithRouter(
      <MovieCard
        movie={mockMovie}
        onToggleFavorite={mockOnToggleFavorite}
      />
    )

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/movie/1')
  })

  it('should handle movie with missing optional fields', () => {
    const incompleteMovie: Movie = {
      id: '2',
      title: 'incomplete movie',
      year: '',
      runtime: '',
      genre: '',
      director: '',
      poster: '',
      isFavorite: false,
    }

    renderWithRouter(
      <MovieCard
        movie={incompleteMovie}
        onToggleFavorite={mockOnToggleFavorite}
      />
    )

    expect(screen.getByText('Incomplete Movie')).toBeInTheDocument()
    expect(screen.getByText((content, element) => {
      return element?.textContent === ' • '
    })).toBeInTheDocument()
  })
})
