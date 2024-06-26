"use client";
import React, { useState } from "react";
import useSWR from "swr";
import { createPortal } from "react-dom";
import { useDebounce } from "react-use";
import { ClientOnly } from "../../ui/client-only/ClientOnly";
import { Button } from "../../ui/button";
import { Loading } from "../../ui/loading";
import { ArticleInfo } from "../../layouts/article-info";
import { Pagination } from "../../ui/pagination";
import { SearchResponse } from "../../../app/api/search/route";
import { Iconify } from "../../ui/iconify/client";
import { t } from "../../../locales";
import * as styles from "./styles.css";

async function fetcher([path, page, search]: [string, number, string]) {
  const url = new URL(path, location.href);
  url.searchParams.set("page", String(page));
  url.searchParams.set("size", String(10));
  url.searchParams.set("query", search);
  const response = await fetch(url, { method: "GET" });
  const json = await response.json();
  const data = json as SearchResponse;
  const total = data.total;
  const items = data.items.map(i => ({ ...i, published: new Date(i.published), modified: new Date(i.modified) }));
  return { total, items };
}

export interface SpotlightProps {
  active: boolean;
  setActive: (active: boolean) => void;
}

export const Spotlight: React.FC<SpotlightProps> = (props) => {
  const [page, setPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [debounce, setDebounce] = useState<string>("");

  useDebounce(() => setDebounce(search), 750, [search]);
  const query = useSWR(debounce ? ["/api/search", page, debounce] : null, fetcher);

  return (
    <ClientOnly>
      {() => createPortal(
        <section className={styles.root} style={{ visibility: props.active ? "visible" : "hidden" }}>
          <div
            className={styles.background}
            style={{ opacity: props.active ? 1 : 0 }}
            onClick={() => props.setActive(false)}
          />
          <div className={styles.container} style={{ opacity: props.active ? 1 : 0 }}>
            <div className={styles.header}>
              <div className={styles.icon}>
                <Iconify icon={styles.icon_search} />
              </div>
              <input
                className={styles.input}
                type="text"
                value={search}
                placeholder={t("spotlight.input")}
                onChange={(e) => {
                  setPage(1);
                  setSearch(e.target.value);
                }}
              />
              <Button aria-label={t("spotlight.close")} onClick={() => props.setActive(false)}>
                <Iconify icon={styles.icon_close} />
              </Button>
            </div>
            {(query.isLoading || query.data) && (
              <div className={styles.section}>
                {query.isLoading && <Loading />}
                {query.data?.items.map(item => (
                  <ArticleInfo key={`search-${item.link}`} data={item} />
                ))}
                {query.data && (
                  <Pagination index={page} pages={Math.ceil(query.data.total / 10)} onPage={page => setPage(page)} />
                )}
              </div>
            )}
          </div>
        </section>,
        document.body,
      )}
    </ClientOnly>
  );
};
