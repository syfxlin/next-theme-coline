import React from "react";
import { Metadata } from "next";
import { fetcher } from "../../../contents";
import { metadata } from "../../../components/layouts/root/metadata";
import { Heading } from "../../../components/widgets/heading";
import { List } from "../../../components/widgets/list";
import { Link } from "../../../components/ui/link";
import { Template } from "../../../components/templates/template";

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
  return metadata({
    title: "归档",
    link: "/archives",
  });
};

export default async function ArchivesPage() {
  const data = await query();
  return (
    <Template
      name="归档"
      slug="/archives"
      desc={`${data.archives.length} 归档 × ${data.categories.length} 分类 × ${data.tags.length} 标签 × ${data.articles.length} 文章 × ${data.pages.length} 页面`}
    >
      <section className="slide-enter" style={{ "--enter-step": 0 } as any}>
        <Heading level={2}>分类</Heading>
        <List type="ul">
          {[...data.categories]
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
      <section className="slide-enter" style={{ "--enter-step": 1 } as any}>
        <Heading level={2}>归档</Heading>
        <List type="ul">
          {[...data.archives]
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
      <section className="slide-enter" style={{ "--enter-step": 2 } as any}>
        <Heading level={2}>标签</Heading>
        <List type="ul" style={{ flexDirection: "row" }}>
          {[...data.tags]
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
    </Template>
  );
}
