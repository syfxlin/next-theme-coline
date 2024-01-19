import { NextRequest } from "next/server";
import { GithubAdapter } from "../../../adapters/github-adapter";

const adapter = new GithubAdapter();

export async function POST(request: NextRequest) {
  return adapter.route(request);
}
