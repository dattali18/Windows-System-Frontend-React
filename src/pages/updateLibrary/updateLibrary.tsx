import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import Library from "../../api/library.ts";
import Media from "../../api/media.ts";

import {
  addMovieToLibrary,
  addTvSeriesToLibrary,
  deleteMovieFromLibrary,
  deleteTvSeriesFromLibrary,
  getLibraryById,
} from "../../api/librariesApi";
import { searchMovies } from "../../api/moviesApi";
import { searchTvSeries } from "../../api/tvSeriesApi";

import MediaItem from "../../components/mediaItem/mediaItem.tsx";
import {default as AddIcon} from "../../components/icons/add.tsx";
import {default as RemoveIcon} from "../../components/icons/remove.tsx";

import "./updateLibrary.css";

const UpdateLibrary = () => {
  // getting the libraryId parameter from the URL
  const { libraryId } = useParams();
  // converting to number
  const libraryIdNumber = parseInt(libraryId ?? "");

  const [library, setLibrary] = useState({} as Library);
  const [loadingLibrary, setLoadingLibrary] = useState(true);

  const [medias, setMedias] = useState([] as Media[]);
  const [loadingMedias, setLoadingMedias] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [mediaType, setMediaType] = useState("movie");

  // fetch the library data
  useEffect(() => {
    const fetchLibrary = async () => {
      try {
        const library = await getLibraryById(libraryIdNumber);
        setLibrary(library);
      } catch (error) {
        console.error("Error fetching library:", error);
      } finally {
        setLoadingLibrary(false);
      }
    };
    fetchLibrary();
  }, [libraryIdNumber]);

  const handleSearch = searchForMedias(setLoadingMedias, setMedias);
  const handleRemove = removeItemFromLibrary(
    setLoadingLibrary,
    libraryIdNumber,
    setLibrary
  );
  const handleAdd = addItemToLibrary(
    setLoadingLibrary,
    libraryIdNumber,
    setLibrary
  );

  return (
    <>
      {loadingLibrary ? (
        <p>Loading library...</p>
      ) : (
        LibraryComponent(library, handleRemove)
      )}
      <h1 className="page-header">Search</h1>
      <div className="page-main">
        <div className="search-form">
          <input
            className="search-input"
            type="text"
            placeholder="Search for a movie or TV series"
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
          <select
            className="search-select"
            onChange={(e) => setMediaType(e.target.value)}
          >
            <option value="movie">Movie</option>
            <option value="tv">TV Series</option>
          </select>
          <button
            className="search-button"
            onClick={() => {
              handleSearch(mediaType, searchTerm);
            }}
          >
            Search
          </button>
        </div>
      </div>
      {loadingMedias ? (
        <p>Loading...</p>
      ) : (
        SearchMediaComponent(medias, handleAdd)
      )}
    </>
  );
};

export default UpdateLibrary;

function searchForMedias(
  setLoadingMedias: React.Dispatch<React.SetStateAction<boolean>>,
  setMedias: React.Dispatch<React.SetStateAction<Media[]>>
) {
  return async (mediaType: string, searchTerm: string) => {
    try {
      setLoadingMedias(true);
      if (mediaType === "movie") {
        const movies = await searchMovies(searchTerm);
        setMedias(movies);
      } else if (mediaType === "tv") {
        const tvSeries = await searchTvSeries(searchTerm);
        setMedias(tvSeries);
      }
      setLoadingMedias(false);
    } catch (error) {
      console.error("Error searching media:", error);
    } finally {
      setLoadingMedias(false);
    }
  };
}

function addItemToLibrary(
  setLoadingLibrary: React.Dispatch<React.SetStateAction<boolean>>,
  libraryIdNumber: number,
  setLibrary: React.Dispatch<React.SetStateAction<Library>>
) {
  return async (imdbID: string, mediaType: string) => {
    try {
      setLoadingLibrary(true);
      if (mediaType === "movie") {
        await addMovieToLibrary(libraryIdNumber, imdbID);
      } else {
        await addTvSeriesToLibrary(libraryIdNumber, imdbID);
      }
      const updatedLibrary = await getLibraryById(libraryIdNumber);
      setLibrary(updatedLibrary);
      setLoadingLibrary(false);
    } catch (error) {
      console.error("Error adding media:", error);
    } finally {
      setLoadingLibrary(false);
    }
  };
}

function removeItemFromLibrary(
  setLoadingLibrary: React.Dispatch<React.SetStateAction<boolean>>,
  libraryIdNumber: number,
  setLibrary: React.Dispatch<React.SetStateAction<Library>>
) {
  return async (imdbID: string, mediaType: string) => {
    try {
      // check with the user is he is sure to remove the media
      const confirmRemove = window.confirm(
        "Are you sure you want to remove this media?"
      );
      if (!confirmRemove) {
        return;
      }
      // console.log(`remove media with imdbID ${imdbID} & mediaType ${mediaType}`);
      setLoadingLibrary(true);
      if (mediaType === "movie") {
        await deleteMovieFromLibrary(libraryIdNumber, imdbID);
      } else if (mediaType === "series") {
        await deleteTvSeriesFromLibrary(libraryIdNumber, imdbID);
      }
      const updatedLibrary = await getLibraryById(libraryIdNumber);
      setLibrary(updatedLibrary);
      setLoadingLibrary(false);
    } catch (error) {
      console.error("Error removing media:", error);
    } finally {
      setLoadingLibrary(false);
    }
  };
}

function SearchMediaComponent(
  medias: Media[],
  handleAdd: (imdbID: string, mediaType: string) => Promise<void>
) {
  return (
    <div>
      <ul className="media-list">
        {medias.map((media: Media) => (
          <li className="media-list-item" key={media.imdbID}>
            <MediaItem
              title={media.title}
              year={media.year}
              type={media.type}
              poster={media.poster}
              imdbID={media.imdbID}
            />
            <button
            className="btn add-btn"
              onClick={() => {
                handleAdd(media.imdbID, media.type);
              }}
            >
              <AddIcon className="icon white-icon" />
              Add
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function LibraryComponent(
  library: Library,
  handleRemove: (imdbID: string, mediaType: string) => Promise<void>
) {
  // const navigate = useNavigate();
  return (
    <div>
      <h1 className="page-header">{library.name}</h1>
      {/* <p>{library.keywords}</p> */}
      <div className="controller">
        <ul className="library-keywords">
          {library.keywords.split(",").map((keyword: string) => (
            <li className={"keyword tag-blue"} key={keyword}>
              {keyword}
            </li>
          ))}
        </ul>
        <Link className="btn update-btn" to={"/library/create/" + library.id}>
          update
        </Link>
      </div>
      <div>
        <ul className="media-list">
          {library.media.map((media: Media) => (
            <li className="media-list-item" key={media.imdbID}>
              <MediaItem
                title={media.title}
                year={media.year}
                type={media.type}
                poster={media.poster}
                imdbID={media.imdbID}
              />
              <button
                className="btn remove-btn"
                onClick={() => {
                  handleRemove(media.imdbID, media.type);
                }}
              >
                <RemoveIcon className="icon white-icon" />
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
