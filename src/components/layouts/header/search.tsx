"use client";
import React, { ReactNode, useState } from "react";
import { Button } from "../../ui/button";
import { Spotlight } from "../../root/spotlight";
import { t } from "../../../locales";
import * as styles from "./styles.css";

export interface SearchProps {
  icon: ReactNode;
}

export const Search: React.FC<SearchProps> = ({ icon }) => {
  const [active, setActive] = useState(false);
  return (
    <>
      <Button tooltip aria-label={t("header.search")} onClick={() => setActive(p => !p)} className={styles.view_icon}>
        <span>{t("header.search")}</span>
        {icon}
      </Button>
      <Spotlight active={active} setActive={setActive} />
    </>
  );
};
