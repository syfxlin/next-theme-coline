import React from "react";
import { Metadata } from "next";
import { Header } from "../../layouts/header";
import { Main } from "../../layouts/main";
import { Footer } from "../../layouts/footer";
import { ArticleList } from "../../../contents/types";
import { resolve } from "../../../utils/vender";
import { metadata as generateMetadata } from "../../layouts/root/metadata";
import { Hero } from "../../layouts/hero";
import { ArticleInfo } from "../../layouts/article-info";
import { Pagination } from "../../ui/pagination";

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

export const metadataArticles = async (props: TemplateArticlesMetadataProps): Promise<Metadata> => {
  return generateMetadata({
    title: props.index === 1 ? undefined : `文章列表：第 ${props.index} 页`,
    link: props.index === 1 ? "/" : resolve("page", props.index),
  });
};

export const TemplateArticles: React.FC<TemplateArticlesComponentProps> = async (props) => {
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
