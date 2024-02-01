# Coline - Light, clean and elegant Next.js template

Coline (**co**nnect, **line**) is a blog template based on the Next.js App Router development, built on the concept of lightness and simplicity of design, eschewing fancy interfaces and focusing on content creation.

## Design Concepts

- **Simple, Clean**: The human attention span is limited, and to keep the reader focused on the content, Coline kept the colors to a minimum, using a wide range of neutrals, with bright colors used only for specific scenes, and no information that was not relevant to the content should be present.
- **Light, Fast**: The human have a limited tolerance, and usually readers lose patience with a site that can't load most of its content in less than 3 seconds. Coline excels in LightHouse, with Performance > 98% and Best practice 100%.
- **SEO 100%**: Websites are not just for humans, they need to be for machines as well. Coline has a 100% SEO score in LightHouse. RSS is also supported, allowing readers to subscribe to the blog using an RSS reader.
- **Accessibility**: Not everyone is perfect, and there should be no discrimination against anyone who isn't.Coline makes it as easy as possible for people with disabilities to use. Coline has Accessibility > 90% in LightHouse.
- **Writing-friendly**: The content of the website is written by the author, so it is equally important to have a good writing experience. Coline integrates with Keystatic CMS to support visual editing.

## Technology Stacks

- Next.js 14 (App Router)
- Vanilla Extract
- Keystatic
- Artalk
- Fuse.js

## Examples

- [My Blog](https://blog.ixk.me)
- [Coline Demo](https://next-theme-coline-syfxlin.vercel.app/)

## LightHouse

![Desktop Benchmark](https://github.com/syfxlin/static/raw/master/next-theme-coline/desktop-benchmark.1977x1173.png)

![Mobile Benchmark](https://github.com/syfxlin/static/raw/master/next-theme-coline/mobile-benchmark.1977x1124.png)

## Installation

### Requirements

- You have registered [GitHub](https://github.com/) account.
- You have registered [Vercel](https://vercel.com) account (optional, deployed with Vercel).
- You have registered [Google Analytics](https://analytics.google.com/) (optional, analytics features).
- You have installed [Artalk](https://github.com/ArtalkJS/Artalk) (optional, comment feature)

### Prepare Environments

**Create GitHub Token**

![Create GitHub Token](https://github.com/syfxlin/static/raw/master/next-theme-coline/create-github-token.2853x1564.gif)

**Create Keystatic GitHub App**

- The GitHub App name can be anything you want.
- Please replace blog.ixk.me with your own domain name.
- Please check the Callback URL after creation, if there is something missing, you need to add it again.
- Please keep the GitHub App Name, Client ID, Client Secret after creation, it will be used later.

![Create GitHub App](https://github.com/syfxlin/static/raw/master/next-theme-coline/create-github-app.2853x1564.gif)

**Google Analytics、Artalk**

- [Google Analytics](https://analytics.google.com)
- [Artalk](https://artalk.js.org)

### Environment Variables

- **NEXT_PUBLIC_COLINE_LANGUAGE**: Configuration language, optional values `zh-Hans`, `zh-Hant`, `en`.
- **NEXT_PUBLIC_COLINE_GOOGLE_ANALYTICS**: Google Analytics Measurement ID, if you don't fill in this variable, Google Analytics will be disabled.
- **NEXT_PUBLIC_COLINE_ARTALK_SITE_NAME**: Artalk site name, if you don't fill in this variable, Artalk will be disabled.
- **NEXT_PUBLIC_COLINE_ARTALK_SERVER_URL**: Artalk server address, if you don't fill in this variable, Artalk will be disabled.
- **NEXT_PUBLIC_COLINE_GITHUB_REPO**: GitHub repository for your site
- **COLINE_GITHUB_TOKEN**: GitHub Personal Access Token, the steps to create it are given above.
- **KEYSTATIC_SECRET**: 80-bit hex random string, which can be obtained using the `require("crypto").randomBytes(40).toString('hex')` script.
- **KEYSTATIC_GITHUB_CLIENT_ID**: GitHub Client ID, the steps to create it are given above.
- **KEYSTATIC_GITHUB_CLIENT_SECRET**: GitHub Client Secret, the steps to create it are given above.
- **NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG**: GitHub App Name, the steps to create it are given above.

### Deployment with Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fsyfxlin%2Fnext-theme-coline&env=NEXT_PUBLIC_COLINE_LANGUAGE,NEXT_PUBLIC_COLINE_GOOGLE_ANALYTICS,NEXT_PUBLIC_COLINE_ARTALK_SITE_NAME,NEXT_PUBLIC_COLINE_ARTALK_SERVER_URL,NEXT_PUBLIC_COLINE_GITHUB_REPO,COLINE_GITHUB_TOKEN,KEYSTATIC_SECRET,KEYSTATIC_GITHUB_CLIENT_ID,KEYSTATIC_GITHUB_CLIENT_SECRET,NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG&project-name=blog&repository-name=blog)

### Deployment with Node.js

**Initializing site project with create-next-app**

```shell
pnpm dlx create-next-app --example https://github.com/syfxlin/next-theme-coline
```

**Configuring the env file**

```shell
cp .env.example .env
# Write environment variables to the .env file
```

**Launch project**

```shell
pnpm dev
```

**Building project**

```shell
pnpm build
```

## Thanks

Many thanks to the following sites for providing design ideas for this template.

- [Anthony Fu](https://antfu.me/)
- [Sukka's Blog](https://blog.skk.moe/)
- [蟬時雨](https://www.chanshiyu.com/)
- [hexo-theme-stellar](https://github.com/xaoxuu/hexo-theme-stellar)
- [wordpress-theme-origami](https://github.com/syfxlin/origami)
- and more...

## Maintainer

**@syfxlin/next-theme-coline** is written and maintained with the help of [Otstar Lin](https://github.com/syfxlin) and the following [contributors](https://github.com/syfxlin/next-theme-coline/graphs/contributors).

## License

Released under the [Apache-2.0](https://opensource.org/licenses/Apache-2.0) License.
