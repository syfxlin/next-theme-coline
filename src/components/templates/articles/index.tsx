import React from "react";
import { Metadata } from "next";
import { Header } from "../../layouts/header";
import { Main } from "../../layouts/main";
import { Footer } from "../../layouts/footer";
import { ArticleList, DocumentData } from "../../../contents/types";
import { resolve } from "../../../utils/vender";
import { metadata as generateMetadata } from "../../layouts/root/metadata";
import { Hero } from "../../layouts/hero";
import { ArticleInfo } from "../../layouts/article-info";
import { Pagination } from "../../ui/pagination";
import { Renderer } from "../../docs/index";
import { LinkButton } from "../../ui/button/index";

export type TemplateHomeComponentProps = {
  document?: DocumentData;
};

export type TemplateArticlesMetadataProps = {
  index: number;
  pages: number;
  total: number;
};

export type TemplateArticlesComponentProps = {
  index: number;
  pages: number;
  total: number;
  items: ReadonlyArray<ArticleList>;
};

export const metadataHome = () => {
  return generateMetadata({
    title: undefined,
    link: "/",
  });
};

export const TemplateHome: React.FC<TemplateHomeComponentProps> = (props) => {
  return (
    <>
      <Header>
        <LinkButton tippy aria-label="博客" href="/">
          博客
        </LinkButton>
      </Header>
      <Main>
        <Hero />
        <section>
          <Renderer document={props.document?.document} />
        </section>
      </Main>
      <Footer />
    </>
  );
};

export const metadataArticles = (props: TemplateArticlesMetadataProps): Promise<Metadata> => {
  return generateMetadata({
    title: `文章列表：第 ${props.index} 页`,
    link: resolve("page", props.index),
  });
};

export const TemplateArticles: React.FC<TemplateArticlesComponentProps> = (props) => {
  return (
    <>
      <Header />
      <Main>
        <Hero />
        <section>
          {props.items.map((item, index) => (
            <ArticleInfo key={`article-${item.link}`} data={item} step={index} />
          ))}
        </section>
        <Pagination links="/" index={props.index} pages={props.pages} />
      </Main>
      <Footer />
    </>
  );
};
