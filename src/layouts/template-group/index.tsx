import React from "react";
import { Metadata } from "next";
import { Header } from "../header";
import { Main } from "../main";
import { Footer } from "../footer";
import { resolve } from "../../utils/vender";
import { metadata as generateMetadata } from "../root/metadata";
import { ArticleList } from "../../contents/types";
import { Title } from "../../components/layout/title";
import { ArticleInfo } from "../../components/layout/article-info";
import { Pagination } from "../../components/ui/pagination";

export type TemplateGroupMetadataProps = {
  type: string;
  name: string | number;
  link: string;
  index: number;
  pages: number;
  total: number;
};

export type TemplateGroupComponentProps = {
  type: string;
  name: string | number;
  link: string;
  index: number;
  pages: number;
  total: number;
  items: Array<ArticleList>;
};

export const metadataGroup = (props: TemplateGroupMetadataProps): Metadata => {
  return generateMetadata({
    title: `${props.type}：${props.name}${props.index === 1 ? `` : ` - 第 ${props.index} 页`}`,
    link: props.index === 1 ? props.link : resolve(props.link, "page", props.index),
  });
};

export const TemplateGroup: React.FC<TemplateGroupComponentProps> = (props) => {
  return (
    <>
      <Header />
      <Main>
        <Title title={`${props.type}：${props.name}${props.index === 1 ? `` : ` - 第 ${props.index} 页`}`}>
          共 {props.total} 篇文章
        </Title>
        <section>
          {props.items.map((item) => (
            <ArticleInfo key={`${props.type}-${item.link}`} data={item} />
          ))}
        </section>
        <Pagination links={props.link} index={props.index} pages={props.pages} />
      </Main>
      <Footer />
    </>
  );
};
