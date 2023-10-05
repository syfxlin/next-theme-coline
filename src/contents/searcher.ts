import Fuse from "fuse.js";
import { ArticleData } from "./types";
import React from "react";
import { fetcher } from "./fetcher";

export const searcher: () => Promise<Fuse<ArticleData>> = React.cache(async () => {
  const query = await fetcher.posts();
  return new Fuse(query.items, {
    includeScore: true,
    useExtendedSearch: true,
    keys: [
      { name: "title", weight: 5 },
      { name: "body.excerpts", weight: 4 },
      { name: "body.contents", weight: 3 },
      { name: "categories", weight: 3 },
      { name: "tags", weight: 3 },
      { name: "link", weight: 2 },
      { name: "published", weight: 2 },
      { name: "modified", weight: 2 },
    ],
  });
});
