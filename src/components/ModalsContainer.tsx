import type { ModalsContainerProps } from '../types/component.types'
import DeleteConfirmModal from './DeleteConfirmModal'
import EditCreateMovieModal from './EditCreateMovieModal'
import UsernameModal from './UsernameModal'

export default function ModalsContainer({
	movies,
	onSave,
	onDeleteConfirm,
	onUsernameSubmit,
	username,
	editingMovie,
	deletingMovie,
	modalOpen,
	usernameModalOpen,
	closeModal,
	closeDeleteModal,
	closeUsernameModal
}: ModalsContainerProps) {

	return (
		<>
			<EditCreateMovieModal
				isOpen={modalOpen}
				onClose={closeModal}
				movie={editingMovie}
				existingMovies={movies}
				onSave={onSave}
			/>

			<DeleteConfirmModal
				isOpen={!!deletingMovie}
				onClose={closeDeleteModal}
				onConfirm={() => deletingMovie && onDeleteConfirm(deletingMovie)}
			/>

			<UsernameModal
				isOpen={usernameModalOpen}
				onClose={closeUsernameModal}
				onSubmit={onUsernameSubmit}
				initialUsername={username}
			/>
		</>
	)
}
