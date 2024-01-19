import React, { ReactNode } from "react";
import * as styles from "./styles.css";

export interface ParagraphProps {
  textAlign: "center" | "end" | undefined;
  children: ReactNode;
}

export const Paragraph: React.FC<ParagraphProps> = (props) => {
  return (
    <p className={styles.container} style={{ textAlign: props.textAlign }}>
      {props.children}
    </p>
  );
};
