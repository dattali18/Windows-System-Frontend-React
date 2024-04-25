import { Link } from "react-router-dom";
import Media from "../../api/media";

const MediaItem = (media: Media) => {
  return (
    <div>
      <Link to={`/media/${media.type}/${media.imdbID}`}>
        <h2>{media.title}</h2>
      </Link>
      <p>Year: {media.year}</p>
      <p>Media Type: {media.type}</p>
      <p>IMDB ID: {media.imdbID}</p>
      <img src={media.poster} alt={media.title} />
    </div>
  );
};

export default MediaItem;
