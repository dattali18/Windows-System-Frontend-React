import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Library from "../../api/library.ts";

import {
  getLibraryById,
  updateLibrary,
  createLibrary,
} from "../../api/librariesApi";

const LibraryForm = () => {
  // getting the optional libraryId parameter from the URL
  const { libraryId } = useParams();

  const [, setLibrary] = useState({} as Library);
  const [keywords, setKeywords] = useState([] as string[]);
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  // if the libraryId is present, fetch the library from the API
  useEffect(() => {
    if (libraryId) {
      const libraryIdNumber = parseInt(libraryId);
      const fetchLibrary = async () => {
        const library = await getLibraryById(libraryIdNumber);
        setLibrary(library);
        setName(library.name);
        setKeywords(library.keywords.split(","));
        setIsLoading(false); // Set loading state to false after fetching the library
      };
      fetchLibrary();
    } else {
      setIsLoading(false); // Set loading state to false if there is no libraryId
    }
  }, [libraryId]);

  const navigate = useNavigate();

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // get the name and keywords from the form
    // get the id from the URL if it exists
    // call the createLibrary or updateLibrary API function
    // redirect to the update library page with id given by the API
    const formData = {
        name,
        keywords: keywords.join(","),
    };
    if (libraryId) {
        console.log("Updating library with ID:", libraryId);
        
        // Update library
        // Call updateLibrary API function
        const response = await updateLibrary(libraryId, formData);
        // Redirect to the updated library page
        navigate(`/library/${response.id}`);

    } else {
        // Create library
        // Call createLibrary API function
        const response = await createLibrary(formData);
        // Redirect to the created library page
        navigate(`/library/update/${response.id}`);
    }
  };

  const allKeywords = [
    "Horror",
    "Comedy",
    "Action",
    "Drama",
    "Romance",
    "Sci-Fi",
  ];

  return (
    <>
      {isLoading ? ( // Conditionally render the form based on loading state
        <div>Loading...</div>
      ) : (
        <form onSubmit={handleOnSubmit}>
          <h1>{libraryId ? "Update" : "Create"} Library</h1>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label>Keywords</label>
            <div>
              {allKeywords.map((keyword) => (
                <div key={keyword}>
                  <input
                    type="checkbox"
                    id={keyword}
                    value={keyword}
                    checked={keywords.includes(keyword)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setKeywords([...keywords, keyword]);
                      } else {
                        setKeywords(keywords.filter((k) => k !== keyword));
                      }
                    }}
                  />
                  <label htmlFor={keyword}>{keyword}</label>
                </div>
              ))}
            </div>
          </div>
          <button type="submit">
            {libraryId ? "Update" : "Create"} Library
          </button>
        </form>
      )}
    </>
  );
};

export default LibraryForm;
