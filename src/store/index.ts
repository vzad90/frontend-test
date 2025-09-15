import { configureStore } from '@reduxjs/toolkit'
import moviesReducer from './moviesSlice'
import uiReducer from './uiSlice'

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
