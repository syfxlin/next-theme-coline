import React, { ReactNode } from "react";
import * as styles from "./styles.css";

export type MessageProps = {
  type: "warn" | "info" | "error" | "success";
  children?: ReactNode;
};

export const Message: React.FC<MessageProps> = React.memo(({ type, children }) => {
  return <div className={styles[type ?? "success"]}>{children}</div>;
});
