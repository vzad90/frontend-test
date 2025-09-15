import type { HomeHeaderProps } from '../types/component.types'
import ActionsSection from './ActionsSection'
import SearchBar from './SearchBar'

export default function HomeHeader({
	query,
	setQuery,
	showFavorites,
	onToggleFavorites,
	onCreate,
	username,
	onChangeUser,
}: HomeHeaderProps) {
	return (
		<div className="header-wrapper">
			<SearchBar query={query} setQuery={setQuery} />
			<ActionsSection
				showFavorites={showFavorites}
				onToggleFavorites={onToggleFavorites}
				onCreate={onCreate}
				username={username}
				onChangeUser={onChangeUser}
			/>
		</div>
	)
}
