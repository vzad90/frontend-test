import { X as ClearIcon, Search as SearchIcon } from "lucide-react"
import type { SearchBarProps } from '../types/component.types'

export default function SearchBar({ query, setQuery }: SearchBarProps) {
	return (
		<div className="search-bar-wrapper">
			<div className="search-icon-left" aria-hidden>
				<SearchIcon size={18} />
			</div>
			<input
				className="search-input"
				type="text"
				placeholder="Search movies..."
				value={query}
				onChange={e => setQuery(e.target.value)}
				aria-label="Search movies"
			/>
			{query && (
				<button className="search-clear-button" type="button" aria-label="Clear search" onClick={() => setQuery("")}>
					<ClearIcon size={16} />
				</button>
			)}
		</div>
	)
}