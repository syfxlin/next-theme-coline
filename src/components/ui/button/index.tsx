"use client";
import * as styles from "./styles.css";
import React, { AnchorHTMLAttributes, ButtonHTMLAttributes, forwardRef } from "react";
import Tippy, { TippyProps } from "@tippyjs/react";
import Link, { LinkProps } from "next/link";
import { cx } from "@syfxlin/reve";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  tippy?: TippyProps | boolean;
  unstyled?: boolean;
};
// prettier-ignore
export type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps & {
  tippy?: TippyProps | boolean;
  unstyled?: boolean;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ tippy, unstyled, ...props }, ref) => {
  const element = <button {...props} className={cx(props.className, !unstyled && styles.button)} ref={ref} />;
  return tippy ? (
    <Tippy animation="shift-away" content={props["aria-label"]} {...(typeof tippy === "boolean" ? {} : tippy)}>
      {element}
    </Tippy>
  ) : (
    element
  );
});

export const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(({ tippy, unstyled, href, ...props }, ref) => {
  if (typeof href === "string" && /^(https?:)?\/\/|^#|\.[\da-z]+$/i.test(href)) {
    const element = <a {...props} className={cx(props.className, !unstyled && styles.button)} href={href} ref={ref} />;
    return tippy ? (
      <Tippy animation="shift-away" content={props["aria-label"]} {...(typeof tippy === "boolean" ? {} : tippy)}>
        {element}
      </Tippy>
    ) : (
      element
    );
  } else {
    const element = (
      <Link {...props} className={cx(props.className, !unstyled && styles.button)} href={href} ref={ref} />
    );
    return tippy ? (
      <Tippy animation="shift-away" content={props["aria-label"]} {...(typeof tippy === "boolean" ? {} : tippy)}>
        {element}
      </Tippy>
    ) : (
      element
    );
  }
});
