import { useState } from "react";

import { searchMovies } from "../../api/moviesApi.ts";
import { searchTvSeries } from "../../api/tvSeriesApi.ts";

import Media from "../../api/media.ts";

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
      <h1>Search</h1>
      <input
        type="text"
        placeholder="Search Term"
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />
      <select
        onChange={(e) => {
          setMediaType(e.target.value);
        }}
      >
        <option value="movie">Movie</option>
        <option value="tv">TV Series</option>
      </select>
      <button onClick={handleSearch}>Search</button>
      <ul>
        {medias.map((media) => (
          <li key={media.imdbID}>
            <p>{media.title}</p>
            <p>{media.year}</p>
            <p>{media.type}</p>
            <img src={media.poster} alt={media.title} height={200}/>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Search;
