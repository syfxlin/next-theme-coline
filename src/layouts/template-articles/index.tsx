import React from "react";
import { Metadata } from "next";
import { Header } from "../header";
import { Main } from "../main";
import { Footer } from "../footer";
import { ArticleList } from "../../contents/types";
import { resolve } from "../../utils/vender";
import { metadata as generateMetadata } from "../root/metadata";
import { Hero } from "../../components/layout/hero";
import { ArticleInfo } from "../../components/layout/article-info";
import { Pagination } from "../../components/ui/pagination";
import { fetcher } from "../../contents";

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
  const author = await fetcher.author();
  return (
    <>
      <Header />
      <Main>
        <Hero author={author} />
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
