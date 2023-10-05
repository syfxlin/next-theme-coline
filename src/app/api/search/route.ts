import { NextRequest, NextResponse } from "next/server";
import { ArticleList } from "../../../contents/types";
import { searcher } from "../../../contents";

export type SearchResponse = {
  total: number;
  items: Array<ArticleList>;
};

export const GET = async (request: NextRequest) => {
  const params = request.nextUrl.searchParams;
  const query = params.get("query");
  const page = params.get("page");
  const size = params.get("size");
  const pagination = { page: 1, size: 10 };

  try {
    if (!query) {
      return NextResponse.json({ code: 400, message: "Illegal parameters." }, { status: 400 });
    }
    if (page) {
      pagination.page = parseInt(page);
    }
    if (size) {
      pagination.size = parseInt(size);
    }
    if (pagination.page <= 0) {
      return NextResponse.json({ code: 400, message: "Illegal parameters." }, { status: 400 });
    }
    if (pagination.page <= 0) {
      return NextResponse.json({ code: 400, message: "Illegal parameters." }, { status: 400 });
    }
  } catch (e) {
    return NextResponse.json({ code: 400, message: "Illegal parameters." }, { status: 400 });
  }

  const items = (await searcher()).search(query);

  const results: SearchResponse = {
    total: items.length,
    items: items.slice((pagination.page - 1) * pagination.size, pagination.page * pagination.size).map(({ item }) => ({
      title: item.title,
      slug: item.slug,
      link: item.link,
      layout: item.layout,
      status: item.status,
      published: item.published,
      modified: item.modified,
      thumbnail: item.thumbnail,
      archives: item.archives,
      categories: item.categories,
      tags: item.tags,
      body: {
        excerpts: item.body.excerpts,
      },
    })),
  };
  return NextResponse.json(results);
};
