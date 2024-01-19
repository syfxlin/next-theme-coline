import path from "path";
import { createReader } from "@keystatic/core/reader";
import config from "../../keystatic.config";

// fix vercel build
export const root = path.resolve("public/content");

export const reader = createReader(".", config);
