import { CollectionFile, FolderCollection } from "@staticcms/core";

export const Layout = [
  { label: "文章", value: "post" },
  { label: "页面", value: "page" },
  { label: "友链", value: "links" },
];

export const Status = [
  { label: "草稿", value: "draft" },
  { label: "发布", value: "publish" },
  { label: "归档", value: "archive" },
];

export const Post: Omit<FolderCollection, "folder"> = {
  name: "Post",
  label: "文章",
  fields: [
    {
      name: "title",
      label: "标题",
      widget: "string",
      required: true,
    },
    {
      name: "slug",
      label: "链接",
      widget: "string",
      required: true,
    },
    {
      name: "layout",
      label: "布局",
      widget: "hidden",
      required: true,
      default: "post",
    },
    {
      name: "status",
      label: "状态",
      widget: "select",
      required: true,
      default: "draft",
      options: Status,
    },
    {
      name: "published_time",
      label: "发布时间",
      widget: "datetime",
      required: true,
      date_format: "yyyy-MM-dd",
      time_format: "hh:mm:ss",
    },
    {
      name: "modified_time",
      label: "修改时间",
      widget: "datetime",
      required: true,
      date_format: "yyyy-MM-dd",
      time_format: "hh:mm:ss",
    },
    {
      name: "categories",
      label: "分类",
      widget: "list",
      required: false,
      collapsed: false,
      fields: [
        {
          name: "name",
          label: "名称",
          widget: "string",
          required: true,
        },
      ],
    },
    {
      name: "tags",
      label: "标签",
      widget: "list",
      required: false,
      collapsed: false,
      fields: [
        {
          name: "name",
          label: "名称",
          widget: "string",
          required: true,
        },
      ],
    },
    {
      name: "thumbnail",
      label: "缩略图",
      widget: "image",
      required: false,
    },
    {
      name: "body",
      label: "内容",
      widget: "markdown",
      required: false,
    },
  ],
};

export const Page: Omit<FolderCollection, "folder"> = {
  name: "Page",
  label: "页面",
  fields: [
    {
      name: "title",
      label: "标题",
      widget: "string",
      required: true,
    },
    {
      name: "slug",
      label: "链接",
      widget: "string",
      required: true,
    },
    {
      name: "layout",
      label: "布局",
      widget: "select",
      required: true,
      default: "page",
      options: Layout,
    },
    {
      name: "status",
      label: "状态",
      widget: "select",
      required: true,
      default: "draft",
      options: Status,
    },
    {
      name: "published_time",
      label: "发布时间",
      widget: "datetime",
      required: true,
      date_format: "yyyy-MM-dd",
      time_format: "hh:mm:ss",
    },
    {
      name: "modified_time",
      label: "修改时间",
      widget: "datetime",
      required: true,
      date_format: "yyyy-MM-dd",
      time_format: "hh:mm:ss",
    },
    {
      name: "thumbnail",
      label: "缩略图",
      widget: "image",
      required: false,
    },
    {
      name: "body",
      label: "内容",
      widget: "markdown",
      required: false,
    },
  ],
};

export const Author: Omit<CollectionFile, "file"> = {
  name: "Author",
  label: "作者",
  fields: [
    {
      name: "username",
      label: "用户名",
      widget: "string",
      required: true,
    },
    {
      name: "firstname",
      label: "名",
      widget: "string",
      required: true,
    },
    {
      name: "lastname",
      label: "姓",
      widget: "string",
      required: true,
    },
    {
      name: "avatar",
      label: "头像",
      widget: "image",
      required: true,
    },
    {
      name: "description",
      label: "描述",
      widget: "text",
      required: true,
    },
  ],
};

export const Seo: Omit<CollectionFile, "file"> = {
  name: "Seo",
  label: "SEO",
  fields: [
    {
      name: "language",
      label: "语言",
      widget: "string",
      required: true,
    },
    {
      name: "link",
      label: "站点地址",
      widget: "string",
      required: true,
    },
    {
      name: "logo",
      label: "站点图片",
      widget: "image",
      required: true,
    },
    {
      name: "title",
      label: "站点主标题",
      widget: "string",
      required: true,
    },
    {
      name: "subtitle",
      label: "站点子标题",
      widget: "string",
      required: true,
    },
    {
      name: "description",
      label: "站点描述",
      widget: "text",
      required: true,
    },
    {
      name: "birthday",
      label: "站点起始日",
      widget: "datetime",
      required: true,
    },
    {
      name: "keywords",
      label: "站点关键词",
      widget: "list",
      collapsed: false,
      required: false,
      fields: [
        {
          name: "name",
          label: "关键词",
          widget: "string",
          required: true,
        },
      ],
    },
  ],
};

export const Header: Omit<CollectionFile, "file"> = {
  name: "Header",
  label: "页首",
  fields: [
    {
      name: "main",
      label: "主菜单",
      widget: "list",
      required: true,
      fields: [
        {
          name: "title",
          label: "标题",
          widget: "string",
          required: true,
        },
        {
          name: "link",
          label: "链接",
          widget: "string",
          required: true,
        },
        {
          name: "icon",
          label: "图标",
          widget: "string",
          required: true,
        },
        {
          name: "view",
          label: "显示模式",
          widget: "select",
          default: "elastic",
          required: true,
          options: [
            { value: "always", label: "总是显示描述" },
            { value: "elastic", label: "弹性显示描述" },
            { value: "always-icon", label: "总是显示图标" },
            { value: "elastic-icon", label: "弹性显示图标" },
          ],
        },
      ],
    },
  ],
};

export const Footer: Omit<CollectionFile, "file"> = {
  name: "Footer",
  label: "页脚",
  fields: [
    {
      name: "main",
      label: "主页脚",
      widget: "list",
      required: true,
      fields: [
        {
          name: "title",
          label: "标题",
          widget: "string",
          required: true,
        },
        {
          name: "link",
          label: "链接",
          widget: "string",
          required: true,
        },
      ],
    },
  ],
};

export const License: Omit<CollectionFile, "file"> = {
  name: "License",
  label: "版权",
  fields: [
    {
      name: "name",
      label: "协议名称",
      widget: "string",
      required: true,
    },
    {
      name: "link",
      label: "协议链接",
      widget: "string",
      required: true,
    },
  ],
};

export const Link: Omit<CollectionFile, "file"> = {
  name: "Link",
  label: "友链",
  fields: [
    {
      name: "links",
      label: "友链",
      widget: "list",
      required: true,
      fields: [
        {
          name: "name",
          label: "站点名称",
          widget: "string",
          required: true,
        },
        {
          name: "link",
          label: "站点链接",
          widget: "string",
          required: true,
        },
        {
          name: "avatar",
          label: "站点头像",
          widget: "image",
          required: true,
        },
        {
          name: "author",
          label: "站点作者",
          widget: "string",
          required: false,
        },
        {
          name: "description",
          label: "站点简介",
          widget: "string",
          required: false,
        },
      ],
    },
    {
      name: "lost_links",
      label: "已失联的友链",
      widget: "list",
      required: true,
      fields: [
        {
          name: "name",
          label: "站点名称",
          widget: "string",
          required: true,
        },
        {
          name: "link",
          label: "站点链接",
          widget: "string",
          required: true,
        },
      ],
    },
  ],
};
