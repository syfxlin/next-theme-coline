import React from "react";
import Link from "next/link";
import { cx } from "@syfxlin/reve";
import { MetaInfo } from "../meta-info";
import { Image } from "../../ui/image";
import { LinkButton } from "../../ui/button";
import { ArticleList } from "../../../contents/types";
import { t } from "../../../locales";
import * as styles from "./styles.css";

export interface ArticleInfoProps {
  step: number;
  data: ArticleList;
}

export const ArticleInfo: React.FC<ArticleInfoProps> = ({ step, data }) => {
  return (
    <article className={cx("slide-enter", styles.article)} style={{ "--enter-step": step } as any}>
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
