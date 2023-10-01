"use client";
import React from "react";
import { GithubInner } from "./inner";
import { useAdapter } from "../../../adapters/use-adapter";
import { GithubRequest, GithubResponse } from "../../../adapters/github-adapter";

export const Github: React.FC<GithubRequest> = React.memo((props) => {
  const query = useAdapter<GithubRequest, GithubResponse>("/api/github", props);
  return <GithubInner {...query} />;
});
