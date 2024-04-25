import Media from "../../api/media";

const MediaItem = (media: Media) => {
  return (
    <div>
      <h2>{media.title}</h2>
      <p>Year: {media.year}</p>
      <p>Media Type: {media.type}</p>
      <img src={media.poster} alt={media.title} />
    </div>
  );
};

export default MediaItem;