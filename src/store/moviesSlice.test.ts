import { configureStore } from '@reduxjs/toolkit'
import { beforeEach, describe, expect, it } from 'vitest'
import type { Movie } from '../utils/global.types'
import moviesReducer, { addMovie, deleteMovie, setMovies, toggleFavorite, updateMovie } from './moviesSlice'

const createTestStore = () => {
  return configureStore({
    reducer: {
      movies: moviesReducer,
    },
  })
}

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

const mockMovies: Movie[] = [
  mockMovie,
  {
    id: '2',
    title: 'inception',
    year: '2010',
    runtime: '148 min',
    genre: 'Sci-Fi',
    director: 'Christopher Nolan',
    poster: 'inception.jpg',
    isFavorite: true,
  },
]

describe('moviesSlice', () => {
  let store: ReturnType<typeof createTestStore>

  beforeEach(() => {
    store = createTestStore()
  })

  describe('initial state', () => {
    it('should have empty list and favorites initially', () => {
      const state = store.getState().movies
      expect(state.list).toEqual([])
      expect(state.favorites).toEqual([])
    })
  })

  describe('setMovies', () => {
    it('should set movies list', () => {
      store.dispatch(setMovies(mockMovies))
      const state = store.getState().movies
      expect(state.list).toEqual(mockMovies)
    })

    it('should replace existing movies', () => {
      store.dispatch(setMovies([mockMovie]))
      store.dispatch(setMovies(mockMovies))
      const state = store.getState().movies
      expect(state.list).toEqual(mockMovies)
    })
  })

  describe('addMovie', () => {
    it('should add new movie with formatted title', () => {
      store.dispatch(addMovie(mockMovie))
      const state = store.getState().movies
      expect(state.list).toHaveLength(1)
      expect(state.list[0].title).toBe('The Dark Knight')
    })

    it('should not add duplicate movie with same formatted title', () => {
      const duplicateMovie = { ...mockMovie, id: '2' }
      store.dispatch(addMovie(mockMovie))
      store.dispatch(addMovie(duplicateMovie))
      const state = store.getState().movies
      expect(state.list).toHaveLength(1)
    })

    it('should add movie with different formatted title', () => {
      const differentMovie = { ...mockMovie, id: '2', title: 'inception' }
      store.dispatch(addMovie(mockMovie))
      store.dispatch(addMovie(differentMovie))
      const state = store.getState().movies
      expect(state.list).toHaveLength(2)
    })
  })

  describe('updateMovie', () => {
    beforeEach(() => {
      store.dispatch(setMovies([mockMovie]))
    })

    it('should update existing movie', () => {
      const updatedMovie = { ...mockMovie, title: 'The Dark Knight Rises' }
      store.dispatch(updateMovie(updatedMovie))
      const state = store.getState().movies
      expect(state.list[0]).toEqual(updatedMovie)
    })

    it('should not update non-existent movie', () => {
      const nonExistentMovie = { ...mockMovie, id: '999' }
      store.dispatch(updateMovie(nonExistentMovie))
      const state = store.getState().movies
      expect(state.list[0]).toEqual(mockMovie)
    })
  })

  describe('deleteMovie', () => {
    beforeEach(() => {
      store.dispatch(setMovies(mockMovies))
    })

    it('should delete movie by id', () => {
      store.dispatch(deleteMovie('1'))
      const state = store.getState().movies
      expect(state.list).toHaveLength(1)
      expect(state.list[0].id).toBe('2')
    })

    it('should not affect list if movie id does not exist', () => {
      store.dispatch(deleteMovie('999'))
      const state = store.getState().movies
      expect(state.list).toHaveLength(2)
    })
  })

  describe('toggleFavorite', () => {
    beforeEach(() => {
      store.dispatch(setMovies([mockMovie]))
    })

    it('should toggle favorite status', () => {
      expect(mockMovie.isFavorite).toBe(false)
      store.dispatch(toggleFavorite('1'))
      const state = store.getState().movies
      expect(state.list[0].isFavorite).toBe(true)
    })

    it('should toggle favorite status back', () => {
      store.dispatch(toggleFavorite('1'))
      store.dispatch(toggleFavorite('1'))
      const state = store.getState().movies
      expect(state.list[0].isFavorite).toBe(false)
    })

    it('should not affect non-existent movie', () => {
      store.dispatch(toggleFavorite('999'))
      const state = store.getState().movies
      expect(state.list[0].isFavorite).toBe(false)
    })
  })
})
