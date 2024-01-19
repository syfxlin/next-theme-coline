import React, { ReactNode } from "react";
import * as styles from "./styles.css";

export interface BlockquoteProps {
  children: ReactNode;
}

export const Blockquote: React.FC<BlockquoteProps> = (props) => {
  return <blockquote className={styles.container}>{props.children}</blockquote>;
};
