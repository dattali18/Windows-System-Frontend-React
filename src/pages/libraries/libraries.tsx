import { useEffect, useState } from "react";
import { getAllLibraries } from "../../api/librariesApi.ts";

import LibraryItem from "../../components/libraryItem/libraryItem.tsx";

import Media from "../../api/media.ts";
import Library from "../../api/library.ts";

const Libraries = () => {
  const [libraries, setLibraries] = useState([] as Library[]);
  const [loading, setLoading] = useState(true);

  const [filteredLibraries, setFilteredLibraries] = useState([] as Library[]);

  useEffect(() => {
    const fetchLibraries = async () => {
      setLoading(true);
      const libraries = await getAllLibraries();
      setLibraries(libraries);
      setFilteredLibraries(libraries);
      setLoading(false);
    };
    fetchLibraries();
  }, []);

  return (
    <div>
      <h1>Libraries</h1>
      {/* adding an text filed for searching through the libraries */}
      <input
        type="text"
        placeholder="Search Library"
        onChange={(e) => {
          const searchTerm = e.target.value;
          setFilteredLibraries([...libraries]);
          const filteredLibraries = libraries.filter((library: { name: string }) => {
            return library.name.toLowerCase().includes(searchTerm.toLowerCase());
          });
          setFilteredLibraries(filteredLibraries);
        }}
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {filteredLibraries?.length > 0 ? (
            filteredLibraries.map((library: { id: number; name: string, keywords: string, media: Media[] }) => (
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
