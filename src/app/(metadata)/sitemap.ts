import { MetadataRoute } from "next";
import { fetcher } from "../../contents";
import { resolve } from "../../utils/vender";

export default async function Sitemap(): Promise<MetadataRoute.Sitemap> {
  const [seo, pages, posts, categories, tags, archives] = await Promise.all([
    fetcher.seo(),
    fetcher.pages(),
    fetcher.posts(),
    fetcher.categories(),
    fetcher.tags(),
    fetcher.archives(),
  ]);

  const lastModified = new Date();
  // prettier-ignore
  const urls = [
    // home
    resolve(seo.link),
    // pages
    resolve(seo.link, "archives"),
    ...pages.items.map((i) => resolve(seo.link, i.link)),
    // posts
    ...posts.items.map((i) => resolve(seo.link, i.link)),
    ...posts.pages.items.map((_, i) => resolve(seo.link, "page", i + 1)),
    // categories
    ...categories.items.map((i) => resolve(seo.link, i.link)),
    ...categories.pages.flatMap((x) => x.items.map((_, i) => resolve(seo.link, x.link, "page", i + 1))),
    // tags
    ...tags.items.map((i) => resolve(seo.link, i.link)),
    ...tags.pages.flatMap((x) => x.items.map((_, i) => resolve(seo.link, x.link, "page", i + 1))),
    // archives
    ...archives.items.map((i) => resolve(seo.link, i.link)),
    ...archives.pages.flatMap((x) => x.items.map((_, i) => resolve(seo.link, x.link, "page", i + 1)))
  ];

  return urls.map((i) => ({ url: i, lastModified }));
}
