"use client";
import "katex/dist/katex.css";
import katex from "katex";
import React from "react";
import { container } from "./katex.css";

export type KatexProps = {
  math: string;
};

export const Katex: React.FC<KatexProps> = React.memo((props) => {
  const html = katex.renderToString(props.math, { throwOnError: false });
  return <span className={container} dangerouslySetInnerHTML={{ __html: html }} />;
});
