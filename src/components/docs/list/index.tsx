import * as styles from "./styles.css";
import React, { ReactNode } from "react";
import { cx } from "@syfxlin/reve";

export type ListProps = {
  type: "ordered" | "unordered";
  direction?: "default" | "horizontal" | "vertical";
  children: ReactNode;
};

export const List: React.FC<ListProps> = (props) => {
  if (props.type === "ordered") {
    return (
      <ol
        className={cx(
          styles.container,
          props.direction === "horizontal" && styles.horizontal,
          props.direction === "vertical" && styles.vertical,
        )}
      >
        {props.children}
      </ol>
    );
  } else {
    return (
      <ul
        className={cx(
          styles.container,
          props.direction === "horizontal" && styles.horizontal,
          props.direction === "vertical" && styles.vertical,
        )}
      >
        {props.children}
      </ul>
    );
  }
};
