"use client";
import React from "react";
import { useAdapter } from "../../../adapters/use-adapter";
import { GithubRequest, GithubResponse } from "../../../adapters/github-adapter";
import { GithubInner } from "./inner";

export const Github: React.FC<GithubRequest> = React.memo((props) => {
  const query = useAdapter<GithubRequest, GithubResponse>("/api/github", props);
  return <GithubInner {...query} />;
});
