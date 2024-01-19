import React, { HTMLAttributes, PropsWithChildren, forwardRef } from "react";
import { cx } from "@syfxlin/reve";
import * as styles from "./styles.css";

export type HeadingProps = PropsWithChildren<HTMLAttributes<HTMLHeadingElement>>;

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>((props, ref) => {
  return (
    <h2 {...props} className={cx(props.className, styles.container)} ref={ref}>
      {props.children}
    </h2>
  );
});
