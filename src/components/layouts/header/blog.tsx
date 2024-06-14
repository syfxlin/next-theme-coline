"use client";
import React, { ReactNode } from "react";
import { LinkButton } from "../../ui/button";
import { resolve } from "../../../utils/vender";
import { t } from "../../../locales";
import * as styles from "./styles.css";
import { hideMenu } from "./menu";

export interface BlogProps {
  icon: ReactNode;
}

export const Blog: React.FC<BlogProps> = ({ icon }) => {
  return (
    <LinkButton
      tooltip={{ placement: "left" }}
      aria-label={t("header.blog")}
      href={resolve("page", 1)}
      className={styles.view_elastic}
      onClick={() => hideMenu()}
    >
      <span><span>「</span>{t("header.blog")}<span>」</span></span>
      {icon}
    </LinkButton>
  );
};
