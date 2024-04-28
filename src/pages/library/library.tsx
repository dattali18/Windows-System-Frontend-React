import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { deleteLibrary, getLibraryById } from "../../api/librariesApi.ts";

import { default as LibraryProps } from "../../api/library.ts";
import Media from "../../api/media.ts";

import MediaItem from "../../components/mediaItem/mediaItem.tsx";

import "./library.css";

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
        <p className="loading">Loading...</p>
      ) : (
        <div id="library">
          <h1 className="page-header">{library.name}</h1>
          <div className="controller">
            <ul className="library-keywords">
              {library.keywords.split(",").map((keyword: string) => (
                <li className="keyword tag-blue" key={keyword}>
                  {keyword}
                </li>
              ))}
            </ul>
            <div className="library-control">
              <Link
                className="update-btn btn"
                to={`/library/update/${libraryId}`}
              >
                Update
              </Link>
              <button className="delete-btn btn" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <h2 className="media-header">Media</h2>
      <ul className="media-list">
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
          <p className="library-not-found">No media found.</p>
        )}
      </ul>
    </>
  );
};

export default Library;
