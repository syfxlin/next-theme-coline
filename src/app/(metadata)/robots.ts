import { MetadataRoute } from "next";
import { seo } from "../../contents";
import { resolve } from "../../utils/vender";

const Robots = (): MetadataRoute.Robots => {
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
