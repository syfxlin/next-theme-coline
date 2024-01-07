import * as styles from "./styles.css";
import React, { ReactNode } from "react";
import { Iconify } from "../../ui/iconify";
import { Link as ULink } from "../../ui/link";

export type LinkProps = {
  href: string;
  children: ReactNode;
};

export const Link: React.FC<LinkProps> = (props) => {
  const pair = props.href.split("$$");
  if (pair.length <= 1) {
    return (
      <ULink href={props.href} target="_blank" rel="nofollow noopener">
        {props.children}
      </ULink>
    );
  } else {
    return (
      <ULink href={pair[1]} target="_blank" rel="nofollow noopener" className={styles.link}>
        <Iconify icon={pair[0]} />
        {props.children}
      </ULink>
    );
  }
};
