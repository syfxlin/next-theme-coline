import React from "react";
import { GithubInner } from "./inner";
import { GithubAdapter, GithubRequest } from "../../../adapters/github-adapter";

const adapter = new GithubAdapter();

export const Github: React.FC<GithubRequest> = React.memo(async (params) => {
  const query = await adapter.component(params);
  return <GithubInner {...query} />;
});
