import { configureStore } from '@reduxjs/toolkit'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import uiReducer, { setSearchQuery, setShowFavorites, setUsername } from './uiSlice'

const createTestStore = () => {
  return configureStore({
    reducer: {
      ui: uiReducer,
    },
  })
}

describe('uiSlice', () => {
  let store: ReturnType<typeof createTestStore>

  beforeEach(() => {
    vi.clearAllMocks()
    store = createTestStore()
  })

  describe('initial state', () => {
    it('should have correct initial state', () => {
      const state = store.getState().ui
      expect(state.searchQuery).toBe('')
      expect(state.showFavorites).toBe(false)
      expect(state.username).toBe('')
    })
  })

  describe('setSearchQuery', () => {
    it('should set search query', () => {
      store.dispatch(setSearchQuery('batman'))
      const state = store.getState().ui
      expect(state.searchQuery).toBe('batman')
    })

    it('should update search query', () => {
      store.dispatch(setSearchQuery('batman'))
      store.dispatch(setSearchQuery('superman'))
      const state = store.getState().ui
      expect(state.searchQuery).toBe('superman')
    })

    it('should handle empty search query', () => {
      store.dispatch(setSearchQuery(''))
      const state = store.getState().ui
      expect(state.searchQuery).toBe('')
    })
  })

  describe('setShowFavorites', () => {
    it('should set showFavorites to true', () => {
      store.dispatch(setShowFavorites(true))
      const state = store.getState().ui
      expect(state.showFavorites).toBe(true)
    })

    it('should set showFavorites to false', () => {
      store.dispatch(setShowFavorites(false))
      const state = store.getState().ui
      expect(state.showFavorites).toBe(false)
    })

    it('should toggle showFavorites', () => {
      store.dispatch(setShowFavorites(true))
      store.dispatch(setShowFavorites(false))
      const state = store.getState().ui
      expect(state.showFavorites).toBe(false)
    })
  })

  describe('setUsername', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'localStorage', {
        value: {
          getItem: vi.fn(),
          setItem: vi.fn(),
          removeItem: vi.fn(),
        },
        writable: true,
      })
    })

    it('should set username and save to localStorage', () => {
      store.dispatch(setUsername('john'))
      const state = store.getState().ui
      expect(state.username).toBe('john')
      expect(localStorage.setItem).toHaveBeenCalledWith('username', 'john')
    })

    it('should clear username and remove from localStorage', () => {
      store.dispatch(setUsername(''))
      const state = store.getState().ui
      expect(state.username).toBe('')
      expect(localStorage.removeItem).toHaveBeenCalledWith('username')
    })

    it('should update username', () => {
      store.dispatch(setUsername('john'))
      store.dispatch(setUsername('jane'))
      const state = store.getState().ui
      expect(state.username).toBe('jane')
    })
  })
})
