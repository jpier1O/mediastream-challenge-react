import MovieGridItem from './MovieGridItem'

const MovieGrid = ({ movies, isAscending, genresSelected }) => {

  return (
    <>
      {movies && movies
        .map(movie => (
          <div key={movie.id} className="movie-library__card">
            <MovieGridItem
              key={movie.id.toString()}
              title={movie.title}
              genres={movie.genres}
              year={movie.year}
              posterUrl={movie.posterUrl}
            />
          </div>
      ))}
    </>
  )
}

export default MovieGrid