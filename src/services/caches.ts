import { caching } from "cache-manager";

export const caches = await caching("memory", { max: 300, ttl: 4 * 60 * 60 * 1000 });
