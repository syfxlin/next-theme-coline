import React, { ReactNode } from "react";
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
import { Renderer } from "../../docs";
import { t } from "../../../locales";
import * as styles from "./styles.css";

export interface HeadingProps {
  children?: ReactNode;
}

export const Heading: React.FC<HeadingProps> = (props) => {
  return (
    <h2 className={styles.heading}>
      {props.children}
    </h2>
  );
};

export type TemplateArticlesProps =
  | {
    display: "document";
    document?: DocumentData;
    articles: ReadonlyArray<ArticleList>;
  }
  | {
    display: "articles";
    articles: {
      index: number;
      pages: number;
      total: number;
      items: ReadonlyArray<ArticleList>;
    };
  };

export function metadataArticles(props: TemplateArticlesProps): Promise<Metadata> {
  if (props.display === "document") {
    return generateMetadata({
      title: undefined,
      link: "/",
    });
  } else {
    return generateMetadata({
      title: props.articles.index !== 1 ? t("articles.desc", t("pagination.curr", props.articles.index)) : undefined,
      link: props.articles.index !== 1 ? resolve("page", props.articles.index) : "/",
    });
  }
}

export const TemplateArticles: React.FC<TemplateArticlesProps> = (props) => {
  return (
    <>
      <Header />
      {props.display === "document" && (
        <Main size="lg">
          <div className={styles.document}>
            <section>
              <Hero />
              <Renderer document={props.document?.document} position="top" />
            </section>
            <section>
              <Heading>{t("articles.heading")}</Heading>
              {props.articles.map(item => <ArticleInfo key={`article-${item.link}`} data={item} />)}
            </section>
          </div>
        </Main>
      )}
      {props.display === "articles" && (
        <Main>
          <Hero />
          <section>
            {props.articles.items.map(item => (
              <ArticleInfo key={`article-${item.link}`} data={item} />
            ))}
          </section>
          <Pagination links="/" index={props.articles.index} pages={props.articles.pages} />
        </Main>
      )}
      <Footer />
    </>
  );
};
