import React from "react";
import { AdapterResponse } from "../../../adapters/adapter";
import { ScraperRequest, ScraperResponse } from "../../../adapters/scraper-adapter";
import * as styles from "./styles.css";
import { Link } from "../../ui/link";
import { AspectRatio } from "../../ui/aspect-ratio";
import { t } from "../../../locales";

export const ArticleInner: React.FC<AdapterResponse<ScraperRequest, ScraperResponse>> = React.memo((query) => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Link href={query.params.link} aria-label={query.data?.title ?? query.params.title ?? query.params.link}>
          {query.data?.title ?? query.params.title ?? query.params.link}
        </Link>
        {query.data?.excerpt && <div>{query.data.excerpt}</div>}
      </div>
      {query.data?.thumbnail && (
        <div className={styles.right}>
          <AspectRatio ratio={1}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={query.data.thumbnail} alt={t("article.thumbnail")} />
          </AspectRatio>
        </div>
      )}
    </div>
  );
});
