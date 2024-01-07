"use client";
import React, { ReactNode } from "react";
import { LinkButton } from "../../ui/button";
import { resolve } from "../../../utils/vender";
import * as styles from "./styles.css";
import { t } from "../../../locales";

export type RssProps = {
  icon: ReactNode;
};

export const Blog: React.FC<RssProps> = ({ icon }) => {
  return (
    <LinkButton tooltip aria-label={t("header.blog")} href={resolve("page", 1)} className={styles.view_elastic}>
      <span>{t("header.blog")}</span>
      {icon}
    </LinkButton>
  );
};
