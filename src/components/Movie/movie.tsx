import { default as MovieProps } from "../../api/movie.ts";

const Movie = (movie: MovieProps) => {
  return (
    <div>
      <h2>{movie.title}</h2>
      <ul>
        {movie.genre.split(",").map((keyword: string) => (
          <li key={keyword}>{keyword}</li>
        ))}
      </ul>
      <p>{movie.rating}</p>
      <p>{movie.year}</p>
      <p>{movie.imdbID}</p>
      <p>{movie.time} minutes</p>
      <img src={movie.posterURL} alt={movie.title} />
    </div>
  );
};

export default Movie;
