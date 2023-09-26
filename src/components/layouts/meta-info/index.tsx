import * as styles from "./styles.css";
import React, { ReactNode } from "react";
import { Link } from "../../ui/link";
import { Divider } from "../../ui/divider";
import { ago, date } from "../../../utils/vender";
import { ArticleList } from "../../../contents/types";

export type MetaInfoProps = {
  data: ArticleList;
};

export const MetaInfo: React.FC<MetaInfoProps> = ({ data }) => {
  return (
    <div className={styles.container}>
      <Link tippy href={data.archives.link} className={styles.link} aria-label={`归档：${data.archives.name}`}>
        {date(data.published)}
      </Link>
      {ago(data.published, data.modified) > 1 && (
        <Link
          tippy
          href={data.archives.link}
          className={styles.link}
          aria-label={`修改于 ${ago(new Date(), data.modified)} 天前`}
        >
          &nbsp;(已编辑)
        </Link>
      )}
      {!!data.categories?.length && <Divider orientation="vertical" />}
      {data.categories
        ?.slice(0, 2)
        .map((i) => (
          <Link key={`category-${i.link}`} tippy href={i.link} aria-label={`分类：${i.name}`} className={styles.link}>
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
          <Link key={`tag-${i.link}`} tippy href={i.link} aria-label={`标签：${i.name}`} className={styles.link}>
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
