import axios from 'axios'
import { config } from '../config/env'
import type { Movie, OmdbMovieDetail } from '../utils/global.types'
import { validateId, validateSearchQuery } from '../utils/validationHelpers'

const validateMovie = (movie: any): movie is Movie => {
  return (
    movie &&
    typeof movie.id === 'string' &&
    typeof movie.title === 'string' &&
    typeof movie.year === 'string' &&
    typeof movie.runtime === 'string' &&
    typeof movie.genre === 'string' &&
    typeof movie.director === 'string' &&
    typeof movie.poster === 'string' &&
    typeof movie.isFavorite === 'boolean'
  );
};

const validateOmdbMovieDetail = (movie: any): movie is OmdbMovieDetail => {
  return (
    movie &&
    typeof movie.Title === 'string' &&
    typeof movie.Year === 'string' &&
    typeof movie.imdbID === 'string' &&
    movie.Response === 'True'
  );
};

const handleApiError = (error: unknown, context: string): never => {
  console.error(`Error in ${context}:`, error);
  
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message;
    
    switch (status) {
      case 400:
        throw new Error(`Невірний запит: ${message}`);
      case 404:
        throw new Error('Фільм не знайдено');
      case 500:
        throw new Error('Помилка сервера. Спробуйте пізніше');
      case 503:
        throw new Error('Сервіс тимчасово недоступний');
      default:
        throw new Error(`Помилка API (${status}): ${message}`);
    }
  }
  
  throw new Error(`Невідома помилка в ${context}`);
};

export const fetchMovies = async (query: string, signal?: AbortSignal): Promise<Movie[]> => {
  const safeQuery = query ?? '';
  
  if (!validateSearchQuery(safeQuery)) {
    throw new Error('Пошуковий запит має бути рядком');
  }

  try {
    const response = await axios.get<Movie[]>(config.SEARCH_URL, {
      params: { query: safeQuery },
      signal,
    });

    if (!Array.isArray(response.data)) {
      throw new Error('Невірний формат відповіді сервера');
    }

    const validMovies = response.data.filter(validateMovie);
    
    if (validMovies.length !== response.data.length) {
      console.warn('Деякі фільми мають невірну структуру і були відфільтровані');
    }

    return validMovies;
  } catch (error) {
    if (axios.isAxiosError(error) && error.name === 'CanceledError') {
      throw error;
    }
    handleApiError(error, 'fetchMovies');
    return [];
  }
};

export const fetchMovieById = async (id: string): Promise<OmdbMovieDetail | null> => {
  if (!validateId(id)) {
    throw new Error('ID фільму не може бути порожнім');
  }

  try {
    const response = await axios.get<OmdbMovieDetail>(`${config.MOVIE_URL}/${id}`)
    
    if (!validateOmdbMovieDetail(response.data)) {
      throw new Error('Невірна структура даних фільму');
    }

    if (response.data.Response === 'False' && response.data.Error) {
      throw new Error(`OMDB API помилка: ${response.data.Error}`);
    }
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return null;
    }
    handleApiError(error, 'fetchMovieById');
    return null;
  }
}
