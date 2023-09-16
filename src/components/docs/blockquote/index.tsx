import * as styles from "./styles.css";
import React, { ReactNode } from "react";

export type BlockquoteProps = {
  children: ReactNode;
};

export const Blockquote: React.FC<BlockquoteProps> = (props) => {
  return <blockquote className={styles.container}>{props.children}</blockquote>;
};
