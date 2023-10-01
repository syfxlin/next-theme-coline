"use client";
import React from "react";
import { ArticleInner } from "./inner";
import { useAdapter } from "../../../adapters/use-adapter";
import { ScraperRequest, ScraperResponse } from "../../../adapters/scraper-adapter";

export const Article: React.FC<ScraperRequest> = React.memo((props) => {
  const query = useAdapter<ScraperRequest, ScraperResponse>("/api/scraper", props);
  return <ArticleInner {...query} />;
});
