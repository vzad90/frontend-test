import { formatTitle } from './formatTitle'
import type { Movie } from './global.types'

export const createMovieFromFormData = (
  formData: Partial<Movie>,
  existingMovie?: Movie | null
): Movie => {
  const formattedTitle = formatTitle(formData.title || '')
  
  return {
    id: existingMovie?.id || crypto.randomUUID(),
    title: formattedTitle,
    year: formData.year || '',
    runtime: formData.runtime || '',
    genre: formData.genre || '',
    director: formData.director || '',
    poster: formData.poster || '',
    isFavorite: existingMovie?.isFavorite || false,
  }
}

export const getDefaultMovieFormValues = (movie?: Movie | null): Partial<Movie> => {
  return movie || {
    id: '',
    title: '',
    year: '',
    runtime: '',
    genre: '',
    director: '',
    isFavorite: false,
    poster: '',
  }
}
