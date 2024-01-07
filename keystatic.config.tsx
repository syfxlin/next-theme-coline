import { collection, component, config, singleton } from "@keystatic/core";
import { fields } from "@syfxlin/reks";
import { Katex } from "./src/components/docs/katex/preview";
import { Github } from "./src/components/docs/github/preview";
import { Article } from "./src/components/docs/article/preview";
import { Message } from "./src/components/docs/message/preview";
import { Articles } from "./src/components/docs/articles/preview";
import { COLINE_GITHUB_REPO, IS_DEV } from "./src/env/private";
import { t } from "./src/locales";

const storage = () => {
  if (IS_DEV || !COLINE_GITHUB_REPO) {
    return { kind: "local" } as const;
  } else {
    return { kind: "github", repo: COLINE_GITHUB_REPO as `${string}/${string}` } as const;
  }
};

const content = (path: string) => {
  return fields.document({
    label: t("keystatic.page.content"),
    images: {
      directory: `public/image${path}`,
      publicPath: `/image${path}`,
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
      articles: component({
        label: "Articles",
        schema: {},
        preview: () => {
          return <Articles />;
        },
      }),
    },
  });
};

export default config({
  storage: storage(),
  collections: {
    pages: collection({
      label: t("page.name"),
      slugField: "slug",
      path: "public/content/pages/*/",
      entryLayout: "content",
      format: { contentField: "body" },
      schema: {
        title: fields.text({
          label: t("keystatic.page.title"),
          validation: { length: { min: 1 } },
        }),
        slug: fields.text({
          label: t("keystatic.page.link"),
          validation: { length: { min: 1 } },
        }),
        layout: fields.select({
          label: t("keystatic.page.layout"),
          defaultValue: "page",
          options: [{ label: t("page.name"), value: "page" }],
        }),
        status: fields.select({
          label: t("keystatic.page.status"),
          defaultValue: "draft",
          options: [
            { label: t("keystatic.page.status.draft"), value: "draft" },
            { label: t("keystatic.page.status.publish"), value: "publish" },
            { label: t("keystatic.page.status.archive"), value: "archive" },
          ],
        }),
        published_time: fields.datetime({
          label: t("keystatic.page.published"),
          defaultValue: { kind: "now" },
          validation: { isRequired: true },
        }),
        modified_time: fields.datetime({
          label: t("keystatic.page.modified"),
          defaultValue: { kind: "now" },
          updatingValue: { kind: "now" },
          validation: { isRequired: true },
        }),
        thumbnail: fields.image({
          label: t("keystatic.page.thumbnail"),
          directory: "public/image/pages",
          publicPath: "/image/pages",
          validation: { isRequired: false },
        }),
        body: content("/pages"),
      },
    }),
    posts: collection({
      label: t("articles.name"),
      slugField: "slug",
      path: "public/content/posts/*/",
      entryLayout: "content",
      format: { contentField: "body" },
      schema: {
        title: fields.text({
          label: t("keystatic.page.title"),
          validation: { length: { min: 1 } },
        }),
        slug: fields.text({
          label: t("keystatic.page.link"),
          validation: { length: { min: 1 } },
        }),
        layout: fields.select({
          label: t("keystatic.page.layout"),
          defaultValue: "post",
          options: [{ label: t("articles.name"), value: "post" }],
        }),
        status: fields.select({
          label: t("keystatic.page.status"),
          defaultValue: "draft",
          options: [
            { label: t("keystatic.page.status.draft"), value: "draft" },
            { label: t("keystatic.page.status.publish"), value: "publish" },
            { label: t("keystatic.page.status.archive"), value: "archive" },
          ],
        }),
        published_time: fields.datetime({
          label: t("keystatic.page.published"),
          defaultValue: { kind: "now" },
          validation: { isRequired: true },
        }),
        modified_time: fields.datetime({
          label: t("keystatic.page.modified"),
          defaultValue: { kind: "now" },
          updatingValue: { kind: "now" },
          validation: { isRequired: true },
        }),
        thumbnail: fields.image({
          label: t("keystatic.page.thumbnail"),
          directory: "public/image/posts",
          publicPath: "/image/posts",
          validation: { isRequired: false },
        }),
        categories: fields.array(
          fields.text({
            label: t("category.name"),
            validation: { length: { min: 1 } },
          }),
          {
            label: t("category.name"),
            itemLabel: (props) => props.value,
            validation: { length: { min: 0, max: 10 } },
          },
        ),
        tags: fields.array(
          fields.text({
            label: t("tag.name"),
            validation: { length: { min: 1 } },
          }),
          {
            label: t("tag.name"),
            itemLabel: (props) => props.value,
            validation: { length: { min: 0, max: 10 } },
          },
        ),
        body: content("/posts"),
      },
    }),
  },
  singletons: {
    // config
    seo: singleton({
      label: t("keystatic.seo.type"),
      path: "public/content/config/seo",
      entryLayout: "form",
      format: { data: "yaml" },
      schema: {
        link: fields.text({
          label: t("keystatic.seo.link"),
          validation: { length: { min: 1 } },
        }),
        logo: fields.image({
          label: t("keystatic.seo.logo"),
          directory: "public/image/config/seo",
          publicPath: "/image/config/seo",
          validation: { isRequired: true },
        }),
        title: fields.text({
          label: t("keystatic.seo.title"),
          validation: { length: { min: 1 } },
        }),
        subtitle: fields.text({
          label: t("keystatic.seo.subtitle"),
          validation: { length: { min: 1 } },
        }),
        description: fields.text({
          label: t("keystatic.seo.description"),
          multiline: true,
          validation: { length: { min: 1 } },
        }),
        birthday: fields.datetime({
          label: t("keystatic.seo.birthday"),
          validation: { isRequired: true },
        }),
        keywords: fields.array(
          fields.text({
            label: t("keystatic.seo.keywords"),
            validation: { length: { min: 1 } },
          }),
          {
            label: t("keystatic.seo.keywords"),
            itemLabel: (props) => props.value,
            validation: { length: { min: 0 } },
          },
        ),
      },
    }),
    author: singleton({
      label: t("keystatic.author.type"),
      path: "public/content/config/author",
      entryLayout: "form",
      format: { data: "yaml" },
      schema: {
        username: fields.text({
          label: t("keystatic.author.username"),
          validation: { length: { min: 1 } },
        }),
        firstname: fields.text({
          label: t("keystatic.author.firstname"),
          validation: { length: { min: 1 } },
        }),
        lastname: fields.text({
          label: t("keystatic.author.lastname"),
          validation: { length: { min: 1 } },
        }),
        description: fields.text({
          label: t("keystatic.author.description"),
          multiline: true,
          validation: { length: { min: 1 } },
        }),
        avatar: fields.image({
          label: t("keystatic.author.avatar"),
          directory: "public/image/config/author",
          publicPath: "/image/config/author",
          validation: { isRequired: true },
        }),
      },
    }),
    header: singleton({
      label: t("keystatic.header.type"),
      path: "public/content/config/header",
      entryLayout: "form",
      format: { data: "yaml" },
      schema: {
        main: fields.array(
          fields.object({
            title: fields.text({
              label: t("keystatic.header.type"),
              validation: { length: { min: 1 } },
            }),
            link: fields.text({
              label: t("keystatic.header.link"),
              validation: { length: { min: 1 } },
            }),
            icon: fields.text({
              label: t("keystatic.header.icon"),
              validation: { length: { min: 1 } },
            }),
            view: fields.select({
              label: t("keystatic.header.view"),
              defaultValue: "elastic",
              options: [
                { label: "text", value: "text" },
                { label: "icon", value: "icon" },
                { label: "elastic", value: "elastic" },
                { label: "elastic-text", value: "elastic-text" },
                { label: "elastic-icon", value: "elastic-icon" },
              ],
            }),
          }),
          {
            label: t("keystatic.header.main"),
            itemLabel: (props) => props.fields.title.value,
            validation: { length: { min: 0, max: 10 } },
          },
        ),
      },
    }),
    footer: singleton({
      label: t("keystatic.footer.type"),
      path: "public/content/config/footer",
      entryLayout: "form",
      format: { data: "yaml" },
      schema: {
        main: fields.array(
          fields.object({
            title: fields.text({
              label: t("keystatic.footer.title"),
              validation: { length: { min: 1 } },
            }),
            link: fields.text({
              label: t("keystatic.footer.link"),
              validation: { length: { min: 1 } },
            }),
          }),
          {
            label: t("keystatic.footer.main"),
            itemLabel: (props) => props.fields.title.value,
            validation: { length: { min: 0, max: 10 } },
          },
        ),
      },
    }),
    license: singleton({
      label: t("keystatic.license.type"),
      path: "public/content/config/license",
      entryLayout: "form",
      format: { data: "yaml" },
      schema: {
        name: fields.text({
          label: t("keystatic.license.name"),
          validation: { length: { min: 1 } },
        }),
        link: fields.text({
          label: t("keystatic.license.name"),
          validation: { length: { min: 1 } },
        }),
      },
    }),
    // pages
    home: singleton({
      label: t("keystatic.home.type"),
      path: "public/content/config/home",
      entryLayout: "form",
      format: { data: "yaml" },
      schema: {
        display: fields.select({
          label: t("keystatic.home.display"),
          defaultValue: "articles",
          options: [
            { label: t("keystatic.home.display.articles"), value: "articles" },
            { label: t("keystatic.home.display.document"), value: "document" },
          ],
        }),
        content: content("config/home"),
      },
    }),
    friends: singleton({
      label: t("keystatic.friends.type"),
      path: "public/content/config/friends",
      entryLayout: "form",
      format: { data: "yaml" },
      schema: {
        display: fields.select({
          label: t("keystatic.friends.display"),
          defaultValue: "hidden",
          options: [
            { label: t("keystatic.friends.display.none"), value: "none" },
            { label: t("keystatic.friends.display.top"), value: "top" },
            { label: t("keystatic.friends.display.bottom"), value: "bottom" },
            { label: t("keystatic.friends.display.hidden"), value: "hidden" },
          ],
        }),
        content: content("config/friends"),
        links: fields.array(
          fields.object({
            name: fields.text({
              label: t("keystatic.friends.name"),
              validation: { length: { min: 1 } },
            }),
            link: fields.text({
              label: t("keystatic.friends.link"),
              validation: { length: { min: 1 } },
            }),
            avatar: fields.image({
              label: t("keystatic.friends.avatar"),
              directory: "public/image/config/friends",
              publicPath: "/image/config/friends",
              validation: { isRequired: true },
            }),
            author: fields.text({
              label: t("keystatic.friends.author"),
            }),
            description: fields.text({
              label: t("keystatic.friends.description"),
            }),
          }),
          {
            label: t("keystatic.friends.main"),
            itemLabel: (props) => props.fields.name.value,
            validation: { length: { min: 0 } },
          },
        ),
        lost_links: fields.array(
          fields.object({
            name: fields.text({
              label: t("keystatic.friends.name"),
              validation: { length: { min: 1 } },
            }),
            link: fields.text({
              label: t("keystatic.friends.link"),
              validation: { length: { min: 1 } },
            }),
          }),
          {
            label: t("keystatic.friends.lost"),
            itemLabel: (props) => props.fields.name.value,
            validation: { length: { min: 0 } },
          },
        ),
      },
    }),
    projects: singleton({
      label: t("keystatic.projects.type"),
      path: "public/content/config/projects",
      entryLayout: "form",
      format: { data: "yaml" },
      schema: {
        display: fields.select({
          label: t("keystatic.projects.display"),
          defaultValue: "hidden",
          options: [
            { label: t("keystatic.projects.display.none"), value: "none" },
            { label: t("keystatic.projects.display.top"), value: "top" },
            { label: t("keystatic.projects.display.bottom"), value: "bottom" },
            { label: t("keystatic.projects.display.hidden"), value: "hidden" },
          ],
        }),
        content: content("config/projects"),
        categories: fields.array(
          fields.object({
            name: fields.text({
              label: t("keystatic.projects.category"),
              validation: { length: { min: 1 } },
            }),
            projects: fields.array(
              fields.object({
                name: fields.text({
                  label: t("keystatic.projects.name"),
                  validation: { length: { min: 1 } },
                }),
                link: fields.text({
                  label: t("keystatic.projects.link"),
                  validation: { length: { min: 1 } },
                }),
                description: fields.text({
                  label: t("keystatic.projects.description"),
                  multiline: true,
                  validation: { length: { min: 1 } },
                }),
                components: fields.array(
                  fields.text({
                    label: t("keystatic.projects.icon"),
                    validation: { length: { min: 1 } },
                  }),
                  {
                    label: t("keystatic.projects.component"),
                    itemLabel: (props) => props.value,
                    validation: { length: { min: 0 } },
                  },
                ),
              }),
              {
                label: t("keystatic.projects.main"),
                itemLabel: (props) => props.fields.name.value,
                validation: { length: { min: 1 } },
              },
            ),
          }),
          {
            label: t("keystatic.projects.category"),
            itemLabel: (props) => props.fields.name.value,
            validation: { length: { min: 0 } },
          },
        ),
      },
    }),
  },
});
