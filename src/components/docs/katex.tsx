"use client";
import "katex/dist/katex.css";
import katex from "katex";
import React, { useMemo } from "react";
import { container } from "./katex.css";

export type KatexProps = {
  math: string;
};

export const Katex: React.FC<KatexProps> = (props) => {
  const html = useMemo(() => katex.renderToString(props.math, { throwOnError: false }), [props.math]);
  return <span className={container} dangerouslySetInnerHTML={{ __html: html }} />;
};
