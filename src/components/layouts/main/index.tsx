import React, { PropsWithChildren } from "react";
import * as styles from "./styles.css";

export type MainProps = PropsWithChildren<object>;

export const Main: React.FC<MainProps> = ({ children }) => {
  return <main className={styles.container}>{children}</main>;
};
