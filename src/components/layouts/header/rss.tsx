"use client";
import React from "react";
import { LinkButton } from "../../ui/button";
import { Rss as Icon } from "@icon-park/react";

export const Rss: React.FC = () => {
  return (
    <LinkButton tippy aria-label="RSS" href="/rss.xml">
      <Icon />
    </LinkButton>
  );
};
