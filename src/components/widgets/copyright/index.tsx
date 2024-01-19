import React from "react";
import { Link } from "../../ui/link";
import { date, resolve } from "../../../utils/vender";
import { ArticleList } from "../../../contents/types";
import { fetcher } from "../../../contents";
import { t } from "../../../locales";
import * as styles from "./styles.css";

export interface CopyrightProps {
  data: ArticleList;
}

export const Copyright: React.FC<CopyrightProps> = async (props) => {
  const [seo, author, license] = await Promise.all([fetcher.seo(), fetcher.author(), fetcher.license()]);
  return (
    <section className={styles.section}>
      <p className={styles.title}>{props.data.title}</p>
      <Link href={resolve(seo.link, props.data.link)}>{resolve(seo.link, props.data.link)}</Link>
      <ul className={styles.list}>
        <li>
          <p className={styles.item}>{t("article.copyright.license.name")}</p>
          <p className={styles.content} aria-label={t("article.copyright.license.desc", license.name)}>
            {license.name}
          </p>
        </li>
        <li>
          <p className={styles.item}>{t("article.copyright.author.name")}</p>
          <p className={styles.content} aria-label={t("article.copyright.author.desc", author.fullname)}>
            {author.fullname}
          </p>
        </li>
        <li>
          <p className={styles.item}>{t("article.copyright.published.name")}</p>
          <p className={styles.content} aria-label={t("article.copyright.published.desc", date(props.data.published))}>
            {date(props.data.published)}
          </p>
        </li>
      </ul>
      <p>{t("article.copyright.notice")}</p>
    </section>
  );
};
