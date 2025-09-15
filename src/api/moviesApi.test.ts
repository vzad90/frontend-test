import axios from 'axios'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { Movie, OmdbMovieDetail } from '../utils/global.types'
import { fetchMovieById, fetchMovies } from './moviesApi'

vi.mock('axios')
const mockedAxios = vi.mocked(axios)

describe('moviesApi', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('fetchMovies', () => {
    it('should fetch movies successfully', async () => {
      const mockMovies: Movie[] = [
        {
          id: '1',
          title: 'The Dark Knight',
          year: '2008',
          runtime: '152 min',
          genre: 'Action',
          director: 'Christopher Nolan',
          poster: 'poster.jpg',
          isFavorite: false,
        },
      ]

      ;(mockedAxios.get as unknown as { mockResolvedValueOnce: (value: unknown) => void }).mockResolvedValueOnce({ data: mockMovies })

      const result = await fetchMovies('batman')

      expect(mockedAxios.get).toHaveBeenCalledWith('https://backend-ix5u.onrender.com/api/search', {
        params: { query: 'batman' },
      })
      expect(result).toEqual(mockMovies)
    })

    it('should handle empty query', async () => {
      const mockMovies: Movie[] = []
      ;(mockedAxios.get as unknown as { mockResolvedValueOnce: (value: unknown) => void }).mockResolvedValueOnce({ data: mockMovies })

      const result = await fetchMovies('')

      expect(mockedAxios.get).toHaveBeenCalledWith('https://backend-ix5u.onrender.com/api/search', {
        params: { query: '' },
      })
      expect(result).toEqual(mockMovies)
    })

    it('should return empty array on error', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      ;(mockedAxios.get as unknown as { mockRejectedValueOnce: (value: unknown) => void }).mockRejectedValueOnce(new Error('Network error'))

      const result = await fetchMovies('batman')

      expect(result).toEqual([])
      expect(consoleSpy).toHaveBeenCalledWith('Error in fetchMovies:', expect.any(Error))
      consoleSpy.mockRestore()
    })

    it('should use default backend URL when environment variable is not set', async () => {
      ;(mockedAxios.get as unknown as { mockResolvedValueOnce: (value: unknown) => void }).mockResolvedValueOnce({ data: [] })

      await fetchMovies('test')

      expect(mockedAxios.get).toHaveBeenCalledWith('https://backend-ix5u.onrender.com/api/search', {
        params: { query: 'test' },
      })
    })
  })

  describe('fetchMovieById', () => {
    it('should fetch movie by id successfully', async () => {
      const mockMovieDetail: OmdbMovieDetail = {
        Title: 'The Dark Knight',
        Year: '2008',
        Rated: 'PG-13',
        Released: '18 Jul 2008',
        Runtime: '152 min',
        Genre: 'Action, Crime, Drama',
        Director: 'Christopher Nolan',
        Writer: 'Jonathan Nolan, Christopher Nolan, David S. Goyer',
        Actors: 'Christian Bale, Heath Ledger, Aaron Eckhart',
        Plot: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham...',
        Language: 'English, Mandarin',
        Country: 'United States, United Kingdom',
        Awards: 'Won 2 Oscars. 162 wins & 163 nominations total',
        Poster: 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg',
        Ratings: [
          { Source: 'Internet Movie Database', Value: '9.0/10' },
          { Source: 'Rotten Tomatoes', Value: '94%' },
          { Source: 'Metacritic', Value: '84/100' }
        ],
        Metascore: '84',
        imdbRating: '9.0',
        imdbVotes: '2,847,000',
        imdbID: '1',
        Type: 'movie',
        DVD: '09 Dec 2008',
        BoxOffice: '$534,858,444',
        Production: 'N/A',
        Website: 'N/A',
        Response: 'True'
      }

      ;(mockedAxios.get as unknown as { mockResolvedValueOnce: (value: unknown) => void }).mockResolvedValueOnce({ data: mockMovieDetail })

      const result = await fetchMovieById('1')

      expect(mockedAxios.get).toHaveBeenCalledWith('https://backend-ix5u.onrender.com/api/movie/1')
      expect(result).toEqual(mockMovieDetail)
    })

    it('should return null on error', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      ;(mockedAxios.get as unknown as { mockRejectedValueOnce: (value: unknown) => void }).mockRejectedValueOnce(new Error('Movie not found'))

      const result = await fetchMovieById('999')

      expect(result).toBeNull()
      expect(consoleSpy).toHaveBeenCalledWith('Error in fetchMovieById:', expect.any(Error))
      consoleSpy.mockRestore()
    })

    it('should handle empty id', async () => {
      await expect(fetchMovieById('')).rejects.toThrow('ID фільму не може бути порожнім')
    })
  })
})
