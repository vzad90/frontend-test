import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { fetchMovies } from '../api/moviesApi'
import { getUserMovies } from '../api/userMovies'
import { formatTitle } from '../utils/formatTitle'
import type { Movie } from '../utils/global.types'
import type { RootState } from './index'

interface MoviesState {
	list: Movie[]
	favorites: Movie[]
	loading: boolean
	error: string | null
}

const initialState: MoviesState = {
	list: [],
	favorites: [],
	loading: false,
	error: null,
}

export const loadMovies = createAsyncThunk(
	'movies/loadMovies',
	async ({ query, username, signal }: { query: string; username?: string; signal?: AbortSignal }, { rejectWithValue }) => {
		try {
			if (signal?.aborted) {
				throw new Error('Request aborted')
			}

			if (!username) {
				const fetched = await fetchMovies(query, signal)
				return fetched.map(m => ({ ...m, isFavorite: false }))
			}

			const userMovies = await getUserMovies(username, signal)
			const userMoviesMap = new Map(userMovies.map(m => [m.id, m]))

			const fetchedMovies = await fetchMovies(query, signal)
			const merged = fetchedMovies.map(m => ({
				...m,
				isFavorite: userMoviesMap.get(m.id)?.isFavorite || false,
			}))

			const extraUserMovies = userMovies.filter(
				um => !merged.some(m => m.id === um.id)
			)

			return [...merged, ...extraUserMovies]
		} catch (error) {
			if (error instanceof Error && (error.name === 'AbortError' || error.message === 'Request aborted')) {
				throw error
			}
			return rejectWithValue(error instanceof Error ? error.message : 'Failed to load movies')
		}
	}
)

const moviesSlice = createSlice({
	name: 'movies',
	initialState,
	reducers: {
		setMovies: (state, action: PayloadAction<Movie[]>) => {
			state.list = action.payload
		},
		addMovie: (state, action: PayloadAction<Movie>) => {
			const newTitle = formatTitle(action.payload.title)
			const exists = state.list.some(m => formatTitle(m.title) === newTitle)
			if (!exists) state.list.push({ ...action.payload, title: newTitle })
		},
		updateMovie: (state, action: PayloadAction<Movie>) => {
			const index = state.list.findIndex(m => m.id === action.payload.id)
			if (index !== -1) state.list[index] = action.payload
		},
		deleteMovie: (state, action: PayloadAction<string>) => {
			state.list = state.list.filter(m => m.id !== action.payload)
		},
		toggleFavorite: (state, action: PayloadAction<string>) => {
			const movie = state.list.find(m => m.id === action.payload)
			if (movie) movie.isFavorite = !movie.isFavorite
		},
		clearMovies: (state) => {
			state.list = []
			state.error = null
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loadMovies.pending, (state) => {
				state.loading = true
				state.error = null
			})
			.addCase(loadMovies.fulfilled, (state, action) => {
				state.loading = false
				state.list = action.payload
				state.error = null
			})
			.addCase(loadMovies.rejected, (state, action) => {
				state.loading = false
				if (action.error.name !== 'AbortError' && action.error.message !== 'Request aborted') {
					state.error = action.payload as string
				}
			})
	},
})

export const { setMovies, addMovie, updateMovie, deleteMovie, toggleFavorite, clearMovies } =
	moviesSlice.actions
export default moviesSlice.reducer

export const selectMovies = (state: RootState) => state.movies.list
export const selectMoviesLoading = (state: RootState) => state.movies.loading
export const selectMoviesError = (state: RootState) => state.movies.error
export const selectFavoriteMovies = (state: RootState) => state.movies.list.filter(movie => movie.isFavorite)
