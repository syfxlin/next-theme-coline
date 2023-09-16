"use client";
import React, { ReactNode } from "react";
import { LinkButton } from "../../ui/button";

export type RssProps = {
  icon: ReactNode;
};

export const Rss: React.FC<RssProps> = ({ icon }) => {
  return (
    <LinkButton tippy aria-label="RSS" href="/rss.xml">
      {icon}
    </LinkButton>
  );
};
