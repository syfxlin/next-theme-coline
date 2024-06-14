"use client";
import React from "react";
import { LinkButton, LinkButtonProps } from "../../ui/button";
import { hideMenu } from "./menu";

export const Link: React.FC<LinkButtonProps> = (props) => {
  return (
    <LinkButton
      {...props}
      onClick={(e) => {
        hideMenu();
        if (props.onClick) {
          props.onClick(e);
        }
      }}
    />
  );
};
