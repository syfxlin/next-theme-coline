import colors from "gh-lang-colors";
import { COLINE_GITHUB_TOKEN } from "../env/private";
import { Adapter, AdapterError } from "./adapter";

export interface GithubRequest {
  repo: string;
}

export interface GithubResponse {
  repo: string;
  description: string;
  color: string;
  language: string;
  stars: number;
  forks: number;
}

export class GithubAdapter extends Adapter<GithubRequest, GithubResponse> {
  async valid(params: GithubRequest): Promise<string | null> {
    if (params && !!params.repo) {
      return null;
    } else {
      return "repo parameter must be set";
    }
  }

  async query(params: GithubRequest): Promise<GithubResponse> {
    const response = await fetch(`https://api.github.com/repos/${params.repo}`, {
      headers: COLINE_GITHUB_TOKEN ? { Authorization: `Bearer ${COLINE_GITHUB_TOKEN}` } : {},
      next: { revalidate: 43200 },
    });

    if (response.ok) {
      const json = await response.json();
      const data = json as any;
      return {
        repo: params.repo,
        description: data.description,
        language: data.language,
        stars: data.stargazers_count,
        forks: data.forks_count,
        // @ts-expect-error
        color: colors[data.language] ?? "#fff",
      };
    } else {
      throw new AdapterError(
        502,
        `Fetch GitHub repository information failed. status=${response.status}, body=${await response.text()}`,
      );
    }
  }
}
