import { useEffect, useState } from "react";
import { getAllLibraries } from "../../api/librariesApi.ts";

import LibraryItem from "../../components/libraryItem/libraryItem.tsx";

import Media from "../../api/media.ts";

const Libraries = () => {
  const [libraries, setLibraries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLibraries = async () => {
      setLoading(true);
      const libraries = await getAllLibraries();
      setLibraries(libraries);
      setLoading(false);
    };
    fetchLibraries();
  }, []);

  return (
    <div>
      <h1>Libraries</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {libraries?.length > 0 ? (
            libraries.map((library: { id: number; name: string, keywords: string, media: Media[] }) => (
              <li key={library.id}>
                <LibraryItem 
                id={library.id}
                name={library.name}
                keywords={library.keywords}
                media={library.media}
                />
              </li>
            ))
          ) : (
            <p>No libraries found.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default Libraries;
