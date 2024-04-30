import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Library from "../../api/library.ts";

import {
  createLibrary,
  getLibraryById,
  updateLibrary,
} from "../../api/librariesApi";

import "./libraryForm.css";

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
        <>
          <h1 className="page-header">
            {libraryId ? "Update" : "Create"} Library
          </h1>
          <div className="page-main">
            <form 
            className="library-form"
            onSubmit={handleOnSubmit}>
              <div className="input-group">
                <label className="input-label" htmlFor="name">
                  Name
                </label>
                <input
                  className="input-field"
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="input-group">
                <label className="input-label" htmlFor="keywords">
                  Keywords
                </label>
                <div className="input-checkboxes">
                  {allKeywords.map((keyword) => (
                    <div className="input-checkbox-group" key={keyword}>
                      <input
                        className="input-checkbox"
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
              <button className="btn submit-btn" type="submit">
                {libraryId ? "Update" : "Create"} Library
              </button>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default LibraryForm;
