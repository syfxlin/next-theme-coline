// @ts-nocheck
import React from "react";
import { Code } from "./code";
import { Link } from "../ui/link";
import { Image } from "../ui/image";
import { Wrapper } from "./wrapper";
import { Heading } from "./heading";
import { DocumentRenderer } from "@keystatic/core/renderer";
import { DocumentRendererProps } from "@keystatic/core/dist/declarations/src/renderer";
import { Article, Github, Katex, Message } from "./dynamic";

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
