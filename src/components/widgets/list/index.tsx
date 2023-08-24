"use client";
import React, { ElementType, forwardRef, HTMLAttributes, PropsWithChildren } from "react";
import { cx } from "@syfxlin/reve";
import { container } from "./index.css";

export type ListProps = PropsWithChildren<
  HTMLAttributes<HTMLUListElement | HTMLOListElement> & {
    type: "ul" | "ol";
  }
>;

export const List = forwardRef<HTMLUListElement | HTMLOListElement, ListProps>(({ type, ...props }, ref) => {
  const Component: ElementType = type;
  return (
    // @ts-ignore
    <Component {...props} className={cx(props.className, container)} ref={ref}>
      {props.children}
    </Component>
  );
});
