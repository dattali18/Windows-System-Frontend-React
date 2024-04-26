import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "../../pages/home/home.tsx";
import Libraries from "../../pages/libraries/libraries.tsx";
import Library from "../../pages/library/library.tsx";
import Media from "../../pages/media/media.tsx";
import LibraryForm from "../../pages/libraryForm/libraryForm.tsx";
import UpdateLibrary from "../../pages/updateLibrary/updateLibrary.tsx";
import Search from "../../pages/search/search.tsx";
import Layout from "../layout/layout.tsx";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="libraries" element={<Libraries />} />
          <Route path="library/:libraryId" element={<Library />} />
          <Route path="media/:mediaType/:imdbId" element={<Media />} />
          <Route path="library/create/:libraryId?" element={<LibraryForm />} />
          <Route
            path="library/update/:libraryId"
            element={<UpdateLibrary />}
          />
          <Route path="search" element={<Search />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
