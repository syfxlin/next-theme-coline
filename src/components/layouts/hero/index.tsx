import * as styles from "./styles.css";
import React from "react";
import { Image } from "../../ui/image";
import { fetcher } from "../../../contents";

export const Hero: React.FC = async () => {
  const author = await fetcher.author();
  return (
    <section className={styles.section}>
      <Image className={styles.avatar} src={author.avatar} alt="头像" />
      <h1 className={styles.author}>{author.fullname}</h1>
      <p className={styles.description}>{author.description}</p>
    </section>
  );
};
