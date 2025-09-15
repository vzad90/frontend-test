import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchMovieById } from '../api/moviesApi'
import DetailsSection from '../components/DetailsSection'
import InfoGridComp from '../components/InfoGrid'
import Loading from '../components/Loading'
import MovieDetailsHeader from '../components/MovieDetailsHeader'
import MoviePoster from '../components/MoviePoster'
import { formatTitle } from '../utils/formatTitle'
import type { OmdbMovieDetail } from '../utils/global.types'

export default function MovieDetails() {
	const navigate = useNavigate()
	const { id } = useParams()
	const [omdbMovie, setOmdbMovie] = useState<OmdbMovieDetail | null>(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		if (!id) return
		setLoading(true)
		setError(null)

		fetchMovieById(id)
			.then(data => {
				setOmdbMovie(data)
			})
			.catch((error) => {
				console.error('Error fetching movie:', error)
				setError('Failed to load movie')
			})
			.finally(() => setLoading(false))
	}, [id])

	if (loading) {
		return (
			<div className="page-wrapper">
				<Loading />
			</div>
		)
	}

	if (error) {
		return (
			<div className="page-wrapper">
				<p>{error}</p>
				<button className='secondary' onClick={() => navigate('/')}>Back</button>
			</div>
		)
	}

	if (!omdbMovie) {
		return (
			<div className="page-wrapper">
				<p>Movie not found.</p>
				<button className='secondary' onClick={() => navigate('/')}>Back</button>
			</div>
		)
	}

	return (
		<div className="page-wrapper">
			<div className="action-row">
				<button className='secondary' onClick={() => navigate(-1)}>Back</button>
			</div>
			<MovieDetailsHeader
				title={formatTitle(omdbMovie.Title)}
				rated={omdbMovie.Rated}
				year={omdbMovie.Year}
				runtime={omdbMovie.Runtime}
				genre={omdbMovie.Genre}
			/>
			<div className="movie-details-content">
				<MoviePoster src={omdbMovie.Poster || ''} alt={omdbMovie.Title} />
				<div className="movie-details-details">
					<InfoGridComp
						items={[
							{ label: 'Director', value: omdbMovie.Director },
							{ label: 'Writer', value: omdbMovie.Writer },
							{ label: 'Actors', value: omdbMovie.Actors },
							{ label: 'Language', value: omdbMovie.Language },
							{ label: 'Country', value: omdbMovie.Country },
							{ label: 'IMDb', value: omdbMovie.imdbRating !== 'N/A' ? `${omdbMovie.imdbRating} (${omdbMovie.imdbVotes})` : undefined },
							{ label: 'Box Office', value: omdbMovie.BoxOffice !== 'N/A' ? omdbMovie.BoxOffice : undefined },
							{ label: 'Awards', value: omdbMovie.Awards !== 'N/A' ? omdbMovie.Awards : undefined },
						]}
					/>

					{omdbMovie.Plot !== 'N/A' && (
						<DetailsSection title='Plot'>
							<p>{omdbMovie.Plot}</p>
						</DetailsSection>
					)}
				</div>
			</div>
		</div>
	)
}
