import React from "react";
import { utils } from "@syfxlin/reks";
import { IS_DEV } from "../env/public";
import { resolve } from "../utils/vender";
import { reader } from "./reader";
import { slugger } from "./slugger";
import {
  ArticleData,
  AuthorData,
  CollectionResult,
  FooterData,
  FriendsData,
  GroupData,
  GroupPageData,
  HeaderData,
  HomeData,
  LicenseData,
  PageData,
  ProjectsData,
  SeoData,
  SingletonResult,
} from "./types";

const seo: SingletonResult<SeoData> = React.cache(async () => {
  const info = await reader.singletons.seo.read({ resolveLinkedFiles: true });
  return {
    link: info?.link ?? "http://localhost:3000",
    logo: info?.logo ?? "https://raw.githubusercontent.com/syfxlin/blog/master/public/image/config/seo/logo.400x400.jpg",
    title: info?.title ?? "Coline",
    subtitle: info?.subtitle ?? "轻快、简洁、优雅的 Next.js 模板",
    description: info?.description ?? "Coline（connect, line）是一个基于 Next.js App Router 开发的博客模板，建立在轻快与简洁的设计理念上，摒弃花里胡哨的界面，专注于内容创作。",
    birthday: new Date(info?.birthday ?? Date.now()),
    keywords: info?.keywords ?? ["Coline", "Blog", "Next.js", "Next.js Theme"],
  };
});

const author: SingletonResult<AuthorData> = React.cache(async () => {
  const info = await reader.singletons.author.read({ resolveLinkedFiles: true });
  return {
    fullname: info ? `${info.firstname} ${info.lastname}` : "Coline",
    username: info?.username ?? "coline",
    firstname: info?.firstname ?? "Coline",
    lastname: info?.lastname ?? "Coline",
    avatar: info?.avatar ?? "https://raw.githubusercontent.com/syfxlin/blog/master/public/image/config/seo/logo.400x400.jpg",
    description: info?.description ?? "轻快、简洁、优雅的 Next.js 模板",
  };
});

const header: SingletonResult<HeaderData> = React.cache(async () => {
  const info = await reader.singletons.header.read({ resolveLinkedFiles: true });
  if (!info) {
    return { main: [] };
  }
  return info as HeaderData;
});

const footer: SingletonResult<FooterData> = React.cache(async () => {
  const info = await reader.singletons.footer.read({ resolveLinkedFiles: true });
  if (!info) {
    return { main: [] };
  }
  return info as FooterData;
});

const license: SingletonResult<LicenseData> = React.cache(async () => {
  const info = await reader.singletons.license.read({ resolveLinkedFiles: true });
  if (!info) {
    return { name: "BY-NC-SA", link: "https://creativecommons.org/licenses/by-nc-sa/4.0/" };
  }
  return info as LicenseData;
});

const home: SingletonResult<HomeData> = React.cache(async () => {
  const info = await reader.singletons.home.read({ resolveLinkedFiles: true });
  if (!info) {
    return { display: "articles" };
  }
  return {
    display: info.display,
    content: utils.document(info.content),
  } as HomeData;
});

const friends: SingletonResult<FriendsData> = React.cache(async () => {
  const info = await reader.singletons.friends.read({ resolveLinkedFiles: true });
  if (!info) {
    return { display: "hidden" };
  }
  return {
    display: info.display,
    content: utils.document(info.content),
    links: info.links,
    lost_links: info.lost_links,
  } as FriendsData;
});

const projects: SingletonResult<ProjectsData> = React.cache(async () => {
  const info = await reader.singletons.projects.read({ resolveLinkedFiles: true });
  if (!info) {
    return { display: "hidden" };
  }
  return {
    display: info.display,
    content: utils.document(info.content),
    categories: info.categories,
  } as ProjectsData;
});

const pages: CollectionResult<ArticleData, PageData<ArticleData>> = React.cache(async () => {
  const results: Array<ArticleData> = [];

  for (const info of await reader.collections.pages.all({ resolveLinkedFiles: true })) {
    const entry = info.entry as Record<string, any>;

    if (!IS_DEV && entry.status !== "publish") {
      continue;
    }

    const year = String(new Date(entry.published_time).getFullYear());
    const body = utils.document(entry.body);
    results.push({
      title: entry.title,
      slug: info.slug.toLowerCase(),
      link: resolve(info.slug.toLowerCase()),
      layout: entry.layout,
      status: entry.status,
      published: new Date(entry.published_time),
      modified: new Date(entry.modified_time),
      thumbnail: entry.thumbnail,
      body: {
        document: body.document,
        headings: body.headings,
        contents: body.contents,
        excerpts: body.excerpts,
      },
      archives: {
        name: year,
        slug: year,
        link: resolve("archive", year),
      },
    });
  }

  const items = results.sort((a, b) => b.published.getTime() - a.published.getTime());
  const pages = utils.pagination(10, items);

  return {
    items,
    pages,
  };
});

const posts: CollectionResult<ArticleData, PageData<ArticleData>> = React.cache(async () => {
  const results: Array<ArticleData> = [];

  for (const info of await reader.collections.posts.all({ resolveLinkedFiles: true })) {
    const entry = info.entry as Record<string, any>;

    if (!IS_DEV && entry.status !== "publish") {
      continue;
    }

    const year = String(new Date(entry.published_time).getFullYear());
    const body = utils.document(entry.body);
    results.push({
      title: entry.title,
      slug: info.slug.toLowerCase(),
      link: resolve("post", info.slug.toLowerCase()),
      layout: entry.layout,
      status: entry.status,
      published: new Date(entry.published_time),
      modified: new Date(entry.modified_time),
      thumbnail: entry.thumbnail,
      body: {
        document: body.document,
        headings: body.headings,
        contents: body.contents,
        excerpts: body.excerpts,
      },
      archives: {
        name: year,
        slug: year,
        link: resolve("archive", year),
      },
      categories: entry.categories?.map((name: string) => {
        const n = name.trim();
        const s = slugger(n);
        const k = resolve("category", s);
        return { name: n, slug: s, link: k };
      }),
      tags: entry.tags?.map((name: string) => {
        const n = name.trim();
        const s = slugger(n);
        const k = resolve("tag", s);
        return { name: n, slug: s, link: k };
      }),
    });
  }

  const items = results.sort((a, b) => b.published.getTime() - a.published.getTime());
  const pages = utils.pagination(10, items);

  return {
    items,
    pages,
  };
});

const categories: CollectionResult<GroupData<ArticleData>, Array<GroupPageData<ArticleData>>> = React.cache(async () => {
  const query = await posts();

  const mapping: Record<string, Array<ArticleData>> = {};
  for (const item of query.items) {
    for (const category of item.categories ?? []) {
      mapping[category.name] = mapping[category.name] ?? [];
      mapping[category.name].push(item);
    }
  }

  const items: Array<GroupData<ArticleData>> = [];
  for (const entry of Object.entries(mapping).sort((a, b) => a[0].localeCompare(b[0]))) {
    const n = entry[0];
    const s = slugger(n);
    const k = resolve("category", s);
    const i = entry[1].sort((a, b) => b.published.getTime() - a.published.getTime());
    items.push({ name: n, slug: s, link: k, items: i });
  }

  const pages: Array<GroupPageData<ArticleData>> = [];
  for (const item of items) {
    pages.push({
      name: item.name,
      slug: item.slug,
      link: item.link,
      ...utils.pagination(10, item.items),
    });
  }

  return {
    items,
    pages,
  };
});

const tags: CollectionResult<GroupData<ArticleData>, Array<GroupPageData<ArticleData>>> = React.cache(async () => {
  const query = await posts();

  const mapping: Record<string, Array<ArticleData>> = {};
  for (const item of query.items) {
    for (const tag of item.tags ?? []) {
      mapping[tag.name] = mapping[tag.name] ?? [];
      mapping[tag.name].push(item);
    }
  }

  const items: Array<GroupData<ArticleData>> = [];
  for (const entry of Object.entries(mapping).sort((a, b) => a[0].localeCompare(b[0]))) {
    const n = entry[0];
    const s = slugger(n);
    const k = resolve("tag", s);
    const i = entry[1].sort((a, b) => b.published.getTime() - a.published.getTime());
    items.push({ name: n, slug: s, link: k, items: i });
  }

  const pages: Array<GroupPageData<ArticleData>> = [];
  for (const item of items) {
    pages.push({
      name: item.name,
      slug: item.slug,
      link: item.link,
      ...utils.pagination(10, item.items),
    });
  }

  return {
    items,
    pages,
  };
});

const archives: CollectionResult<GroupData<ArticleData>, Array<GroupPageData<ArticleData>>> = React.cache(async () => {
  const query = await posts();

  const mapping: Record<string, Array<ArticleData>> = {};
  for (const item of query.items) {
    mapping[item.archives.name] = mapping[item.archives.name] ?? [];
    mapping[item.archives.name].push(item);
  }

  const items: Array<GroupData<ArticleData>> = [];
  for (const entry of Object.entries(mapping).sort((a, b) => a[0].localeCompare(b[0]))) {
    const n = entry[0];
    const s = slugger(n);
    const k = resolve("archive", s);
    const i = entry[1].sort((a, b) => b.published.getTime() - a.published.getTime());
    items.push({ name: n, slug: s, link: k, items: i });
  }

  const pages: Array<GroupPageData<ArticleData>> = [];
  for (const item of items) {
    pages.push({
      name: item.name,
      slug: item.slug,
      link: item.link,
      ...utils.pagination(10, item.items),
    });
  }

  return {
    items,
    pages,
  };
});

export const fetcher = {
  seo,
  author,
  header,
  footer,
  license,
  home,
  friends,
  projects,
  pages,
  posts,
  categories,
  tags,
  archives,
};
