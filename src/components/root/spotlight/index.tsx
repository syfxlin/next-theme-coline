"use client";
import React, { useState } from "react";
import useSWR from "swr";
import { background, container, header, icon, input, loading, root, section } from "./index.css";
import { Close, Search } from "@icon-park/react";
import { Button } from "../../ui/button";
import { useDebounce } from "react-use";
import { Loading } from "../../ui/loading";
import { ArticleInfo } from "../../layout/article-info";
import { Pagination } from "../../ui/pagination";
import { SearchResponse } from "../../../app/api/search/route";

const fetcher = async ([path, page, search]: [string, number, string]) => {
  const url = new URL(path, location.href);
  url.searchParams.set("page", String(page));
  url.searchParams.set("size", String(10));
  url.searchParams.set("query", search);
  const response = await fetch(url, { method: "GET" });
  const json = await response.json();
  const data = json as SearchResponse;
  const total = data.total;
  const items = data.items.map((i) => ({ ...i, published: new Date(i.published), modified: new Date(i.modified) }));
  return { total, items };
};

export type SpotlightProps = {
  active: boolean;
  setActive: (active: boolean) => void;
};

export const Spotlight: React.FC<SpotlightProps> = (props) => {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [debounce, setDebounce] = useState<string>("");

  useDebounce(() => setDebounce(search), 750, [search]);
  const query = useSWR(debounce ? ["/api/search", page, debounce] : null, fetcher);

  return (
    <section className={root} style={{ visibility: props.active ? "visible" : "hidden" }}>
      <div className={background} style={{ opacity: props.active ? 1 : 0 }} onClick={() => props.setActive(false)} />
      <div className={container} style={{ opacity: props.active ? 1 : 0 }}>
        <div className={header}>
          <Search className={icon} />
          <input
            className={input}
            type="text"
            placeholder="搜索..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button aria-label="关闭" onClick={() => props.setActive(false)}>
            <Close />
          </Button>
        </div>
        {(query.isLoading || query.data) && (
          <div className={section}>
            {query.isLoading && (
              <div className={loading}>
                <Loading />
              </div>
            )}
            {query.data?.items.map((item) => <ArticleInfo key={`search-${item.link}`} data={item} />)}
            {query.data && (
              <Pagination index={page} pages={Math.ceil(query.data.total / 10)} onPage={(page) => setPage(page)} />
            )}
          </div>
        )}
      </div>
    </section>
  );
};
