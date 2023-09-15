import * as styles from "./styles.css";
import React from "react";
import Link from "next/link";
import { MetaInfo } from "../meta-info";
import { Image } from "../../ui/image";
import { LinkButton } from "../../ui/button";
import { ArticleList } from "../../../contents/types";
import { cx } from "@syfxlin/reve";

export type ArticleInfoProps = {
  step: number;
  data: ArticleList;
};

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
      {data.thumbnail && <Image className={styles.thumbnail} src={data.thumbnail} alt={`缩略图：${data.title}`} />}
      <LinkButton href={data.link} aria-hidden={true} className={styles.link} />
    </article>
  );
};
