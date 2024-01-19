import "katex/dist/katex.css";
import katex from "katex";
import React from "react";
import * as styles from "./styles.css";

export interface KatexProps {
  math: string;
}

export const Katex: React.FC<KatexProps> = React.memo((props) => {
  const html = katex.renderToString(props.math, { throwOnError: false });
  return <span className={styles.container} dangerouslySetInnerHTML={{ __html: html }} />;
});
