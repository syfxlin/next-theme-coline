"use client";
import React, { ReactNode, useState } from "react";
import { Button } from "../../ui/button";
import { Spotlight } from "../../root/spotlight";
import { t } from "../../../locales";
import { hideMenu } from "./menu";
import * as styles from "./styles.css";

export interface SearchProps {
  icon: ReactNode;
}

export const Search: React.FC<SearchProps> = ({ icon }) => {
  const [active, setActive] = useState(false);
  return (
    <>
      <Button
        tooltip={{ placement: "left" }}
        aria-label={t("header.search")}
        className={styles.view_icon}
        onClick={() => {
          hideMenu();
          setActive(p => !p);
        }}
      >
        <span>{t("header.search")}</span>
        {icon}
      </Button>
      <Spotlight active={active} setActive={setActive} />
    </>
  );
};
