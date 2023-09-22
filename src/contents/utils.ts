import fs from "fs-extra";
import path from "path";
import { slug } from "github-slugger";

export const slugger = (value: string) => {
  return slug(decodeURIComponent(value.trim().toLowerCase()));
};

export const discover = () => {
  const paths = [
    ".",
    ".next",
    "_next",
    ".next/static",
    "_next/static",
    "/app",
    "/app/.next",
    "/app/_next",
    "/app/.next/static",
    "/app/_next/static",
    "/opt",
    "/opt/.next",
    "/opt/_next",
    "/opt/.next/static",
    "/opt/_next/static",
  ];
  for (const item of paths) {
    const resolve = item && path.resolve(item);
    if (resolve && fs.pathExistsSync(path.join(resolve, "content"))) {
      return resolve;
    }
  }
  return path.resolve(".");
};
