import { NextRequest } from "next/server";
import { GithubAdapter } from "../../../adapters/github-adapter";

const adapter = new GithubAdapter();

export const POST = async (request: NextRequest) => {
  return adapter.route(request);
};
