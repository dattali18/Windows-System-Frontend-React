import Media from "./media.ts";

interface Library {
  id: number;
  name: string;
  keywords: string;
  media: Media[];
}

export default Library;
