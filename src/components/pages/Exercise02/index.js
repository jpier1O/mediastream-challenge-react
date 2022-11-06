/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Exercise 02: Movie Library
 * We are trying to make a movie library for internal users. We are facing some issues by creating this, try to help us following the next steps:
 * !IMPORTANT: Make sure to run yarn movie-api for this exercise
 * 1. We have an issue fetching the list of movies, check why and fix it (handleMovieFetch)
 * 2. Create a filter by fetching the list of gender (http://localhost:3001/genres) and then loading
 * list of movies that belong to that gender (Filter all movies).
 * 3. Order the movies by year and implement a button that switch between ascending and descending order for the list
 * 4. Try to recreate the user interface that comes with the exercise (exercise02.png)
 * 
 * You can modify all the code, this component isn't well designed intentionally. You can redesign it as you need.
 */

import "./assets/styles.css";
import { useEffect, useState } from "react";
import MovieGrid from "./components/MovieGrid";
import { Grid } from '@material-ui/core';
import { INITIALGENRESVALUE } from "./utils";
import api from "./common/APIUtils";
import { Spinner } from "./components/Spinner";

export default function Exercise02 () {
  const [movies, setMovies] = useState([])
  const [genres, setGenres] = useState([])
  const [selectedGenres, setSelectedGenres] = useState(null)
  const [isAscending, setIsAscending] = useState(true)
  const [fetchCount, setFetchCount] = useState(0)
  const [loading, setLoading] = useState(true)


  const handleFetchMovie = async () => {
    try {
      const order = isAscending ? 'asc' : 'desc';
      setLoading(true)
      setFetchCount(fetchCount + 1)
      const {data} = selectedGenres // if exist some select genre the apply the filter to api
        ? await api.get(`movies?_limit=50&_sort=year&_order=${order}&genres_like=${selectedGenres}`) 
        : await api.get(`movies?_limit=10&_sort=year&_order=${order}`)
      setMovies(data);
    } catch (error) {
      console.log('Complete Run yarn movie-api for this exercise')
    } finally {
      setLoading(false)
      setFetchCount(0)
    }
  }

  const handleFetchGenre = async () => {
    try {
      const { data } = await api.get('genres');
      setGenres(data);
    } catch (error) {
      console.log(error)
    } 
  }

  const handleFilterGenre = async (event) => {
    // service that let filter movies based in genre
    try {
     setSelectedGenres(event.target.value)
      if(event.target.value !== INITIALGENRESVALUE){
        setLoading(true)
        setFetchCount(fetchCount + 1)
        setMovies([])
        const { data } = await api.get(`movies?genres_like=${event.target.value}`);
        setMovies(data);
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
      setFetchCount(0)
    }
  }
  useEffect(() => {
    handleFetchGenre()
    handleFetchMovie()
  }, [isAscending])


  const orderData = (e) => setIsAscending(!isAscending);

  return (
    <div>
      <div className="movie-background-screen" />
    <section className="movie-library">
      <h1 className="movie-library__title">
        Movie Library
      </h1>
      <div className="movie-library__actions">
        <select 
          name="genre"
          onChange={handleFilterGenre} 
          value={selectedGenres} 
          placeholder={INITIALGENRESVALUE} // set default value Search by genre
        >
            {genres.map((item, i) => ( 
              <option key={`${item}${i}`}value={item}>{item}</option>
            ))}
        </select>
        <button 
          onClick={e => orderData(e)}>
            {`Year ${isAscending ? 'Ascending' : 'Descending'}`}
          </button>
      </div>
      {loading ? (
        <div className="movie-library__loading">
          <p>Loading...</p>
          <Spinner />
        </div>
      ) : (
        <Grid rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <div className="movie-library__list">
            <MovieGrid // component that contains all movies 
              movies={movies}
              isAscending={isAscending}
              selectedGenres={selectedGenres}/>
          </div>
        </Grid>
      )}
    </section>
    </div>
  )
}