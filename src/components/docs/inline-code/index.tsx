import * as styles from "./styles.css";
import React, { ReactNode } from "react";

export type InlineCodeProps = {
  children: ReactNode;
};

export const InlineCode: React.FC<InlineCodeProps> = (props) => {
  return <code className={styles.container}>{props.children}</code>;
};
