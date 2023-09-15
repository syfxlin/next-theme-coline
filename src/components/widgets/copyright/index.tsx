"use client";
import * as styles from "./styles.css";
import React from "react";
import { Link } from "../../ui/link";
import { resolve } from "../../../utils/vender";
import { ArticleList, AuthorData, LicenseData, SeoData } from "../../../contents/types";

export type CopyrightProps = {
  data: ArticleList;
  seo: SeoData;
  author: AuthorData;
  license: LicenseData;
};

export const Copyright: React.FC<CopyrightProps> = (props) => {
  return (
    <section className={styles.section}>
      <p className={styles.title}>{props.data.title}</p>
      <Link href={resolve(props.seo.link, props.data.link)}>{resolve(props.seo.link, props.data.link)}</Link>
      <ul className={styles.list}>
        <li>
          <p className={styles.item}>许可协议</p>
          <p className={styles.content} aria-label={`许可协议：${props.license.name}`}>
            {props.license.name}
          </p>
        </li>
        <li>
          <p className={styles.item}>本文作者</p>
          <p className={styles.content} aria-label={`本文作者：${props.author.fullname}`}>
            {props.author.fullname}
          </p>
        </li>
        <li>
          <p className={styles.item}>发布于</p>
          <p className={styles.content} aria-label={`发布于：${props.data.published.toLocaleDateString()}`}>
            {props.data.published.toLocaleDateString()}
          </p>
        </li>
      </ul>
      <p>转载或引用本文时请遵守许可协议，注明出处、不得用于商业用途！</p>
    </section>
  );
};
