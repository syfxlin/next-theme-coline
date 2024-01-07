"use client";
import * as styles from "./styles.css";
import React, { AnchorHTMLAttributes, forwardRef } from "react";
import Tippy, { TippyProps } from "@tippyjs/react";
import NLink, { LinkProps as NLinkProps } from "next/link";
import { cx } from "@syfxlin/reve";

// prettier-ignore
export type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & NLinkProps & {
  tooltip?: TippyProps | boolean;
  unstyled?: boolean;
};

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(({ tooltip, unstyled, href, ...props }, ref) => {
  if (typeof href === "string" && /^(https?:)?\/\/|^#|\.[\da-z]+$/i.test(href)) {
    const element = <a {...props} className={cx(props.className, !unstyled && styles.link)} href={href} ref={ref} />;
    return tooltip ? (
      <Tippy animation="shift-away" content={props["aria-label"]} {...(typeof tooltip === "boolean" ? {} : tooltip)}>
        {element}
      </Tippy>
    ) : (
      element
    );
  } else {
    const element = (
      <NLink {...props} className={cx(props.className, !unstyled && styles.link)} href={href} ref={ref} />
    );
    return tooltip ? (
      <Tippy animation="shift-away" content={props["aria-label"]} {...(typeof tooltip === "boolean" ? {} : tooltip)}>
        {element}
      </Tippy>
    ) : (
      element
    );
  }
});
