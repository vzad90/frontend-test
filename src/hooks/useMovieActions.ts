import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addOrUpdateUserMovie, deleteUserMovie } from '../api/userMovies'
import type { AppDispatch, RootState } from '../store'
import { deleteMovie, updateMovie } from '../store/moviesSlice'
import type { Movie } from '../utils/global.types'

export const useMovieActions = () => {
	const dispatch = useDispatch<AppDispatch>()
	const username = useSelector((s: RootState) => s.ui.username)

	const handleFavorite = useCallback((movie: Movie, forcedUsername?: string) => {
		const effectiveUsername = forcedUsername ?? username
		if (!effectiveUsername) {
			return { requiresUsername: true, movie }
		}
		
		addOrUpdateUserMovie(effectiveUsername, { ...movie, isFavorite: !movie.isFavorite })
		dispatch(updateMovie({ ...movie, isFavorite: !movie.isFavorite }))
		return { requiresUsername: false }
	}, [dispatch, username])

	const handleDelete = useCallback(async (movie: Movie) => {
		if (!username) return
		
		await deleteUserMovie(username, movie.id)
		dispatch(deleteMovie(movie.id))
	}, [dispatch, username])

	const handleSave = useCallback(async (movie: Movie) => {
		if (!username) return
		
		await addOrUpdateUserMovie(username, movie)
		dispatch(updateMovie(movie))
	}, [dispatch, username])

	return {
		handleFavorite,
		handleDelete,
		handleSave
	}
}
