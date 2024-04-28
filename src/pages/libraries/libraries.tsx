import { useEffect, useState } from "react";
import { getAllLibraries } from "../../api/librariesApi.ts";

import LibraryItem from "../../components/libraryItem/libraryItem.tsx";

import Library from "../../api/library.ts";

import "./libraries.css";

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
    <div id="libraries">
      <h1 className="page-header">Libraries</h1>
      <div className="page-main">
        <div className="search-form">
          <input
            className="search-input"
            type="text"
            placeholder="Search Library"
            onChange={(e) => {
              const searchTerm = e.target.value;
              setFilteredLibraries([...libraries]);
              const filteredLibraries = libraries.filter(
                (library: { name: string }) => {
                  return library.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());
                }
              );
              setFilteredLibraries(filteredLibraries);
            }}
          />
        </div>
        {loading ? (
          <p className="loading">Loading...</p>
        ) : (
          <ul className="libraries">
            {filteredLibraries?.length > 0 ? (
              filteredLibraries.map((library: Library) => (
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
    </div>
  );
};

export default Libraries;
