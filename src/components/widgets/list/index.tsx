"use client";
import * as styles from "./styles.css";
import React, { ElementType, forwardRef, HTMLAttributes, PropsWithChildren } from "react";
import { cx } from "@syfxlin/reve";

export type ListProps = PropsWithChildren<
  HTMLAttributes<HTMLUListElement | HTMLOListElement> & {
    type: "ul" | "ol";
  }
>;

export const List = forwardRef<HTMLUListElement | HTMLOListElement, ListProps>(({ type, ...props }, ref) => {
  const Component: ElementType = type;
  return (
    // @ts-ignore
    <Component {...props} className={cx(props.className, styles.container)} ref={ref}>
      {props.children}
    </Component>
  );
});
