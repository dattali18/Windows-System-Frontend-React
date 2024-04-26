import { default as TvSeriesProps } from "../../api/tvSeries";

const TvSeries = (tvSeries: TvSeriesProps) => {
  return (
    <div>
      <h2>{tvSeries.title}</h2>
      <ul>
        {tvSeries.genre.split(",").map((keyword: string) => (
          <li key={keyword}>{keyword}</li>
        ))}
      </ul>
      <p>{tvSeries.years}</p>
      <p>Rating {tvSeries.rating}</p>
      <p>Seasons: {tvSeries.totalSeasons}</p>
      <img src={tvSeries.posterURL} alt={tvSeries.title} />
    </div>
  );
};

export default TvSeries;
