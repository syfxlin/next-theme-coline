import { Collection, ComponentSchema, Config, Singleton } from "@keystatic/core";
import { createReader } from "@keystatic/core/reader";
import { Reader } from "./types";

export function makeReader<
  C extends {
    [key: string]: Collection<Record<string, ComponentSchema>, string>;
  },
  S extends {
    [key: string]: Singleton<Record<string, ComponentSchema>>;
  },
>(config: Config<C, S>): Reader<C, S> {
  const reader = createReader(".", config);
  return {
    config,
    collections: Object.fromEntries(
      Object.keys(config.collections ?? {}).map((key) => [
        key,
        () => reader.collections[key].all({ resolveLinkedFiles: true }),
      ]),
    ),
    singletons: Object.fromEntries(
      Object.keys(config.singletons ?? {}).map((key) => [
        key,
        () => reader.singletons[key].read({ resolveLinkedFiles: true }),
      ]),
    ),
  } as Reader<C, S>;
}
