import React, { useState } from 'react'
import Movie from './Movie';

export default function MovieList({ movies }) {

  return (
    <ul className="list">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  )
}
