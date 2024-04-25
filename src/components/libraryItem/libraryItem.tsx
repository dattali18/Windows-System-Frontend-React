import Library from "../../api/library.ts";

import MediaItem from "../mediaItem/mediaItem.tsx";



const LibraryItem = (library: Library) => {
  return (
    <div>
      <h2>{library.name}</h2>
      <p>Keywords: {library.keywords}</p>
      <ul>
        {library.media.map((media) => (
          <li key={media.imdbID}>
            <MediaItem
              title={media.title}
              year={media.year}
              type={media.type}
              poster={media.poster}
              imdbID={media.imdbID}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LibraryItem;
