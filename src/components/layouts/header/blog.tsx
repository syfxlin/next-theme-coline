"use client";
import React, { ReactNode } from "react";
import { LinkButton } from "../../ui/button";
import { resolve } from "../../../utils/vender";
import { t } from "../../../locales";
import * as styles from "./styles.css";

export interface RssProps {
  icon: ReactNode;
}

export const Blog: React.FC<RssProps> = ({ icon }) => {
  return (
    <LinkButton tooltip aria-label={t("header.blog")} href={resolve("page", 1)} className={styles.view_elastic}>
      <span>{t("header.blog")}</span>
      {icon}
    </LinkButton>
  );
};
