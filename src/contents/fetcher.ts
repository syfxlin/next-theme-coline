import React from "react";
import { utils } from "@syfxlin/reks";
import { reader } from "./reader";
import { IS_DEV } from "../env/public";
import { slugger } from "./slugger";
import { resolve } from "../utils/vender";
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
  if (!info) {
    throw new TypeError("No seo data configured.");
  }
  return {
    link: info.link,
    logo: info.logo,
    title: info.title,
    subtitle: info.subtitle,
    description: info.description,
    birthday: new Date(info.birthday as string),
    keywords: info.keywords,
  };
});

const author: SingletonResult<AuthorData> = React.cache(async () => {
  const info = await reader.singletons.author.read({ resolveLinkedFiles: true });
  if (!info) {
    throw new TypeError("No author data configured.");
  }
  return {
    fullname: `${info.firstname} ${info.lastname}`,
    username: info.username,
    firstname: info.firstname,
    lastname: info.lastname,
    avatar: info.avatar,
    description: info.description,
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

// prettier-ignore
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

// prettier-ignore
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

// prettier-ignore
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
