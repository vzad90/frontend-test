export default function MoviePoster({ src, alt }: { src: string; alt: string }) {
  if (!src) return null
  return <img className="movie-poster" src={src} alt={alt} />
}
