import { default as TvSeriesProps } from "../../api/tvSeries";

const TvSeries = (tvSeries: TvSeriesProps) => {
  return (
    <div className="page-main">
      <h2 className="page-subheader">{tvSeries.title}</h2>
      <ul className="library-keywords">
        {tvSeries.genre.split(",").map((keyword: string) => (
          <li className="keyword tag-pink" key={keyword}>
            {keyword}
          </li>
        ))}
      </ul>
      <div className="media-main">
        <img
          className="media-poster"
          src={tvSeries.posterURL}
          alt={tvSeries.title}
        />
        <div className="media-info-group">
          <p>
            Ratings <span className="blue">{tvSeries.rating}</span>
          </p>
          <p>
            Years <span className="blue">{tvSeries.years}</span>
          </p>
          <p>
            Imdb-Id <span className="blue">{tvSeries.imdbID}</span>
          </p>
          <p>
            Duration <span className="blue">{tvSeries.time} minutes</span>
          </p>
          <p>
            Seasons <span className="blue">{tvSeries.totalSeasons}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TvSeries;
