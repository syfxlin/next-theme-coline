import CMS, { Collection, Config } from "@staticcms/core";
import { COLINE_CONTENT_BACKEND, COLINE_CONTENT_PATH } from "../env/public";
import { Author, Footer, Header, Layout, License, Link, Page, Post, Seo, Status } from "../contents/definitions";

type Args = Config & { register?: (cms: typeof CMS) => void };

const Generic: Partial<Collection> = {
  media_folder: "images",
  public_folder: "images",
  editor: {
    preview: false,
  },
};

const Content: Partial<Collection> = {
  ...Generic,
  summary: "{{title}} [{{status}}]",
  identifier_field: "slug",
  create: true,
  sortable_fields: {
    fields: ["published_time", "modified_time", "title"],
  },
  view_filters: [
    ...Layout.map((i) => ({
      label: `布局 - ${i.label}`,
      field: "layout",
      pattern: i.value,
    })),
    ...Status.map((i) => ({
      label: `状态 - ${i.label}`,
      field: "status",
      pattern: i.value,
    })),
    ...[0, 1, 2, 3, 4]
      .map((i) => String(new Date().getFullYear() - i))
      .map((i) => ({
        label: `年份 - ${i}`,
        field: "published_time",
        pattern: i,
      })),
  ],
  view_groups: [
    {
      label: "布局",
      field: "layout",
    },
    {
      label: "状态",
      field: "status",
    },
    {
      label: "发布时间",
      field: "published_time",
      pattern: "\\d{4}-\\d{2}",
    },
  ],
};

export const withStaticCms = (config?: Partial<Args>): Partial<Args> => {
  return {
    ...config,
    // register
    register: (cms) => {
      if (config?.register) {
        config.register(cms);
      }
      cms.registerEventListener({
        name: `preSave`,
        collection: "page",
        handler: ({ data }) => {
          const value = data.entry.data;
          if (value?.layout) {
            return { ...value, modified_time: new Date().toISOString() };
          } else {
            return value;
          }
        },
      });
      cms.registerEventListener({
        name: `preSave`,
        collection: "post",
        handler: ({ data }) => {
          const value = data.entry.data;
          if (value?.layout) {
            return { ...value, modified_time: new Date().toISOString() };
          } else {
            return value;
          }
        },
      });
    },
    // base
    locale: "zh_Hans",
    local_backend: true,
    backend: COLINE_CONTENT_BACKEND,
    // images
    media_folder: "public/images",
    public_folder: "/images",
    collections: [
      ...(config?.collections ?? []),
      {
        path: "{{fields.slug}}",
        folder: `${COLINE_CONTENT_PATH}/posts`,
        ...Content,
        ...Post,
      },
      {
        path: "{{fields.slug}}/index",
        folder: `${COLINE_CONTENT_PATH}/pages`,
        ...Content,
        ...Page,
      },
      {
        name: "config",
        label: "设置",
        ...Generic,
        files: [
          {
            file: `${COLINE_CONTENT_PATH}/config/author.yaml`,
            ...Author,
          },
          {
            file: `${COLINE_CONTENT_PATH}/config/seo.yaml`,
            ...Seo,
          },
          {
            file: `${COLINE_CONTENT_PATH}/config/header.yaml`,
            ...Header,
          },
          {
            file: `${COLINE_CONTENT_PATH}/config/footer.yaml`,
            ...Footer,
          },
          {
            file: `${COLINE_CONTENT_PATH}/config/license.yaml`,
            ...License,
          },
          {
            file: `${COLINE_CONTENT_PATH}/config/link.yaml`,
            ...Link,
          },
        ],
      },
    ],
  };
};

export const makeStaticCms = (config: Partial<Args>) => {
  // @ts-ignore
  CMS.init({ config: config });
  if (config.register) {
    config.register(CMS);
  }
};
