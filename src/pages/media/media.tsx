import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getMovieByImdbID } from "../../api/moviesApi.ts";
import { getTvSeriesByImdbId } from "../../api/tvSeriesApi.ts";

import { default as MovieProps } from "../../api/movie.ts";
import { default as TvSeriesProps } from "../../api/tvSeries.ts";

import Movie from "../../components/Movie/movie.tsx";
import TvSeries from "../../components/TvSeries/tvSeries.tsx";

const Media = () => {
  const { mediaType, imdbId } = useParams();

  const [movie, setMovie] = useState({} as MovieProps | TvSeriesProps);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      let movie;
      if (mediaType === "movie") {
        movie = await getMovieByImdbID(imdbId ?? "");
      } else {
        movie = await getTvSeriesByImdbId(imdbId ?? "");
      }
      setMovie(movie);
      setLoading(false);
    };
    fetchMovie();
  }, [mediaType, imdbId]);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {mediaType === "movie" ? (
            <Movie {...(movie as MovieProps)} />
          ) : (
            <TvSeries {...(movie as TvSeriesProps)} />
          )}
        </>
      )}
    </>
  );
};

export default Media;
