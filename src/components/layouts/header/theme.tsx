"use client";
import React, { ReactNode } from "react";
import { useTheme } from "next-themes";
import { Button } from "../../ui/button";
import { t } from "../../../locales";
import * as styles from "./styles.css";

export interface ThemeProps {
  icon: ReactNode;
}

export const Theme: React.FC<ThemeProps> = ({ icon }) => {
  const { theme, resolvedTheme, setTheme } = useTheme();
  return (
    <Button
      className={styles.view_icon}
      aria-label={t("theme.switch")}
      tooltip={{ content: t("theme.mode", theme === "system" ? `${theme} (${resolvedTheme})` : theme) }}
      onClick={() => {
        if (theme === "system") {
          setTheme("light");
        } else if (theme === "light") {
          setTheme("dark");
        } else {
          setTheme("system");
        }
      }}
    >
      <span>{t("theme.name")}</span>
      {icon}
    </Button>
  );
};
