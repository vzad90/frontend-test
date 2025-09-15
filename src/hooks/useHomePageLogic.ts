import { useCallback } from 'react'
import { useModal, useMovieHandlers, useMovies, useUI } from './index'

export const useHomePageLogic = () => {
	const { query, showFavorites, username, setQuery, toggleFavorites, setUsername, clearUsername } = useUI()
	const { movies, loading, error } = useMovies(query, username)
	const { 
		editingMovie, 
		deletingMovie, 
		modalOpen, 
		usernameModalOpen, 
		pendingAction,
		openModal,
		closeModal,
		openDeleteModal,
		closeDeleteModal,
		openUsernameModal, 
		closeUsernameModal 
	} = useModal()
	const { onFavorite, onDelete, onEdit, onCreate, onSave, onDeleteConfirm } = useMovieHandlers(
		username,
		openModal,
		openDeleteModal,
		openUsernameModal,
		closeModal,
		closeDeleteModal
	)

	const handleUsernameSubmit = useCallback((name: string) => {
		setUsername(name)
		closeUsernameModal()
		if (pendingAction) {
			const { kind, movie } = pendingAction
			if (kind === 'favorite' && movie) {
				onFavorite(movie, name)
			} else if (kind === 'edit' && movie) {
				onEdit(movie)
			} else if (kind === 'delete' && movie) {
				onDelete(movie)
			} else if (kind === 'create') {
				onCreate()
			}
		}
	}, [setUsername, closeUsernameModal, pendingAction, onFavorite, onEdit, onDelete, onCreate])

	const handleChangeUser = useCallback(() => {
		clearUsername()
		openUsernameModal({ kind: 'create' })
	}, [clearUsername, openUsernameModal])

	return {
		query,
		setQuery,
		showFavorites,
		toggleFavorites,
		username,
		movies,
		loading,
		error,
		onCreate,
		onFavorite,
		onEdit,
		onDelete,
		onSave,
		onDeleteConfirm,
		handleUsernameSubmit,
		handleChangeUser,
		editingMovie,
		deletingMovie,
		modalOpen,
		usernameModalOpen,
		closeModal,
		closeDeleteModal,
		closeUsernameModal
	}
}
