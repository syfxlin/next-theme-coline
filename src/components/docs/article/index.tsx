import React from "react";
import { ScraperAdapter, ScraperRequest } from "../../../adapters/scraper-adapter";
import { ArticleInner } from "./inner";

const adapter = new ScraperAdapter();

export const Article: React.FC<ScraperRequest> = React.memo(async (params) => {
  const query = await adapter.component(params);
  return <ArticleInner {...query} />;
});
