import React from "react";
import { cx } from "@syfxlin/reve";
import { iconify } from "./query";

export interface IconifyProps {
  icon: string;
  className?: string;
}

export const Iconify: React.FC<IconifyProps> = async (props) => {
  if (props.icon.startsWith("svg:")) {
    return (
      <svg
        width="1.1rem"
        height="1.1rem"
        viewBox="0 0 24 24"
        dangerouslySetInnerHTML={{ __html: props.icon.substring(4) }}
        className={cx("iconify", props.className)}
      />
    );
  }
  const { attributes, body } = iconify.svg(props.icon);
  return <svg {...attributes} dangerouslySetInnerHTML={{ __html: body }} className={cx("iconify", props.className)} />;
};
