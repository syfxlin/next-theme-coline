"use client";
import React, { AnchorHTMLAttributes, ButtonHTMLAttributes, forwardRef } from "react";
import Tippy, { TippyProps } from "@tippyjs/react";
import Link, { LinkProps } from "next/link";
import { cx } from "@syfxlin/reve";
import * as styles from "./styles.css";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  tooltip?: TippyProps | boolean;
  unstyled?: boolean;
};
export type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps & {
  tooltip?: TippyProps | boolean;
  unstyled?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ tooltip, unstyled, ...props }, ref) => {
  const element = <button {...props} className={cx(props.className, !unstyled && styles.button)} ref={ref} />;
  return tooltip ?
      (
        <Tippy animation="shift-away" content={props["aria-label"]} {...(typeof tooltip === "boolean" ? {} : tooltip)}>
          {element}
        </Tippy>
      ) :
      (
        element
      );
});

export const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
  ({ tooltip, unstyled, href, ...props }, ref) => {
    if (typeof href === "string" && /^(https?:)?\/\/|^#|\.[\da-z]+$/i.test(href)) {
      const element = (
        <a {...props} className={cx(props.className, !unstyled && styles.button)} href={href} ref={ref} />
      );
      return tooltip ?
          (
            <Tippy animation="shift-away" content={props["aria-label"]} {...(typeof tooltip === "boolean" ? {} : tooltip)}>
              {element}
            </Tippy>
          ) :
          (
            element
          );
    } else {
      const element = (
        <Link {...props} className={cx(props.className, !unstyled && styles.button)} href={href} ref={ref} />
      );
      return tooltip ?
          (
            <Tippy animation="shift-away" content={props["aria-label"]} {...(typeof tooltip === "boolean" ? {} : tooltip)}>
              {element}
            </Tippy>
          ) :
          (
            element
          );
    }
  },
);
