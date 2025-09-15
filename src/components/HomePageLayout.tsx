import type { HomePageLayoutProps } from '../types/component.types'
import HomeHeader from './HomeHeader'
import Loading from './Loading'
import MoviesGrid from './MoviesGrid'

export default function HomePageLayout({
	query,
	setQuery,
	showFavorites,
	toggleFavorites,
	onCreate,
	username,
	onChangeUser,
	movies,
	onToggleFavorite,
	onEdit,
	onDelete,
	loading = false,
	error = null
}: HomePageLayoutProps) {

	const filteredMovies = showFavorites
		? movies.filter(m => m.isFavorite)
		: movies

	if (loading) {
		return (
			<div className="page-container">
				<HomeHeader
					query={query}
					setQuery={setQuery}
					showFavorites={showFavorites}
					onToggleFavorites={toggleFavorites}
					onCreate={onCreate}
					username={username}
					onChangeUser={onChangeUser}
				/>
				<Loading />
			</div>
		)
	}

	if (error) {
		return (
			<div className="page-container">
				<HomeHeader
					query={query}
					setQuery={setQuery}
					showFavorites={showFavorites}
					onToggleFavorites={toggleFavorites}
					onCreate={onCreate}
					username={username}
					onChangeUser={onChangeUser}
				/>
			</div>
		)
	}

	return (
		<div className="page-container">
			<HomeHeader
				query={query}
				setQuery={setQuery}
				showFavorites={showFavorites}
				onToggleFavorites={toggleFavorites}
				onCreate={onCreate}
				username={username}
				onChangeUser={onChangeUser}
			/>

			<MoviesGrid
				movies={filteredMovies}
				onToggleFavorite={onToggleFavorite}
				onEdit={onEdit}
				onDelete={onDelete}
			/>
		</div>
	)
}
