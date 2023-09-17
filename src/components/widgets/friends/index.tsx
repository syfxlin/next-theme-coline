"use client";
import * as styles from "./styles.css";
import React, { useMemo } from "react";
import { FriendsData } from "../../../contents/types";
import { shuffle } from "../../../utils/vender";
import { LinkButton } from "../../ui/button";
import { Image } from "../../ui/image";
import { Grid } from "../../layouts/grid";

export type FriendsProps = {
  data: FriendsData;
};

export const Friends: React.FC<FriendsProps> = ({ data }) => {
  const links = useMemo(() => shuffle(data.links), [data.links]);
  return (
    <Grid>
      {links.map((i) => (
        <LinkButton
          key={`link-${i.link}`}
          className={styles.link}
          href={i.link}
          aria-label={`友链：${i.name}`}
          target="_blank"
        >
          <Image src={i.avatar} alt={i.name} className={styles.avatar} />
          <span className={styles.section}>
            <span className={styles.name}>{i.name}</span>
            <span className={styles.text}>{i.author || <span className={styles.text}>-</span>}</span>
            <span className={styles.text}>{i.description || <span className={styles.text}>-</span>}</span>
          </span>
        </LinkButton>
      ))}
    </Grid>
  );
};
