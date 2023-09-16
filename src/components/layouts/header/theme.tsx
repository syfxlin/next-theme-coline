"use client";
import React, { ReactNode } from "react";
import { useTheme } from "next-themes";
import { Button } from "../../ui/button";

export type ThemeProps = {
  icon: ReactNode;
};

export const Theme: React.FC<ThemeProps> = ({ icon }) => {
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
      {icon}
    </Button>
  );
};
