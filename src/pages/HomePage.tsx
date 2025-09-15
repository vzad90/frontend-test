import HomePageLayout from '../components/HomePageLayout'
import ModalsContainer from '../components/ModalsContainer'
import { useHomePageLogic } from '../hooks'

export default function HomePage() {
	const {
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
	} = useHomePageLogic()

	return (
		<>
			<HomePageLayout
				query={query}
				setQuery={setQuery}
				showFavorites={showFavorites}
				toggleFavorites={toggleFavorites}
				onCreate={onCreate}
				username={username}
				onChangeUser={handleChangeUser}
				movies={movies}
				onToggleFavorite={onFavorite}
				onEdit={onEdit}
				onDelete={onDelete}
				loading={loading}
				error={error}
			/>

			<ModalsContainer
				movies={movies}
				onSave={onSave}
				onDeleteConfirm={onDeleteConfirm}
				onUsernameSubmit={handleUsernameSubmit}
				username={username}
				editingMovie={editingMovie}
				deletingMovie={deletingMovie}
				modalOpen={modalOpen}
				usernameModalOpen={usernameModalOpen}
				closeModal={closeModal}
				closeDeleteModal={closeDeleteModal}
				closeUsernameModal={closeUsernameModal}
			/>
		</>
	)
}