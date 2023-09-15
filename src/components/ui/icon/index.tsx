"use client";
import * as styles from "./styles.css";
import React, { forwardRef, HTMLAttributes } from "react";
import { cx } from "@syfxlin/reve";

export type IconProps = HTMLAttributes<HTMLSpanElement> & {
  data: string;
};

export const Icon = forwardRef<HTMLSpanElement, IconProps>(({ data, ...props }, ref) => {
  return (
    <span {...props} className={cx("i-icon", styles.container, props.className)} ref={ref}>
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 48 48"
        fill="none"
        dangerouslySetInnerHTML={{
          __html: data,
        }}
      />
    </span>
  );
});
