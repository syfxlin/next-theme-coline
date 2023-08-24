import fs from "fs-extra";
import path from "path";
import hasha from "hasha";
import imageSize from "image-size";
import { visit } from "unist-util-visit";
import { Plugin } from "unified";
import { Element, Text } from "hast";
import { Image, Parent } from "mdast";
import { MdxJsxTextElement } from "mdast-util-mdx";
import { ImageFieldData } from "@contentlayer/core";

export const image = async (image: string) => {
  const info = path.parse(image);
  const size = imageSize(image);
  const hash = hasha(image, { algorithm: "md5" }).substring(0, 8);
  const name = path.format({ name: `${info.name}.${hash}`, ext: info.ext });

  // copy image to media directory
  const media = path.resolve("public", "media");
  await fs.ensureDir(media);
  await fs.copyFile(image, path.join(media, name));

  return {
    src: `/media/${name}`,
    blurDataURL: `/_next/image?w=8&q=70&url=${encodeURIComponent(`/media/${name}`)}`,
    width: size.width!,
    height: size.height!,
    blurWidth: 8,
    blurHeight: Math.round((size.height! / size.width!) * 8)!,
  };
};

export const contentlayerImages = async (root: string, items: Array<ImageFieldData | boolean | null | undefined>) => {
  const results: Record<string, any> = {};
  for (const item of items) {
    if (item === null || item === undefined || typeof item === "boolean") {
      continue;
    }
    results[item.filePath] = await image(path.resolve(root, item.filePath));
  }
  return results;
};

export const remarkImages: Plugin = () => async (tree, file) => {
  const promises: Array<() => Promise<void>> = [];
  visit(tree, "image", (node: Image, index: number, parent: Parent) => {
    if (!/^(https?:)?\/\//i.test(node.url)) {
      promises.push(async () => {
        const data = await image(path.join(path.dirname(file.path), node.url));

        const element: MdxJsxTextElement = {
          type: "mdxJsxTextElement",
          name: "img",
          children: [],
          attributes: [
            {
              type: "mdxJsxAttribute",
              name: "alt",
              value: typeof node.alt === "string" ? node.alt : "",
            },
            {
              type: "mdxJsxAttribute",
              name: "title",
              value: typeof node.title === "string" ? node.title : "",
            },
            {
              type: "mdxJsxAttribute",
              name: "src",
              value: data.src,
            },
            {
              type: "mdxJsxAttribute",
              name: "width",
              value: String(data.width),
            },
            {
              type: "mdxJsxAttribute",
              name: "height",
              value: String(data.height),
            },
            {
              type: "mdxJsxAttribute",
              name: "blurDataURL",
              value: data.blurDataURL,
            },
            {
              type: "mdxJsxAttribute",
              name: "blurWidth",
              value: String(data.blurWidth),
            },
            {
              type: "mdxJsxAttribute",
              name: "blurHeight",
              value: String(data.blurHeight),
            },
          ],
        };

        parent.children.splice(index, 1, element);
      });
    }
  });
  await Promise.all(promises.map((fn) => fn()));
};

export const rehypeHeadings: Plugin = () => async (tree, file) => {
  const headings: any[] = [];

  visit(tree, "element", (node: Element) => {
    if (["h1", "h2", "h3", "h4", "h5", "h6"].includes(node.tagName)) {
      headings.push({
        // @ts-ignore
        name: node.children[1]?.value,
        slug: node.properties.id,
        link: `#${node.properties.id}`,
        level: parseInt(node.tagName.substring(1)),
      });
    }
  });

  const walk = (headings: any[], parent: any = { level: 0, children: [] }) => {
    parent.children = parent.children ?? [];
    while (headings.length) {
      const heading = headings.shift();
      if (heading.level > parent.level) {
        parent.children.push(walk(headings, heading));
      } else {
        headings.unshift(heading);
        return parent;
      }
    }
    return parent;
  };

  // @ts-ignore
  file.data.rawDocumentData.headings = walk(headings).children;
};

export const rehypeContents: Plugin = () => async (tree, file) => {
  // @ts-ignore
  file.data.rawDocumentData.contents = "";
  visit(tree, "text", (node: Text) => {
    // @ts-ignore
    file.data.rawDocumentData.contents += node.value;
  });
};
