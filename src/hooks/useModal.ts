import { useState } from 'react'
import type { Movie } from '../utils/global.types'

type PendingAction = { kind: 'favorite' | 'edit' | 'delete' | 'create' | 'changeUser', movie?: Movie }

export const useModal = () => {
	const [editingMovie, setEditingMovie] = useState<Movie | null>(null)
	const [deletingMovie, setDeletingMovie] = useState<Movie | null>(null)
	const [modalOpen, setModalOpen] = useState(false)
	const [usernameModalOpen, setUsernameModalOpen] = useState(false)
	const [pendingAction, setPendingAction] = useState<null | PendingAction>(null)

	const openModal = (movie: Movie | null = null) => {
		setEditingMovie(movie)
		setModalOpen(true)
	}

	const closeModal = () => {
		setModalOpen(false)
		setEditingMovie(null)
	}

	const openDeleteModal = (movie: Movie) => {
		setDeletingMovie(movie)
	}

	const closeDeleteModal = () => {
		setDeletingMovie(null)
	}

	const openUsernameModal = (action: PendingAction) => {
		setPendingAction(action)
		setUsernameModalOpen(true)
	}

	const closeUsernameModal = () => {
		setUsernameModalOpen(false)
		setPendingAction(null)
	}

	return {
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
	}
}
