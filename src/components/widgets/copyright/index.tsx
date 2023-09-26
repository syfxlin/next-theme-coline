import * as styles from "./styles.css";
import React from "react";
import { Link } from "../../ui/link";
import { date, resolve } from "../../../utils/vender";
import { ArticleList } from "../../../contents/types";
import { fetcher } from "../../../contents";

export type CopyrightProps = {
  data: ArticleList;
};

export const Copyright: React.FC<CopyrightProps> = async (props) => {
  const [seo, author, license] = await Promise.all([fetcher.seo(), fetcher.author(), fetcher.license()]);
  return (
    <section className={styles.section}>
      <p className={styles.title}>{props.data.title}</p>
      <Link href={resolve(seo.link, props.data.link)}>{resolve(seo.link, props.data.link)}</Link>
      <ul className={styles.list}>
        <li>
          <p className={styles.item}>许可协议</p>
          <p className={styles.content} aria-label={`许可协议：${license.name}`}>
            {license.name}
          </p>
        </li>
        <li>
          <p className={styles.item}>本文作者</p>
          <p className={styles.content} aria-label={`本文作者：${author.fullname}`}>
            {author.fullname}
          </p>
        </li>
        <li>
          <p className={styles.item}>发布于</p>
          <p className={styles.content} aria-label={`发布于：${date(props.data.published)}`}>
            {date(props.data.published)}
          </p>
        </li>
      </ul>
      <p>转载或引用本文时请遵守许可协议，注明出处、不得用于商业用途！</p>
    </section>
  );
};
