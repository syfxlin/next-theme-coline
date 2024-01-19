import React, { ReactNode } from "react";
import * as styles from "./styles.css";

export interface InlineCodeProps {
  children: ReactNode;
}

export const InlineCode: React.FC<InlineCodeProps> = (props) => {
  return <code className={styles.container}>{props.children}</code>;
};
