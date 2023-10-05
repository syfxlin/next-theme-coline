// @ts-ignore
process.env.NODE_ENV = "development";
import fs from "fs-extra";
import path from "path";
import { reader } from "../src/contents/reader";

fs.outputJsonSync(path.join(process.cwd(), "content", "generated.json"), {
  collections: Object.fromEntries(
    await Promise.all(Object.entries(reader.collections ?? {}).map(async ([key, value]) => [key, await value()])),
  ),
  singletons: Object.fromEntries(
    await Promise.all(Object.entries(reader.singletons ?? {}).map(async ([key, value]) => [key, await value()])),
  ),
});
