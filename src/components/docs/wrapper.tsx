"use client";
import * as styles from "./wrapper.css";
import React, { JSX } from "react";
import { cx } from "@syfxlin/reve";

export const Wrapper = (props: any): JSX.Element => {
  return <section className={cx("han-init-context", styles.container, props.className)}>{props.children}</section>;
};
