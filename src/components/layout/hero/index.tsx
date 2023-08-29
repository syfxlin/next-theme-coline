"use client";
import * as styles from "./index.css";
import React from "react";
import { Image } from "../../ui/image";
import { AuthorData } from "../../../contents/types";

export type HeroProps = {
  author: AuthorData;
};

export const Hero: React.FC<HeroProps> = (props) => {
  return (
    <section className={styles.section}>
      <Image className={styles.avatar} src={props.author.avatar} alt="头像" />
      <h1 className={styles.author}>{props.author.fullname}</h1>
      <p className={styles.description}>{props.author.description}</p>
    </section>
  );
};
