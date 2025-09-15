import type { UseFormSetError } from 'react-hook-form'
import type { Movie } from './global.types'
import { checkMovieUniqueness } from './validationHelpers'

export const handleFormError = (
  setError: UseFormSetError<Movie>,
  field: keyof Movie,
  message: string
): void => {
  setError(field, { type: 'manual', message })
}

export const validateMovieForm = (
  data: Partial<Movie>,
  existingMovies: Movie[],
  currentMovieId?: string,
  setError?: UseFormSetError<Movie>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = []
  
  if (data.title && !checkMovieUniqueness(data.title, existingMovies, currentMovieId)) {
    const error = 'Movie already exists'
    errors.push(error)
    if (setError) {
      handleFormError(setError, 'title', error)
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

export const handleSaveSuccess = (
  onSave: (movie: Movie) => void,
  onClose: () => void,
  movieToSave: Movie,
  reset: () => void
): void => {
  onSave(movieToSave)
  reset()
  onClose()
}
