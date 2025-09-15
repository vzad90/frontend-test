import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface UiState {
  searchQuery: string
  showFavorites: boolean
  username: string
}

const initialState: UiState = {
  searchQuery: '',
  showFavorites: false,
  username: typeof window !== 'undefined' ? localStorage.getItem('username') || '' : ''
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
    setShowFavorites: (state, action: PayloadAction<boolean>) => {
      state.showFavorites = action.payload
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload
      if (typeof window !== 'undefined') {
        if (action.payload) localStorage.setItem('username', action.payload)
        else localStorage.removeItem('username')
      }
    },
  },
})

export const { setSearchQuery, setShowFavorites, setUsername } = uiSlice.actions
export default uiSlice.reducer


