"use client";
import * as styles from "./index.css";
import React, { forwardRef, HTMLAttributes } from "react";
import NImage from "next/image";
import { ImageData } from "../../../contents/types";
import { cx, sx } from "@syfxlin/reve";

export type ImageProps = HTMLAttributes<HTMLDivElement> & ImageData;

// prettier-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const Image = forwardRef<HTMLDivElement, ImageProps>(({ src, alt, width, height, blurDataURL, blurWidth, blurHeight, ...props }, ref) => {
  const h = typeof height === "number" ? height : parseInt(height);
  const w = typeof width === "number" ? width : parseInt(width);
  return (
    <span {...props} className={cx(props.className, styles.container)} style={sx(props.style, { maxWidth: `${width}px` })} ref={ref}>
      <span className={styles.placeholder} style={{ paddingBottom: `${((h / w) * 100).toFixed(4)}%` }} />
      <NImage fill src={src} alt={alt ?? "image"} blurDataURL={blurDataURL} placeholder={blurDataURL ? "blur" : "empty"} style={{ objectFit: "cover" }} />
    </span>
  );
});
