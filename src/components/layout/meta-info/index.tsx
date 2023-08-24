"use client";
import React, { ReactNode } from "react";
import { container, link } from "./index.css";
import { Link } from "../../ui/link";
import { Divider } from "../../ui/divider";
import { ago } from "../../../utils/vender";
import { ArticleList } from "../../../contents/types";

export type MetaInfoProps = {
  data: ArticleList;
};

export const MetaInfo: React.FC<MetaInfoProps> = ({ data }) => {
  return (
    <div className={container}>
      <Link tippy href={data.archives.link} className={link} aria-label={`归档：${data.archives.name}`}>
        {data.published.toLocaleDateString()}
      </Link>
      {ago(data.published, data.modified) > 1 && (
        <Link
          tippy
          href={data.archives.link}
          className={link}
          aria-label={`修改于 ${ago(new Date(), data.modified)} 天前`}
        >
          &nbsp;(已编辑)
        </Link>
      )}
      {data.categories?.length && <Divider orientation="vertical" />}
      {data.categories
        ?.slice(0, 2)
        .map((i) => (
          <Link key={`category-${i.link}`} tippy href={i.link} aria-label={`分类：${i.name}`} className={link}>
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
      {data.tags?.length && <Divider orientation="vertical" />}
      {data.tags
        ?.slice(0, 3)
        .map((i) => (
          <Link key={`tag-${i.link}`} tippy href={i.link} aria-label={`标签：${i.name}`} className={link}>
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
