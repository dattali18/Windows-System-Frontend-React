import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Library from "../../api/library.ts";
import Media from "../../api/media.ts";

import { getLibraryById } from "../../api/librariesApi";
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
  return (
    <>
      {loadingLibrary ? (
        <p>Loading library...</p>
      ) : (
        <div>
          <h2>{library.name}</h2>
          <p>{library.keywords}</p>
          <div>
            {library.media.map((media: Media) => (
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
          </div>
        </div>
      )}
      <h2>Search</h2>
      <input
        type="text"
        placeholder="Search for a movie or TV series"
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />
      <button
        onClick={() => {
          handleSearch("movie", searchTerm);
        }}
      >
        Search
      </button>
      {loadingMedias ? (
        <p>Loading...</p>
      ) : (
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
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default UpdateLibrary;
