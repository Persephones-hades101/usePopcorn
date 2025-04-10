import { useEffect, useState } from 'react';
import Box from './Box';
import ErrorMessage from './ErrorMessage';
import Loader from './Loader';
import Main from './Main';
import MovieDetails from './MovieDetails';
import MovieList from './MovieList';
import Navbar from './Navbar';
import NumResults from './NumResults';
import Search from './Search';
import Summary from './Summary';
import { useLocalStorageState } from './useLocalStorageState';
import WatchedList from './WatchedList';

export default function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  const [watched, setWatched] = useLocalStorageState([], 'watched');

  function handleSelectedMovie(id) {
    setSelectedId((selectedId) => (selectedId === id ? null : id));
  }

  function handleCloseSelectedMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }
  if (!process.env.REACT_APP_API_KEY) {
    throw new Error('API key is missing - check your environment variables');
  }

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError('');
          const omdbApiEndpoint = `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${query}`;
          const res = await fetch(omdbApiEndpoint, {
            signal: controller.signal,
          });
          if (!res.ok) {
            throw new Error('Failed to fetch');
          }
          const data = await res.json();
          if (data.Response === 'False') {
            throw new Error(data.Error);
          }
          setMovies(data.Search);
          setError('');
        } catch (error) {
          if (error.name !== 'AbortError') {
            setError(error.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError('');
        return;
      }

      handleCloseSelectedMovie();
      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query],
  );

  return (
    <>
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectedMovie={handleSelectedMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedMovieId={selectedId}
              onCloseSelectedMovie={handleCloseSelectedMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <Summary watched={watched} />
              <WatchedList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
