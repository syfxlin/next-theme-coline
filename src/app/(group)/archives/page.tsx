import React from "react";
import { Metadata } from "next";
import { metadataArchives, TemplateArchives } from "../../../components/templates/archives";
import { fetcher } from "../../../contents";

const query = async () => {
  const [pages, posts, archives, categories, tags] = await Promise.all([
    fetcher.pages(),
    fetcher.posts(),
    fetcher.archives(),
    fetcher.categories(),
    fetcher.tags(),
  ]);
  return {
    pages: pages.items.map((i) => ({
      name: i.title,
      slug: i.slug,
      link: i.link,
    })),
    articles: posts.items.map((i) => ({
      name: i.title,
      slug: i.slug,
      link: i.link,
    })),
    archives: archives.items.map((i) => ({
      name: i.name,
      slug: i.slug,
      link: i.link,
      count: i.items.length,
    })),
    categories: categories.items.map((i) => ({
      name: i.name,
      slug: i.slug,
      link: i.link,
      count: i.items.length,
    })),
    tags: tags.items.map((i) => ({
      name: i.name,
      slug: i.slug,
      link: i.link,
      count: i.items.length,
    })),
  };
};

export const generateMetadata = async (): Promise<Metadata> => {
  return metadataArchives();
};

const ArchivePage: React.FC = async () => {
  const result = await query();
  return <TemplateArchives {...result} />;
};

export default ArchivePage;
