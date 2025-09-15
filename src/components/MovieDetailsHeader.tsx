import type { MovieDetailsHeaderProps } from '../types/component.types'

export default function MovieDetailsHeader({ title, rated, year, runtime, genre }: MovieDetailsHeaderProps) {
  return (
    <div className="movie-header">
      <h1 className="movie-title">{title}</h1>
      <div className="meta-row">
        {rated && <span className="badge">{rated}</span>}
        {year && <span className="badge">{year}</span>}
        {runtime && <span className="badge">{runtime}</span>}
        {genre && <span className="badge">{genre}</span>}
      </div>
    </div>
  )
}
