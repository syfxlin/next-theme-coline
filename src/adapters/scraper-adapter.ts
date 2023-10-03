import React from "react";
import ogs from "open-graph-scraper";
import { Adapter, AdapterError } from "./adapter";
import { fetcher } from "../contents";

export type ScraperRequest = {
  link: string;
  title?: string;
};

export type ScraperResponse = {
  link: string;
  site?: string;
  title?: string;
  excerpt?: string;
  thumbnail?: string;
};

const scraper = React.cache(async (link: string) => ogs({ url: link }));

export class ScraperAdapter extends Adapter<ScraperRequest, ScraperResponse> {
  async valid(params: ScraperRequest): Promise<boolean> {
    return params && !!params.link;
  }

  async query(params: ScraperRequest): Promise<ScraperResponse> {
    try {
      const data: ScraperResponse = { link: params.link };
      if (/^(https?:)?\/\//i.test(params.link)) {
        const query = await scraper(params.link);
        if (!query.error) {
          data.site = query.result.ogSiteName;
          data.title = query.result.ogTitle;
          data.excerpt = query.result.ogDescription?.substring(0, 100) + "...";
          data.thumbnail = query.result.ogImage?.[0]?.url;
        }
      } else {
        const [seo, posts] = await Promise.all([fetcher.seo(), fetcher.posts()]);
        const value = posts.items.find((i) => [i.slug, i.link].includes(params.link));
        if (value) {
          data.site = seo.title;
          data.title = value.title;
          data.excerpt = value.body.excerpts;
          data.thumbnail = value.thumbnail;
        }
      }
      return data;
    } catch (e) {
      throw new AdapterError(502, "Fetch open graph information failed.");
    }
  }
}
