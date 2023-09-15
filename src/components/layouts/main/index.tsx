import * as styles from "./styles.css";
import React, { PropsWithChildren } from "react";

export type MainProps = PropsWithChildren<{}>;

export const Main: React.FC<MainProps> = ({ children }) => {
  return <main className={styles.container}>{children}</main>;
};
