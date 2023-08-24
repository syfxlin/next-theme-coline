import { MetadataRoute } from "next";
import {
  allArchives,
  allCategories,
  allPages,
  allPosts,
  allTags,
  paginationArchives,
  paginationCategories,
  paginationPosts,
  paginationTags,
  seo,
} from "../../contents";
import { resolve } from "../../utils/vender";

const Sitemap = (): MetadataRoute.Sitemap => {
  const lastModified = new Date();
  // prettier-ignore
  const urls = [
    // home
    resolve(seo.link),
    // pages
    resolve(seo.link, "archives"),
    ...allPages.map((i) => resolve(seo.link, i.link)),
    // posts
    ...allPosts.map((i) => resolve(seo.link, i.link)),
    ...paginationPosts.items.map((_, i) => resolve(seo.link, "page", i + 1)),
    // categories
    ...allCategories.map((i) => resolve(seo.link, i.link)),
    ...paginationCategories.flatMap((x) => x.items.map((_, i) => resolve(seo.link, x.link, "page", i + 1))),
    // tags
    ...allTags.map((i) => resolve(seo.link, i.link)),
    ...paginationTags.flatMap((x) => x.items.map((_, i) => resolve(seo.link, x.link, "page", i + 1))),
    // archives
    ...allArchives.map((i) => resolve(seo.link, i.link)),
    ...paginationArchives.flatMap((x) => x.items.map((_, i) => resolve(seo.link, x.link, "page", i + 1))),
  ];

  return urls.map((i) => ({ url: i, lastModified }));
};

export default Sitemap;
