// noinspection JSUnusedGlobalSymbols
import * as c from "contentlayer/generated";
import Fuse from "fuse.js";
import { pagination, resolve } from "../utils/vender";
import { ArticleData, AuthorData, FooterData, GroupData, HeaderData, LicenseData, LinkData, SeoData } from "./types";

export const seo: SeoData = {
  language: c.seo.language,
  link: c.seo.link,
  logo: c.seo._images[c.seo.logo.filePath],
  title: c.seo.title,
  subtitle: c.seo.subtitle,
  description: c.seo.description,
  birthday: new Date(c.seo.birthday),
  keywords: c.seo.keywords,
};

export const header: HeaderData = {
  main: c.header.main,
};

export const footer: FooterData = {
  main: c.footer.main,
};

export const author: AuthorData = {
  fullname: `${c.author.firstname} ${c.author.lastname}`,
  username: c.author.username,
  firstname: c.author.firstname,
  lastname: c.author.lastname,
  avatar: c.author._images[c.author.avatar.filePath],
  description: c.author.description,
};

export const license: LicenseData = {
  name: c.license.name,
  link: c.license.link,
};

export const link: LinkData = {
  links: c.link.links.map((i) => ({
    name: i.name,
    link: i.link,
    avatar: c.link._images[i.avatar.filePath],
    author: i.author,
    description: i.description,
  })),
  lost_links: c.link.lost_links.map((i) => ({
    name: i.name,
    link: i.link,
  })),
};

export const allPages: Array<ArticleData> = [...c.allPages]
  .sort((a, b) => new Date(b.published_time).getTime() - new Date(a.published_time).getTime())
  .map((doc) => {
    const raw = doc._raw as any;
    const slug = doc.slug.toLowerCase();
    const year = String(new Date(doc.published_time).getFullYear());
    return {
      title: doc.title,
      slug: slug,
      link: resolve(slug),
      layout: doc.layout,
      status: doc.status,
      published: new Date(doc.published_time),
      modified: new Date(doc.modified_time),
      excerpt: raw.contents.substring(0, 140) + "...",
      headings: raw.headings,
      thumbnail: doc.thumbnail && doc._images[doc.thumbnail.filePath],
      body: {
        raw: doc.body.raw,
        code: doc.body.code,
        text: raw.contents,
      },
      archives: {
        name: year,
        slug: year,
        link: resolve("archive", year),
      },
    };
  });

export const allPosts: Array<ArticleData> = [...c.allPosts]
  .sort((a, b) => new Date(b.published_time).getTime() - new Date(a.published_time).getTime())
  .map((doc) => {
    const raw = doc._raw as any;
    const slug = doc.slug.toLowerCase();
    const year = String(new Date(doc.published_time).getFullYear());
    return {
      title: doc.title,
      slug: slug,
      link: resolve("post", slug),
      layout: doc.layout,
      status: doc.status,
      published: new Date(doc.published_time),
      modified: new Date(doc.modified_time),
      excerpt: raw.contents.substring(0, 140) + "...",
      headings: raw.headings,
      thumbnail: doc.thumbnail && doc._images[doc.thumbnail.filePath],
      body: {
        raw: doc.body.raw,
        code: doc.body.code,
        text: raw.contents,
      },
      archives: {
        name: year,
        slug: year,
        link: resolve("archive", year),
      },
      categories: doc.categories?.map((name) => ({
        name: name.trim(),
        slug: name.trim().toLowerCase(),
        link: resolve("category", name),
      })),
      tags: doc.tags?.map((name) => ({
        name: name.trim(),
        slug: name.trim().toLowerCase(),
        link: resolve("tag", name),
      })),
    };
  });

export const allCategories: Array<GroupData<ArticleData>> = (() => {
  const mapping: Record<string, Array<ArticleData>> = {};
  for (const post of allPosts) {
    for (const item of post.categories ?? []) {
      mapping[item.name] = mapping[item.name] ?? [];
      mapping[item.name].push(post);
    }
  }
  const results: Array<GroupData<ArticleData>> = [];
  for (const key of Object.keys(mapping).sort((a, b) => a.localeCompare(b))) {
    results.push({
      name: key,
      slug: key.toLowerCase(),
      link: resolve("category", key),
      items: [...mapping[key]].sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime()),
    });
  }
  return results;
})();

export const allTags: Array<GroupData<ArticleData>> = (() => {
  const mapping: Record<string, Array<ArticleData>> = {};
  for (const post of allPosts) {
    for (const item of post.tags ?? []) {
      mapping[item.name] = mapping[item.name] ?? [];
      mapping[item.name].push(post);
    }
  }
  const results: Array<GroupData<ArticleData>> = [];
  for (const key of Object.keys(mapping).sort((a, b) => a.localeCompare(b))) {
    results.push({
      name: key,
      slug: key.toLowerCase(),
      link: resolve("tag", key),
      items: [...mapping[key]].sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime()),
    });
  }
  return results;
})();

export const allArchives: Array<GroupData<ArticleData>> = (() => {
  const mapping: Record<string, Array<ArticleData>> = {};
  for (const post of allPosts) {
    mapping[post.archives.name] = mapping[post.archives.name] ?? [];
    mapping[post.archives.name].push(post);
  }
  const results: Array<GroupData<ArticleData>> = [];
  for (const key of Object.keys(mapping).sort((a, b) => a.localeCompare(b))) {
    results.push({
      name: key,
      slug: key.toLowerCase(),
      link: resolve("archive", key),
      items: [...mapping[key]].sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime()),
    });
  }
  return results;
})();

export const paginationPages = (() => {
  const items = pagination(10, allPages);
  return {
    page: (index: number) => items[index - 1],
    items: items,
    pages: items.length,
    total: allPages.length,
  };
})();

export const paginationPosts = (() => {
  const items = pagination(10, allPosts);
  return {
    page: (index: number) => items[index - 1],
    items: items,
    pages: items.length,
    total: allPosts.length,
  };
})();

export const paginationCategories = allCategories.map((i) => {
  const items = pagination(10, i.items);
  return {
    name: i.name,
    slug: i.name.toLowerCase(),
    link: resolve("category", i.name),
    page: (index: number) => items[index - 1],
    items: items,
    pages: items.length,
    total: i.items.length,
  };
});

export const paginationTags = allTags.map((i) => {
  const items = pagination(10, i.items);
  return {
    name: i.name,
    slug: i.name.toLowerCase(),
    link: resolve("tag", i.name),
    page: (index: number) => items[index - 1],
    items: items,
    pages: items.length,
    total: i.items.length,
  };
});

export const paginationArchives = allArchives.map((i) => {
  const items = pagination(10, i.items);
  return {
    name: i.name,
    slug: i.name.toLowerCase(),
    link: resolve("archive", i.name),
    page: (index: number) => items[index - 1],
    items: items,
    pages: items.length,
    total: i.items.length,
  };
});

export const searchEngines = new Fuse(allPosts, {
  includeScore: true,
  useExtendedSearch: true,
  keys: [
    { name: "title", weight: 5 },
    { name: "excerpt", weight: 4 },
    { name: "_raw.contents", weight: 3 },
    { name: "categories", weight: 3 },
    { name: "tags", weight: 3 },
    { name: "link", weight: 2 },
    { name: "published_time", weight: 2 },
    { name: "modified_time", weight: 2 },
  ],
});
