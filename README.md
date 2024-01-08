# Coline - 轻快、简洁、优雅的 Next.js 模板

Coline（**co**nnect, **line**）是一个基于 Next.js App Router 开发的博客模板，建立在轻快与简洁的设计理念上，摒弃花里胡哨的界面，专注于内容创作。

## 设计理念

- **简洁清新**：人的注意力是有限的，为了使读者能聚焦于内容之上。Coline 仅保留了少量色彩，大范围使用中性色，鲜明的色彩仅用于特殊场景，同时任何与内容无关的信息都不应该出现。
- **轻量快速**：人的容忍度是有限的，通常一个网站如果不能在 3 秒内加载出大部分内容，读者就会失去等待的耐心。Coline 在 LightHouse 中表现优秀，Performance > 98%，Best practice 100%。
- **SEO 100%**：网站不仅要给人类看，还需要给机器看。Coline 在 LightHouse 中 SEO 评分达到了 100%。同时也支持了 RSS，使读者能够使用 RSS 阅读器订阅博客。
- **无障碍支持**：不是所有人都是完美的，不应该歧视任何不完美的人。Coline 尽可能降低障碍人士使用难度，在 LightHouse 中 Accessibility > 90%。
- **写作友好**：网站的内容是作者产出的，如果不能有良好的写作体验，那么其他都是泡沫。Coline 集成了 Keystatic CMS，支持可视化编辑，仅需 GitHub 与 Vercel 即可启动一个 Coline 站点。

## 技术栈

- Next.js 14 (App Router)
- Vanilla Extract
- Keystatic
- Artalk
- Fuse.js

## 使用方式

1. 使用 create-next-app 初始化站点文件

```shell
pnpm dlx create-next-app --example https://github.com/syfxlin/blog
```

2. 配置 env 文件

```shell
cp .env.example .env
```

> - **NEXT_PUBLIC_COLINE_LANGUAGE**：配置站点语言，支持 zh-Hans、zh-Hant、en
> - **NEXT_PUBLIC_COLINE_GOOGLE_ANALYTICS**：配置 Google Analysis
> - **NEXT_PUBLIC_COLINE_ARTALK_SITE_NAME** 和 **NEXT_PUBLIC_COLINE_ARTALK_SERVER_URL** 配置 [Artalk](https://github.com/ArtalkJS/Artalk)
> - **NEXT_PUBLIC_COLINE_GITHUB_REPO**：配置站点仓库的地址
> - **COLINE_GITHUB_TOKEN**：配置你的 GitHub Token，用于 Projects 页面，建议只给 public_repo 权限
> - **KEYSTATIC_SECRET**、**KEYSTATIC_GITHUB_CLIENT_ID**、**KEYSTATIC_GITHUB_CLIENT_SECRET**、**NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG** 具体可以看 [Keystatic 的文档](https://keystatic.com/docs/github-mode)

4. 启动站点

```shell
pnpm dev
```

5. 构建站点

``shell
pnpm build
``
