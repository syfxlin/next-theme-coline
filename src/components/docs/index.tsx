// @ts-nocheck
import React, { ReactNode } from "react";
import { Code } from "./code";
import { List } from "./list";
import { Link } from "../ui/link";
import { Image } from "../ui/image";
import { Table } from "./table";
import { Katex } from "./katex";
import { Github } from "./github";
import { Article } from "./article";
import { Message } from "./message";
import { Divider } from "./divider";
import { Heading } from "./heading";
import { Paragraph } from "./paragraph";
import { InlineCode } from "./inline-code";
import { DocumentRenderer } from "@keystatic/core/renderer";
import { DocumentRendererProps } from "@keystatic/core/dist/declarations/src/renderer";

export const renderers: DocumentRendererProps["renderers"] = {
  inline: {
    link: Link,
    code: InlineCode,
  },
  block: {
    code: Code,
    list: List,
    image: Image,
    table: Table,
    divider: Divider,
    heading: Heading,
    paragraph: Paragraph,
  },
};

export const components: DocumentRendererProps["componentBlocks"] = {
  katex: Katex,
  github: Github,
  article: Article,
  message: Message,
};

export type RendererProps = {
  document: any[];
  children?: ReactNode;
};

export const Renderer: React.FC<RendererProps> = React.memo(({ document, children }) => {
  return (
    <section className="slide-enter-content">
      <DocumentRenderer document={document} renderers={renderers} componentBlocks={components} />
      {children}
    </section>
  );
});
