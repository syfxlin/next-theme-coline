import React from "react";
import Link from "next/link";
import { MetaInfo } from "../meta-info";
import { Image } from "../../ui/image";
import { LinkButton } from "../../ui/button";
import { ArticleList } from "../../../contents/types";
import { t } from "../../../locales";
import * as styles from "./styles.css";

export interface ArticleInfoProps {
  data: ArticleList;
}

export const ArticleInfo: React.FC<ArticleInfoProps> = ({ data }) => {
  return (
    <article className={styles.article}>
      <section className={styles.section}>
        <Link href={data.link} aria-label={data.title} className={styles.title}>
          {data.title}
        </Link>
        <p className={styles.excerpt}>{data.body.excerpts}</p>
        <MetaInfo data={data} />
      </section>
      {data.thumbnail && <Image className={styles.thumbnail} src={data.thumbnail} alt={t("article.thumbnail")} />}
      <LinkButton href={data.link} aria-hidden={true} className={styles.link} />
    </article>
  );
};
