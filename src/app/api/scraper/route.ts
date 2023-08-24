import ogs from "open-graph-scraper";
import { NextRequest, NextResponse } from "next/server";
import { allPosts, seo } from "../../../contents";
import { caches } from "../../../services/caches";

export type ScraperResponse = {
  link: string;
  site?: string;
  title?: string;
  excerpt?: string;
  thumbnail?: string;
};

export const GET = async (request: NextRequest) => {
  const link = request.nextUrl.searchParams.get("link");

  if (!link) {
    return NextResponse.json({ code: 400, message: "Illegal parameters." }, { status: 400 });
  }

  const cache = await caches.get<ScraperResponse>(`scraper:${link}`);
  if (cache) {
    return NextResponse.json(cache);
  }

  try {
    const results: ScraperResponse = { link };
    if (/^(https?:)?\/\//i.test(link)) {
      const query = await ogs({ url: link });
      if (!query.error) {
        results.site = query.result.ogSiteName;
        results.title = query.result.ogTitle;
        results.excerpt = query.result.ogDescription?.substring(0, 100) + "...";
        results.thumbnail = query.result.ogImage?.[0]?.url;
      }
    } else {
      const query = allPosts.find((i) => [i.slug.toLowerCase(), i.link.toLowerCase()].includes(link.toLowerCase()));
      if (query) {
        results.site = seo.title;
        results.title = query.title;
        results.excerpt = query.excerpt.substring(0, 100) + "...";
        results.thumbnail = query.thumbnail?.src;
      }
    }
    await caches.set(`scraper:${link}`, results);
    return NextResponse.json(results);
  } catch (e) {
    return NextResponse.json({ code: 502, message: "Fetch open graph information failed." }, { status: 502 });
  }
};
