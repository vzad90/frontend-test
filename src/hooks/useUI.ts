import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../store'
import { setSearchQuery, setShowFavorites, setUsername as setUsernameInStore } from '../store/uiSlice'

export const useUI = () => {
	const dispatch = useDispatch<AppDispatch>()
	const query = useSelector((s: RootState) => s.ui.searchQuery) ?? ''
	const showFavorites = useSelector((s: RootState) => s.ui.showFavorites)
	const username = useSelector((s: RootState) => s.ui.username)

	const setQuery = (newQuery: string) => {
		dispatch(setSearchQuery(newQuery))
	}

	const toggleFavorites = () => {
		dispatch(setShowFavorites(!showFavorites))
	}

	const setUsername = (newUsername: string) => {
		dispatch(setUsernameInStore(newUsername))
	}

	const clearUsername = () => {
		dispatch(setUsernameInStore(''))
	}

	return {
		query,
		showFavorites,
		username,
		setQuery,
		toggleFavorites,
		setUsername,
		clearUsername
	}
}
