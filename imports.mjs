import path from "path";
import esbuild from "esbuild";
import { pathToFileURL } from "url";

export default async function imports(mod) {
  const ts = path.resolve(mod);
  const js = path.resolve(".next", "cache", "esbuild", "bundle", mod).replace(/\.[^/.]+$/u, ".mjs");
  await esbuild.build({
    entryPoints: [ts],
    outfile: js,
    bundle: true,
    format: "esm",
    platform: "node",
    external: ["./node_modules/*"],
    target: "es2020",
  });
  return await import(pathToFileURL(js).toString()).then((mod) => mod.default);
}
