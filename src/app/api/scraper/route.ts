import ogs from "open-graph-scraper";
import { NextRequest, NextResponse } from "next/server";
import { fetcher } from "../../../contents";
import React from "react";

const scraper = React.cache((link: string) => ogs({ url: link }));

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

  try {
    const results: ScraperResponse = { link };
    if (/^(https?:)?\/\//i.test(link)) {
      const query = await scraper(link);
      if (!query.error) {
        results.site = query.result.ogSiteName;
        results.title = query.result.ogTitle;
        results.excerpt = query.result.ogDescription?.substring(0, 100) + "...";
        results.thumbnail = query.result.ogImage?.[0]?.url;
      }
    } else {
      const [seo, posts] = await Promise.all([fetcher.seo(), fetcher.posts()]);
      const value = posts.items.find((i) => [i.slug, i.link].includes(link));
      if (value) {
        results.site = seo.title;
        results.title = value.title;
        results.excerpt = value.body.excerpts;
        results.thumbnail = value.thumbnail;
      }
    }
    return NextResponse.json(results);
  } catch (e) {
    return NextResponse.json({ code: 502, message: "Fetch open graph information failed." }, { status: 502 });
  }
};
