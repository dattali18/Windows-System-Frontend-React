import { Link } from "react-router-dom";
import Library from "../../api/library.ts";

// import MediaItem from "../mediaItem/mediaItem.tsx";

const LibraryItem = (library: Library) => {
  return (
    <div>
      <Link to={`/library/${library.id}`}>
        <h1>{library.name}</h1>
      </Link>
      <ul>
        {library.keywords.split(",").map((keyword: string) => (
          <li key={keyword}>{keyword}</li>
        ))}
      </ul>
    </div>
  );
};

export default LibraryItem;
