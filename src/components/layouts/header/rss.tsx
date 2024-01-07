"use client";
import React, { ReactNode } from "react";
import { LinkButton } from "../../ui/button";
import * as styles from "./styles.css";

export type RssProps = {
  icon: ReactNode;
};

export const Rss: React.FC<RssProps> = ({ icon }) => {
  return (
    <LinkButton tooltip aria-label="RSS" href="/rss.xml" className={styles.view_elastic_icon}>
      <span>RSS</span>
      {icon}
    </LinkButton>
  );
};
