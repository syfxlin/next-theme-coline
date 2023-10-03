"use client";
import * as styles from "./styles.css";
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
      sizes: { width, height },
    };
  } else {
    return {
      src: src,
      blurDataURL: `/_next/image?w=8&q=70&url=${encodeURIComponent(src)}`,
      sizes: undefined,
    };
  }
};

export type ImageProps = HTMLAttributes<HTMLDivElement> & { src: string; alt: string };

export const Image = forwardRef<HTMLDivElement, ImageProps>(({ src, alt, ...props }, ref) => {
  const parsed = useMemo(() => parse(src), [src]);
  return (
    <span
      {...props}
      ref={ref}
      className={cx(styles.container, props.className)}
      style={sx(props.style, { maxWidth: parsed.sizes ? `${parsed.sizes.width}px` : `100%` })}
    >
      {parsed.sizes && (
        <span
          className={styles.placeholder}
          style={{ paddingBottom: `${((parsed.sizes.height / parsed.sizes.width) * 100).toFixed(4)}%` }}
        />
      )}
      <NImage
        src={parsed.src}
        alt={alt ?? "image"}
        blurDataURL={parsed.blurDataURL}
        placeholder={parsed.blurDataURL ? "blur" : "empty"}
        className={styles.image}
        {...(parsed.sizes ? parsed.sizes : { fill: true, sizes: "50vw" })}
      />
    </span>
  );
});
