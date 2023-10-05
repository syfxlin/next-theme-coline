import { Collection, ComponentSchema, Config, Singleton } from "@keystatic/core";
import { Reader } from "./types";

export function makeReader<
  C extends {
    [key: string]: Collection<Record<string, ComponentSchema>, string>;
  },
  S extends {
    [key: string]: Singleton<Record<string, ComponentSchema>>;
  },
>(config: Config<C, S>): Reader<C, S> {
  return {
    config,
    collections: Object.fromEntries(
      Object.keys(config.collections ?? {}).map((key) => [
        key,
        // @ts-ignore
        () => import("../../content/generated.json").then((data) => data.collections[key]),
      ]),
    ),
    singletons: Object.fromEntries(
      Object.keys(config.singletons ?? {}).map((key) => [
        key,
        // @ts-ignore
        () => import("../../content/generated.json").then((data) => data.singletons[key]),
      ]),
    ),
  } as Reader<C, S>;
}
