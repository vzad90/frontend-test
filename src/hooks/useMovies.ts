import { useCallback, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch } from '../store'
import { loadMovies, selectMovies, selectMoviesError, selectMoviesLoading } from '../store/moviesSlice'
import { useDebounce } from './useDebounce'

export const useMovies = (query: string, username?: string) => {
	const dispatch = useDispatch<AppDispatch>()
	const movies = useSelector(selectMovies)
	const loading = useSelector(selectMoviesLoading)
	const error = useSelector(selectMoviesError)
	
	const abortControllerRef = useRef<AbortController | null>(null)
	const lastQueryRef = useRef<string>('')
	
	const debouncedQuery = useDebounce(query, 700)

	const loadMoviesWithAbort = useCallback(async (searchQuery: string, user?: string) => {
		if (abortControllerRef.current) {
			abortControllerRef.current.abort()
		}

		const abortController = new AbortController()
		abortControllerRef.current = abortController

		try {
			await dispatch(loadMovies({
				query: searchQuery,
				username: user,
				signal: abortController.signal
			})).unwrap()
		} catch (error) {
			if (error instanceof Error && (error.name === 'AbortError' || error.message === 'Request aborted')) {
				return
			}
		}
	}, [dispatch])

	useEffect(() => {
		lastQueryRef.current = debouncedQuery
		loadMoviesWithAbort(debouncedQuery, username)
	}, [debouncedQuery, loadMoviesWithAbort, username])

	useEffect(() => {
		return () => {
			if (abortControllerRef.current) {
				abortControllerRef.current.abort()
			}
		}
	}, [])

	return {
		movies,
		loading,
		error
	}
}
