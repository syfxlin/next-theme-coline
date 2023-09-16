import * as styles from "./styles.css";
import React, { ReactNode } from "react";

export type ParagraphProps = {
  textAlign: "center" | "end" | undefined;
  children: ReactNode;
};

export const Paragraph: React.FC<ParagraphProps> = (props) => {
  return (
    <p className={styles.container} style={{ textAlign: props.textAlign }}>
      {props.children}
    </p>
  );
};
