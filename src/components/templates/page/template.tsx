import React, { PropsWithChildren } from "react";
import { fetcher } from "../../../contents";
import { Header } from "../../layouts/header";
import { Main } from "../../layouts/main";
import { AspectRatio } from "../../ui/aspect-ratio";
import { Image } from "../../ui/image";
import { Title } from "../../layouts/title";
import { MetaInfo } from "../../layouts/meta-info";
import { Copyright } from "../../widgets/copyright";
import { Toc } from "../../widgets/toc";
import { CursorPagination } from "../../ui/pagination";
import { Artalk } from "../../widgets/artalk/dynamic";
import { Footer } from "../../layouts/footer";
import { ArticleData } from "../../../contents/types";

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

export const TemplatePage: React.FC<TemplatePageProps> = async ({ data, prev, next, children }) => {
  const [seo, author, license] = await Promise.all([fetcher.seo(), fetcher.author(), fetcher.license()]);
  return (
    <>
      <Header />
      <Main>
        <article>
          {data.thumbnail && (
            <AspectRatio ratio={16 / 9}>
              <Image src={data.thumbnail} alt={`缩略图：${data.title}`} />
            </AspectRatio>
          )}
          <Title title={data.title}>
            <MetaInfo data={data} />
          </Title>
          {children}
          {data.layout === "post" && <Copyright data={data} seo={seo} author={author} license={license} />}
        </article>
        <Toc data={data.body.headings} />
        <CursorPagination prev={prev} next={next} />
        <Artalk name={data.title} slug={data.slug} />
      </Main>
      <Footer />
    </>
  );
};
