import fs from "fs-extra";
import path from "path";
import config from "../keystatic.config";
import { makeReader } from "./make-reader.dev";

const reader = makeReader(config);

fs.outputJsonSync(path.join(process.cwd(), "content", "generated.json"), {
  collections: Object.fromEntries(
    await Promise.all(Object.entries(reader.collections ?? {}).map(async ([key, value]) => [key, await value()])),
  ),
  singletons: Object.fromEntries(
    await Promise.all(Object.entries(reader.singletons ?? {}).map(async ([key, value]) => [key, await value()])),
  ),
});
