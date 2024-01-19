import React from "react";
import { Caveat } from "next/font/google";
import { cx } from "@syfxlin/reve";
import { Image } from "../../ui/image";
import { fetcher } from "../../../contents";
import { t } from "../../../locales";
import * as styles from "./styles.css";

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
