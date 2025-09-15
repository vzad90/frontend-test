import axios from 'axios'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { Movie } from '../utils/global.types'
import { addOrUpdateUserMovie, deleteUserMovie, getUserMovies } from './userMovies'

vi.mock('axios')
const mockedAxios = vi.mocked(axios)

describe('userMovies', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getUserMovies', () => {
    it('should fetch user movies successfully', async () => {
      const mockMovies: Movie[] = [
        {
          id: '1',
          title: 'The Dark Knight',
          year: '2008',
          runtime: '152 min',
          genre: 'Action',
          director: 'Christopher Nolan',
          poster: 'poster.jpg',
          isFavorite: true,
        },
      ]

      ;(mockedAxios.get as unknown as { mockResolvedValueOnce: (value: unknown) => void }).mockResolvedValueOnce({ data: mockMovies })

      const result = await getUserMovies('john')

      expect(mockedAxios.get).toHaveBeenCalledWith('https://backend-ix5u.onrender.com/api/user-movies?username=john', { signal: undefined })
      expect(result).toEqual(mockMovies)
    })

    it('should handle empty username', async () => {
      ;(mockedAxios.get as unknown as { mockResolvedValueOnce: (value: unknown) => void }).mockResolvedValueOnce({ data: [] })

      const result = await getUserMovies('')

      expect(mockedAxios.get).toHaveBeenCalledWith('https://backend-ix5u.onrender.com/api/user-movies?username=', { signal: undefined })
      expect(result).toEqual([])
    })

    it('should handle special characters in username', async () => {
      ;(mockedAxios.get as unknown as { mockResolvedValueOnce: (value: unknown) => void }).mockResolvedValueOnce({ data: [] })

      const result = await getUserMovies('john@example.com')

      expect(mockedAxios.get).toHaveBeenCalledWith('https://backend-ix5u.onrender.com/api/user-movies?username=john@example.com', { signal: undefined })
      expect(result).toEqual([])
    })
  })

  describe('addOrUpdateUserMovie', () => {
    const mockMovie: Movie = {
      id: '1',
      title: 'The Dark Knight',
      year: '2008',
      runtime: '152 min',
      genre: 'Action',
      director: 'Christopher Nolan',
      poster: 'poster.jpg',
      isFavorite: true,
    }

    it('should add user movie successfully', async () => {
      ;(mockedAxios.post as unknown as { mockResolvedValueOnce: (value: unknown) => void }).mockResolvedValueOnce({ data: {} })

      await addOrUpdateUserMovie('john', mockMovie)

      expect(mockedAxios.post).toHaveBeenCalledWith('https://backend-ix5u.onrender.com/api/user-movies', {
        username: 'john',
        movie: mockMovie,
      })
    })

    it('should handle error gracefully', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      ;(mockedAxios.post as unknown as { mockRejectedValueOnce: (value: unknown) => void }).mockRejectedValueOnce(new Error('Server error'))

      await addOrUpdateUserMovie('john', mockMovie)

      expect(consoleSpy).toHaveBeenCalledWith('Error adding/updating user movie:', expect.any(Error))
      
      consoleSpy.mockRestore()
    })

    it('should handle empty username', async () => {
      ;(mockedAxios.post as unknown as { mockResolvedValueOnce: (value: unknown) => void }).mockResolvedValueOnce({ data: {} })

      await addOrUpdateUserMovie('', mockMovie)

      expect(mockedAxios.post).toHaveBeenCalledWith('https://backend-ix5u.onrender.com/api/user-movies', {
        username: '',
        movie: mockMovie,
      })
    })
  })

  describe('deleteUserMovie', () => {
    it('should delete user movie successfully', async () => {
      ;(mockedAxios.delete as unknown as { mockResolvedValueOnce: (value: unknown) => void }).mockResolvedValueOnce({ data: {} })

      await deleteUserMovie('john', '1')

      expect(mockedAxios.delete).toHaveBeenCalledWith('https://backend-ix5u.onrender.com/api/user-movies', {
        data: { username: 'john', movieId: '1' },
      })
    })

    it('should handle error gracefully', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      ;(mockedAxios.delete as unknown as { mockRejectedValueOnce: (value: unknown) => void }).mockRejectedValueOnce(new Error('Server error'))

      await deleteUserMovie('john', '1')

      expect(consoleSpy).toHaveBeenCalledWith('Error deleting user movie:', expect.any(Error))
      
      consoleSpy.mockRestore()
    })

    it('should handle empty parameters', async () => {
      ;(mockedAxios.delete as unknown as { mockResolvedValueOnce: (value: unknown) => void }).mockResolvedValueOnce({ data: {} })

      await deleteUserMovie('', '')

      expect(mockedAxios.delete).toHaveBeenCalledWith('https://backend-ix5u.onrender.com/api/user-movies', {
        data: { username: '', movieId: '' },
      })
    })
  })
})
