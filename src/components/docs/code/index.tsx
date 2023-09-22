import React from "react";
import * as styles from "./styles.css";
import { bundledLanguages, bundledThemes, getHighlighter } from "shikiji";

const highlighter = await getHighlighter({
  themes: Object.values(bundledThemes),
  langs: Object.values(bundledLanguages),
});

const parse = (theme: "light" | "dark", code: string, lang?: string) => {
  return highlighter.codeToHtml(code, {
    lang: lang ?? "markdown",
    theme: theme === "light" ? "vitesse-light" : "vitesse-dark",
  });
};

export type CodeProps = {
  language?: string;
  children: string;
};

export const Code: React.FC<CodeProps> = async ({ language, children }) => {
  const html = parse("light", children, language) + parse("dark", children, language);
  return (
    <div
      className={styles.container}
      data-language={language?.toUpperCase()}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
