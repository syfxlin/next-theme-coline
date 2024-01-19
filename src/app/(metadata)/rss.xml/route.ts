import RSS from "rss";
import { NextResponse } from "next/server";
import { fetcher } from "../../../contents";
import { resolve } from "../../../utils/vender";
import { COLINE_LANGUAGE } from "../../../env/public";

export async function GET() {
  const [seo, author, posts] = await Promise.all([fetcher.seo(), fetcher.author(), fetcher.posts()]);

  const rss = new RSS({
    language: COLINE_LANGUAGE,
    title: seo.title,
    description: seo.description,
    site_url: resolve(seo.link),
    feed_url: resolve(seo.link, "rss.xml"),
    image_url: resolve(seo.link, "opengraph-image.png"),
    generator: "Next.PHP",
  });

  for (const post of posts.items) {
    rss.item({
      title: post.title,
      description: post.body.excerpts,
      guid: post.slug,
      url: resolve(seo.link, post.link),
      date: post.published,
      author: author.fullname,
      categories: post.categories?.map(i => i.name),
      enclosure: post.thumbnail ? { url: resolve(seo.link, post.thumbnail) } : undefined,
    });
  }

  return new NextResponse(rss.xml(), {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
