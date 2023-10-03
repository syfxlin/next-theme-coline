import React from "react";
import config from "../keystatic.config";
import Fuse from "fuse.js";
import { slug } from "github-slugger";
import { createReader } from "@keystatic/core/reader";
import { pagination, resolve } from "../utils/vender";
import { IS_DEV } from "../env/public.mjs";
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

export const slugger = (value: string) => {
  return slug(decodeURIComponent(value.trim().toLowerCase()));
};

export const reader = createReader(process.cwd(), config);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const document = (body: Array<any>) => {
  const visit = (items: Array<any>) => {
    const headings: Array<any> = [];
    const contents: Array<string> = [];
    for (const item of items) {
      if (item.text) {
        contents.push(item.text as string);
      } else if (item.type === "heading") {
        const results = visit(item.children as Array<any>);
        const name = results.contents.join("");
        const slug = name;
        const link = `#${encodeURIComponent(name)}`;
        const level = item.level;
        headings.push({ name, slug, link, level });
        headings.push(...results.headings);
        contents.push(...results.contents);
      } else if (item.children) {
        const results = visit(item.children as Array<any>);
        headings.push(...results.headings);
        contents.push(...results.contents);
      }
    }
    return { headings, contents };
  };

  const build = (headings: any[], parent: any = { level: 0, children: [] }) => {
    parent.children = parent.children ?? [];
    while (headings.length) {
      const heading = headings.shift();
      if (heading.level > parent.level) {
        parent.children.push(build(headings, heading));
      } else {
        headings.unshift(heading);
        return parent;
      }
    }
    return parent;
  };

  const results = visit(body);

  const document = body;
  const headings = build(results.headings.map((h, i) => ({ ...h, step: i }))).children;
  const contents = results.contents.join(" ");
  const excerpts = contents.length <= 140 ? contents : contents.substring(0, 140) + "...";

  return { document, headings, contents, excerpts };
};

const seo: () => SingletonResult<SeoData> = React.cache(async () => {
  const info = await reader.singletons.seo.read();
  if (!info) {
    throw new TypeError("No seo data configured.");
  }
  return {
    language: info.language,
    link: info.link,
    logo: info.logo,
    title: info.title,
    subtitle: info.subtitle,
    description: info.description,
    birthday: new Date(info.birthday as string),
    keywords: info.keywords,
  };
});

const author: () => SingletonResult<AuthorData> = React.cache(async () => {
  const info = await reader.singletons.author.read();
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

const header: () => SingletonResult<HeaderData> = React.cache(async () => {
  const info = await reader.singletons.header.read();
  if (!info) {
    return { main: [] };
  }
  return info as HeaderData;
});

const footer: () => SingletonResult<FooterData> = React.cache(async () => {
  const info = await reader.singletons.footer.read();
  if (!info) {
    return { main: [] };
  }
  return info as FooterData;
});

const license: () => SingletonResult<LicenseData> = React.cache(async () => {
  const info = await reader.singletons.license.read();
  if (!info) {
    return { name: "BY-NC-SA", link: "https://creativecommons.org/licenses/by-nc-sa/4.0/" };
  }
  return info as LicenseData;
});

const home: () => SingletonResult<HomeData> = React.cache(async () => {
  const info = await reader.singletons.home.read();
  if (!info) {
    return { display: "articles" };
  }
  return {
    display: info.display,
    content: document(await info.content()),
  } as HomeData;
});

const friends: () => SingletonResult<FriendsData> = React.cache(async () => {
  const info = await reader.singletons.friends.read();
  if (!info) {
    return { display: "hidden" };
  }
  return {
    display: info.display,
    content: document(await info.content()),
    links: info.links,
    lost_links: info.lost_links,
  } as FriendsData;
});

const projects: () => SingletonResult<ProjectsData> = React.cache(async () => {
  const info = await reader.singletons.projects.read();
  if (!info) {
    return { display: "hidden" };
  }
  return {
    display: info.display,
    content: document(await info.content()),
    categories: info.categories,
  } as ProjectsData;
});

const pages: () => CollectionResult<ArticleData, PageData<ArticleData>> = React.cache(async () => {
  const results: Array<ArticleData> = [];

  for (const info of await reader.collections.pages.all()) {
    const entry = info.entry as Record<string, any>;

    if (!IS_DEV && entry.status !== "publish") {
      continue;
    }

    const year = String(new Date(entry.published_time).getFullYear());
    const body = document(await entry.body());
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
  const pages = pagination(10, items);

  return {
    items,
    pages: {
      page: (index: number) => pages[index - 1],
      items: pages,
      pages: pages.length,
      total: items.length,
    },
  };
});

const posts: () => CollectionResult<ArticleData, PageData<ArticleData>> = React.cache(async () => {
  const results: Array<ArticleData> = [];

  for (const info of await reader.collections.posts.all()) {
    const entry = info.entry as Record<string, any>;

    if (!IS_DEV && entry.status !== "publish") {
      continue;
    }

    const year = String(new Date(entry.published_time).getFullYear());
    const body = document(await entry.body());
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
  const pages = pagination(10, items);

  return {
    items,
    pages: {
      page: (index: number) => pages[index - 1],
      items: pages,
      pages: pages.length,
      total: items.length,
    },
  };
});

// prettier-ignore
const categories: () => CollectionResult<GroupData<ArticleData>, Array<GroupPageData<ArticleData>>> = React.cache(async () => {
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
    const data = pagination(10, item.items);
    pages.push({
      name: item.name,
      slug: item.slug,
      link: item.link,
      page: (index) => data[index - 1],
      items: data,
      pages: data.length,
      total: item.items.length,
    });
  }

  return {
    items,
    pages,
  };
});

// prettier-ignore
const tags: () => CollectionResult<GroupData<ArticleData>, Array<GroupPageData<ArticleData>>> = React.cache(async () => {
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
    const data = pagination(10, item.items);
    pages.push({
      name: item.name,
      slug: item.slug,
      link: item.link,
      page: (index) => data[index - 1],
      items: data,
      pages: data.length,
      total: item.items.length,
    });
  }

  return {
    items,
    pages,
  };
});

// prettier-ignore
const archives: () => CollectionResult<GroupData<ArticleData>, Array<GroupPageData<ArticleData>>> = React.cache(async () => {
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
    const data = pagination(10, item.items);
    pages.push({
      name: item.name,
      slug: item.slug,
      link: item.link,
      page: (index) => data[index - 1],
      items: data,
      pages: data.length,
      total: item.items.length,
    });
  }

  return {
    items,
    pages,
  };
});

const search: () => Promise<Fuse<ArticleData>> = React.cache(async () => {
  const query = await posts();
  return new Fuse(query.items, {
    includeScore: true,
    useExtendedSearch: true,
    keys: [
      { name: "title", weight: 5 },
      { name: "body.excerpts", weight: 4 },
      { name: "body.contents", weight: 3 },
      { name: "categories", weight: 3 },
      { name: "tags", weight: 3 },
      { name: "link", weight: 2 },
      { name: "published", weight: 2 },
      { name: "modified", weight: 2 },
    ],
  });
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
  search,
};
