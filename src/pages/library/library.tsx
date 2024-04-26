import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getLibraryById } from "../../api/librariesApi";

import Media from "../../api/media";

import MediaItem from "../../components/mediaItem/mediaItem";

const Library = () => {
  // get the libaryId from the URL
  const { libraryId } = useParams();

  const libraryIdInt = parseInt(libraryId || "0");

  const [library, setLibrary] = useState(
    {} as { name: string; keywords: string; media: [] }
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLibrary = async () => {
      setLoading(true);
      // fetch the library by the libraryId
      const library = await getLibraryById(libraryIdInt);
      setLibrary(library);
      // set the library state
      setLoading(false);
    };
    fetchLibrary();
  }, [libraryIdInt]);

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h1>{library.name}</h1>
          <h2>{library.keywords}</h2>
        </div>
      )}
      <h2>Media</h2>
      <ul>
        {library.media?.length > 0 ? (
          library.media.map((media: Media) => (
            <li key={media.imdbID}>
              <MediaItem
                title={media.title}
                year={media.year}
                type={media.type}
                poster={media.poster}
                imdbID={media.imdbID}
              />
            </li>
          ))
        ) : (
          <p>No media found.</p>
        )}
      </ul>
    </>
  );
};

export default Library;
