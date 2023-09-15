"use client";
import * as styles from "./styles.css";
import React, { forwardRef, HTMLAttributes } from "react";
import { cx, sx } from "@syfxlin/reve";

export type AspectRatioProps = HTMLAttributes<HTMLDivElement> & {
  ratio: number;
};

export const AspectRatio = forwardRef<HTMLDivElement, AspectRatioProps>(({ ratio: r, ...props }, ref) => {
  return (
    <div
      {...props}
      className={cx(props.className, styles.container)}
      style={sx(props.style, { [styles.ratio]: `${((1 / r) * 100).toFixed(4)}%` })}
      ref={ref}
    />
  );
});
