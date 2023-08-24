"use client";
import * as styles from "./index.css";
import React, { SVGAttributes } from "react";
import { cx } from "@syfxlin/reve";

export type IconProps = SVGAttributes<SVGElement> & {
  data: string;
};

export const Icon: React.FC<IconProps> = ({ data, ...props }) => {
  return (
    <span className={cx("i-icon", styles.container)}>
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 48 48"
        fill="none"
        {...props}
        dangerouslySetInnerHTML={{
          __html: data,
        }}
      />
    </span>
  );
};
