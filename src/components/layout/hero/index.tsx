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
      <Image
        className={styles.avatar}
        alt="头像"
        src={props.author.avatar.src}
        width={props.author.avatar.width}
        height={props.author.avatar.height}
        blurDataURL={props.author.avatar.blurDataURL}
        blurWidth={props.author.avatar.blurWidth}
        blurHeight={props.author.avatar.blurHeight}
      />
      <h1 className={styles.author}>{props.author.fullname}</h1>
      <p className={styles.description}>{props.author.description}</p>
    </section>
  );
};
