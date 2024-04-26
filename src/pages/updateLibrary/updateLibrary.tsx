import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

const UpdateLibrary = () => {
  // getting the libraryId parameter from the URL
  const { libraryId } = useParams();
  // converting to number
  const libraryIdNumber = parseInt(libraryId ?? "");

  const [library, setLibrary] = useState({} as Library);
  const [loadingLibrary, setLoadingLibrary] = useState(true);

  const [medias, setMedias] = useState([]);
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

  const handleSearch = async (mediaType: string, searchTerm: string) => {
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

  const handleRemove = async (imdbID: string, mediaType: string) => {
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

  const handleAdd = async (imdbID: string, mediaType: string) => {
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

  return (
    <>
      {loadingLibrary ? (
        <p>Loading library...</p>
      ) : (
        LibraryComponent(library, handleRemove)
      )}
      <h1>Search</h1>
      <input
        type="text"
        placeholder="Search for a movie or TV series"
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />
      <select onChange={(e) => setMediaType(e.target.value)}>
        <option value="movie">Movie</option>
        <option value="tv">TV Series</option>
      </select>
      <button
        onClick={() => {
          handleSearch(mediaType, searchTerm);
        }}
      >
        Search
      </button>
      {loadingMedias ? (
        <p>Loading...</p>
      ) : (
        SearchMediaComponent(medias, handleAdd)
      )}
    </>
  );
};

export default UpdateLibrary;

function SearchMediaComponent(
  medias: never[],
  handleAdd: (imdbID: string, mediaType: string) => Promise<void>
) {
  return (
    <div>
      <ul>
        {medias.map((media: Media) => (
          <li key={media.imdbID}>
            <MediaItem
              title={media.title}
              year={media.year}
              type={media.type}
              poster={media.poster}
              imdbID={media.imdbID}
            />
            <button
              onClick={() => {
                handleAdd(media.imdbID, media.type);
              }}
            >
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
  return (
    <div>
      <h2>{library.name}</h2>
      <p>{library.keywords}</p>
      <div>
        <ul>
          {library.media.map((media: Media) => (
            <li key={media.imdbID}>
              <MediaItem
                title={media.title}
                year={media.year}
                type={media.type}
                poster={media.poster}
                imdbID={media.imdbID}
              />
              <button
                onClick={() => {
                  handleRemove(media.imdbID, media.type);
                }}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
