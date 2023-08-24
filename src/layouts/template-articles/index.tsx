import React from "react";
import { Metadata } from "next";
import { Header } from "../header";
import { Main } from "../main";
import { Footer } from "../footer";
import { author } from "../../contents";
import { ArticleList } from "../../contents/types";
import { resolve } from "../../utils/vender";
import { metadata as generateMetadata } from "../root/metadata";
import { Hero } from "../../components/layout/hero";
import { ArticleInfo } from "../../components/layout/article-info";
import { Pagination } from "../../components/ui/pagination";

export type TemplateArticlesMetadataProps = {
  index: number;
  pages: number;
  total: number;
};

export type TemplateArticlesComponentProps = {
  index: number;
  pages: number;
  total: number;
  items: Array<ArticleList>;
};

export const metadataArticles = (props: TemplateArticlesMetadataProps): Metadata => {
  return generateMetadata({
    title: props.index === 1 ? undefined : `文章列表：第 ${props.index} 页`,
    link: props.index === 1 ? "/" : resolve("page", props.index),
  });
};

export const TemplateArticles: React.FC<TemplateArticlesComponentProps> = (props) => {
  return (
    <>
      <Header />
      <Main>
        <Hero author={author} />
        <section>
          {props.items.map((item) => (
            <ArticleInfo key={`article-${item.link}`} data={item} />
          ))}
        </section>
        <Pagination links="/" index={props.index} pages={props.pages} />
      </Main>
      <Footer />
    </>
  );
};
