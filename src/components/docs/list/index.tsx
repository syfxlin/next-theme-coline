import * as styles from "./styles.css";
import React, { ReactNode } from "react";

export type ListProps = {
  type: "ordered" | "unordered";
  children: ReactNode;
};

export const List: React.FC<ListProps> = (props) => {
  if (props.type === "ordered") {
    return <ol className={styles.container}>{props.children}</ol>;
  } else {
    return <ul className={styles.container}>{props.children}</ul>;
  }
};
