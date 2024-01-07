import * as styles from "./styles.css";
import React, { ReactNode } from "react";
import { Link } from "../../ui/link";
import { Divider } from "../../ui/divider";
import { ago, date } from "../../../utils/vender";
import { ArticleList } from "../../../contents/types";
import { t } from "../../../locales";

export type MetaInfoProps = {
  data: ArticleList;
};

export const MetaInfo: React.FC<MetaInfoProps> = ({ data }) => {
  // prettier-ignore
  return (
    <div className={styles.container}>
      <Link
        tooltip
        href={data.archives.link}
        className={styles.link}
        aria-label={t("archive.desc", data.archives.name)}
      >
        {date(data.published)}
      </Link>
      {ago(data.published, data.modified) > 1 && (
        <Link
          tooltip
          className={styles.link}
          href={data.archives.link}
          aria-label={t("article.modified.time", ago(new Date(), data.modified))}
        >
          &nbsp;{t("article.modified.desc")}
        </Link>
      )}
      {!!data.categories?.length && <Divider orientation="vertical" />}
      {data.categories
        ?.slice(0, 2)
        .map((i) => (
          <Link
            key={`category-${i.link}`}
            tooltip
            className={styles.link}
            href={i.link}
            aria-label={t("category.desc", i.name)}
          >
            {i.name}
          </Link>
        ))
        .reduce((all: ReactNode[], item, index) => {
          if (index !== 0) {
            all.push(" / ");
          }
          all.push(item);
          return all;
        }, [])}
      {!!data.tags?.length && <Divider orientation="vertical" />}
      {data.tags
        ?.slice(0, 3)
        .map((i) => (
          <Link
            key={`tag-${i.link}`}
            tooltip
            href={i.link}
            aria-label={t("tag.desc", i.name)}
            className={styles.link}
          >
            {i.name}
          </Link>
        ))
        .reduce((all: ReactNode[], item, index) => {
          if (index !== 0) {
            all.push(" / ");
          }
          all.push(item);
          return all;
        }, [])}
    </div>
  );
};
