"use client";
import React, { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { cx } from "@syfxlin/reve";
import { LinkButton } from "../../ui/button";
import { t } from "../../../locales";
import * as styles from "./styles.css";

export interface BackProps {
  icon: ReactNode;
}

export const Back: React.FC<BackProps> = ({ icon }) => {
  const path = usePathname();
  if (path !== "/") {
    return (
      <LinkButton tooltip aria-label={t("header.home")} href="/" className={cx(styles.view_elastic_icon, styles.back)}>
        <span>{t("header.home")}</span>
        {icon}
      </LinkButton>
    );
  } else {
    return null;
  }
};
