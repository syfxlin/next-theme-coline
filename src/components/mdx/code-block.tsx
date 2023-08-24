"use client";
import React, { HTMLAttributes, PropsWithChildren } from "react";
import { container } from "./code-block.css";

export type CodeBlockProps = PropsWithChildren<HTMLAttributes<HTMLPreElement>>;

export const CodeBlock: React.FC<CodeBlockProps> = (props) => {
  return (
    <div data-language={props.className?.substring(9)?.toUpperCase()} className={container}>
      <pre className={props.className}>{props.children}</pre>
    </div>
  );
};
