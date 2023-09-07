"use client";
import React from "react";
import useSWR from "swr";
import { ScraperResponse } from "../../app/api/scraper/route";
import { Link } from "../ui/link";
import { AspectRatio } from "../ui/aspect-ratio";
import { container, left, right } from "./article.css";

const fetcher = async ([path, link]: [string, string]) => {
  const url = new URL(path, location.href);
  url.searchParams.set("link", link);
  const response = await fetch(url, { method: "GET" });
  const json = await response.json();
  return json as ScraperResponse;
};

export type ArticleProps = {
  link: string;
  title?: string;
};

export const Article: React.FC<ArticleProps> = React.memo((props) => {
  const query = useSWR(["/api/scraper", props.link], fetcher);
  return (
    <div className={container}>
      <div className={left}>
        <Link href={props.link} aria-label={query.data?.title ?? props.title ?? props.link}>
          {query.data?.title ?? props.title ?? props.link}
        </Link>
        {query.data?.excerpt && <div>{query.data.excerpt}</div>}
      </div>
      {query.data?.thumbnail && (
        <div className={right}>
          <AspectRatio ratio={1}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={query.data.thumbnail} alt={`缩略图：${query.data?.title ?? props.title ?? props.link}`} />
          </AspectRatio>
        </div>
      )}
    </div>
  );
});
