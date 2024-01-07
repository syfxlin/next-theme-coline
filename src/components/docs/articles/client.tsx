"use client";
import * as styles from "./styles.css";
import React from "react";

export const Articles: React.FC = React.memo(async () => {
  return (
    <ul className={styles.container}>
      <li>Article 1</li>
      <li>Article 2</li>
      <li>Article 3</li>
    </ul>
  );
});
