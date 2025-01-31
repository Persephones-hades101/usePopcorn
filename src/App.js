import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Main from "./Main";
import Search from './Search';
import NumResults from './NumResults';
import Box from './Box'
import Summary from "./Summary";
import WatchedList from "./WatchedList";
import MovieList from "./MovieList";
import Loader from "./Loader";
import tempMovieData from "./Data/tempMovieData";
import tempWatchedData from "./Data/tempWatchedData";
import ErrorMessage from "./ErrorMessage";

const KEY = '66bed1a5'
const query = 'interstellar'
const omdbApiEndpoint = `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`

export default function App() {

  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(tempWatchedData);
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")



  useEffect(function () {

    async function fetchMovies() {
      try {
        setIsLoading(true)
        const res = await fetch(omdbApiEndpoint)
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        if (data.Response === 'False') throw new Error(data.Error)
        setMovies(data.Search)
      } catch (error) {
        setError(error.message)
      } finally {
        setIsLoading(false)
      }

    }
    fetchMovies()
  }, [])

  return (
    <>
      <Navbar>
        <Search />
        <NumResults movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && <MovieList movies={movies} />}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          <Summary watched={watched} />
          <WatchedList watched={watched} />
        </Box>
      </Main>
    </>
  );
}
