import { MetadataRoute } from "next";
import { fetcher } from "../../contents";
import { resolve } from "../../utils/vender";

export default async function Robots(): Promise<MetadataRoute.Robots> {
  const seo = await fetcher.seo();
  return {
    host: resolve(seo.link),
    sitemap: resolve(seo.link, "sitemap.xml"),
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/admin",
    },
  };
}
