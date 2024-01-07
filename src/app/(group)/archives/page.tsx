import React from "react";
import { Metadata } from "next";
import { fetcher } from "../../../contents";
import { metadata } from "../../../components/layouts/root/metadata";
import { Link } from "../../../components/ui/link";
import { Template } from "../../../components/templates/template";
import { Heading } from "../../../components/docs/heading";
import { List } from "../../../components/docs/list";
import { notFound } from "next/navigation";
import { t } from "../../../locales";

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
    title: t("archives.name"),
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
      link="/archives"
      name={t("archives.name")}
      desc={t("archives.desc", data.archives.length, data.categories.length, data.tags.length, data.articles.length)}
    >
      {data.categories.length !== 0 && (
        <section className="slide-enter" style={{ "--enter-step": 0 } as any}>
          <Heading level={2}>{t("category.name")}</Heading>
          <List type="unordered" direction="vertical">
            {[...data.categories]
              .sort((i1, i2) => i2.count - i1.count)
              .map((i) => (
                <Link key={`category-${i.name}`} tooltip aria-label={t("category.desc", i.name)} href={i.link}>
                  {i.name} ({i.count})
                </Link>
              ))}
          </List>
        </section>
      )}
      {data.archives.length !== 0 && (
        <section className="slide-enter" style={{ "--enter-step": 1 } as any}>
          <Heading level={2}>{t("archive.name")}</Heading>
          <List type="unordered" direction="vertical">
            {[...data.archives]
              .sort((i1, i2) => i2.name.localeCompare(i1.name))
              .map((i) => (
                <Link key={`archive-${i.name}`} tooltip aria-label={t("archive.desc", i.name)} href={i.link}>
                  {i.name} ({i.count})
                </Link>
              ))}
          </List>
        </section>
      )}
      {data.tags.length !== 0 && (
        <section className="slide-enter" style={{ "--enter-step": 2 } as any}>
          <Heading level={2}>{t("tag.name")}</Heading>
          <List type="unordered" direction="horizontal">
            {[...data.tags]
              .sort((i1, i2) => i1.name.localeCompare(i2.name))
              .map((i) => (
                <Link key={`tag-${i.name}`} tooltip aria-label={t("tag.desc", i.name)} href={i.link}>
                  #{i.name} ({i.count})
                </Link>
              ))}
          </List>
        </section>
      )}
    </Template>
  );
}
