// @ts-nocheck
import * as styles from "./styles.css";
import React, { ReactNode } from "react";
import { Code } from "./code";
import { List } from "./list";
import { Link } from "./link";
import { Image } from "./image";
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
import { Blockquote } from "./blockquote";
import { cx } from "@syfxlin/reve";
import { DocumentElement } from "@keystatic/core";

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
    blockquote: Blockquote,
  },
};

export const components: DocumentRendererProps["componentBlocks"] = {
  katex: Katex,
  github: Github,
  article: Article,
  message: Message,
};

export type RendererProps = {
  document?: ReadonlyArray<DocumentElement>;
  position?: "none" | "top" | "bottom";
  children?: ReactNode;
};

export const Renderer: React.FC<RendererProps> = React.memo(({ document, position, children }) => {
  return (
    <section className={cx("slide-enter-content", styles.container)}>
      {position === "none" && children}
      {position === "bottom" && children}
      {position !== "none" && document && (
        <DocumentRenderer document={document} renderers={renderers} componentBlocks={components} />
      )}
      {position === "top" && children}
    </section>
  );
});
