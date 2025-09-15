import { Clock, Edit, Film, Star, StarOff, Trash2 } from 'lucide-react'
import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import type { MovieCardProps } from '../types/component.types'
import { formatTitle } from '../utils/formatTitle'

const MovieCard: React.FC<MovieCardProps> = ({
	movie,
	onToggleFavorite,
	onEdit,
	onDelete,
}) => {
	return (
		<div className='movie-card'>
			<Link to={`/movie/${movie.id}`} state={{ movie }} className="movie-card-link">
				<div className="movie-card-content">
					<h3 className='movie-card-title clamp-1'>{formatTitle(movie.title)}</h3>
					<p className='movie-card-info clamp-2'>
						{movie.year} • {movie.genre}
					</p>
					<div className='movie-card-info'>
						<Film size={16} />
						<p> {movie.director}</p>
					</div>
					<div className='movie-card-info'>
						<Clock size={16} />
						<p>{movie.runtime}</p>
					</div>
				</div>
			</Link>

			<div className='movie-card-actions'>
				<button className='icon-button' onClick={onToggleFavorite}>
					{movie.isFavorite ? <Star fill='var(--color-favorite)' /> : <StarOff />}
				</button>
				{onEdit && (
					<button className='icon-button' onClick={onEdit}>
						<Edit />
					</button>
				)}
				{onDelete && (
					<button className='icon-button' onClick={onDelete}>
						<Trash2 />
					</button>
				)}
			</div>
		</div>
	)
}

export default memo(MovieCard)
