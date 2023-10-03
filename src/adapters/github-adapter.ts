import colors from "gh-lang-colors";
import { Adapter, AdapterError } from "./adapter";
import { COLINE_GITHUB_TOKEN } from "../env/private.mjs";

export type GithubRequest = {
  repo: string;
};

export type GithubResponse = {
  repo: string;
  description: string;
  color: string;
  language: string;
  stars: number;
  forks: number;
};

export class GithubAdapter extends Adapter<GithubRequest, GithubResponse> {
  async valid(params: GithubRequest): Promise<boolean> {
    return params && !!params.repo;
  }

  async query(params: GithubRequest): Promise<GithubResponse> {
    try {
      const response = await fetch(`https://api.github.com/repos/${params.repo}`, {
        headers: COLINE_GITHUB_TOKEN ? { Authorization: `token ${COLINE_GITHUB_TOKEN}` } : {},
        next: { revalidate: 3600 },
      });

      const json = await response.json();
      const data = json as any;

      return {
        repo: params.repo,
        description: data.description,
        language: data.language,
        stars: data.stargazers_count,
        forks: data.forks_count,
        // @ts-ignore
        color: colors[data.language] ?? "#fff",
      };
    } catch (e) {
      throw new AdapterError(502, "Fetch GitHub repository information failed.");
    }
  }
}
