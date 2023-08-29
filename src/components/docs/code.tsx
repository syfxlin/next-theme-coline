"use client";
import React from "react";
import * as styles from "./code.css";
import { useTheme } from "next-themes";
import { PrismAsyncLight } from "react-syntax-highlighter";
import { okaidia, prism } from "react-syntax-highlighter/dist/esm/styles/prism";

const PreTag: React.FC = (props) => <div {...props} className={styles.pre} />;
const CodeTag: React.FC = (props) => <pre {...props} className={styles.code} />;

export type CodeProps = {
  children: string;
  language?: string;
};

export const Code: React.FC<CodeProps> = ({ language, children }) => {
  const { resolvedTheme } = useTheme();
  return (
    <PrismAsyncLight
      data-language={language?.toUpperCase()}
      language={language || "markup"}
      style={resolvedTheme === "light" ? prism : okaidia}
      showLineNumbers
      PreTag={PreTag}
      CodeTag={CodeTag}
    >
      {children}
    </PrismAsyncLight>
  );
};
