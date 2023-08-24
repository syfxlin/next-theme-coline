import { NextRequest, NextResponse } from "next/server";
import fetch from "node-fetch";
import colors from "gh-lang-colors";
import { caches } from "../../../services/caches";
import { COLINE_GITHUB_TOKEN } from "../../../env/private";

export type GithubResponse = {
  repo: string;
  description: string;
  color: string;
  language: string;
  stars: number;
  forks: number;
};

export const GET = async (request: NextRequest) => {
  const repo = request.nextUrl.searchParams.get("repo");

  if (!repo) {
    return NextResponse.json({ code: 400, message: "Illegal parameters." }, { status: 400 });
  }

  const cache = await caches.get<GithubResponse>(`github:${repo}`);
  if (cache) {
    return NextResponse.json(cache);
  }

  try {
    const response = await fetch(`https://api.github.com/repos/${repo}`, {
      headers: COLINE_GITHUB_TOKEN ? { Authorization: `token ${COLINE_GITHUB_TOKEN}` } : {},
    });

    const json = await response.json();
    const data = json as any;

    const results: GithubResponse = {
      repo,
      description: data.description,
      // @ts-ignore
      color: colors[data.language] ?? "#fff",
      language: data.language,
      stars: data.stargazers_count,
      forks: data.forks_count,
    };
    await caches.set(`github:${repo}`, results);
    return NextResponse.json(results);
  } catch (e) {
    return NextResponse.json({ code: 502, message: "Fetch GitHub repository information failed." }, { status: 502 });
  }
};
