import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetcher } from "../../contents";
import { metadataArticles, metadataHome, TemplateArticles, TemplateHome } from "../../components/templates/articles";

type Props = {
  params?: {
    index?: string;
  };
};

const query = async ({ params }: Props) => {
  try {
    const query = await fetcher.posts();
    const index = params?.index ? parseInt(params.index) : 1;
    const value = query.pages;
    if (!value || value.pages < index) {
      return undefined;
    }
    return {
      index: index,
      pages: value.pages,
      total: value.total,
      items: value.page(index),
    };
  } catch (e) {
    return undefined;
  }
};

export const generateMetadata = async (props: Props): Promise<Metadata> => {
  const home = await fetcher.home();
  if (home.display === "document" && !props.params?.index) {
    return metadataHome();
  }

  const data = await query(props);
  if (!data) {
    return notFound();
  }
  return metadataArticles({
    index: data.index,
    pages: data.pages,
    total: data.total,
  });
};

export default async function ArticlesPage(props: Props) {
  const home = await fetcher.home();
  if (home.display === "document" && !props.params?.index) {
    return <TemplateHome document={home.content} />;
  }

  const data = await query(props);
  if (!data) {
    return notFound();
  }
  return <TemplateArticles index={data.index} pages={data.pages} total={data.total} items={data.items} />;
}
