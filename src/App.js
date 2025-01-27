import { useState } from "react";
import Navbar from "./Navbar";
import Main from "./Main";
import Search from './Search';
import NumResults from './NumResults';
import Box from './Box'
import Summary from "./Summary";
import WatchedList from "./WatchedList";
import MovieList from "./MovieList";
import tempMovieData from "./Data/tempMovieData";
import tempWatchedData from "./Data/tempWatchedData";

export default function App() {

  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);



  return (
    <>
      <Navbar>
        <Search />
        <NumResults movies={movies} />
      </Navbar>
      <Main>
        <Box>
          <MovieList movies={movies} />
        </Box>
        <Box>
          <Summary watched={watched} />
          <WatchedList watched={watched} />
        </Box>
      </Main>
    </>
  );
}
