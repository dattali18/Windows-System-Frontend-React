import { Link } from "react-router-dom";
import Library from "../../api/library.ts";

import "./libraryItem.css";

const LibraryItem = (library: Library) => {
  return (
    <div className="library-item">
      <Link className="library-item-header" to={`/library/${library.id}`}>
        <h1>{library.name}</h1>
      </Link>
      <ul className="library-keywords">
        {library.keywords.split(",").map((keyword: string) => (
          <li className={"keyword tag-pink"} key={keyword}>
            {keyword}
          </li>
        ))}
      </ul>
      <p className="library-media">
        {library.media.length} {library.media.length === 1 ? "item" : "items"}
      </p>
    </div>
  );
};

export default LibraryItem;
