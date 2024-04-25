import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "../layout/layout.tsx";
import Home from "../../pages/home/home.tsx";
import Libraries from "../../pages/libraries/libraries.tsx";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="libraries" element={<Libraries />} />
          <Route path="library/:libraryId" element={<h1>Library</h1>} />
          <Route path="media/:mediaId" element={<h1>Media</h1>} />
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