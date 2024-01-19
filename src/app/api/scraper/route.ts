import { NextRequest } from "next/server";
import { ScraperAdapter } from "../../../adapters/scraper-adapter";

const adapter = new ScraperAdapter();

export async function POST(request: NextRequest) {
  return adapter.route(request);
}
