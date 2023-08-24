import React, { PropsWithChildren } from "react";
import { author, license, link, seo } from "../../contents";
import { Header } from "../header";
import { Footer } from "../footer";
import { Main } from "../main";
import { Friends } from "../../components/widgets/friends/dynamic";
import { Metadata } from "next";
import { metadata as generateMetadata } from "../root/metadata";
import { Artalk } from "../../components/widgets/artalk/dynamic";
import { ArticleData } from "../../contents/types";
import { AspectRatio } from "../../components/ui/aspect-ratio";
import { Title } from "../../components/layout/title";
import { MetaInfo } from "../../components/layout/meta-info";
import { Copyright } from "../../components/widgets/copyright";
import { Toc } from "../../components/widgets/toc";
import { CursorPagination } from "../../components/ui/pagination";
import { Mdx } from "../../components/mdx";
import { Image } from "../../components/ui/image";

export type TemplatePageProps = PropsWithChildren<{
  data: ArticleData;
  prev?: {
    name: string;
    link: string;
  };
  next?: {
    name: string;
    link: string;
  };
}>;

export const metadataPage = (props: Omit<TemplatePageProps, "children">): Metadata => {
  return generateMetadata({
    link: props.data.link,
    title: props.data.title,
    description: props.data.excerpt,
    thumbnail: props.data.thumbnail?.src,
  });
};

export const TemplatePage: React.FC<TemplatePageProps> = ({ data, prev, next, children }) => {
  return (
    <>
      <Header />
      <Main>
        <article>
          {data.thumbnail && (
            <AspectRatio ratio={16 / 9}>
              <Image {...data.thumbnail} alt={`缩略图：${data.title}`} />
            </AspectRatio>
          )}
          <Title title={data.title}>
            <MetaInfo data={data} />
          </Title>
          {children}
          {data.layout === "post" && <Copyright data={data} seo={seo} author={author} license={license} />}
        </article>
        <Toc data={data.headings} />
        <CursorPagination prev={prev} next={next} />
        <Artalk name={data.title} slug={data.slug} />
      </Main>
      <Footer />
    </>
  );
};

export const DefaultTemplatePage: React.FC<Omit<TemplatePageProps, "children">> = (props) => {
  return (
    <TemplatePage data={props.data} prev={props.prev} next={props.next}>
      <Mdx code={props.data.body.code} />
    </TemplatePage>
  );
};

export const LinksTemplatePage: React.FC<Omit<TemplatePageProps, "children">> = (props) => {
  return (
    <TemplatePage data={props.data} prev={props.prev} next={props.next}>
      <Mdx code={props.data.body.code} />
      <Friends data={link} />
    </TemplatePage>
  );
};

export const layouts: Record<string, React.ComponentType<any>> = {
  post: DefaultTemplatePage,
  page: DefaultTemplatePage,
  links: LinksTemplatePage,
};
