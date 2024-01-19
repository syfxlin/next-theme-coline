import React, { ReactNode } from "react";
import * as styles from "./styles.css";

export interface GridProps {
  children: ReactNode;
}

export const Grid: React.FC<GridProps> = ({ children }) => {
  return <section className={styles.container}>{children}</section>;
};
