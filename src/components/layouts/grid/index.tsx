import * as styles from "./styles.css";
import React, { ReactNode } from "react";

export type GridProps = {
  children: ReactNode;
};

export const Grid: React.FC<GridProps> = ({ children }) => {
  return <section className={styles.container}>{children}</section>;
};
