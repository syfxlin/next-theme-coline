"use client";
import React from "react";
import * as styles from "./wrapper.css";
import { cx } from "@syfxlin/reve";
import { useAnimation } from "../../hooks/use-animation";

export const Wrapper: React.FC<any> = (props) => {
  const animation = useAnimation("slide-enter-content");
  return (
    <section className={cx("han-init-context", styles.container, animation, props.className)}>{props.children}</section>
  );
};
