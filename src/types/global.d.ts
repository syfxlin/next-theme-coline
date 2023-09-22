// noinspection JSUnusedGlobalSymbols

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // public
      NEXT_PUBLIC_COLINE_GOOGLE_ANALYTICS?: string;
      NEXT_PUBLIC_COLINE_ARTALK_SITE_NAME?: string;
      NEXT_PUBLIC_COLINE_ARTALK_SERVER_URL?: string;
      // private
      COLINE_ANALYZE?: string;
      COLINE_GITHUB_TOKEN?: string;
    }
  }
}
