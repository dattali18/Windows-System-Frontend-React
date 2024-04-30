import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getMovieByImdbID } from "../../api/moviesApi.ts";
import { getTvSeriesByImdbId } from "../../api/tvSeriesApi.ts";

import { default as MovieProps } from "../../api/movie.ts";
import { default as TvSeriesProps } from "../../api/tvSeries.ts";

import Movie from "../../components/movie/movie.tsx";
import TvSeries from "../../components/tvSeries/tvSeries.tsx";

const Media = () => {
  const { mediaType, imdbId } = useParams();

  const [movie, setMovie] = useState({} as MovieProps | TvSeriesProps);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      let media;
      if (mediaType === "movie") {
        media = await getMovieByImdbID(imdbId ?? "");
      } else {
        media = await getTvSeriesByImdbId(imdbId ?? "");
      }
      setMovie(media);
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
