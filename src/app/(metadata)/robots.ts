import { MetadataRoute } from "next";
import { fetcher } from "../../contents";
import { resolve } from "../../utils/vender";

const Robots = async (): Promise<MetadataRoute.Robots> => {
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
};

export default Robots;
