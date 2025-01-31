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
import MovieDetails from "./MovieDetails";

const KEY = '66bed1a5'



export default function App() {

  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [selectedId, setSelectedId] = useState(null)

  function handleSelectedMovie(id) {
    setSelectedId((selectedId) => selectedId === id ? null : id)
  }

  function handleCloseSelectedMovie() {
    setSelectedId(null)
  }

  function handleAddWatched(movie) {
    setWatched(watched => [...watched, movie])
  }

  function handleDeleteWatched(id) {
    setWatched(watched => watched.filter(movie => movie.imdbID !== id))
  }


  useEffect(function () {

    const controller = new AbortController()

    async function fetchMovies() {
      try {
        setIsLoading(true)
        setError("")
        const omdbApiEndpoint = `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
        const res = await fetch(omdbApiEndpoint, { signal: controller.signal })
        if (!res.ok) {
          throw new Error('Failed to fetch')
        }
        const data = await res.json()
        if (data.Response === 'False') {
          throw new Error(data.Error)
        }
        setMovies(data.Search)
        setError("")
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error.message)
        }
      } finally {
        setIsLoading(false)
      }
    }

    if (query.length < 3) {
      setMovies([])
      setError('')
      return;
    }

    fetchMovies()

    return function () {
      controller.abort()
    }

  }, [query])

  return (
    <>
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error &&
            <MovieList
              movies={movies}
              onSelectedMovie={handleSelectedMovie}
            />
          }
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {
            selectedId ? <MovieDetails
              selectedMovieId={selectedId}
              onCloseSelectedMovie={handleCloseSelectedMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            /> :
              <>
                <Summary watched={watched} />
                <WatchedList watched={watched} onDeleteWatched={handleDeleteWatched} />
              </>
          }
        </Box>
      </Main>
    </>
  );
}
