import { collection, component, config, singleton } from "@keystatic/core";
import { fields } from "./contents/fields";
import { Article, Github, Katex, Message } from "./components/docs/dynamic";

export default config({
  storage: {
    kind: "local",
    // kind: "github",
    // repo: {
    //   owner: "syfxlin",
    //   name: "next-theme-coline",
    // },
  },
  collections: {
    pages: collection({
      label: "页面",
      slugField: "slug",
      path: "src/content/pages/*/",
      entryLayout: "content",
      format: { contentField: "body" },
      schema: {
        title: fields.text({
          label: "标题",
          validation: { length: { min: 1 } },
        }),
        slug: fields.text({
          label: "链接",
          validation: { length: { min: 1 } },
        }),
        layout: fields.select({
          label: "布局",
          defaultValue: "page",
          options: [
            { label: "页面", value: "page" },
            { label: "友链", value: "links" },
          ],
        }),
        status: fields.select({
          label: "状态",
          defaultValue: "draft",
          options: [
            { label: "草稿", value: "draft" },
            { label: "发布", value: "publish" },
            { label: "归档", value: "archive" },
          ],
        }),
        published_time: fields.datetime({
          label: "发布时间",
          defaultValue: { kind: "now" },
          validation: { isRequired: true },
        }),
        modified_time: fields.datetime({
          label: "修改时间",
          defaultValue: { kind: "now" },
          updatingValue: { kind: "now" },
          validation: { isRequired: true },
        }),
        thumbnail: fields.image({
          label: "缩略图",
          directory: "public/image",
          publicPath: "/image",
          validation: { isRequired: false },
        }),
        body: fields.document({
          label: "内容",
          images: {
            directory: "public/image",
            publicPath: "/image",
          },
          componentBlocks: {
            katex: component({
              label: "Katex",
              schema: {
                math: fields.text({
                  label: "Math",
                  multiline: true,
                  validation: { length: { min: 0 } },
                }),
              },
              preview: (props) => {
                return <Katex math={props.fields.math.value} />;
              },
            }),
            github: component({
              label: "GitHub",
              schema: {
                repo: fields.text({
                  label: "Repo",
                  validation: { length: { min: 1 } },
                }),
              },
              preview: (props) => {
                return <Github repo={props.fields.repo.value} />;
              },
            }),
            article: component({
              label: "Article",
              schema: {
                link: fields.text({
                  label: "Link",
                  validation: { length: { min: 1 } },
                }),
                title: fields.text({
                  label: "Title",
                  validation: { length: { min: 0 } },
                }),
              },
              preview: (props) => {
                return <Article link={props.fields.link.value} title={props.fields.link.value} />;
              },
            }),
            message: component({
              label: "Message",
              schema: {
                type: fields.select({
                  label: "Type",
                  defaultValue: "success",
                  options: [
                    { label: "success", value: "success" },
                    { label: "error", value: "error" },
                    { label: "info", value: "info" },
                    { label: "warn", value: "warn" },
                  ],
                }),
                children: fields.text({
                  label: "Message",
                  multiline: true,
                  validation: { length: { min: 1 } },
                }),
              },
              preview: (props) => {
                return <Message type={props.fields.type.value as any}>{props.fields.children.value}</Message>;
              },
            }),
          },
        }),
      },
    }),
    posts: collection({
      label: "文章",
      slugField: "slug",
      path: "src/content/posts/*/",
      entryLayout: "content",
      format: { contentField: "body" },
      schema: {
        title: fields.text({
          label: "标题",
          validation: { length: { min: 1 } },
        }),
        slug: fields.text({
          label: "链接",
          validation: { length: { min: 1 } },
        }),
        layout: fields.select({
          label: "布局",
          defaultValue: "post",
          options: [{ label: "文章", value: "post" }],
        }),
        status: fields.select({
          label: "状态",
          defaultValue: "draft",
          options: [
            { label: "草稿", value: "draft" },
            { label: "发布", value: "publish" },
            { label: "归档", value: "archive" },
          ],
        }),
        published_time: fields.datetime({
          label: "发布时间",
          defaultValue: { kind: "now" },
          validation: { isRequired: true },
        }),
        modified_time: fields.datetime({
          label: "修改时间",
          defaultValue: { kind: "now" },
          updatingValue: { kind: "now" },
          validation: { isRequired: true },
        }),
        thumbnail: fields.image({
          label: "缩略图",
          directory: "public/image",
          publicPath: "/image",
          validation: { isRequired: false },
        }),
        categories: fields.array(
          fields.text({
            label: "分类",
            validation: { length: { min: 1 } },
          }),
          {
            label: "分类",
            itemLabel: (props) => props.value,
            validation: { length: { min: 0, max: 10 } },
          },
        ),
        tags: fields.array(
          fields.text({
            label: "标签",
            validation: { length: { min: 1 } },
          }),
          {
            label: "标签",
            itemLabel: (props) => props.value,
            validation: { length: { min: 0, max: 10 } },
          },
        ),
        body: fields.document({
          label: "内容",
          images: {
            directory: "public/image",
            publicPath: "/image",
          },
          componentBlocks: {
            katex: component({
              label: "Katex",
              schema: {
                math: fields.text({
                  label: "Math",
                  multiline: true,
                  validation: { length: { min: 0 } },
                }),
              },
              preview: (props) => {
                return <Katex math={props.fields.math.value} />;
              },
            }),
            github: component({
              label: "GitHub",
              schema: {
                repo: fields.text({
                  label: "Repo",
                  validation: { length: { min: 1 } },
                }),
              },
              preview: (props) => {
                return <Github repo={props.fields.repo.value} />;
              },
            }),
            article: component({
              label: "Article",
              schema: {
                link: fields.text({
                  label: "Link",
                  validation: { length: { min: 1 } },
                }),
                title: fields.text({
                  label: "Title",
                  validation: { length: { min: 0 } },
                }),
              },
              preview: (props) => {
                return <Article link={props.fields.link.value} title={props.fields.link.value} />;
              },
            }),
            message: component({
              label: "Message",
              schema: {
                type: fields.select({
                  label: "Type",
                  defaultValue: "success",
                  options: [
                    { label: "success", value: "success" },
                    { label: "error", value: "error" },
                    { label: "info", value: "info" },
                    { label: "warn", value: "warn" },
                  ],
                }),
                children: fields.text({
                  label: "Message",
                  multiline: true,
                  validation: { length: { min: 1 } },
                }),
              },
              preview: (props) => {
                return <Message type={props.fields.type.value as any}>{props.fields.children.value}</Message>;
              },
            }),
          },
        }),
      },
    }),
  },
  singletons: {
    seo: singleton({
      label: "SEO",
      path: "src/content/config/seo",
      entryLayout: "form",
      format: { data: "yaml" },
      schema: {
        language: fields.text({
          label: "语言",
          validation: { length: { min: 1 } },
        }),
        link: fields.text({
          label: "站点地址",
          validation: { length: { min: 1 } },
        }),
        logo: fields.image({
          label: "站点图片",
          directory: "public/image",
          publicPath: "/image",
          validation: { isRequired: true },
        }),
        title: fields.text({
          label: "站点主标题",
          validation: { length: { min: 1 } },
        }),
        subtitle: fields.text({
          label: "站点子标题",
          validation: { length: { min: 1 } },
        }),
        description: fields.text({
          label: "站点描述",
          multiline: true,
          validation: { length: { min: 1 } },
        }),
        birthday: fields.datetime({
          label: "站点起始日",
          validation: { isRequired: true },
        }),
        keywords: fields.array(
          fields.text({
            label: "关键词",
            validation: { length: { min: 1 } },
          }),
          {
            label: "站点关键词",
            itemLabel: (props) => props.value,
            validation: { length: { min: 0 } },
          },
        ),
      },
    }),
    author: singleton({
      label: "作者",
      path: "src/content/config/author",
      entryLayout: "form",
      format: { data: "yaml" },
      schema: {
        username: fields.text({
          label: "用户名",
          validation: { length: { min: 1 } },
        }),
        firstname: fields.text({
          label: "名",
          validation: { length: { min: 1 } },
        }),
        lastname: fields.text({
          label: "姓",
          validation: { length: { min: 1 } },
        }),
        description: fields.text({
          label: "描述",
          multiline: true,
          validation: { length: { min: 1 } },
        }),
        avatar: fields.image({
          label: "头像",
          directory: "public/image",
          publicPath: "/image",
          validation: { isRequired: true },
        }),
      },
    }),
    header: singleton({
      label: "页首",
      path: "src/content/config/header",
      entryLayout: "form",
      format: { data: "yaml" },
      schema: {
        main: fields.array(
          fields.object({
            title: fields.text({
              label: "标题",
              validation: { length: { min: 1 } },
            }),
            link: fields.text({
              label: "链接",
              validation: { length: { min: 1 } },
            }),
            icon: fields.text({
              label: "图标",
              validation: { length: { min: 1 } },
            }),
            view: fields.select({
              label: "显示模式",
              defaultValue: "elastic",
              options: [
                { label: "总是显示描述", value: "always" },
                { label: "弹性显示描述", value: "elastic" },
                { label: "总是显示图标", value: "always-icon" },
                { label: "弹性显示图标", value: "elastic-icon" },
              ],
            }),
          }),
          {
            label: "主菜单",
            itemLabel: (props) => props.fields.title.value,
            validation: { length: { min: 0, max: 10 } },
          },
        ),
      },
    }),
    footer: singleton({
      label: "页脚",
      path: "src/content/config/footer",
      entryLayout: "form",
      format: { data: "yaml" },
      schema: {
        main: fields.array(
          fields.object({
            title: fields.text({
              label: "标题",
              validation: { length: { min: 1 } },
            }),
            link: fields.text({
              label: "链接",
              validation: { length: { min: 1 } },
            }),
          }),
          {
            label: "主页脚",
            itemLabel: (props) => props.fields.title.value,
            validation: { length: { min: 0, max: 10 } },
          },
        ),
      },
    }),
    license: singleton({
      label: "版权",
      path: "src/content/config/license",
      entryLayout: "form",
      format: { data: "yaml" },
      schema: {
        name: fields.text({
          label: "协议名称",
          validation: { length: { min: 1 } },
        }),
        link: fields.text({
          label: "协议链接",
          validation: { length: { min: 1 } },
        }),
      },
    }),
    friends: singleton({
      label: "友链",
      path: "src/content/config/friends",
      entryLayout: "form",
      format: { data: "yaml" },
      schema: {
        links: fields.array(
          fields.object({
            name: fields.text({
              label: "站点名称",
              validation: { length: { min: 1 } },
            }),
            link: fields.text({
              label: "站点链接",
              validation: { length: { min: 1 } },
            }),
            avatar: fields.image({
              label: "站点头像",
              directory: "public/image",
              publicPath: "/image",
              validation: { isRequired: true },
            }),
            author: fields.text({
              label: "站点作者",
            }),
            description: fields.text({
              label: "站点简介",
            }),
          }),
          {
            label: "友链",
            itemLabel: (props) => props.fields.name.value,
            validation: { length: { min: 0 } },
          },
        ),
        lost_links: fields.array(
          fields.object({
            name: fields.text({
              label: "站点名称",
              validation: { length: { min: 1 } },
            }),
            link: fields.text({
              label: "站点链接",
              validation: { length: { min: 1 } },
            }),
          }),
          {
            label: "已失联的友链",
            itemLabel: (props) => props.fields.name.value,
            validation: { length: { min: 0 } },
          },
        ),
      },
    }),
    projects: singleton({
      label: "项目",
      path: "src/content/config/projects",
      entryLayout: "form",
      format: { data: "yaml" },
      schema: {
        items: fields.array(
          fields.object({
            name: fields.text({
              label: "分类名称",
              validation: { length: { min: 1 } },
            }),
            items: fields.object({
              name: fields.text({
                label: "站点名称",
                validation: { length: { min: 1 } },
              }),
              link: fields.text({
                label: "站点链接",
                validation: { length: { min: 1 } },
              }),
            }),
          }),
          {
            label: "项目分类",
            itemLabel: (props) => props.fields.name.value,
            validation: { length: { min: 0 } },
          },
        ),
      },
    }),
  },
});
