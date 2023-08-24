import React from "react";
import { Metadata } from "next";
import { metadataArchives, TemplateArchives } from "../../../layouts/template-archives";
import { allArchives, allCategories, allPages, allPosts, allTags } from "../../../contents";

const query = () => {
  return {
    pages: allPages.map((i) => ({
      name: i.title,
      slug: i.slug,
      link: i.link,
    })),
    articles: allPosts.map((i) => ({
      name: i.title,
      slug: i.slug,
      link: i.link,
    })),
    archives: allArchives.map((i) => ({
      name: i.name,
      slug: i.slug,
      link: i.link,
      count: i.items.length,
    })),
    categories: allCategories.map((i) => ({
      name: i.name,
      slug: i.slug,
      link: i.link,
      count: i.items.length,
    })),
    tags: allTags.map((i) => ({
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

const ArchivePage: React.FC = () => {
  const result = query();
  return <TemplateArchives {...result} />;
};

export default ArchivePage;
