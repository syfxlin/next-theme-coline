"use client";
import React from "react";
import * as styles from "./wrapper.css";
import { cx } from "@syfxlin/reve";

export const Wrapper: React.FC<any> = (props) => {
  return <section className={cx("han-init-context", styles.container, props.className)}>{props.children}</section>;
};
