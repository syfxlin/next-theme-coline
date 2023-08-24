/* eslint-disable jsx-a11y/alt-text */
"use client";
import React from "react";
import { useMDXComponent } from "next-contentlayer/hooks";
import { MDXComponents } from "mdx/types";
import { Wrapper } from "./wrapper";
import { Link } from "../ui/link";
import { Image } from "../ui/image";
import { GithubBox } from "./github-box";
import { MessageBox } from "./message-box";
import { ArticleBox } from "./article-box";
import { CodeBlock } from "./code-block";

const components: MDXComponents = {
  wrapper: (props: any) => <Wrapper {...props} />,
  a: (props: any) => <Link {...props} />,
  img: (props: any) => <Image {...props} />,
  pre: (props: any) => <CodeBlock {...props} />,
  GithubBox: (props: any) => <GithubBox {...props} />,
  MessageBox: (props: any) => <MessageBox {...props} />,
  ArticleBox: (props: any) => <ArticleBox {...props} />,
};

export type MdxProps = {
  code: string;
};

export const Mdx: React.FC<MdxProps> = (props) => {
  const MDXContents = useMDXComponent(props.code);
  return <MDXContents components={components} />;
};
