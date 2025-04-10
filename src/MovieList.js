import React from 'react';
import Movie from './Movie';

export default function MovieList({
  movies,
  onSelectedMovie,
  onCloseSelectedMovie,
}) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie
          movie={movie}
          key={movie.imdbID}
          onSelectedMovie={onSelectedMovie}
          onCloseSelectedMovie={onCloseSelectedMovie}
        />
      ))}
    </ul>
  );
}
