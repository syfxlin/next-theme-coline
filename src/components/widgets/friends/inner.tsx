import * as styles from "./styles.css";
import React, { useMemo } from "react";
import { FriendsData } from "../../../contents/types";
import { shuffle } from "../../../utils/vender";
import { LinkButton } from "../../ui/button";
import { Image } from "../../ui/image";
import { Tippy } from "../../ui/tippy";
import { Grid } from "../../layouts/grid";

export type FriendsInnerProps = {
  data: FriendsData;
};

export const FriendsInner: React.FC<FriendsInnerProps> = ({ data }) => {
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
          rel="nofollow noopener noreferrer"
        >
          <Image src={i.avatar} alt={i.name} className={styles.avatar} />
          <div className={styles.section}>
            <span className={styles.name}>{i.name}</span>
            <span className={styles.text}>{i.author || <span className={styles.text}>-</span>}</span>
            <Tippy visible={i.description ? undefined : false} content={i.description} animation="shift-away">
              <span className={styles.text}>{i.description || <span className={styles.text}>-</span>}</span>
            </Tippy>
          </div>
        </LinkButton>
      ))}
    </Grid>
  );
};
