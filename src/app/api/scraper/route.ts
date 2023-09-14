import { NextRequest } from "next/server";
import { ScraperAdapter } from "../../../adapters/scraper";

const adapter = new ScraperAdapter();

export const POST = async (request: NextRequest) => {
  return adapter.route(request);
};
