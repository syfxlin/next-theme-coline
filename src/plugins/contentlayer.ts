import { Args, defineDocumentType, DocumentType, makeSource } from "@contentlayer/source-files";
import { Author, Footer, Header, License, Link, Page, Post, Seo } from "../contents/definitions";
import { COLINE_CONTENT_PATH } from "../env/public";
import { contentlayerImages, rehypeContents, rehypeHeadings, remarkImages } from "../utils/plugins";
import remarkA11yEmoji from "@fec/remark-a11y-emoji";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkGemoji from "remark-gemoji";
import rehypePrism from "rehype-prism-plus";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { fields, images } from "../utils/content";
import { Pluggable } from "unified";

export const withContentlayer = (config?: Partial<Args>): Partial<Args> => {
  const remarkPlugins: Array<Pluggable> = [];
  const rehypePlugins: Array<Pluggable> = [];
  const documentTypes: Array<DocumentType<any>> = [];
  if (config?.mdx?.remarkPlugins) {
    remarkPlugins.push(...config.mdx.remarkPlugins);
  }
  if (config?.mdx?.rehypePlugins) {
    rehypePlugins.push(...config.mdx.rehypePlugins);
  }
  if (config?.documentTypes) {
    if (config.documentTypes instanceof Array) {
      documentTypes.push(...config.documentTypes);
    } else {
      documentTypes.push(...Object.values(config.documentTypes));
    }
  }
  return {
    ...config,
    contentDirPath: COLINE_CONTENT_PATH,
    // prettier-ignore
    mdx: {
      remarkPlugins: [
        ...remarkPlugins,
        remarkImages,
        remarkA11yEmoji,
        remarkGfm,
        remarkMath,
        remarkGemoji,
      ],
      rehypePlugins: [
        ...rehypePlugins,
        [rehypePrism, { showLineNumbers: true }],
        rehypeKatex,
        rehypeSlug,
        rehypeAutolinkHeadings,
        rehypeHeadings,
        rehypeContents,
      ],
    },
    documentTypes: [
      ...documentTypes,
      defineDocumentType(() => ({
        name: Post.name,
        description: Post.label,
        contentType: "mdx",
        filePathPattern: "posts/**/*.md*",
        fields: fields(Post.name, Post.fields),
        computedFields: {
          _images: {
            type: "json",
            resolve: (doc) => contentlayerImages(COLINE_CONTENT_PATH, images(doc, Post.fields)),
          },
        },
      })),
      defineDocumentType(() => ({
        name: Page.name,
        description: Page.label,
        contentType: "mdx",
        filePathPattern: "pages/**/*.md*",
        fields: fields(Page.name, Page.fields),
        computedFields: {
          _images: {
            type: "json",
            resolve: (doc) => contentlayerImages(COLINE_CONTENT_PATH, images(doc, Page.fields)),
          },
        },
      })),
      defineDocumentType(() => ({
        name: Author.name,
        description: Author.label,
        isSingleton: true,
        contentType: "data",
        filePathPattern: "config/author.yaml",
        fields: fields(Author.name, Author.fields),
        computedFields: {
          _images: {
            type: "json",
            resolve: (doc) => contentlayerImages(COLINE_CONTENT_PATH, images(doc, Author.fields)),
          },
        },
      })),
      defineDocumentType(() => ({
        name: Seo.name,
        description: Seo.label,
        isSingleton: true,
        contentType: "data",
        filePathPattern: "config/seo.yaml",
        fields: fields(Seo.name, Seo.fields),
        computedFields: {
          _images: {
            type: "json",
            resolve: (doc) => contentlayerImages(COLINE_CONTENT_PATH, images(doc, Seo.fields)),
          },
        },
      })),
      defineDocumentType(() => ({
        name: Header.name,
        description: Header.label,
        isSingleton: true,
        contentType: "data",
        filePathPattern: "config/header.yaml",
        fields: fields(Header.name, Header.fields),
      })),
      defineDocumentType(() => ({
        name: Footer.name,
        description: Footer.label,
        isSingleton: true,
        contentType: "data",
        filePathPattern: "config/footer.yaml",
        fields: fields(Footer.name, Footer.fields),
      })),
      defineDocumentType(() => ({
        name: License.name,
        description: License.label,
        isSingleton: true,
        contentType: "data",
        filePathPattern: "config/license.yaml",
        fields: fields(License.name, License.fields),
      })),
      defineDocumentType(() => ({
        name: Link.name,
        description: Link.label,
        isSingleton: true,
        contentType: "data",
        filePathPattern: "config/link.yaml",
        fields: fields(Link.name, Link.fields),
        computedFields: {
          _images: {
            type: "json",
            resolve: (doc) => contentlayerImages(COLINE_CONTENT_PATH, images(doc, Link.fields)),
          },
        },
      })),
    ],
  };
};

export const makeContentlayer = (config: Partial<Args>) => {
  // @ts-ignore
  return makeSource(config);
};
