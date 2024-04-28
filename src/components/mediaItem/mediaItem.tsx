import { Link } from "react-router-dom";
import Media from "../../api/media";

import "./mediaItem.css";

const MediaItem = (media: Media) => {
  return (
    <div className="media-list-item">
      <img className="media-img" src={media.poster} alt={media.title} />
      <Link className="media-title" to={`/media/${media.type}/${media.imdbID}`}>
        {media.title}
      </Link>
      <p className="media-info">
        {media.type} - <span className="pink">{media.year}</span>
      </p>
    </div>
  );
};

export default MediaItem;
