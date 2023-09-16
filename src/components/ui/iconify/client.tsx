"use client";
import React from "react";
import { cx } from "@syfxlin/reve";

export type IconifyProps = {
  icon: string;
};

export const Iconify: React.FC<IconifyProps> = (props) => {
  return <span className={cx("iconify", props.icon)} />;
};
