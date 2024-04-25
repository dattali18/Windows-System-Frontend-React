import { default as MovieProps } from "../../api/movie.ts";

const Movie = (movie: MovieProps) => {
  return (
    <div>
      <h2>{movie.title}</h2>
      <p>Genre: {movie.genre}</p>
      <p>Rating: {movie.rating}</p>
      <p>Year: {movie.year}</p>
      <p>IMDb ID: {movie.imdbID}</p>
      <p>Time: {movie.time} minutes</p>
      <img src={movie.posterURL} alt={movie.title} />
    </div>
  );
};

export default Movie;
