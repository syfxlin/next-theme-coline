import { Metadata } from "next";
import { author, seo } from "../../contents";
import { image, resolve } from "../../utils/vender";

export type MetadataProps = {
  link?: string;
  title?: string;
  description?: string;
  thumbnail?: string;
};

export const metadata = (props?: MetadataProps): Metadata => {
  return {
    metadataBase: new URL(seo.link),
    applicationName: seo.title,
    title: props?.title ? `${props?.title} | ${seo.title}` : `${seo.title} - ${seo.subtitle}`,
    description: props?.description ?? seo.description,
    keywords: seo.keywords ?? [],
    authors: {
      url: resolve(seo.link),
      name: author.fullname,
    },
    creator: author.fullname,
    generator: "Next.PHP",
    manifest: "/manifest.json",
    alternates: {
      types: {
        "application/rss+xml": [{ title: `${seo.title} - ${seo.subtitle}`, url: "/rss.xml" }],
      },
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: "website",
      locale: seo.language,
      siteName: seo.title,
      url: resolve(seo.link, props?.link),
      title: props?.title ? `${props?.title} | ${seo.title}` : `${seo.title} - ${seo.subtitle}`,
      description: props?.description ?? seo.description,
      images: resolve(seo.link, props?.thumbnail ?? seo.logo.src),
    },
    twitter: {
      card: "summary_large_image",
      creator: `@${author.username}`,
      site: seo.title,
      title: props?.title ? `${props?.title} | ${seo.title}` : `${seo.title} - ${seo.subtitle}`,
      description: props?.description ?? seo.description,
      images: resolve(seo.link, props?.thumbnail ?? seo.logo.src),
    },
    themeColor: [
      { media: "(prefers-color-scheme: dark)", color: "#000212" },
      { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    ],
    icons: [
      {
        url: image(seo.logo.src, 16),
        sizes: "16x16",
      },
      {
        url: image(seo.logo.src, 32),
        sizes: "32x32",
      },
      {
        url: image(seo.logo.src, 48),
        sizes: "48x48",
      },
      {
        url: image(seo.logo.src, 64),
        sizes: "64x64",
      },
      {
        url: image(seo.logo.src, 96),
        sizes: "96x96",
      },
      {
        url: image(seo.logo.src, 128),
        sizes: "128x128",
      },
      {
        url: image(seo.logo.src, 256),
        sizes: "256x256",
      },
    ],
  };
};
