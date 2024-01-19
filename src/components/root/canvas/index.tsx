"use client";
import React, { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { render } from "../../../utils/canvas";
import * as styles from "./styles.css";

export const Canvas: React.FC = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (ref.current) {
      render(
        ref.current,
        ref.current.clientWidth,
        ref.current.clientHeight,
        resolvedTheme === "light" ? "#000000" : "#ffffff",
        0.25,
      );
    }
  }, [resolvedTheme]);

  return <canvas ref={ref} className={styles.container} />;
};
