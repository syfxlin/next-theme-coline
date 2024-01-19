import { slug } from "github-slugger";

export function slugger(value: string) {
  return slug(decodeURIComponent(value.trim().toLowerCase()));
}
