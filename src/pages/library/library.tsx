import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import { getLibraryById, deleteLibrary } from "../../api/librariesApi.ts";

import { default as LibraryProps } from "../../api/library.ts";
import Media from "../../api/media.ts";

import MediaItem from "../../components/mediaItem/mediaItem.tsx";

const Library = () => {
  // get the libraryId from the URL
  const { libraryId } = useParams();

  const libraryIdInt = parseInt(libraryId || "0");

  const [library, setLibrary] = useState({} as LibraryProps);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

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

  const handleDelete = async () => {
    // check if the user wants to delete the library
    // call the deleteLibrary API function
    // redirect to the libraries page
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${library.name}?`
    );
    
    if (!confirmDelete) {
      return;
    }

    await deleteLibrary(libraryIdInt);
    navigate("/libraries");
  };

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h1>{library.name}</h1>
          <ul>
            {library.keywords.split(",").map((keyword: string) => (
              <li key={keyword}>{keyword}</li>
            ))}
          </ul>
        </div>
      )}
      <div>
        <Link to={`/library/update/${libraryId}`}>Update</Link>
        <button onClick={handleDelete}>Delete</button>
      </div>
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
