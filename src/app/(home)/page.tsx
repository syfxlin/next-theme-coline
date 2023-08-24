import React from "react";
import { paginationPosts } from "../../contents";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { metadataArticles, TemplateArticles } from "../../layouts/template-articles";

type Props = {
  params: {
    index?: string;
  };
};

const query = ({ params }: Props) => {
  try {
    const index = params.index ? parseInt(params.index) : 1;
    const value = paginationPosts;
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
  const result = query(props);
  if (!result) {
    return notFound();
  }
  return metadataArticles({
    index: result.index,
    pages: result.pages,
    total: result.total,
  });
};

const ArticlesPage: React.FC<Props> = (props) => {
  const result = query(props);
  if (!result) {
    return notFound();
  }
  return <TemplateArticles index={result.index} pages={result.pages} total={result.total} items={result.items} />;
};

export default ArticlesPage;
