import * as styles from "./styles.css";
import React from "react";
import NextTopLoader from "nextjs-toploader";

export const ProgressBar: React.FC = () => {
  return <NextTopLoader color={styles.color} height={2} />;
};
