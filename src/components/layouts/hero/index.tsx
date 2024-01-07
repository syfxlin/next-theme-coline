import * as styles from "./styles.css";
import React from "react";
import { Caveat } from "next/font/google";
import { Image } from "../../ui/image";
import { cx } from "@syfxlin/reve";
import { fetcher } from "../../../contents";
import { t } from "../../../locales";

const caveat = Caveat({ subsets: ["latin"] });

export const Hero: React.FC = async () => {
  const author = await fetcher.author();
  return (
    <section className={styles.section}>
      <Image className={styles.avatar} src={author.avatar} alt={t("article.avatar")} />
      <h1 className={cx(styles.author, caveat.className)}>{author.fullname}</h1>
      <p className={styles.description}>{author.description}</p>
    </section>
  );
};
