import type { MoviesGridProps } from '../types/component.types'
import MovieCard from './MovieCard'

export default function MoviesGrid({ movies, onToggleFavorite, onEdit, onDelete }: MoviesGridProps) {
	return (
		<div className='movies-grid'>
			{movies?.map(movie => (
				<MovieCard
					key={movie.id}
					movie={movie}
					onToggleFavorite={() => onToggleFavorite(movie)}
					onEdit={() => onEdit(movie)}
					onDelete={() => onDelete(movie)}
				/>
			))}
		</div>
	)
}


