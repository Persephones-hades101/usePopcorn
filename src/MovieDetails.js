import { useEffect, useState } from "react"
import StarRating from './StarRating'
import Loader from "./Loader"
import { useKey } from "./useKey"
const KEY = '66bed1a5'
export default function MovieDetails({ selectedMovieId, onCloseSelectedMovie, onAddWatched, watched }) {

  const [movie, setMovie] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [userRating, setUserRating] = useState('')

  const isWatched = watched.map(movie => movie.imdbID).includes(selectedMovieId);
  const watchedUserRating = watched.find(movie => movie.imdbID === selectedMovieId)?.userRating;

  const {
    imdbID,
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre
  } = movie



  function handleAdd() {
    const newMovie = {
      imdbID,
      title,
      poster,
      runtime: Number(runtime.split(' ').at(0)),
      imdbRating: Number(imdbRating),
      userRating,
    }

    onAddWatched(newMovie)
    onCloseSelectedMovie()
  }

  useKey("Escape", onCloseSelectedMovie)



  useEffect(function () {
    async function fetchMovieDetails() {
      setIsLoading(true)
      const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedMovieId}`)
      const data = await res.json()
      setMovie(data)
      setIsLoading(false)
    }
    fetchMovieDetails()
  }, [selectedMovieId])

  useEffect(function () {
    if (!title) return;
    document.title = `Movie | ${title}`

    return function () {
      document.title = 'usePopcorn'
    }
  }, [title])


  return (
    <>
      {isLoading ? <Loader /> : (
        <div className="details">
          <header>
            <button className="btn-back" onClick={onCloseSelectedMovie}>&larr;</button>
            <img src={poster} alt={`Poster of ${movie}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>
                {genre}
              </p>
              <p><span>⭐</span>
                {imdbRating} IMDB rating</p>
            </div>
          </header>
          <section>
            <div className="rating">
              {
                !isWatched ? <>
                  <StarRating maxRating={10} size={24} onSetRating={setUserRating} />
                  {
                    userRating > 0 && <button className="btn-add" onClick={handleAdd}>+ Add to list</button>
                  }
                </> : <p>You have rated this movie {watchedUserRating}⭐</p>
              }

            </div>
            <p>
              <em>
                {plot}
              </em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>

        </div>
      )}
    </>

  )
}
