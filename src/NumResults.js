

export default function NumResults({ movies }) {
  const noOfResults = movies.length
  return (
    <p className="num-results">
      Found <strong>{noOfResults}</strong> results
    </p>
  )
}
