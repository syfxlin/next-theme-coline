"use client";
import React from "react";
import { cx } from "@syfxlin/reve";

export type IconifyProps = {
  icon: string;
};

export const Iconify: React.FC<IconifyProps> = (props) => {
  if (props.icon.startsWith("svg:")) {
    return (
      <svg
        width="1.1rem"
        height="1.1rem"
        viewBox="0 0 24 24"
        dangerouslySetInnerHTML={{ __html: props.icon.substring(4) }}
        className="iconify"
      />
    );
  }
  return <span className={cx("iconify", props.icon)} />;
};
