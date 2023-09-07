import React from "react";
import { getHighlighter } from "shiki";
import { container } from "./code.css";

const highlighter = await getHighlighter({
  themes: ["vitesse-light", "vitesse-dark"],
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

export const Code: React.FC<CodeProps> = React.memo(async ({ language, children }) => {
  const html = parse("light", children, language) + parse("dark", children, language);
  return (
    <div className={container} data-language={language?.toUpperCase()} dangerouslySetInnerHTML={{ __html: html }} />
  );
});
