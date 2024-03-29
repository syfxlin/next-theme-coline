import React from "react";
import { Metadata } from "next";
import { Header } from "../../layouts/header";
import { Main } from "../../layouts/main";
import { Footer } from "../../layouts/footer";
import { resolve } from "../../../utils/vender";
import { metadata as generateMetadata } from "../../layouts/root/metadata";
import { ArticleList } from "../../../contents/types";
import { Title } from "../../layouts/title";
import { ArticleInfo } from "../../layouts/article-info";
import { Pagination } from "../../ui/pagination";
import { t } from "../../../locales";

export interface TemplateGroupMetadataProps {
  type: string;
  name: string | number;
  link: string;
  index: number;
  pages: number;
  total: number;
}

export interface TemplateGroupComponentProps {
  type: string;
  name: string | number;
  link: string;
  index: number;
  pages: number;
  total: number;
  items: ReadonlyArray<ArticleList>;
}

export async function metadataGroup(props: TemplateGroupMetadataProps): Promise<Metadata> {
  return generateMetadata({
    title: `${props.type}：${props.name}${props.index === 1 ? `` : ` - ${t("pagination.curr", props.index)}`}`,
    link: props.index === 1 ? props.link : resolve(props.link, "page", props.index),
  });
}

export const TemplateGroup: React.FC<TemplateGroupComponentProps> = (props) => {
  return (
    <>
      <Header />
      <Main>
        <Title
          title={`${props.type}：${props.name}${props.index === 1 ? `` : ` - ${t("pagination.curr", props.index)}`}`}
        >
          {props.total} {t("articles.name")}
        </Title>
        <section>
          {props.items.map(item => (
            <ArticleInfo key={`${props.type}-${item.link}`} data={item} />
          ))}
        </section>
        <Pagination links={props.link} index={props.index} pages={props.pages} />
      </Main>
      <Footer />
    </>
  );
};
