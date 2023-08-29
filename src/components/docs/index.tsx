// @ts-nocheck
"use client";
import React from "react";
import dynamic from "next/dynamic";
import { Code } from "./code";
import { Link } from "../ui/link";
import { Image } from "../ui/image";
import { Wrapper } from "./wrapper";
import { Heading } from "./heading";
import { DocumentRenderer } from "@keystatic/core/renderer";
import { DocumentRendererProps } from "@keystatic/core/dist/declarations/src/renderer";

export const Katex = dynamic(() => import("./katex").then((mod) => mod.Katex));
export const Github = dynamic(() => import("./github").then((mod) => mod.Github));
export const Article = dynamic(() => import("./article").then((mod) => mod.Article));
export const Message = dynamic(() => import("./message").then((mod) => mod.Message));

export const renderers: DocumentRendererProps["renderers"] = {
  inline: {
    link: Link,
  },
  block: {
    code: Code,
    image: Image,
    heading: Heading,
  },
};

export const components: DocumentRendererProps["componentBlocks"] = {
  katex: Katex,
  github: Github,
  article: Article,
  message: Message,
};

export const Renderer: React.FC<{ document: any[] }> = ({ document }) => {
  return (
    <Wrapper>
      <DocumentRenderer document={document} renderers={renderers} componentBlocks={components} />
    </Wrapper>
  );
};
