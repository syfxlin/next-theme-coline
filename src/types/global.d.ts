// noinspection JSUnusedGlobalSymbols

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // public
      NEXT_PUBLIC_COLINE_LANGUAGE?: string;
      NEXT_PUBLIC_COLINE_GITHUB_REPO?: string;
      NEXT_PUBLIC_COLINE_GOOGLE_ANALYTICS?: string;
      NEXT_PUBLIC_COLINE_ARTALK_SITE_NAME?: string;
      NEXT_PUBLIC_COLINE_ARTALK_SERVER_URL?: string;
      // private
      COLINE_ANALYZE?: string;
      COLINE_GITHUB_TOKEN?: string;
      // keystatic
      KEYSTATIC_SECRET?: string;
      KEYSTATIC_GITHUB_CLIENT_ID?: string;
      KEYSTATIC_GITHUB_CLIENT_SECRET?: string;
      NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG?: string;
    }
  }
}
