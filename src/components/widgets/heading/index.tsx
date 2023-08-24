"use client";
import React, { ElementType, forwardRef, HTMLAttributes, PropsWithChildren } from "react";
import { cx } from "@syfxlin/reve";
import { container } from "./index.css";

export type HeadingProps = PropsWithChildren<
  HTMLAttributes<HTMLHeadingElement> & {
    level: 1 | 2 | 3 | 4 | 5 | 6;
  }
>;

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(({ level, ...props }, ref) => {
  const Component: ElementType = `h${level}`;
  return (
    <Component {...props} className={cx(props.className, container)} ref={ref}>
      {props.children}
    </Component>
  );
});
