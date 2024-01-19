"use client";
import React from "react";
import * as styles from "./styles.css";

export interface DividerProps {
  orientation: "vertical" | "horizontal";
}

export const Divider: React.FC<DividerProps> = ({ orientation }) => {
  const span = <span className={styles.container} />;
  return orientation === "vertical" ?
      (
        span
      ) :
      (
        <div>
          {span}
          {span}
          {span}
        </div>
      );
};
