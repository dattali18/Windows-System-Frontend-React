import { default as MovieProps } from "../../api/movie.ts";

import "./movie.css";

const Movie = (movie: MovieProps) => {
  return (
    <div className="page-main">
      <h2 className="page-subheader">{movie.title}</h2>
      <ul className="library-keywords">
        {movie.genre.split(",").map((keyword: string) => (
          <li className="keyword tag-orange" key={keyword}>
            {keyword}
          </li>
        ))}
      </ul>
      <div className="media-main">
        <img className="media-poster" src={movie.posterURL} alt={movie.title} />
        <div className="media-info-group">
          <p>
            Ratings <span className="blue">{movie.rating}</span>
          </p>
          <p>
            Year <span className="blue">{movie.year}</span>
          </p>
          <p>
            Imdb-Id <span className="blue">{movie.imdbID}</span>
          </p>
          <p>
            Duration <span className="blue">{movie.time}</span> minutes
          </p>
        </div>
      </div>
    </div>
  );
};

export default Movie;
