import React, { PropsWithChildren } from "react";
import { cx } from "@syfxlin/reve";
import * as styles from "./styles.css";

export type MainProps = PropsWithChildren<{
  className?: string;
}>;

export const Main: React.FC<MainProps> = ({ children, className }) => {
  return <main className={cx(styles.container, className)}>{children}</main>;
};
