export const IS_DEV = process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test";
export const COLINE_CONTENT_PATH = process.env.NEXT_PUBLIC_COLINE_CONTENT_PATH ?? "content";
export const COLINE_CONTENT_BACKEND = JSON.parse(process.env.NEXT_PUBLIC_COLINE_CONTENT_BACKEND ?? "{}");
export const COLINE_GOOGLE_ANALYTICS = process.env.NEXT_PUBLIC_COLINE_GOOGLE_ANALYTICS;
export const COLINE_ARTALK_SITE_NAME = process.env.NEXT_PUBLIC_COLINE_ARTALK_SITE_NAME;
export const COLINE_ARTALK_SERVER_URL = process.env.NEXT_PUBLIC_COLINE_ARTALK_SERVER_URL;
