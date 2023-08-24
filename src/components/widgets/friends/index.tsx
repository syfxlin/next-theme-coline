"use client";
import * as styles from "./index.css";
import React, { useMemo } from "react";
import Tippy from "@tippyjs/react";
import { LinkData } from "../../../contents/types";
import { shuffle } from "../../../utils/vender";
import { LinkButton } from "../../ui/button";
import { Image } from "../../ui/image";

export type FriendsProps = {
  data: LinkData;
};

export const Friends: React.FC<FriendsProps> = ({ data }) => {
  const links = useMemo(() => shuffle(data.links), [data.links]);
  return (
    <section className={styles.container}>
      {links.map((i) => (
        <LinkButton
          key={`link-${i.link}`}
          className={styles.link}
          href={i.link}
          aria-label={`友链：${i.name}`}
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          <Image {...i.avatar} alt={i.name} className={styles.avatar} />
          <div className={styles.section}>
            <span className={styles.name}>{i.name}</span>
            <span className={styles.text}>{i.author ?? <span className={styles.text}>&nbsp;</span>}</span>
            <Tippy visible={!i.description ? false : undefined} content={i.description} animation="shift-away">
              <span className={styles.text}>{i.description ?? <span className={styles.text}>No Note</span>}</span>
            </Tippy>
          </div>
        </LinkButton>
      ))}
    </section>
  );
};

export default Friends;
