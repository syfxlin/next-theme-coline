import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetcher } from "../../contents";
import { TemplateArticles, TemplateArticlesProps, metadataArticles } from "../../components/templates/articles";

interface Props {
  params?: {
    index?: string;
  };
}

const query = React.cache(async (_index?: string): Promise<TemplateArticlesProps | undefined> => {
  try {
    const home = await fetcher.home();
    if (home.display === "document" && !_index) {
      return {
        display: "document",
        document: home.content,
      };
    } else {
      const query = await fetcher.posts();
      const index = _index ? Number.parseInt(_index) : 1;
      const value = query.pages;
      if (!value || value.pages < index) {
        return undefined;
      }
      return {
        display: "articles",
        articles: {
          index,
          pages: value.pages,
          total: value.total,
          items: value.page(index),
        },
      };
    }
  } catch (e) {
    return undefined;
  }
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const data = await query(params?.index);
  if (!data) {
    return notFound();
  }
  return metadataArticles(data);
}

export default async function ArticlesPage({ params }: Props) {
  const data = await query(params?.index);
  if (!data) {
    return notFound();
  }
  return <TemplateArticles {...data} />;
}
