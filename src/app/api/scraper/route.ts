import { NextRequest } from "next/server";
import { ScraperAdapter } from "../../../adapters/scraper-adapter";

const adapter = new ScraperAdapter();

export const POST = async (request: NextRequest) => {
  return adapter.route(request);
};
