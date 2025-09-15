import { useCallback } from 'react'
import type { Movie } from '../utils/global.types'
import { useMovieActions } from './index'

export const useMovieHandlers = (
	username?: string,
	openModal?: (movie?: Movie | null) => void,
	openDeleteModal?: (movie: Movie) => void,
	openUsernameModal?: (action: { kind: 'favorite' | 'edit' | 'delete' | 'create' | 'changeUser', movie?: Movie }) => void,
	closeModal?: () => void,
	closeDeleteModal?: () => void
) => {
	const { handleFavorite, handleDelete, handleSave } = useMovieActions()

	const onFavorite = useCallback((movie: Movie, forcedUsername?: string) => {
		const result = handleFavorite(movie, forcedUsername)
		if (result.requiresUsername && openUsernameModal) {
			openUsernameModal({ kind: 'favorite', movie })
		}
	}, [handleFavorite, openUsernameModal])

	const onDelete = useCallback((movie: Movie) => {
		if (!username) {
			openUsernameModal?.({ kind: 'delete', movie })
			return
		}
		openDeleteModal?.(movie)
	}, [username, openUsernameModal, openDeleteModal])

	const onEdit = useCallback((movie: Movie) => {
		if (!username) {
			openUsernameModal?.({ kind: 'edit', movie })
			return
		}
		openModal?.(movie)
	}, [username, openUsernameModal, openModal])

	const onCreate = useCallback(() => {
		if (!username) {
			openUsernameModal?.({ kind: 'create' })
			return
		}
		openModal?.()
	}, [username, openUsernameModal, openModal])

	const onSave = useCallback(async (movie: Movie) => {
		await handleSave(movie)
		closeModal?.()
	}, [handleSave, closeModal])

	const onDeleteConfirm = useCallback(async (deletingMovie: Movie) => {
		await handleDelete(deletingMovie)
		closeDeleteModal?.()
	}, [handleDelete, closeDeleteModal])

	return {
		onFavorite,
		onDelete,
		onEdit,
		onCreate,
		onSave,
		onDeleteConfirm
	}
}
