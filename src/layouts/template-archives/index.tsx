import React from "react";
import { Metadata } from "next";
import { Header } from "../header";
import { Main } from "../main";
import { Footer } from "../footer";
import { metadata as generateMetadata } from "../root/metadata";
import { Title } from "../../components/layout/title";
import { Heading } from "../../components/widgets/heading";
import { List } from "../../components/widgets/list";
import { Link } from "../../components/ui/link";

export type TemplateArchivesProps = {
  pages: Array<{
    name: string;
    slug: string;
    link: string;
  }>;
  articles: Array<{
    name: string;
    slug: string;
    link: string;
  }>;
  archives: Array<{
    name: string;
    slug: string;
    link: string;
    count: number;
  }>;
  categories: Array<{
    name: string;
    slug: string;
    link: string;
    count: number;
  }>;
  tags: Array<{
    name: string;
    slug: string;
    link: string;
    count: number;
  }>;
};

export const metadataArchives = (): Metadata => {
  return generateMetadata({
    title: "归档",
    link: "/archives",
  });
};

export const TemplateArchives: React.FC<TemplateArchivesProps> = (props) => {
  return (
    <>
      <Header />
      <Main>
        {/*prettier-ignore*/}
        {/* eslint-disable-next-line react/jsx-no-undef */}
        <Title title="归档">
          {props.archives.length} 归档 × {props.categories.length} 分类 × {props.tags.length} 标签 ×{" "}
          {props.articles.length} 文章 × {props.pages.length} 页面
        </Title>
        <article>
          <section>
            <Heading level={2}>分类</Heading>
            <List type="ul">
              {[...props.categories]
                .sort((i1, i2) => i2.count - i1.count)
                .map((i) => (
                  <li key={`category-${i.name}`}>
                    <Link tippy aria-label={`分类：${i.name}`} href={i.link}>
                      {i.name} ({i.count})
                    </Link>
                  </li>
                ))}
            </List>
          </section>
          <section>
            <Heading level={2}>归档</Heading>
            <List type="ul">
              {[...props.archives]
                .sort((i1, i2) => i2.name.localeCompare(i1.name))
                .map((i) => (
                  <li key={`archive-${i.name}`}>
                    <Link tippy aria-label={`归档：${i.name}`} href={i.link}>
                      {i.name} ({i.count})
                    </Link>
                  </li>
                ))}
            </List>
          </section>
          <section>
            <Heading level={2}>标签</Heading>
            <List type="ul" style={{ flexDirection: "row" }}>
              {[...props.tags]
                .sort((i1, i2) => i1.name.localeCompare(i2.name))
                .map((i) => (
                  <li key={`tag-${i.name}`}>
                    <Link tippy aria-label={`标签：${i.name}`} href={i.link}>
                      #{i.name} ({i.count})
                    </Link>
                  </li>
                ))}
            </List>
          </section>
        </article>
      </Main>
      <Footer />
    </>
  );
};
