import type { Movie } from './global.types'

export const validationRules = {
  title: {
    required: 'Required',
    minLength: { value: 3, message: 'Min 3 chars' },
  },
  year: {
    required: 'Required',
    pattern: {
      value: /^\d{4}([-–]\d{4})?$/,
      message: 'Format must be YYYY or YYYY-YYYY',
    },
  },
  runtime: {
    required: 'Required',
  },
  genre: {
    required: 'Required',
    minLength: { value: 3, message: 'Min 3 chars' },
  },
  director: {
    required: 'Required',
    minLength: { value: 3, message: 'Min 3 chars' },
  },
  username: {
    required: 'Username is required',
    minLength: { value: 3, message: 'Min 3 characters' },
  },
}

export const checkMovieUniqueness = (
  title: string,
  existingMovies: Movie[],
  currentMovieId?: string
): boolean => {
  return !existingMovies.some(
    movie => 
      movie.title.toLowerCase().trim() === title.toLowerCase().trim() && 
      movie.id !== currentMovieId
  )
}

export const validateSearchQuery = (query: string): boolean => {
  return typeof query === 'string'
}

export const validateId = (id: string): boolean => {
  return typeof id === 'string' && id.trim().length > 0
}
