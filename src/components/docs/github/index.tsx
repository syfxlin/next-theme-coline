import React from "react";
import { GithubAdapter, GithubRequest } from "../../../adapters/github-adapter";
import { GithubInner } from "./inner";

const adapter = new GithubAdapter();

export const Github: React.FC<GithubRequest> = React.memo(async (params) => {
  const query = await adapter.component(params);
  return <GithubInner {...query} />;
});
