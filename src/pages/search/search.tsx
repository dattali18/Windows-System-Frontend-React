import { useState } from "react";

import { searchMovies } from "../../api/moviesApi.ts";
import { searchTvSeries } from "../../api/tvSeriesApi.ts";

import Media from "../../api/media.ts";

import "./search.css";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [mediaType, setMediaType] = useState("movie");
  const [medias, setMedias] = useState([] as Media[]);

  const handleSearch = async () => {
    if (mediaType === "movie") {
      const movies = await searchMovies(searchTerm);
      setMedias(movies);
    }
    if (mediaType === "tv") {
      const tvSeries = await searchTvSeries(searchTerm);
      setMedias(tvSeries);
    }
  };

  return (
    <>
      <h1 className="page-header">Search</h1>
      <div className="page-main">
        <div className="search-form">
          <input
            className="search-input"
            type="text"
            placeholder="Search Term"
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
          <select
            className="search-select"
            onChange={(e) => {
              setMediaType(e.target.value);
            }}
          >
            <option value="movie">Movie</option>
            <option value="tv">TV Series</option>
          </select>
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
        </div>
        <ul>
          {medias.map((media) => (
            <li key={media.imdbID}>
              <p>{media.title}</p>
              <p>{media.year}</p>
              <p>{media.type}</p>
              <img src={media.poster} alt={media.title} height={200} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Search;
