import React from "react";
import { Metadata } from "next";
import { fetcher } from "../../../contents";
import { metadata } from "../../../components/layouts/root/metadata";
import { Link } from "../../../components/ui/link";
import { Template } from "../../../components/templates/template";
import { Heading } from "../../../components/docs/heading";
import { List } from "../../../components/docs/list";
import { notFound } from "next/navigation";

const query = React.cache(async () => {
  const [posts, archives, categories, tags] = await Promise.all([
    fetcher.posts(),
    fetcher.archives(),
    fetcher.categories(),
    fetcher.tags(),
  ]);
  return {
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
});

export const generateMetadata = async (): Promise<Metadata> => {
  const data = await query();
  if (
    data.articles.length === 0 &&
    data.archives.length === 0 &&
    data.categories.length === 0 &&
    data.tags.length === 0
  ) {
    return notFound();
  }
  return metadata({
    title: "归档",
    link: "/archives",
  });
};

export default async function ArchivesPage() {
  const data = await query();
  if (
    data.articles.length === 0 &&
    data.archives.length === 0 &&
    data.categories.length === 0 &&
    data.tags.length === 0
  ) {
    return notFound();
  }
  return (
    <Template
      name="归档"
      link="/archives"
      desc={`${data.archives.length} 归档 × ${data.categories.length} 分类 × ${data.tags.length} 标签 × ${data.articles.length} 文章`}
    >
      {data.categories.length !== 0 && (
        <section className="slide-enter" style={{ "--enter-step": 0 } as any}>
          <Heading level={2}>分类</Heading>
          <List type="unordered" direction="vertical">
            {[...data.categories]
              .sort((i1, i2) => i2.count - i1.count)
              .map((i) => (
                <Link key={`category-${i.name}`} tippy aria-label={`分类：${i.name}`} href={i.link}>
                  {i.name} ({i.count})
                </Link>
              ))}
          </List>
        </section>
      )}
      {data.archives.length !== 0 && (
        <section className="slide-enter" style={{ "--enter-step": 1 } as any}>
          <Heading level={2}>归档</Heading>
          <List type="unordered" direction="vertical">
            {[...data.archives]
              .sort((i1, i2) => i2.name.localeCompare(i1.name))
              .map((i) => (
                <Link key={`archive-${i.name}`} tippy aria-label={`归档：${i.name}`} href={i.link}>
                  {i.name} ({i.count})
                </Link>
              ))}
          </List>
        </section>
      )}
      {data.tags.length !== 0 && (
        <section className="slide-enter" style={{ "--enter-step": 2 } as any}>
          <Heading level={2}>标签</Heading>
          <List type="unordered" direction="horizontal">
            {[...data.tags]
              .sort((i1, i2) => i1.name.localeCompare(i2.name))
              .map((i) => (
                <Link key={`tag-${i.name}`} tippy aria-label={`标签：${i.name}`} href={i.link}>
                  #{i.name} ({i.count})
                </Link>
              ))}
          </List>
        </section>
      )}
    </Template>
  );
}
