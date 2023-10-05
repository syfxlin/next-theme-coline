import { slug } from "github-slugger";

export const slugger = (value: string) => {
  return slug(decodeURIComponent(value.trim().toLowerCase()));
};
