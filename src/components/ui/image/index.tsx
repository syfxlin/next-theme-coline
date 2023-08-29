"use client";
import * as styles from "./index.css";
import React, { forwardRef, HTMLAttributes, useMemo } from "react";
import NImage from "next/image";
import { cx, sx } from "@syfxlin/reve";

const parse = (src: string) => {
  const exec = /\.(\d+)x(\d+)(\.\w+)$/.exec(src);
  if (exec) {
    const width = parseInt(exec[1]);
    const height = parseInt(exec[2]);
    return {
      src: src,
      blurDataURL: `/_next/image?w=8&q=70&url=${encodeURIComponent(src)}`,
      width: width,
      height: height,
      blurWidth: 8,
      blurHeight: Math.round((height / width) * 8),
    };
  } else {
    return {
      src: src,
      blurDataURL: `/_next/image?w=8&q=70&url=${encodeURIComponent(src)}`,
      width: 8,
      height: 6,
      blurWidth: 8,
      blurHeight: 6,
    };
  }
};

export type ImageProps = HTMLAttributes<HTMLDivElement> & { src: string; alt: string };

export const Image = forwardRef<HTMLDivElement, ImageProps>(({ src, alt, ...props }, ref) => {
  const parsed = useMemo(() => parse(src), [src]);
  return (
    <span
      {...props}
      className={cx(props.className, styles.container)}
      style={sx(props.style, { maxWidth: `${parsed.width}px` })}
      ref={ref}
    >
      <span
        className={styles.placeholder}
        style={{ paddingBottom: `${((parsed.height / parsed.width) * 100).toFixed(4)}%` }}
      />
      <NImage
        fill
        src={parsed.src}
        alt={alt ?? "image"}
        blurDataURL={parsed.blurDataURL}
        placeholder={parsed.blurDataURL ? "blur" : "empty"}
        style={{ objectFit: "cover" }}
      />
    </span>
  );
});
