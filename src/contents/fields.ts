import path from "path";
import Markdoc, { Node } from "@markdoc/markdoc";
import { imageSize } from "../utils/image-size";
import { fields as fs } from "@keystatic/core";
import { ISize } from "../utils/image-size/types";

const encoder = new TextEncoder();
const decoder = new TextDecoder();

const visit = (node: Node, files: Array<Map<string, Uint8Array>>) => {
  if (node.type === "image") {
    const info = path.posix.parse(node.attributes.src ?? "");
    if (info.name && !/\.\d+x\d+$/.test(info.name)) {
      for (const file of files) {
        const base = info.base;
        const image = file.get(base);
        if (image) {
          const size = imageSize(image);
          const name = `${info.name}.${size.width}x${size.height}`;
          node.attributes.src = path.posix.format({ name, dir: info.dir, ext: info.ext });
          file.delete(base);
          file.set(`${name}${info.ext}`, image);
          break;
        }
      }
    }
  }
  for (const item of node.children) {
    visit(item, files);
  }
};

const append = (name: string, size: ISize) => {
  const info = path.posix.parse(name);
  if (/\.\d+x\d+$/.test(info.name)) {
    return name;
  } else {
    const name = `${info.name}.${size.width}x${size.height}`;
    const dir = info.dir;
    const ext = info.ext;
    return path.posix.format({ name, dir, ext });
  }
};

type Fields = typeof fs;
// prettier-ignore
type ModifyFields = Omit<Fields, "date" | "datetime"> & {
  date: (config: Parameters<Fields["date"]>[0] & { updatingValue?: string | { kind: "now" } }) => ReturnType<Fields["date"]>;
  datetime: (config: Parameters<Fields["datetime"]>[0] & { updatingValue?: string | { kind: "now" } }) => ReturnType<Fields["datetime"]>;
};

export const fields: ModifyFields = {
  ...fs,
  date(config) {
    const result = fs.date(config);
    const serialize = result.serialize;
    result.serialize = function (value) {
      const serialized = serialize(value);
      if (typeof config.updatingValue === "string") {
        const date = new Date(config.updatingValue);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return { value: `${year}-${month}-${day}` };
      }
      if (config.updatingValue?.kind === "now") {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return { value: `${year}-${month}-${day}` };
      }
      return serialized;
    };
    return result;
  },
  datetime(config) {
    const result = fs.datetime(config);
    const serialize = result.serialize;
    result.serialize = function (value) {
      const serialized = serialize(value);
      if (typeof config.updatingValue === "string") {
        const date = new Date(config.updatingValue);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hour = String(date.getHours()).padStart(2, "0");
        const minute = String(date.getMinutes()).padStart(2, "0");
        return { value: `${year}-${month}-${day}T${hour}:${minute}` };
      }
      if (config.updatingValue?.kind === "now") {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hour = String(date.getHours()).padStart(2, "0");
        const minute = String(date.getMinutes()).padStart(2, "0");
        return { value: `${year}-${month}-${day}T${hour}:${minute}` };
      }
      return serialized;
    };
    return result;
  },
  image(config) {
    const result = fs.image(config);
    const serialize = result.serialize;
    result.serialize = function (value, extra) {
      const serialized = serialize(value, extra);
      if (serialized.asset) {
        const size = imageSize(serialized.asset.content);
        serialized.value = append(serialized.value as string, size);
        serialized.asset.filename = append(serialized.asset.filename, size);
      }
      return serialized;
    };
    return result;
  },
  document(config) {
    if (config.formatting === undefined) {
      config.formatting = {
        alignment: true,
        softBreaks: true,
        inlineMarks: {
          bold: true,
          italic: true,
          underline: true,
          strikethrough: true,
          code: true,
          superscript: true,
          subscript: true,
          keyboard: true,
        },
        listTypes: {
          ordered: true,
          unordered: true,
        },
        headingLevels: {
          levels: [1, 2, 3, 4, 5, 6],
        },
        blockTypes: {
          blockquote: true,
          code: true,
        },
      };
    }
    if (config.links === undefined) {
      config.links = true;
    }
    if (config.dividers === undefined) {
      config.dividers = true;
    }
    if (config.tables === undefined) {
      config.tables = true;
    }
    if (config.layouts === undefined) {
      config.layouts = [[1], [1, 1], [1, 1, 1], [1, 1, 1, 1]];
    }

    const result = fs.document(config);
    const serialize = result.serialize;
    result.serialize = function (value, extra) {
      const serialized = serialize(value, extra);
      if (serialized.content) {
        const node = Markdoc.parse(decoder.decode(serialized.content));
        // @ts-ignore
        visit(node, [serialized.other, ...serialized.external.values()]);
        serialized.content = encoder.encode(Markdoc.format(node));
      }
      return serialized;
    };
    return result;
  },
};
