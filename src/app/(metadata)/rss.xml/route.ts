import RSS from "rss";
import { allPosts, author, seo } from "../../../contents";
import { NextResponse } from "next/server";
import { resolve } from "../../../utils/vender";

export const GET = async () => {
  const rss = new RSS({
    title: seo.title,
    description: seo.description,
    language: seo.language,
    site_url: resolve(seo.link),
    feed_url: resolve(seo.link, "rss.xml"),
    image_url: resolve(seo.link, "opengraph-image.png"),
    generator: "Next.PHP",
  });

  for (const post of allPosts) {
    rss.item({
      title: post.title,
      description: post.excerpt,
      guid: post.slug,
      url: resolve(seo.link, post.link),
      date: post.published,
      author: author.fullname,
      categories: post.categories?.map((i) => i.name),
      enclosure: post.thumbnail ? { url: resolve(seo.link, post.thumbnail.src) } : undefined,
    });
  }

  return new NextResponse(rss.xml(), {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
};
