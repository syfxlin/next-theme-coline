"use client";
import * as styles from "./styles.css";
import React from "react";

export type DividerProps = {
  orientation: "vertical" | "horizontal";
};

export const Divider: React.FC<DividerProps> = ({ orientation }) => {
  const span = <span className={styles.container} />;
  return orientation === "vertical" ? (
    span
  ) : (
    <div>
      {span}
      {span}
      {span}
    </div>
  );
};
