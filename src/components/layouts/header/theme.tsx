"use client";
import React from "react";
import { useTheme } from "next-themes";
import { DarkMode } from "@icon-park/react";
import { Button } from "../../ui/button";

export const Theme: React.FC = () => {
  const { theme, resolvedTheme, setTheme } = useTheme();
  return (
    <Button
      aria-label="切换暗色模式"
      tippy={{ content: `当前模式：${theme === "system" ? `${theme} (${resolvedTheme})` : theme}` }}
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
      <DarkMode />
    </Button>
  );
};
