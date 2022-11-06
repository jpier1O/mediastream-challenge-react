import { Grid } from '@material-ui/core';

const MovieGridItem = ({ title, genres, year, posterUrl }) => {
  
  return (
    <>
      <Grid item xs={3} >
        <div className="movie-library_card_background">
          <div className="movie-library_card_background_description">
            <li className="movie-title">{title}</li>
            <li className="genres">{genres.join(', ')}</li>
            <li className="genres">{year}</li>
          </div>
        </div>
        <img src={posterUrl} alt={title} />
      </Grid>
    </>
  )
}

export default MovieGridItem