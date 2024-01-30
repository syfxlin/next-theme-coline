import React, { PropsWithChildren } from "react";
import { cx } from "@syfxlin/reve";
import * as styles from "./styles.css";

export type MainProps = PropsWithChildren<{
  size?: "sm" | "md" | "lg";
}>;

export const Main: React.FC<MainProps> = ({ size, children }) => {
  return (
    <main className={cx(styles.container, styles[size ?? "sm"])}>
      {children}
    </main>
  );
};
