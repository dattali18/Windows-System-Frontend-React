import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "../../pages/home/home.tsx";
import Libraries from "../../pages/libraries/libraries.tsx";
import Library from "../../pages/library/library.tsx";
import Media from "../../pages/media/media.tsx";
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
          <Route path="library/create" element={<h1>Create Library</h1>} />
          <Route
            path="library:libraryId/update"
            element={<h1>Update Library</h1>}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
