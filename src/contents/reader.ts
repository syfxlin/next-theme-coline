import path from "path";
import config from "../../keystatic.config";
import { createReader } from "@keystatic/core/reader";

// fix vercel build
export const root = path.resolve("public/content");

export const reader = createReader(".", config);
