"use client";
import React, { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { LinkButton } from "../../ui/button";
import { resolve } from "../../../utils/vender";
import { t } from "../../../locales";
import * as styles from "./styles.css";

export interface HomeProps {
  home: ReactNode;
  blog: ReactNode;
}

export const Home: React.FC<HomeProps> = ({ home, blog }) => {
  const path = usePathname();
  if (path !== "/") {
    return (
      <LinkButton tooltip aria-label={t("header.home")} href="/" className={styles.view_elastic}>
        <span>{t("header.home")}</span>
        {home}
      </LinkButton>
    );
  } else {
    return (
      <LinkButton tooltip aria-label={t("header.blog")} href={resolve("page", 1)} className={styles.view_elastic}>
        <span>{t("header.blog")}</span>
        {blog}
      </LinkButton>
    );
  }
};
