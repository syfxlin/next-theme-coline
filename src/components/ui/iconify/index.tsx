import React from "react";
import { iconify } from "./query";

export type IconifyProps = {
  icon: string;
};

export const Iconify: React.FC<IconifyProps> = async (props) => {
  const { attributes, body } = iconify.svg(props.icon);
  return <svg {...attributes} dangerouslySetInnerHTML={{ __html: body }} className="iconify" />;
};
