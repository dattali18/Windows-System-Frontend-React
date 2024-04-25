import { default as TvSeriesProps } from "../../api/tvSeries";

const TvSeries = (tvSeries: TvSeriesProps) => {
  return (
    <div>
      <h2>{tvSeries.title}</h2>
      <p>Genre: {tvSeries.genre}</p>
      <p>Year: {tvSeries.years}</p>
      <p>Rating: {tvSeries.rating}</p>
      <p>Seasons: {tvSeries.totalSeasons}</p>
      <img src={tvSeries.posterURL} alt={tvSeries.title} />
    </div>
  );
};

export default TvSeries;
