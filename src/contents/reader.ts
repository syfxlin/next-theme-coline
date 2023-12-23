import path from "path";
import config from "../../keystatic.config";
import { createReader } from "@keystatic/core/reader";

export const root = path.resolve("public");

export const reader = createReader(".", config);
