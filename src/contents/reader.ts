import fs from "fs-extra";
import config from "../../keystatic.config";
import { createReader } from "@keystatic/core/reader";

export const reader = createReader(fs.pathExistsSync("public") ? "." : "../", config);
